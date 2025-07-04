import { Suspense } from 'react';
import { getPairingSuggestions } from '@/ai/flows/get-pairing-suggestions-flow';
import type { PairingSuggestionsOutput } from '@/ai/schemas/pairing-suggestions-schema';
import SuggestionCard from '@/components/suggestion-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Utensils, Wine, Salad, CakeSlice, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


interface PairingResultsPageProps {
  params: {
    dish: string;
  };
}

async function PairingResults({ dishName }: { dishName: string }) {
  let suggestions: PairingSuggestionsOutput | null = null;
  let errorState: string | null = null;

  try {
    suggestions = await getPairingSuggestions({ dish: dishName });
     if (!suggestions) {
      throw new Error("No suggestions returned from AI.");
    }
  } catch (error) {
    console.error(error);
    errorState = "Não foi possível gerar sugestões para este prato. Tente refinar sua busca ou tente novamente mais tarde.";
  }

  if (errorState || !suggestions) {
    return (
      <div className="flex items-center justify-center py-12">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro ao Gerar Sugestões</AlertTitle>
          <AlertDescription>
            {errorState || "Ocorreu um erro inesperado."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { baseDish, accompaniments, proteins, beverages, desserts } = suggestions;

  const sections = [
    { title: "Proteínas Sugeridas", icon: Utensils, items: proteins, visible: proteins.length > 0 },
    { title: "Acompanhamentos", icon: Salad, items: accompaniments, visible: accompaniments.length > 0 },
    { title: "Bebidas", icon: Wine, items: beverages, visible: beverages.length > 0 },
    { title: "Sobremesas", icon: CakeSlice, items: desserts, visible: desserts.length > 0 },
  ].filter(section => section.visible);

  return (
    <div className="animate-fade-in-up">
      <div className="text-center mb-12">
        <p className="text-muted-foreground">Sugestões de harmonização para</p>
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-primary">{baseDish.name}</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">{baseDish.description}</p>
      </div>

      <div className="space-y-12">
        {sections.map(section => (
          <section key={section.title}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <section.icon className="h-8 w-8 text-primary/80" />
              <h2 className="text-3xl lg:text-4xl font-headline font-bold text-center">{section.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {section.items.map((item, index) => (
                <SuggestionCard key={`${section.title}-${index}`} suggestion={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
    return (
        <div>
            <div className="text-center mb-12 space-y-4">
                <Skeleton className="h-6 w-1/3 mx-auto" />
                <Skeleton className="h-16 w-2/3 mx-auto" />
                <Skeleton className="h-5 w-full max-w-3xl mx-auto" />
                 <Skeleton className="h-5 w-full max-w-2xl mx-auto" />
            </div>
            <div className="space-y-12">
                {[1, 2, 3].map(i => (
                    <section key={i}>
                        <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                           {[1, 2, 3].map(j => (
                               <Card key={j}>
                                   <CardHeader>
                                       <Skeleton className="h-6 w-3/4" />
                                   </CardHeader>
                                   <CardContent className="space-y-4">
                                       <Skeleton className="h-4 w-full" />
                                       <Skeleton className="h-4 w-5/6" />
                                       <Skeleton className="h-10 w-1/2 mt-4" />
                                   </CardContent>
                               </Card>
                           ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default function PairingResultsPage({ params }: PairingResultsPageProps) {
  const dishName = decodeURIComponent(params.dish);

  return (
    <div className="container mx-auto p-4 lg:p-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <PairingResults dishName={dishName} />
      </Suspense>
    </div>
  );
}
