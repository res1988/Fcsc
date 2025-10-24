import { useState } from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import AIAgent from './AIAgent';
import ProgressiveReport from './ProgressiveReport';
import SuggestedPrompts from './SuggestedPrompts';

interface GSBPMFlowProps {
  onNavigate: (screen: 'landing' | 'gdp' | 'gsbpm' | 'forecasting') => void;
  demoMode?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  message: string;
  agent?: string;
}

const gsbpmPhases = [
  { id: 1, name: 'Specify Needs', icon: '📋', status: 'complete' },
  { id: 2, name: 'Design', icon: '✏️', status: 'complete' },
  { id: 3, name: 'Build', icon: '🔨', status: 'complete' },
  { id: 4, name: 'Collect', icon: '📊', status: 'active' },
  { id: 5, name: 'Process', icon: '⚙️', status: 'pending' },
  { id: 6, name: 'Analyse', icon: '🔍', status: 'pending' },
  { id: 7, name: 'Disseminate', icon: '📢', status: 'pending' },
  { id: 8, name: 'Evaluate', icon: '✅', status: 'pending' },
];

const surveys = [
  { 
    name: 'Quarterly Economic Survey', 
    coverage: 85, 
    responseRate: 78, 
    entities: '1,250 businesses',
    status: 'active'
  },
  { 
    name: 'Monthly Retail Trade Survey', 
    coverage: 92, 
    responseRate: 82, 
    entities: '850 retailers',
    status: 'active'
  },
  { 
    name: 'Construction Survey', 
    coverage: 76, 
    responseRate: 71, 
    entities: '420 contractors',
    status: 'review'
  },
  { 
    name: 'Services Survey', 
    coverage: 88, 
    responseRate: 85, 
    entities: '2,100 service providers',
    status: 'active'
  },
];

const responseRateData = [
  { month: 'Jan', economic: 75, retail: 80, construction: 68, services: 83 },
  { month: 'Feb', economic: 76, retail: 81, construction: 70, services: 84 },
  { month: 'Mar', economic: 78, retail: 82, construction: 71, services: 85 },
  { month: 'Apr', economic: 77, retail: 83, construction: 72, services: 86 },
  { month: 'May', economic: 79, retail: 81, construction: 73, services: 84 },
  { month: 'Jun', economic: 78, retail: 82, construction: 71, services: 85 },
];

const qualityIndicators = [
  { name: 'Data Completeness', score: 95, status: 'good' },
  { name: 'Timeliness', score: 88, status: 'good' },
  { name: 'Accuracy', score: 92, status: 'good' },
  { name: 'Consistency', score: 74, status: 'warning' },
  { name: 'Coherence', score: 85, status: 'good' },
  { name: 'Relevance', score: 90, status: 'good' },
];

const suggestedPrompts = [
  'How do we collect GDP data?',
  'Show me survey quality metrics',
  'GSBPM process details',
  'Generate methodology report',
];

