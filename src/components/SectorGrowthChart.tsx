import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface SectorGrowthChartProps {
  highlighted?: boolean;
}

const sectorGrowthData = [
  { sector: 'Real Estate', growth2023: 4.5, growth2024: 6.2 },
  { sector: 'Manufacturing', growth2023: 3.8, growth2024: 5.1 },
  { sector: 'Services', growth2023: 3.5, growth2024: 4.2 },
  { sector: 'Construction', growth2023: 2.8, growth2024: 3.5 },
  { sector: 'Retail/Wholesale', growth2023: 2.1, growth2024: 2.9 },
  { sector: 'Oil & Gas', growth2023: 1.2, growth2024: 1.8 },
  { sector: 'Others', growth2023: 0.8, growth2024: -0.5 },
];

export default function SectorGrowthChart({ highlighted }: SectorGrowthChartProps) {
  return (
    <Card className={`p-6 acrylic elevation-2 border-border/50 mb-6 transition-all duration-500 ${
      highlighted ? 'ring-4 ring-primary shadow-xl' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-foreground">Year-over-Year Sector Growth Comparison</h3>
        {highlighted && (
          <div className="px-3 py-1 bg-accent/80 text-primary text-sm rounded-full animate-pulse elevation-1">
            AI Highlighted
          </div>
        )}
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={sectorGrowthData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 115, 85, 0.15)" />
          <XAxis type="number" stroke="#8B8378" domain={[-2, 8]} />
          <YAxis dataKey="sector" type="category" stroke="#8B8378" width={120} />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(254, 253, 251, 0.95)', border: '1px solid rgba(139, 115, 85, 0.2)', borderRadius: '12px', backdropFilter: 'blur(20px)' }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Legend />
          <Bar dataKey="growth2023" name="2023 Growth" fill="#B5ACA0" radius={[0, 6, 6, 0]} />
          <Bar dataKey="growth2024" name="2024 Growth" radius={[0, 6, 6, 0]}>
            {sectorGrowthData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.growth2024 >= 0 ? '#6B9080' : '#C85A54'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
