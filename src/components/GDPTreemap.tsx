import { Card } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface GDPTreemapProps {
  highlighted?: boolean;
}

const sectors = [
  { name: 'Services', percentage: 45, value: 720, growth: 4.2, color: 'bg-[#8B7355]', size: 'large' },
  { name: 'Oil & Gas', percentage: 22, value: 352, growth: 1.8, color: 'bg-[#D4A574]', size: 'medium' },
  { name: 'Manufacturing', percentage: 9, value: 144, growth: 5.1, color: 'bg-[#B5838D]', size: 'small' },
  { name: 'Construction', percentage: 8, value: 128, growth: 3.5, color: 'bg-[#6B9080]', size: 'small' },
  { name: 'Real Estate', percentage: 7, value: 112, growth: 6.2, color: 'bg-[#A0937C]', size: 'small' },
  { name: 'Retail/Wholesale', percentage: 6, value: 96, growth: 2.9, color: 'bg-[#9B8A76]', size: 'small' },
  { name: 'Others', percentage: 3, value: 48, growth: -0.5, color: 'bg-[#8B8378]', size: 'tiny' },
];

export default function GDPTreemap({ highlighted }: GDPTreemapProps) {
  return (
    <Card className={`p-6 acrylic elevation-2 border-border/50 mb-6 transition-all duration-500 ${
      highlighted ? 'ring-4 ring-primary shadow-xl' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground">GDP Sectoral Breakdown (2024)</h3>
        {highlighted && (
          <div className="px-3 py-1 bg-accent/80 text-primary text-sm rounded-full animate-pulse elevation-1">
            AI Highlighted
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-3 h-[400px]">
        {/* Services - Large (2x2) */}
        <div className={`col-span-2 row-span-2 ${sectors[0].color} rounded-xl p-4 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-sm opacity-90">Services</div>
            <div className="text-4xl mt-1">{sectors[0].percentage}%</div>
          </div>
          <div>
            <div className="text-xl">AED {sectors[0].value}B</div>
            <div className="flex items-center gap-1 text-sm mt-1 opacity-90">
              <TrendingUp className="w-4 h-4" />
              +{sectors[0].growth}%
            </div>
          </div>
        </div>

        {/* Oil & Gas - Medium (2x1) */}
        <div className={`col-span-2 ${sectors[1].color} rounded-xl p-4 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-sm opacity-90">Oil & Gas</div>
            <div className="text-3xl mt-1">{sectors[1].percentage}%</div>
          </div>
          <div>
            <div className="text-lg">AED {sectors[1].value}B</div>
            <div className="flex items-center gap-1 text-sm opacity-90">
              <TrendingUp className="w-4 h-4" />
              +{sectors[1].growth}%
            </div>
          </div>
        </div>

        {/* Manufacturing - Small */}
        <div className={`${sectors[2].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">Manufacturing</div>
            <div className="text-2xl mt-1">{sectors[2].percentage}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[2].value}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              +{sectors[2].growth}%
            </div>
          </div>
        </div>

        {/* Construction - Small */}
        <div className={`${sectors[3].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">Construction</div>
            <div className="text-2xl mt-1">{sectors[3].percentage}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[3].value}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              +{sectors[3].growth}%
            </div>
          </div>
        </div>

        {/* Real Estate - Small */}
        <div className={`${sectors[4].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">Real Estate</div>
            <div className="text-2xl mt-1">{sectors[4].percentage}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[4].value}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              +{sectors[4].growth}%
            </div>
          </div>
        </div>

        {/* Retail/Wholesale - Small */}
        <div className={`${sectors[5].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">Retail/Wholesale</div>
            <div className="text-2xl mt-1">{sectors[5].percentage}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[5].value}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <TrendingUp className="w-3 h-3" />
              +{sectors[5].growth}%
            </div>
          </div>
        </div>

        {/* Others - Tiny */}
        <div className={`${sectors[6].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">Others</div>
            <div className="text-2xl mt-1">{sectors[6].percentage}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[6].value}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              <TrendingDown className="w-3 h-3" />
              {sectors[6].growth}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
