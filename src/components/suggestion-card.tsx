import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { PairingSuggestionsOutput } from '@/ai/schemas/pairing-suggestions-schema';

type Suggestion = PairingSuggestionsOutput['accompaniments'][0];

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{suggestion.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        <p className="text-muted-foreground flex-grow mb-6">{suggestion.justification}</p>
        <Button asChild>
          <a href={suggestion.url} target="_blank" rel="noopener noreferrer">
            Ver Receita <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