export default function GSBPMFlow({ onNavigate, demoMode }: GSBPMFlowProps) {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    message: 'Welcome to the GSBPM Workflow & Survey Quality dashboard! I can explain our data collection process, survey quality metrics, and generate methodology reports. What would you like to know?',
    agent: 'Data Quality Checker',
  }]);
  const [chatInput, setChatInput] = useState('');
  const [highlightGSBPM, setHighlightGSBPM] = useState(false);
  const [highlightQuality, setHighlightQuality] = useState(false);
  const [showReport, setShowReport] = useState(false);

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
    setHighlightGSBPM(false);
    setHighlightQuality(false);

    // Process query and respond
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('collect') || lowerText.includes('gsbpm') || lowerText.includes('process')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: 'FCSC follows the Generic Statistical Business Process Model (GSBPM) across all our surveys. Please refer to the highlighted diagram showing our main GDP surveys: Quarterly Economic Survey, Monthly Retail Trade Survey, Construction Survey, and Services Survey.',
          agent: 'Data Quality Checker',
        }]);
        setHighlightGSBPM(true);
        setTimeout(() => setHighlightGSBPM(false), 5000);
      } else if (lowerText.includes('quality') || lowerText.includes('coverage') || lowerText.includes('response')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: 'Please refer to Diagram <GDP Survey Quality Metrics>. Our Quarterly Economic Survey covers 1,250 establishments (85% of GDP), with a 78% response rate. The Retail Trade Survey achieved 82% response rate last quarter, covering 92% of retail activity. All surveys meet international quality standards.',
          agent: 'Data Quality Checker',
        }]);
        setHighlightQuality(true);
        setTimeout(() => setHighlightQuality(false), 5000);
      } else if (lowerText.includes('report') || lowerText.includes('methodology')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: 'Generating a comprehensive report covering our GDP survey portfolio, GSBPM compliance, data quality metrics, and alignment with international standards.',
          agent: 'Report Generator',
        }]);
        setShowReport(true);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: 'I can help you understand our GSBPM process, survey quality metrics, or generate methodology reports. Try asking about data collection, quality metrics, or request a report.',
          agent: 'Data Quality Checker',
        }]);
      }
    }, 800);
  };

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
            <div className="text-slate-900">GSBPM Workflow & Survey Quality</div>
            <div className="text-slate-500 text-sm">Generic Statistical Business Process Model</div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* GSBPM Process Flow */}
            <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
              highlightGSBPM ? 'ring-4 ring-blue-500 shadow-xl' : ''
            }`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-900">GSBPM Process Phases</h3>
                {highlightGSBPM && (
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
                    AI Highlighted
                  </div>
                )}
              </div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-slate-200" />
            
            {/* Phases */}
            <div className="grid grid-cols-8 gap-2 relative">
              {gsbpmPhases.map((phase, idx) => (
                <div key={phase.id} className="flex flex-col items-center">
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl mb-3 transition-all ${
                    phase.status === 'complete' 
                      ? 'bg-emerald-100 border-2 border-emerald-500' 
                      : phase.status === 'active'
                      ? 'bg-blue-100 border-2 border-blue-500 shadow-lg'
                      : 'bg-slate-100 border-2 border-slate-300'
                  }`}>
                    {phase.icon}
                  </div>
                  <div className="text-center text-xs text-slate-700">{phase.name}</div>
                  {phase.status === 'complete' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Survey Cards */}
        <div className="grid grid-cols-2 gap-6">
          {surveys.map((survey, idx) => (
            <Card key={idx} className="p-6 bg-white border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-slate-900 mb-1">{survey.name}</div>
                  <div className="text-slate-500 text-sm">{survey.entities}</div>
                </div>
                <Badge variant={survey.status === 'active' ? 'default' : 'secondary'}>
                  {survey.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Coverage</span>
                    <span className="text-slate-900">{survey.coverage}%</span>
                  </div>
                  <Progress value={survey.coverage} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600">Response Rate</span>
                    <span className="text-slate-900">{survey.responseRate}%</span>
                  </div>
                  <Progress value={survey.responseRate} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Survey Quality Dashboard */}
        <div className={`grid grid-cols-3 gap-6 transition-all duration-500 ${
          highlightQuality ? 'ring-4 ring-blue-500 rounded-lg p-2' : ''
        }`}>
          {/* Metric Cards */}
          <Card className="p-6 bg-white border-slate-200">
            <div className="text-slate-600 text-sm mb-2">Average Sample Size</div>
            <div className="text-3xl text-slate-900 mb-1">1,155</div>
            <div className="text-emerald-600 text-sm">entities per survey</div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="text-slate-600 text-sm mb-2">Average Response Rate</div>
            <div className="text-3xl text-slate-900 mb-1">79%</div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm">
              <TrendingUp className="w-4 h-4" />
              +3% from last quarter
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-200">
            <div className="text-slate-600 text-sm mb-2">Overall Quality Score</div>
            <div className="text-3xl text-slate-900 mb-1">87/100</div>
            <div className="text-slate-600 text-sm">Good quality threshold</div>
          </Card>
        </div>

        {/* Response Rates Over Time */}
        <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
          highlightQuality ? 'ring-4 ring-blue-500 shadow-xl' : ''
        }`}>
          <h3 className="text-slate-900 mb-4">Response Rates Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={responseRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[60, 90]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value: number) => `${value}%`}
              />
              <Legend />
              <Line type="monotone" dataKey="economic" stroke="#2563eb" strokeWidth={2} name="Economic Survey" />
              <Line type="monotone" dataKey="retail" stroke="#10b981" strokeWidth={2} name="Retail Trade" />
              <Line type="monotone" dataKey="construction" stroke="#f59e0b" strokeWidth={2} name="Construction" />
              <Line type="monotone" dataKey="services" stroke="#8b5cf6" strokeWidth={2} name="Services" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Quality Indicators Grid */}
        <Card className="p-6 bg-white border-slate-200">
          <h3 className="text-slate-900 mb-4">Quality Indicators</h3>
          <div className="grid grid-cols-3 gap-4">
            {qualityIndicators.map((indicator, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {indicator.status === 'good' ? (
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  ) : indicator.status === 'warning' ? (
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                  )}
                  <span className="text-slate-700 text-sm">{indicator.name}</span>
                </div>
                <span className="text-slate-900">{indicator.score}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Report (conditional) */}
        {showReport && (
          <div className="mb-6">
            <ProgressiveReport 
              title="GDP Survey Framework Methodology Report"
              type="methodology"
            />
          </div>
        )}
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
