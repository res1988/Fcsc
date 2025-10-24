import { useState, useEffect } from 'react';
import { Search, TrendingUp, Users, Home, Briefcase, DollarSign, Globe, Building2, BarChart3, Mic } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';

interface LandingPageProps {
  onNavigate: (screen: 'landing' | 'gdp' | 'gsbpm' | 'forecasting') => void;
  demoMode?: boolean;
}

const categories = [
  { id: 'gdp', name: 'GDP', icon: DollarSign, color: 'from-[#8B7355] to-[#A08060]', screen: 'gdp' as const },
  { id: 'trade', name: 'International Trade', icon: Globe, color: 'from-[#6B9080] to-[#7FA593]', screen: 'landing' as const },
  { id: 'population', name: 'Population', icon: Users, color: 'from-[#B5838D] to-[#C896A0]', screen: 'landing' as const },
  { id: 'housing', name: 'Housing', icon: Home, color: 'from-[#D4A574] to-[#E0B687]', screen: 'landing' as const },
  { id: 'labor', name: 'Labor Market', icon: Briefcase, color: 'from-[#A0937C] to-[#B3A690]', screen: 'landing' as const },
  { id: 'construction', name: 'Construction', icon: Building2, color: 'from-[#8B8378] to-[#9E978B]', screen: 'landing' as const },
  { id: 'gsbpm', name: 'GSBPM Process', icon: BarChart3, color: 'from-[#9B8A76] to-[#AE9D89]', screen: 'gsbpm' as const },
  { id: 'forecasting', name: 'Forecasting', icon: TrendingUp, color: 'from-[#C19A7B] to-[#D4AD8E]', screen: 'forecasting' as const },
];

export default function LandingPage({ onNavigate, demoMode }: LandingPageProps) {
  const [pulseScale, setPulseScale] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [voiceActive, setVoiceActive] = useState(false);
  const [showDemoText, setShowDemoText] = useState(false);
  const [typedText, setTypedText] = useState('');

  const demoQueryText = "I want to review the latest GDP information for the UAE.";

  useEffect(() => {
    if (!demoMode) {
      const interval = setInterval(() => {
        setPulseScale(prev => prev === 1 ? 1.2 : 1);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [demoMode]);

  useEffect(() => {
    if (demoMode && !showDemoText) {
      // Start voice animation after 1 second
      const voiceTimer = setTimeout(() => {
        setVoiceActive(true);
        const interval = setInterval(() => {
          setPulseScale(prev => prev === 1 ? 1.3 : 1);
        }, 400);

        // Stop pulse and show text after 3 seconds
        setTimeout(() => {
          clearInterval(interval);
          setVoiceActive(false);
          setPulseScale(1);
          setShowDemoText(true);
        }, 3000);
      }, 1000);

      return () => clearTimeout(voiceTimer);
    }
  }, [demoMode, showDemoText]);

  useEffect(() => {
    if (showDemoText && typedText.length < demoQueryText.length) {
      const timer = setTimeout(() => {
        setTypedText(demoQueryText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else if (showDemoText && typedText === demoQueryText) {
      // Navigate to GDP dashboard after typing completes
      const navTimer = setTimeout(() => {
        onNavigate('gdp');
      }, 1500);
      return () => clearTimeout(navTimer);
    }
  }, [showDemoText, typedText, onNavigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF8F5] via-[#F5F2ED] to-[#E8E3D9]">
      {/* Header */}
      <header className="acrylic-strong elevation-1 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-[#A08060] rounded-xl flex items-center justify-center elevation-2">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-foreground">Federal Competitiveness and Statistics Centre</div>
              <div className="text-muted-foreground text-sm">FCSC Data Platform</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Voice Search Interface */}
        <div className="mb-16 text-center">
          <h1 className="text-foreground mb-8">Explore UAE Statistics</h1>
          
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Animated Pulse Rings */}
            {!showDemoText && (
              <>
                <div 
                  className={`absolute w-32 h-32 rounded-full ${voiceActive ? 'bg-primary' : 'bg-[#A0937C]'} opacity-20`}
                  style={{
                    transform: `scale(${pulseScale})`,
                    transition: voiceActive ? 'transform 0.4s ease-in-out' : 'transform 1.5s ease-in-out'
                  }}
                />
                <div 
                  className={`absolute w-24 h-24 rounded-full ${voiceActive ? 'bg-primary' : 'bg-[#8B7355]'} opacity-30`}
                  style={{
                    transform: `scale(${pulseScale === 1 ? 1.2 : 1})`,
                    transition: voiceActive ? 'transform 0.4s ease-in-out' : 'transform 1.5s ease-in-out'
                  }}
                />
              </>
            )}
            
            {/* Voice Search Button */}
            <button className={`relative w-20 h-20 bg-gradient-to-br from-primary to-[#A08060] rounded-full elevation-3 hover:elevation-4 transition-all duration-200 hover:scale-105 flex items-center justify-center group ${voiceActive ? 'animate-pulse' : ''}`}>
              {voiceActive ? (
                <Mic className="w-10 h-10 text-white" />
              ) : (
                <Search className="w-10 h-10 text-white" />
              )}
            </button>
          </div>

          {!showDemoText ? (
            <>
              <p className="text-muted-foreground mb-2">Ask me anything about UAE statistics</p>
              <p className="text-muted-foreground/70 text-sm">Voice or text search powered by AI</p>
            </>
          ) : (
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="p-4 acrylic elevation-2 bg-gradient-to-r from-accent/30 to-accent/20 border-primary/20">
                <p className="text-foreground">
                  <span className="text-primary">Presenter:</span> {typedText}
                  {typedText.length < demoQueryText.length && (
                    <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />
                  )}
                </p>
              </Card>
            </div>
          )}
        </div>

        {/* Category Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map(category => (
            <Card 
              key={category.id}
              className="p-6 cursor-pointer acrylic elevation-1 fluent-hover border-border/50 bg-card/80"
              onClick={() => onNavigate(category.screen)}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 elevation-2`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-foreground">{category.name}</div>
            </Card>
          ))}
        </div>

        {/* AI Chat Input */}
        {!showDemoText && (
          <div className="max-w-3xl mx-auto">
            <Card className="p-2 acrylic elevation-2 border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <Input 
                    placeholder="I want to review the latest GDP information for the UAE"
                    className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.toLowerCase().includes('gdp')) {
                        onNavigate('gdp');
                      }
                    }}
                  />
                </div>
                <button 
                  className="px-6 py-2 bg-gradient-to-r from-primary to-[#A08060] text-white rounded-xl elevation-2 hover:elevation-3 transition-all duration-200"
                  onClick={() => {
                    if (searchQuery.toLowerCase().includes('gdp')) {
                      onNavigate('gdp');
                    }
                  }}
                >
                  Search
                </button>
              </div>
            </Card>
            <div className="mt-3 flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              AI Assistant Ready
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
