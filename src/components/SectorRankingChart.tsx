import { Card } from './ui/card';
import { TrendingUp, Medal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface SectorRankingChartProps {
  highlighted?: boolean;
}

const sectorRankingData = [
  { sector: 'Real Estate', growth: 6.2, rank: 1 },
  { sector: 'Manufacturing', growth: 5.1, rank: 2 },
  { sector: 'Services', growth: 4.2, rank: 3 },
  { sector: 'Construction', growth: 3.5, rank: 4 },
  { sector: 'Retail/Wholesale', growth: 2.9, rank: 5 },
  { sector: 'Oil & Gas', growth: 1.8, rank: 6 },
  { sector: 'Others', growth: -0.5, rank: 7 },
];

const colors = ['#fbbf24', '#a3a3a3', '#cd7f32', '#3b82f6', '#8b5cf6', '#ec4899', '#94a3b8'];

export default function SectorRankingChart({ highlighted }: SectorRankingChartProps) {
  return (
    <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
      highlighted ? 'ring-4 ring-blue-500 shadow-xl' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-900">Sector Growth Ranking (2024)</h3>
          <p className="text-slate-500 text-sm">Sectors ordered by year-over-year growth performance</p>
        </div>
        {highlighted && (
          <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
            AI Highlighted
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sectorRankingData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" stroke="#64748b" domain={[-2, 8]} />
          <YAxis dataKey="sector" type="category" stroke="#64748b" width={130} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
            formatter={(value: number) => `${value.toFixed(1)}%`}
          />
          <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
            {sectorRankingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? colors[index] : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Top Performers */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-slate-700 mb-4">Top Performers</h4>
        <div className="grid grid-cols-3 gap-4">
          {sectorRankingData.slice(0, 3).map((sector, idx) => (
            <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Medal className={`w-5 h-5 ${
                  idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : 'text-orange-600'
                }`} />
                <span className="text-slate-900">#{sector.rank}</span>
              </div>
              <div className="text-slate-700 text-sm mb-1">{sector.sector}</div>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-lg">+{sector.growth}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
