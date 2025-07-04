'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function PairingForm() {
  const [dish, setDish] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dish.trim()) {
      router.push(`/pairing/${encodeURIComponent(dish.trim())}`);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-background/80 dark:bg-background/60 backdrop-blur-sm border-none shadow-2xl">
        <CardContent className="p-6">
             <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                    type="text"
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    placeholder="Ex: Feijoada, Abobrinha Recheada, Salmão..."
                    className="w-full pl-10 text-lg h-14"
                    />
                </div>
                <Button type="submit" size="lg" className="h-14 text-base font-bold">
                    Harmonizar
                </Button>
            </form>
        </CardContent>
    </Card>
  );
}
