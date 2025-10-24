import { useState } from 'react';
import { ArrowLeft, TrendingUp, Brain, Zap, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import AIAgent from './AIAgent';
import SuggestedPrompts from './SuggestedPrompts';

interface ForecastingDashboardProps {
  onNavigate: (screen: 'landing' | 'gdp' | 'gsbpm' | 'forecasting') => void;
  demoMode?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  message: string;
  agent?: string;
}

const historicalAndForecast = [
  { year: '2020', actual: 1.41, forecast: null, lower: null, upper: null },
  { year: '2021', actual: 1.48, forecast: null, lower: null, upper: null },
  { year: '2022', actual: 1.52, forecast: null, lower: null, upper: null },
  { year: '2023', actual: 1.55, forecast: null, lower: null, upper: null },
  { year: '2024', actual: 1.60, forecast: null, lower: null, upper: null },
  { year: '2025', actual: null, forecast: 1.66, lower: 1.62, upper: 1.70 },
  { year: '2026', actual: null, forecast: 1.72, lower: 1.65, upper: 1.79 },
];

const models = [
  { 
    name: 'ARIMA Model', 
    type: 'Time Series', 
    accuracy: 94.2, 
    lastUpdated: '2024-10-15',
    status: 'active'
  },
  { 
    name: 'VAR Model', 
    type: 'Multivariate', 
    accuracy: 92.8, 
    lastUpdated: '2024-10-14',
    status: 'active'
  },
  { 
    name: 'ML Ensemble', 
    type: 'Machine Learning', 
    accuracy: 96.1, 
    lastUpdated: '2024-10-16',
    status: 'active'
  },
];

const modelLifecycle = [
  { phase: 'Development', status: 'complete' },
  { phase: 'Testing', status: 'complete' },
  { phase: 'Approval', status: 'complete' },
  { phase: 'Deployment', status: 'active' },
  { phase: 'Monitoring', status: 'active' },
];

const accuracyTrend = [
  { quarter: 'Q1 2023', predicted: 1.48, actual: 1.49 },
  { quarter: 'Q2 2023', predicted: 1.51, actual: 1.52 },
  { quarter: 'Q3 2023', predicted: 1.53, actual: 1.54 },
  { quarter: 'Q4 2023', predicted: 1.55, actual: 1.55 },
  { quarter: 'Q1 2024', predicted: 1.56, actual: 1.57 },
  { quarter: 'Q2 2024', predicted: 1.58, actual: 1.59 },
  { quarter: 'Q3 2024', predicted: 1.59, actual: 1.60 },
  { quarter: 'Q4 2024', predicted: 1.61, actual: 1.60 },
];

const modelInventory = [
  { name: 'GDP Forecasting - ARIMA', riskLevel: 'low', accuracy: 94.2, status: 'Active', lastValidation: '2024-10-01' },
  { name: 'GDP Forecasting - VAR', riskLevel: 'low', accuracy: 92.8, status: 'Active', lastValidation: '2024-09-28' },
  { name: 'GDP Forecasting - ML Ensemble', riskLevel: 'medium', accuracy: 96.1, status: 'Active', lastValidation: '2024-10-05' },
  { name: 'Inflation Prediction Model', riskLevel: 'medium', accuracy: 89.5, status: 'Review', lastValidation: '2024-09-15' },
];

const suggestedPrompts = [
  'Show me GDP forecasts',
  'Model accuracy & governance',
  'Run scenario: oil price +20%',
  'Compare forecasting models',
];

export default function ForecastingDashboard({ onNavigate, demoMode }: ForecastingDashboardProps) {
  const [oilPriceChange, setOilPriceChange] = useState([0]);
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    message: 'Welcome to the Forecasting Dashboard! I can show you GDP forecasts, model governance details, and run scenario analyses. What would you like to explore?',
    agent: 'Forecaster',
  }]);
  const [chatInput, setChatInput] = useState('');
  const [currentTab, setCurrentTab] = useState('forecast');
  const [highlightForecast, setHighlightForecast] = useState(false);
  const [highlightGovernance, setHighlightGovernance] = useState(false);
  const [highlightScenario, setHighlightScenario] = useState(false);

  const handlePromptSelect = (prompt: string) => {
    setChatInput(prompt);
    handleSend(prompt);
  };

  const handleSend = (inputText?: string) => {
    const text = inputText || chatInput;
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, {
      role: 'user',
      message: text,
    }]);
    setChatInput('');

    // Clear previous highlights
    setHighlightForecast(false);
    setHighlightGovernance(false);
    setHighlightScenario(false);

    // Process query and respond
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('forecast') && !lowerText.includes('scenario')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: "I've accessed our forecasting suite. Please refer to Diagram <GDP Forecasting Models>. We maintain multiple models: ARIMA time-series model, Vector Autoregression (VAR) for multi-sector forecasting, and machine learning ensemble models. Current forecasts show GDP growth of 3.8% for Q1 2025 and 4.1% for Q2 2025, with 95% confidence intervals.",
          agent: 'Forecaster',
        }]);
        setCurrentTab('forecast');
        setHighlightForecast(true);
        setTimeout(() => setHighlightForecast(false), 5000);
      } else if (lowerText.includes('accuracy') || lowerText.includes('governance') || lowerText.includes('model')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: "Please refer to Diagram <Model Performance & Governance>. Our GDP forecasting models achieved 94.2% accuracy (MAPE) over the last 8 quarters. All models follow our Model Governance Framework: quarterly validation, bias testing, version control, and approval workflows. Model risk is classified as Medium, with monthly monitoring by the Model Oversight Committee.",
          agent: 'Data Quality Checker',
        }]);
        setCurrentTab('governance');
        setHighlightGovernance(true);
        setTimeout(() => setHighlightGovernance(false), 5000);
      } else if (lowerText.includes('scenario') || lowerText.includes('oil')) {
        const oilMatch = text.match(/(\+|\-)?(\d+)%/);
        const oilChange = oilMatch ? parseInt(oilMatch[2]) * (oilMatch[1] === '-' ? -1 : 1) : 20;
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: `Running scenario simulation across all models. Please refer to Diagram <Scenario Impact Analysis>. With a ${oilChange}% oil price ${oilChange > 0 ? 'increase' : 'decrease'}, our ensemble model projects GDP growth would ${oilChange > 0 ? 'accelerate' : 'decelerate'} to ${(3.2 + oilChange * 0.085).toFixed(1)}%, with the oil & gas sector contributing an additional ${(oilChange * 0.025).toFixed(1)} percentage points.`,
          agent: 'Forecaster',
        }]);
        setCurrentTab('scenario');
        setOilPriceChange([oilChange]);
        setHighlightScenario(true);
        setTimeout(() => setHighlightScenario(false), 5000);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: "I can help you explore GDP forecasts, model governance, or run scenario analyses. Try asking about forecasts, model accuracy, or scenario simulations.",
          agent: 'Forecaster',
        }]);
      }
    }, 800);
  };

  const scenarioData = historicalAndForecast.map(item => ({
    ...item,
    scenarioForecast: item.forecast ? item.forecast * (1 + (oilPriceChange[0] * 0.002)) : null,
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('landing')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="text-slate-900">GDP Forecasting & Model Governance</div>
            <div className="text-slate-500 text-sm">Predictive Analytics Dashboard</div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="forecast">Forecasting</TabsTrigger>
                <TabsTrigger value="governance">Model Governance</TabsTrigger>
                <TabsTrigger value="scenario">Scenario Analysis</TabsTrigger>
              </TabsList>

              {/* Forecasting Tab */}
              <TabsContent value="forecast" className="space-y-6">
                {/* Forecast Chart */}
                <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
                  highlightForecast ? 'ring-4 ring-blue-500 shadow-xl' : ''
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">GDP Forecast (2025-2026)</h3>
                    {highlightForecast && (
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
                        AI Highlighted
                      </div>
                    )}
                  </div>
              <h3 className="text-slate-900 mb-4">GDP Forecast (2025-2026)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={historicalAndForecast}>
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[1.3, 1.9]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value: number) => `AED ${value.toFixed(2)}T`}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="none" 
                    fill="#c4b5fd" 
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="none" 
                    fill="#ffffff" 
                    fillOpacity={1}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    name="Historical GDP"
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    name="Forecast GDP"
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Model Cards */}
            <div className="grid grid-cols-3 gap-6">
              {models.map((model, idx) => (
                <Card key={idx} className="p-6 bg-white border-slate-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      {idx === 0 && <Activity className="w-5 h-5 text-white" />}
                      {idx === 1 && <Zap className="w-5 h-5 text-white" />}
                      {idx === 2 && <Brain className="w-5 h-5 text-white" />}
                    </div>
                    <Badge variant="secondary">{model.type}</Badge>
                  </div>

                  <div className="text-slate-900 mb-1">{model.name}</div>
                  <div className="text-slate-500 text-sm mb-4">Last updated: {model.lastUpdated}</div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-600 text-sm">Accuracy</div>
                      <div className="text-2xl text-slate-900">{model.accuracy}%</div>
                    </div>
                    <Badge variant="default" className="bg-emerald-500">
                      {model.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

              {/* Model Governance Tab */}
              <TabsContent value="governance" className="space-y-6">
                {/* Lifecycle Workflow */}
                <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
                  highlightGovernance ? 'ring-4 ring-blue-500 shadow-xl' : ''
                }`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-slate-900">Model Lifecycle</h3>
                    {highlightGovernance && (
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
                        AI Highlighted
                      </div>
                    )}
                  </div>
              <div className="flex items-center justify-between">
                {modelLifecycle.map((phase, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        phase.status === 'complete' 
                          ? 'bg-emerald-100 border-2 border-emerald-500' 
                          : phase.status === 'active'
                          ? 'bg-blue-100 border-2 border-blue-500'
                          : 'bg-slate-100 border-2 border-slate-300'
                      }`}>
                        {phase.status === 'complete' && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                        {phase.status === 'active' && <Activity className="w-6 h-6 text-blue-500 animate-pulse" />}
                        {phase.status === 'pending' && <Clock className="w-6 h-6 text-slate-400" />}
                      </div>
                      <div className="text-sm text-slate-700 mt-2">{phase.phase}</div>
                    </div>
                    {idx < modelLifecycle.length - 1 && (
                      <div className="w-24 h-0.5 bg-slate-200 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Accuracy Trend */}
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Predicted vs Actual Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={accuracyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="quarter" stroke="#64748b" />
                  <YAxis stroke="#64748b" domain={[1.4, 1.65]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                    formatter={(value: number) => `AED ${value.toFixed(2)}T`}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} name="Predicted" />
                  <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} name="Actual" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Model Inventory Table */}
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Model Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 text-slate-600 text-sm">Model Name</th>
                      <th className="text-left py-3 text-slate-600 text-sm">Risk Level</th>
                      <th className="text-left py-3 text-slate-600 text-sm">Accuracy</th>
                      <th className="text-left py-3 text-slate-600 text-sm">Status</th>
                      <th className="text-left py-3 text-slate-600 text-sm">Last Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelInventory.map((model, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-4 text-slate-900">{model.name}</td>
                        <td className="py-4">
                          <Badge 
                            variant={model.riskLevel === 'low' ? 'default' : 'secondary'}
                            className={
                              model.riskLevel === 'low' 
                                ? 'bg-emerald-500' 
                                : model.riskLevel === 'medium'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }
                          >
                            {model.riskLevel}
                          </Badge>
                        </td>
                        <td className="py-4 text-slate-900">{model.accuracy}%</td>
                        <td className="py-4">
                          <Badge variant={model.status === 'Active' ? 'default' : 'secondary'}>
                            {model.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-slate-600">{model.lastValidation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

              {/* Scenario Analysis Tab */}
              <TabsContent value="scenario" className="space-y-6">
                {/* Scenario Controls */}
                <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
                  highlightScenario ? 'ring-4 ring-blue-500 shadow-xl' : ''
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-900">Scenario Parameters</h3>
                    {highlightScenario && (
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
                        AI Highlighted
                      </div>
                    )}
                  </div>
              <h3 className="text-slate-900 mb-4">Scenario Parameters</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-slate-700">Oil Price Change</label>
                    <span className="text-slate-900">{oilPriceChange[0] > 0 ? '+' : ''}{oilPriceChange[0]}%</span>
                  </div>
                  <Slider 
                    value={oilPriceChange} 
                    onValueChange={setOilPriceChange}
                    min={-30}
                    max={30}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Comparison View */}
            <div className="grid grid-cols-2 gap-6">
              {/* Baseline */}
              <Card className="p-6 bg-white border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <h3 className="text-slate-900">Baseline Forecast</h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historicalAndForecast}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[1.3, 1.9]} />
                    <Tooltip formatter={(value: number) => `AED ${value.toFixed(2)}T`} />
                    <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="forecast" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <div className="text-slate-600 text-sm mb-1">2026 Forecast</div>
                  <div className="text-2xl text-slate-900">AED 1.72T</div>
                </div>
              </Card>

              {/* Scenario */}
              <Card className="p-6 bg-white border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <h3 className="text-slate-900">Scenario Forecast</h3>
                  <Badge variant="secondary" className="ml-auto">Oil {oilPriceChange[0] > 0 ? '+' : ''}{oilPriceChange[0]}%</Badge>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={scenarioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" domain={[1.3, 1.9]} />
                    <Tooltip formatter={(value: number) => `AED ${value.toFixed(2)}T`} />
                    <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} />
                    <Line type="monotone" dataKey="scenarioForecast" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <div className="text-slate-600 text-sm mb-1">2026 Scenario</div>
                  <div className="text-2xl text-slate-900">
                    AED {(1.72 * (1 + (oilPriceChange[0] * 0.002))).toFixed(2)}T
                  </div>
                  <div className="text-orange-600 text-sm mt-1">
                    {oilPriceChange[0] > 0 ? '+' : ''}{((oilPriceChange[0] * 0.002) * 100).toFixed(1)}% vs baseline
                  </div>
                </div>
              </Card>
            </div>

            {/* Sectoral Impact */}
            <Card className="p-6 bg-white border-slate-200">
              <h3 className="text-slate-900 mb-4">Sectoral Impact Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Oil & Gas</span>
                    <span className="text-orange-600">High Impact</span>
                  </div>
                  <div className="text-2xl text-slate-900">
                    {oilPriceChange[0] > 0 ? '+' : ''}{(oilPriceChange[0] * 0.8).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Manufacturing</span>
                    <span className="text-amber-600">Medium Impact</span>
                  </div>
                  <div className="text-2xl text-slate-900">
                    {oilPriceChange[0] > 0 ? '+' : ''}{(oilPriceChange[0] * 0.3).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Services</span>
                    <span className="text-emerald-600">Low Impact</span>
                  </div>
                  <div className="text-2xl text-slate-900">
                    {oilPriceChange[0] > 0 ? '+' : ''}{(oilPriceChange[0] * 0.1).toFixed(1)}%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-700">Real Estate</span>
                    <span className="text-emerald-600">Low Impact</span>
                  </div>
                  <div className="text-2xl text-slate-900">
                    {oilPriceChange[0] > 0 ? '+' : ''}{(oilPriceChange[0] * 0.15).toFixed(1)}%
                  </div>
                </div>
              </div>
            </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* AI Chat Panel - 30% */}
          <div className="w-[380px]">
            <AIAgent
              messages={messages}
              input={chatInput}
              onInputChange={setChatInput}
              onSend={() => handleSend()}
            >
              <SuggestedPrompts prompts={suggestedPrompts} onSelect={handlePromptSelect} />
            </AIAgent>
          </div>
        </div>
      </div>
    </div>
  );
}
