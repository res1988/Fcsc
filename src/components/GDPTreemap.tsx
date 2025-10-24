import { Card } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface GDPTreemapProps {
  highlighted?: boolean;
}

const colorPalette = [
  'bg-[#8B7355]',
  'bg-[#D4A574]',
  'bg-[#B5838D]',
  'bg-[#6B9080]',
  'bg-[#A0937C]',
  'bg-[#9B8A76]',
  'bg-[#8B8378]',
  'bg-[#C19A7B]',
];

export default function GDPTreemap({ highlighted, gdpData }: GDPTreemapProps) {
  // Map sectors to treemap format with top 7 sectors
  const sectors = gdpData.sectors.slice(0, 7).map((sector, idx) => {
    // Determine size based on percentage
    let size: 'large' | 'medium' | 'small' | 'tiny';
    if (sector.percentage > 15) size = 'large';
    else if (sector.percentage > 10) size = 'medium';
    else if (sector.percentage > 5) size = 'small';
    else size = 'tiny';

    // Shorten name for display
    const shortName = sector.name.split(',')[0].split('(')[0].trim();
    
    return {
      name: shortName,
      percentage: sector.percentage,
      value: sector.value / 1000, // Convert to billions
      growth: sector.yoyGrowth,
      color: colorPalette[idx],
      size,
      code: sector.code
    };
  });
  return (
    <Card className={`p-6 acrylic elevation-2 border-border/50 mb-6 transition-all duration-500 ${
      highlighted ? 'ring-4 ring-primary shadow-xl' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-foreground">GDP Sectoral Breakdown ({gdpData.metadata.year})</h3>
          <p className="text-muted-foreground text-xs mt-1">Top {sectors.length} sectors • {gdpData.metadata.priceType}</p>
        </div>
        {highlighted && (
          <div className="px-3 py-1 bg-accent/80 text-primary text-sm rounded-full animate-pulse elevation-1">
            AI Highlighted
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-3 h-[400px]">
        {/* Largest Sector - Large (2x2) */}
        <div className={`col-span-2 row-span-2 ${sectors[0].color} rounded-xl p-4 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-sm opacity-90">{sectors[0].name}</div>
            <div className="text-4xl mt-1">{sectors[0].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-xl">AED {sectors[0].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-sm mt-1 opacity-90">
              {sectors[0].growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {sectors[0].growth >= 0 ? '+' : ''}{sectors[0].growth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Second Sector - Medium (2x1) */}
        <div className={`col-span-2 ${sectors[1].color} rounded-xl p-4 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-sm opacity-90">{sectors[1].name}</div>
            <div className="text-3xl mt-1">{sectors[1].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-lg">AED {sectors[1].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-sm opacity-90">
              {sectors[1].growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {sectors[1].growth >= 0 ? '+' : ''}{sectors[1].growth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Third Sector - Small */}
        <div className={`${sectors[2].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">{sectors[2].name}</div>
            <div className="text-2xl mt-1">{sectors[2].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[2].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {sectors[2].growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {sectors[2].growth >= 0 ? '+' : ''}{sectors[2].growth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Sector 4 - Small */}
        <div className={`${sectors[3].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">{sectors[3].name}</div>
            <div className="text-2xl mt-1">{sectors[3].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[3].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {sectors[3].growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {sectors[3].growth >= 0 ? '+' : ''}{sectors[3].growth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Sector 5 - Small */}
        <div className={`${sectors[4].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">{sectors[4].name}</div>
            <div className="text-2xl mt-1">{sectors[4].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[4].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {sectors[4].growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {sectors[4].growth >= 0 ? '+' : ''}{sectors[4].growth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Sector 6 - Small */}
        <div className={`${sectors[5].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">{sectors[5].name}</div>
            <div className="text-2xl mt-1">{sectors[5].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[5].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {sectors[5].growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {sectors[5].growth >= 0 ? '+' : ''}{sectors[5].growth.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Sector 7 - Tiny */}
        <div className={`${sectors[6].color} rounded-xl p-3 text-white flex flex-col justify-between hover:opacity-90 transition-all duration-200 cursor-pointer elevation-2 hover:elevation-3`}>
          <div>
            <div className="text-xs opacity-90">{sectors[6].name}</div>
            <div className="text-2xl mt-1">{sectors[6].percentage.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-sm">AED {sectors[6].value.toFixed(1)}B</div>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {sectors[6].growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {sectors[6].growth >= 0 ? '+' : ''}{sectors[6].growth.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
