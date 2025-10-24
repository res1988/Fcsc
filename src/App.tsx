import { useState } from 'react';
import LandingPage from './components/LandingPage';
import GDPDashboard from './components/GDPDashboard';
import GSBPMFlow from './components/GSBPMFlow';
import ForecastingDashboard from './components/ForecastingDashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'gdp' | 'gsbpm' | 'forecasting'>('landing');
  const [demoMode, setDemoMode] = useState(false);

  return (
    <div className="size-full bg-background">
      {currentScreen === 'landing' && (
        <LandingPage onNavigate={setCurrentScreen} demoMode={demoMode} />
      )}
      {currentScreen === 'gdp' && (
        <GDPDashboard onNavigate={setCurrentScreen} demoMode={demoMode} />
      )}
      {currentScreen === 'gsbpm' && (
        <GSBPMFlow onNavigate={setCurrentScreen} demoMode={demoMode} />
      )}
      {currentScreen === 'forecasting' && (
        <ForecastingDashboard onNavigate={setCurrentScreen} demoMode={demoMode} />
      )}
    </div>
  );
}
