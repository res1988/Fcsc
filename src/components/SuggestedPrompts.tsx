import { Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface SuggestedPromptsProps {
  prompts: string[];
  onSelect: (prompt: string) => void;
}

export default function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-muted-foreground text-sm">Suggested prompts:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {prompts.map((prompt, idx) => (
          <Badge
            key={idx}
            variant="outline"
            className="cursor-pointer hover:bg-accent/50 hover:border-primary/40 transition-all px-3 py-1.5 text-sm border-border/50 bg-card/50 acrylic"
            onClick={() => onSelect(prompt)}
          >
            {prompt}
          </Badge>
        ))}
      </div>
    </div>
  );
}
