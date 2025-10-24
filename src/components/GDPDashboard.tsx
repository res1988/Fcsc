import { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Users, BarChart3, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import GDPTreemap from './GDPTreemap';
import SectorGrowthChart from './SectorGrowthChart';
import SectorRankingChart from './SectorRankingChart';
import RetailWholesaleDetail from './RetailWholesaleDetail';
import AIAgent from './AIAgent';
import ProgressiveReport from './ProgressiveReport';

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

const demoConversation = [
  {
    user: 'initial',
    userMessage: '',
    agent: 'Dashboard Manager',
    assistantMessage: 'Sure, let me show you the comprehensive overview of UAE GDP.',
  },
  {
    user: 'Show me how different sectors are contributing to our GDP.',
    userMessage: 'Show me how different sectors are contributing to our GDP.',
    agent: 'Diagram Generator',
    assistantMessage: 'Please refer to Diagram <Sectoral Contribution Breakdown>. This shows the breakdown across all key sectors including manufacturing, services, oil & gas, construction, real estate, and others, with their respective percentage contributions and absolute values. A focus on retail and wholesale is highlighted.',
    highlightTreemap: true,
  },
  {
    user: 'I want to see the year-over-year growth for each sector - which sectors are accelerating and which are slowing down?',
    userMessage: 'I want to see the year-over-year growth for each sector - which sectors are accelerating and which are slowing down?',
    agent: 'Diagram Generator',
    assistantMessage: "I've generated a sectoral growth comparison chart. Please refer to the highlighted diagram showing growth rates for manufacturing, services, and other key sectors, comparing current year performance with previous years.",
    highlightGrowthChart: true,
  },
  {
    user: 'Focus on Retail and Wholesale - show me the detailed breakdown of the manufacturing sector\'s contribution and its growth trend over the last 5 years.',
    userMessage: 'Focus on Retail and Wholesale - show me the detailed breakdown of the Retail and Wholesale sector\'s contribution and its growth trend over the last 5 years.',
    agent: 'Data Searcher',
    assistantMessage: "Please refer to Diagram <Retail / Wholesale>. This shows Retail / Wholesale contribution to GDP over the past 5 years, with absolute values, growth rates, and sub-sector breakdown where available.",
    showRetailDetail: true,
    highlightRetailDetail: true,
  },
  {
    user: 'Which sector showed the strongest growth in the last fiscal year?',
    userMessage: 'Which sector showed the strongest growth in the last fiscal year?',
    agent: 'Comparative Benchmarker',
    assistantMessage: "I've analyzed all sectors. Please refer to the highlighted diagram. The Real Estate sector showed the strongest growth at 6.2%, followed by Manufacturing at 5.1%. Here's a detailed comparison across all sectors.",
    showRankingChart: true,
    highlightRankingChart: true,
  },
  {
    user: 'Compare our services sector growth with the previous 3 years. Is there a trend?',
    userMessage: 'Compare our services sector growth with the previous 3 years. Is there a trend?',
    agent: 'Comparative Benchmarker',
    assistantMessage: "I've generated a services sector trend analysis. Please refer to the highlighted diagram showing 4-year comparative performance. The services sector has shown consistent growth with growth rates of 3.1%, 3.3%, 3.5%, and 4.2% respectively, indicating steady acceleration.",
    highlightGrowthChart: true,
  },
  {
    user: 'Generate me a report analyzing why Retail / Wholesale contribution to GDP changed in 2024. Include year-over-year comparisons.',
    userMessage: 'Generate me a report analyzing why Retail / Wholesale contribution to GDP changed in 2024. Include year-over-year comparisons.',
    agent: 'Report Generator',
    assistantMessage: "Sure, a comprehensive analytical report is under generation. I'm analyzing Retail / Wholesale sector performance, comparing it with previous years, and identifying key factors influencing the change.",
    showReport: true,
  },
];

export default function GDPDashboard({ onNavigate, demoMode }: GDPDashboardProps) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationStep, setConversationStep] = useState(0);
  const [highlightTreemap, setHighlightTreemap] = useState(false);
  const [highlightGrowthChart, setHighlightGrowthChart] = useState(false);
  const [highlightRetailDetail, setHighlightRetailDetail] = useState(false);
  const [highlightRankingChart, setHighlightRankingChart] = useState(false);
  const [showRetailDetail, setShowRetailDetail] = useState(false);
  const [showRankingChart, setShowRankingChart] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Initialize with AI agent intro in demo mode
  useEffect(() => {
    if (demoMode && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([{
          role: 'assistant',
          message: demoConversation[0].assistantMessage,
          agent: demoConversation[0].agent,
        }]);
        setConversationStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [demoMode]);

  // Demo mode conversation flow
  useEffect(() => {
    if (demoMode && conversationStep > 0 && conversationStep < demoConversation.length) {
      const timer = setTimeout(() => {
        const step = demoConversation[conversationStep];
        
        // Clear previous highlights
        setHighlightTreemap(false);
        setHighlightGrowthChart(false);
        setHighlightRetailDetail(false);
        setHighlightRankingChart(false);

        // Add user message
        setMessages(prev => [...prev, {
          role: 'user',
          message: step.userMessage,
        }]);

        // Add assistant response after delay
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            message: step.assistantMessage,
            agent: step.agent,
          }]);

          // Apply highlights and show new diagrams
          if (step.highlightTreemap) setHighlightTreemap(true);
          if (step.highlightGrowthChart) setHighlightGrowthChart(true);
          if (step.highlightRetailDetail) setHighlightRetailDetail(true);
          if (step.highlightRankingChart) setHighlightRankingChart(true);
          if (step.showRetailDetail) setShowRetailDetail(true);
          if (step.showRankingChart) setShowRankingChart(true);
          if (step.showReport) setShowReport(true);

          // Clear highlights after 5 seconds
          setTimeout(() => {
            setHighlightTreemap(false);
            setHighlightGrowthChart(false);
            setHighlightRetailDetail(false);
            setHighlightRankingChart(false);
          }, 5000);

          setConversationStep(prev => prev + 1);
        }, 2000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [demoMode, conversationStep]);

  const handleSend = () => {
    if (!chatInput.trim() || demoMode) return;
    
    setMessages(prev => [...prev, {
      role: 'user',
      message: chatInput,
    }]);
    setChatInput('');

    // Add mock response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        message: "I've analyzed your request. Here's the information you requested.",
        agent: 'Data Searcher',
      }]);
    }, 1000);
  };

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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-[#A08060] rounded-xl flex items-center justify-center elevation-2">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-foreground">GDP Analytics Dashboard</div>
              <div className="text-muted-foreground text-sm">United Arab Emirates</div>
            </div>
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
                  <div className="text-white/80 text-sm">Total GDP</div>
                  <DollarSign className="w-5 h-5 text-white/70" />
                </div>
                <div className="text-3xl mb-1">AED 1.6T</div>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +3.2% YoY
                </div>
              </Card>

              <Card className="p-6 acrylic elevation-2 border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-muted-foreground text-sm">GDP Growth Rate</div>
                  <TrendingUp className="w-5 h-5 text-[#6B9080]" />
                </div>
                <div className="text-3xl text-foreground mb-1">3.2%</div>
                <div className="flex items-center gap-1 text-[#6B9080] text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +0.5% from 2023
                </div>
              </Card>

              <Card className="p-6 acrylic elevation-2 border-border/50">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-muted-foreground text-sm">GDP per Capita</div>
                  <Users className="w-5 h-5 text-[#B5838D]" />
                </div>
                <div className="text-3xl text-foreground mb-1">AED 165K</div>
                <div className="flex items-center gap-1 text-[#6B9080] text-sm">
                  <TrendingUp className="w-4 h-4" />
                  +2.8% YoY
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
            <GDPTreemap highlighted={highlightTreemap} />

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
              onSend={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
