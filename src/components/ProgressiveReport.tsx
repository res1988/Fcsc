import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { FileText, Download } from 'lucide-react';
import { Button } from './ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressiveReportProps {
  title: string;
  type: 'retail-analysis' | 'methodology' | 'forecast-scenario';
  onComplete?: () => void;
}

const retailTradeData = [
  { country: 'Saudi Arabia', imports: 45.2, exports: 38.5, reexports: 12.3 },
  { country: 'China', imports: 52.1, exports: 15.2, reexports: 8.7 },
  { country: 'India', imports: 28.4, exports: 22.1, reexports: 18.9 },
  { country: 'USA', imports: 18.7, exports: 12.4, reexports: 6.2 },
  { country: 'UK', imports: 12.3, exports: 8.9, reexports: 4.1 },
];

export default function ProgressiveReport({ title, type, onComplete }: ProgressiveReportProps) {
  const [progress, setProgress] = useState(0);
  const [sections, setSections] = useState<string[]>([]);

  const reportSections = {
    'retail-analysis': [
      '# Retail & Wholesale Sector Analysis Report\n\n## Executive Summary\n\nThe Retail & Wholesale sector contributed AED 96 billion to UAE GDP in 2024, representing 6.0% of total economic output. This marks a 3.2% year-over-year increase from 2023.',
      '\n\n## Year-over-Year Performance Comparison\n\n### 2023 vs 2024 Analysis\n\n- **2023 GDP Contribution:** AED 93.0B (5.99% of GDP)\n- **2024 GDP Contribution:** AED 96.0B (6.00% of GDP)\n- **Absolute Growth:** +AED 3.0B\n- **Percentage Growth:** +3.2%\n\nThe sector demonstrated resilient growth despite global economic headwinds, outperforming the overall GDP growth rate of 3.2%.',
      '\n\n## Key Performance Indicators\n\n### Sub-Sector Performance\n\n1. **Motor Vehicles** (28% of sector)\n   - Contribution: AED 26.9B\n   - Growth: +4.1% YoY\n   - Driver: Strong consumer demand and financing availability\n\n2. **Food & Beverages** (22% of sector)\n   - Contribution: AED 21.1B\n   - Growth: +2.8% YoY\n   - Driver: Population growth and tourism recovery\n\n3. **Electronics** (12% of sector)\n   - Contribution: AED 11.5B\n   - Growth: +6.8% YoY\n   - Driver: Digital transformation and remote work trends',
      '\n\n## Economic Factors & Indicators\n\n### Macroeconomic Drivers\n\n- **Consumer Confidence Index:** 118.5 (+5.2 points YoY)\n- **Retail Price Inflation:** 2.1% (below GCC average)\n- **Tourist Arrivals:** 17.8M visitors (+12.5% YoY)\n- **E-commerce Growth:** +22.3% in retail transactions\n\n### Employment Indicators\n\n- **Sector Employment:** 485,000 workers (+3.8% YoY)\n- **Average Wage Growth:** +4.2%\n- **Productivity per Worker:** AED 197,900 (+2.1%)',
      '\n\n## International Trade Correlation\n\n### Top Trading Partners Impact on Retail\n\nThe following chart shows the correlation between trade volumes and retail sector performance:\n\n[Chart: Trade Partner Analysis]\n\n**Key Insights:**\n- Imports from China increased 8.5%, supporting electronics retail\n- Re-exports through UAE grew 6.8%, boosting wholesale activity\n- Trade diversification reduced sector volatility',
      '\n\n## Contextual Insights\n\n### Global Trends\n\n- **GCC Retail Growth:** UAE outpaced regional average of 2.8%\n- **Global Comparison:** Aligned with emerging markets (3.1% avg)\n- **Digital Penetration:** 45% of retail transactions now digital (vs 38% in 2023)\n\n### Policy Impacts\n\n1. **VAT Compliance Enhancement:** Improved fiscal transparency\n2. **E-commerce Regulations:** Boosted consumer confidence\n3. **Free Zone Expansions:** Enhanced wholesale distribution\n\n### Future Outlook\n\n- **2025 Forecast:** 4.1% growth projected\n- **Key Risk:** Global supply chain disruptions\n- **Opportunity:** Expo legacy and infrastructure development',
      '\n\n---\n\n## Report Metadata\n\n- **Generated:** October 23, 2024\n- **Data Sources:** FCSC Quarterly Economic Survey, Monthly Retail Trade Survey\n- **Coverage Period:** 2019-2024\n- **Confidence Level:** High (95%+ data coverage)\n- **AI Agents Used:** Data Searcher, Comparative Benchmarker, Reasoner, Report Generator\n\n**Report Complete** ✓'
    ],
    'methodology': [
      '# GDP Survey Framework Methodology Report\n\n## Overview\n\nThis report details the Federal Competitiveness and Statistics Centre (FCSC) comprehensive approach to GDP data collection, processing, and dissemination following the Generic Statistical Business Process Model (GSBPM).',
      '\n\n## Survey Portfolio\n\n### 1. Quarterly Economic Survey (QES)\n\n**Objective:** Measure quarterly GDP across all economic sectors\n\n- **Sample Size:** 1,250 establishments\n- **Coverage:** 85% of GDP by value\n- **Response Rate:** 78%\n- **Frequency:** Quarterly\n- **Survey Period:** 15 days after quarter end\n- **Publication:** T+45 days',
      '\n\n### 2. Monthly Retail Trade Survey (MRTS)\n\n**Objective:** Track retail and wholesale sector performance monthly\n\n- **Sample Size:** 850 retailers\n- **Coverage:** 92% of retail activity\n- **Response Rate:** 82%\n- **Frequency:** Monthly\n- **Survey Period:** Month-end + 7 days\n- **Publication:** T+15 days',
      '\n\n## GSBPM Implementation\n\n### Phase 1: Specify Needs\n- User consultation workshops\n- Policy requirement analysis\n- International standards review (SNA 2008, ESA 2010)\n\n### Phase 2: Design\n- Survey questionnaire development\n- Sample frame construction\n- Pilot testing with 50 establishments\n\n### Phase 3: Build\n- Data collection platform development\n- Validation rule implementation\n- Training materials preparation',
      '\n\n### Phase 4: Collect\n- Multi-channel data collection (online, phone, field)\n- Real-time monitoring of response rates\n- Non-response follow-up protocols\n\n### Phase 5: Process\n- Automated validation checks\n- Manual quality review\n- Imputation for non-response (max 15%)\n- Seasonal adjustment using X-13ARIMA',
      '\n\n### Phase 6: Analyse\n- GDP compilation by production approach\n- Chain-linking for constant prices\n- Sectoral growth analysis\n- Quality indicators calculation\n\n### Phase 7: Disseminate\n- Statistical releases on schedule\n- Public database updates\n- API access for approved users\n- Metadata documentation',
      '\n\n### Phase 8: Evaluate\n- Quarterly quality assessments\n- Annual user satisfaction surveys\n- Benchmark studies with other NSOs\n- Methodology review every 3 years\n\n## Data Quality Framework\n\n### Quality Dimensions\n\n1. **Relevance:** 92/100 (user needs assessment)\n2. **Accuracy:** 95/100 (validation against tax data)\n3. **Timeliness:** 88/100 (publication schedule adherence)\n4. **Coherence:** 90/100 (consistency with other sources)\n5. **Accessibility:** 94/100 (multiple dissemination channels)',
      '\n\n## International Standards Compliance\n\n### System of National Accounts (SNA) 2008\n- ✓ Production approach to GDP\n- ✓ Chain volume measures\n- ✓ Sectoral classification (ISIC Rev. 4)\n\n### IMF Data Quality Assessment Framework (DQAF)\n- ✓ Prerequisites of quality\n- ✓ Methodological soundness\n- ✓ Accuracy and reliability\n- ✓ Serviceability\n- ✓ Accessibility\n\n---\n\n**Report Complete** ✓'
    ],
    'forecast-scenario': []
  };

  useEffect(() => {
    const currentSections = reportSections[type];
    if (progress < currentSections.length) {
      const timer = setTimeout(() => {
        setSections(prev => [...prev, currentSections[progress]]);
        setProgress(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (onComplete && progress === currentSections.length) {
      onComplete();
    }
  }, [progress, type, onComplete]);

  const isComplete = progress >= reportSections[type].length;

  return (
    <Card className="p-6 bg-slate-50 border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <div>
            <h4 className="text-slate-900">{title}</h4>
            <p className="text-slate-500 text-sm">
              {isComplete ? 'Report generation complete' : 'Generating report...'}
            </p>
          </div>
        </div>
        {isComplete && (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 max-h-[500px] overflow-y-auto border border-slate-200">
        <div className="prose prose-sm max-w-none">
          {sections.map((section, idx) => (
            <div key={idx} className="whitespace-pre-wrap text-slate-800">
              {section}
              {idx === sections.length - 1 && !isComplete && (
                <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse" />
              )}
            </div>
          ))}
          
          {/* Trade Chart in Retail Analysis */}
          {type === 'retail-analysis' && sections.length >= 5 && (
            <div className="my-6 p-4 bg-slate-50 rounded-lg">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={retailTradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="country" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Bar dataKey="imports" fill="#3b82f6" name="Imports (AED B)" />
                  <Bar dataKey="exports" fill="#10b981" name="Exports (AED B)" />
                  <Bar dataKey="reexports" fill="#8b5cf6" name="Re-exports (AED B)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {!isComplete && (
        <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
          Analyzing data and generating insights...
        </div>
      )}
    </Card>
  );
}
