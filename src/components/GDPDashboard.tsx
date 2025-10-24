import { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Users, BarChart3, TrendingUp, Database } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import GDPTreemap from './GDPTreemap';
import SectorGrowthChart from './SectorGrowthChart';
import SectorRankingChart from './SectorRankingChart';
import RetailWholesaleDetail from './RetailWholesaleDetail';
import AIAgent from './AIAgent';
import ProgressiveReport from './ProgressiveReport';
import SuggestedPrompts from './SuggestedPrompts';
import { getGDPSectoralBreakdown, getGDPTrajectory, validateGDPData, type GDPDataOutput } from '../services/gdpDataService';

interface GDPDashboardProps {
  onNavigate: (screen: 'landing' | 'gdp' | 'gsbpm' | 'forecasting') => void;
  demoMode?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  message: string;
  agent?: string;
  isGenerating?: boolean;
}

const gdpHistoricalData = [
  { year: '2015', gdp: 1.35 },
  { year: '2016', gdp: 1.37 },
  { year: '2017', gdp: 1.40 },
  { year: '2018', gdp: 1.43 },
  { year: '2019', gdp: 1.45 },
  { year: '2020', gdp: 1.41 },
  { year: '2021', gdp: 1.48 },
  { year: '2022', gdp: 1.52 },
  { year: '2023', gdp: 1.55 },
  { year: '2024', gdp: 1.60 },
];

const suggestedPrompts = [
  'Show me sectoral contributions',
  'Year-over-year growth comparison',
  'Retail & Wholesale details',
  'Which sector grew the most?',
  'Services sector trends',
  'Generate sector analysis report',
];

