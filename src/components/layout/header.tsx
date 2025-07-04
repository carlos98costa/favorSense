import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">
              FlavorVerse
            </span>
          </Link>
        </div>
        {/* Future nav items can go here */}
      </div>
    </header>
  );
}
