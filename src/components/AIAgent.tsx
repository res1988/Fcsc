import { MessageSquare, Send, Bot, User, Download, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface Message {
  role: 'user' | 'assistant';
  message: string;
  agent?: string;
  isGenerating?: boolean;
}

interface AIAgentProps {
  messages: Message[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onDownload?: (messageIndex: number) => void;
}

const agentIcons: Record<string, string> = {
  'Data Searcher': '🔍',
  'Diagram Generator': '📊',
  'Comparative Benchmarker': '📈',
  'Reasoner': '🧠',
  'Report Generator': '📄',
  'Forecaster': '🔮',
  'Data Quality Checker': '✓',
  'KPI Explainer': '💡',
};

export default function AIAgent({ messages, input, onInputChange, onSend, onDownload }: AIAgentProps) {
  return (
    <Card className="p-6 acrylic elevation-2 border-border/50 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-[#A08060] rounded-xl flex items-center justify-center elevation-2">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-foreground">AI Assistant</h3>
          <p className="text-muted-foreground text-xs">Powered by multiple specialized agents</p>
        </div>
      </div>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((chat, idx) => (
            <div key={idx}>
              <div 
                className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] ${chat.role === 'assistant' ? 'w-full' : ''}`}>
                  {chat.role === 'assistant' && chat.agent && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{agentIcons[chat.agent] || '🤖'}</span>
                      <Badge variant="secondary" className="text-xs bg-accent/80 text-primary border-primary/20">
                        {chat.agent}
                      </Badge>
                    </div>
                  )}
                  <div className={`p-3 rounded-lg ${
                    chat.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-100 text-slate-900'
                  }`}>
                    {chat.role === 'user' && (
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4" />
                        <span className="text-xs opacity-90">Presenter</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap">
                      {chat.message}
                      {chat.isGenerating && (
                        <Loader2 className="w-4 h-4 inline-block ml-2 animate-spin" />
                      )}
                    </div>
                  </div>
                  {chat.role === 'assistant' && chat.message.includes('report') && !chat.isGenerating && onDownload && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => onDownload(idx)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input 
            placeholder="Ask about data, generate diagrams, or request reports..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSend();
              }
            }}
            className="flex-1 bg-muted/30 border-border/50"
          />
          <Button size="icon" className="bg-gradient-to-br from-primary to-[#A08060] hover:opacity-90 transition-opacity elevation-2" onClick={onSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