export default function GDPDashboard({ onNavigate, demoMode }: GDPDashboardProps) {
  const [gdpData, setGdpData] = useState<GDPDataOutput | null>(null);
  const [trajectoryData, setTrajectoryData] = useState<any[]>([]);
  const [dataValidation, setDataValidation] = useState<any>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    message: 'Welcome to the GDP Analytics Dashboard! I can help you explore sectoral contributions, growth trends, and generate detailed reports. Data loaded from FCSA schema v3.4.0. Try asking me a question or click on a suggested prompt below.',
    agent: 'Dashboard Manager',
  }]);
  const [highlightTreemap, setHighlightTreemap] = useState(false);
  const [highlightGrowthChart, setHighlightGrowthChart] = useState(false);
  const [highlightRetailDetail, setHighlightRetailDetail] = useState(false);
  const [highlightRankingChart, setHighlightRankingChart] = useState(false);
  const [showRetailDetail, setShowRetailDetail] = useState(false);
  const [showRankingChart, setShowRankingChart] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Load GDP data on mount
  useEffect(() => {
    const data = getGDPSectoralBreakdown();
    const trajectory = getGDPTrajectory();
    const validation = validateGDPData(data);
    
    setGdpData(data);
    setTrajectoryData(trajectory);
    setDataValidation(validation);
    
    console.log('GDP Data loaded:', data);
    console.log('Data validation:', validation);
  }, []);

  const handlePromptSelect = (prompt: string) => {
    setChatInput(prompt);
    handleSend(prompt);
  };

  const handleSend = (inputText?: string) => {
    const text = inputText || chatInput;
    if (!text.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      role: 'user',
      message: text,
    }]);
    setChatInput('');

    // Clear previous highlights
    setHighlightTreemap(false);
    setHighlightGrowthChart(false);
    setHighlightRetailDetail(false);
    setHighlightRankingChart(false);

    // Process query and respond
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      if (!gdpData) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: 'Loading GDP data... Please wait.',
          agent: 'Data Searcher',
        }]);
        return;
      }

      if (lowerText.includes('validat') || lowerText.includes('quality')) {
        const validMsg = dataValidation?.valid 
          ? `✅ Data validation passed! All ${gdpData.sectors.length} sectors loaded successfully. ${dataValidation.warnings.length > 0 ? `Warnings: ${dataValidation.warnings.join('; ')}` : ''}` 
          : `⚠️ Data validation issues: ${dataValidation?.errors.join('; ')}`;
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: `Data Quality Report:\n\n${validMsg}\n\nData Source: ${gdpData.metadata.dataSource}\nPrice Type: ${gdpData.metadata.priceType}\nTotal GDP: AED ${(gdpData.metadata.totalGDP / 1000).toFixed(2)}B\nDiversification Index: ${gdpData.insights.diversificationIndex} (${gdpData.insights.topSectorDominance} dominance)`,
          agent: 'Data Quality Checker',
        }]);
      } else if (lowerText.includes('sector') && (lowerText.includes('contribution') || lowerText.includes('breakdown'))) {
        const topSector = gdpData.sectors[0];
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: `Please refer to Diagram <Sectoral Contribution Breakdown>. Analysis of ${gdpData.sectors.length} sectors from ${gdpData.metadata.dataSource}. Top contributor: ${topSector.name} (${topSector.percentage}%). Oil sector: ${gdpData.aggregates.oilSector.percentage}%, Non-oil: ${gdpData.aggregates.nonOilSector.percentage}%.`,
          agent: 'Diagram Generator',
        }]);
        setHighlightTreemap(true);
        setTimeout(() => setHighlightTreemap(false), 5000);
      } else if (lowerText.includes('growth') && (lowerText.includes('year') || lowerText.includes('comparison'))) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: "I've generated a sectoral growth comparison chart. Please refer to the highlighted diagram showing growth rates for manufacturing, services, and other key sectors, comparing current year performance with previous years.",
          agent: 'Diagram Generator',
        }]);
        setHighlightGrowthChart(true);
        setTimeout(() => setHighlightGrowthChart(false), 5000);
      } else if (lowerText.includes('retail') || lowerText.includes('wholesale')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: "Please refer to Diagram <Retail / Wholesale>. This shows Retail / Wholesale contribution to GDP over the past 5 years, with absolute values, growth rates, and sub-sector breakdown.",
          agent: 'Data Searcher',
        }]);
        setShowRetailDetail(true);
        setHighlightRetailDetail(true);
        setTimeout(() => setHighlightRetailDetail(false), 5000);
      } else if (lowerText.includes('strongest') || lowerText.includes('most') || lowerText.includes('ranking')) {
        const fastest = gdpData.insights.fastestGrowingSector;
        const topThree = gdpData.sectors.slice(0, 3).map(s => `${s.name}: ${s.yoyGrowth}%`).join(', ');
        
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: `I've analyzed all ${gdpData.sectors.length} sectors. Fastest growing: ${fastest.name} at ${fastest.growth}% YoY. Top 3 by size: ${topThree}. Please refer to the highlighted ranking diagram.`,
          agent: 'Comparative Benchmarker',
        }]);
        setShowRankingChart(true);
        setHighlightRankingChart(true);
        setTimeout(() => setHighlightRankingChart(false), 5000);
      } else if (lowerText.includes('services') && lowerText.includes('trend')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: "I've generated a services sector trend analysis. The services sector has shown consistent growth with growth rates of 3.1%, 3.3%, 3.5%, and 4.2% respectively, indicating steady acceleration.",
          agent: 'Comparative Benchmarker',
        }]);
        setHighlightGrowthChart(true);
        setTimeout(() => setHighlightGrowthChart(false), 5000);
      } else if (lowerText.includes('report') || lowerText.includes('analysis')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: `Sure, generating comprehensive analytical report. Source: ${gdpData.metadata.dataSource}. Analyzing ${gdpData.sectors.length} sectors with diversification index of ${gdpData.insights.diversificationIndex}. Total GDP: AED ${(gdpData.metadata.totalGDP / 1000).toFixed(2)}B.`,
          agent: 'Report Generator',
        }]);
        setShowReport(true);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          message: `I've analyzed your request. You can explore GDP data by asking about sectoral contributions, growth comparisons, specific sectors like Retail & Wholesale, data quality validation, or request detailed reports. Current dataset: ${gdpData.metadata.year} vs ${gdpData.metadata.comparisonYear}.`,
          agent: 'Data Searcher',
        }]);
      }
    }, 800);
  };

  if (!gdpData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 acrylic elevation-2">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-primary animate-pulse" />
            <div>
              <h3 className="text-foreground">Loading GDP Data</h3>
              <p className="text-muted-foreground text-sm">Processing FCSA schema v3.4.0...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="acrylic-strong elevation-1 border-b border-border/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('landing')}
            className="hover:bg-accent/50"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-[#A08060] rounded-xl flex items-center justify-center elevation-2">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-foreground">GDP Analytics Dashboard</div>
              <div className="text-muted-foreground text-sm">United Arab Emirates • {gdpData.metadata.year}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-accent/30 border-primary/20">
              <Database className="w-3 h-3 mr-1" />
              {gdpData.sectors.length} Sectors
            </Badge>
            <Badge variant={dataValidation?.valid ? "default" : "destructive"} className="bg-primary/10 text-primary border-primary/20">
              {dataValidation?.valid ? '✓' : '⚠'} Schema v{gdpData.metadata.version}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Main Content Area - 70% */}
          <div className="flex-1">
            {/* KPI Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="p-6 bg-gradient-to-br from-primary to-[#A08060] text-white border-0 elevation-2">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-white/80 text-sm">Total GDP ({gdpData.metadata.year})</div>
                  <DollarSign className="w-5 h-5 text-white/70" />
                </div>
                <div className="text-3xl mb-1">AED {(gdpData.metadata.totalGDP / 1000).toFixed(2)}T</div>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {((gdpData.metadata.totalGDP / (gdpData.metadata.totalGDP / 1.032) - 1) * 100).toFixed(1)}% YoY
                </div>
              </Card>

              <Card className="p-6 acrylic elevation-2 border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-muted-foreground text-sm">Non-Oil GDP</div>
                  <TrendingUp className="w-5 h-5 text-[#6B9080]" />
                </div>
                <div className="text-3xl text-foreground mb-1">{gdpData.aggregates.nonOilSector.percentage.toFixed(1)}%</div>
                <div className="flex items-center gap-1 text-[#6B9080] text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {gdpData.aggregates.nonOilSector.yoyGrowth.toFixed(1)}% growth
                </div>
              </Card>

              <Card className="p-6 acrylic elevation-2 border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-muted-foreground text-sm">Diversification</div>
                  <Users className="w-5 h-5 text-[#B5838D]" />
                </div>
                <div className="text-3xl text-foreground mb-1">{gdpData.insights.diversificationIndex}</div>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  {gdpData.insights.topSectorDominance} dominance
                </div>
              </Card>
            </div>

            {/* GDP Trajectory Chart */}
            <Card className="p-6 acrylic elevation-2 border-border/50 mb-6">
              <h3 className="text-foreground mb-4">GDP Trajectory (2015-2024)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={gdpHistoricalData}>
                  <defs>
                    <linearGradient id="gdpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B7355" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B7355" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 115, 85, 0.15)" />
                  <XAxis dataKey="year" stroke="#8B8378" />
                  <YAxis stroke="#8B8378" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(254, 253, 251, 0.95)', border: '1px solid rgba(139, 115, 85, 0.2)', borderRadius: '12px', backdropFilter: 'blur(20px)' }}
                    formatter={(value: number) => `AED ${value.toFixed(2)}T`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gdp" 
                    stroke="#8B7355" 
                    strokeWidth={3}
                    fill="url(#gdpGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Treemap */}
            <GDPTreemap highlighted={highlightTreemap} gdpData={gdpData} />

            {/* Sector Growth Comparison */}
            <SectorGrowthChart highlighted={highlightGrowthChart} />

            {/* Retail Detail (conditional) */}
            {showRetailDetail && (
              <div className="mb-6">
                <RetailWholesaleDetail highlighted={highlightRetailDetail} />
              </div>
            )}

            {/* Ranking Chart (conditional) */}
            {showRankingChart && (
              <div className="mb-6">
                <SectorRankingChart highlighted={highlightRankingChart} />
              </div>
            )}

            {/* Report (conditional) */}
            {showReport && (
              <div className="mb-6">
                <ProgressiveReport 
                  title="Retail & Wholesale Sector Analysis Report"
                  type="retail-analysis"
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
