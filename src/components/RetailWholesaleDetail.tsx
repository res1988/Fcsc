import { Card } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RetailWholesaleDetailProps {
  highlighted?: boolean;
}

const retailHistoricalData = [
  { year: '2019', value: 78, growth: 2.8 },
  { year: '2020', value: 72, growth: -7.7 },
  { year: '2021', value: 82, growth: 13.9 },
  { year: '2022', value: 89, growth: 8.5 },
  { year: '2023', value: 93, growth: 4.5 },
  { year: '2024', value: 96, growth: 3.2 },
];

const subSectorBreakdown = [
  { name: 'Motor Vehicles', contribution: 28, growth: 4.1 },
  { name: 'Food & Beverages', contribution: 22, growth: 2.8 },
  { name: 'Clothing & Footwear', contribution: 15, growth: 5.2 },
  { name: 'Electronics', contribution: 12, growth: 6.8 },
  { name: 'Home Furnishings', contribution: 10, growth: 1.9 },
  { name: 'Pharmaceuticals', contribution: 8, growth: 7.3 },
  { name: 'Others', contribution: 5, growth: 2.5 },
];

export default function RetailWholesaleDetail({ highlighted }: RetailWholesaleDetailProps) {
  return (
    <Card className={`p-6 bg-white border-slate-200 transition-all duration-500 ${
      highlighted ? 'ring-4 ring-blue-500 shadow-xl' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-slate-900">Retail & Wholesale Sector Analysis</h3>
          <p className="text-slate-500 text-sm">5-Year Historical Performance & Sub-Sector Breakdown</p>
        </div>
        {highlighted && (
          <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full animate-pulse">
            AI Highlighted
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Historical Trend */}
        <div>
          <h4 className="text-slate-700 mb-4">Historical GDP Contribution (AED Billions)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={retailHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value: number) => `AED ${value}B`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ r: 5, fill: '#6366f1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Growth Rates */}
        <div>
          <h4 className="text-slate-700 mb-4">Year-over-Year Growth Rate (%)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={retailHistoricalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                formatter={(value: number) => `${value.toFixed(1)}%`}
              />
              <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                {retailHistoricalData.map((entry, index) => (
                  <rect key={`bar-${index}`} fill={entry.growth >= 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sub-Sector Breakdown */}
      <div>
        <h4 className="text-slate-700 mb-4">Sub-Sector Contribution (2024)</h4>
        <div className="space-y-3">
          {subSectorBreakdown.map((sector, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-slate-900">{sector.name}</span>
                  <span className="text-slate-500 text-sm ml-2">AED {(96 * sector.contribution / 100).toFixed(1)}B</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-slate-900">{sector.contribution}%</div>
                  <div className={`flex items-center gap-1 text-sm ${sector.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {sector.growth >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {sector.growth >= 0 ? '+' : ''}{sector.growth}%
                  </div>
                </div>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${sector.contribution}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200">
        <div>
          <div className="text-slate-600 text-sm">Current Value</div>
          <div className="text-2xl text-slate-900">AED 96B</div>
        </div>
        <div>
          <div className="text-slate-600 text-sm">GDP Share</div>
          <div className="text-2xl text-slate-900">6.0%</div>
        </div>
        <div>
          <div className="text-slate-600 text-sm">5-Year CAGR</div>
          <div className="text-2xl text-slate-900">4.2%</div>
        </div>
        <div>
          <div className="text-slate-600 text-sm">2024 Growth</div>
          <div className="text-2xl text-emerald-600">+3.2%</div>
        </div>
      </div>
    </Card>
  );
}
