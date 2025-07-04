import Image from 'next/image';
import PairingForm from '@/components/pairing-form';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full h-[70vh] md:h-[80vh] relative flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Mesa com vários pratos e bebidas"
          fill
          className="object-cover z-[-1] brightness-50"
          priority
          data-ai-hint="food pairing dinner"
        />
        <div className="z-10 p-4 max-w-4xl mx-auto w-full animate-fade-in-up">
          <h1 className="text-4xl md:text-7xl font-headline font-bold text-white mb-4 drop-shadow-lg">
            Guia de Harmonização
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Descubra as combinações perfeitas de acompanhamentos, bebidas e sobremesas para o seu prato.
          </p>
          <PairingForm />
        </div>
      </section>
       <section className="py-16 px-4 w-full max-w-7xl text-center">
        <h2 className="text-3xl lg:text-4xl font-headline font-bold mb-6">Como Funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-lg bg-card shadow-sm">
            <h3 className="font-headline text-xl font-bold mb-2">1. Diga o seu Prato</h3>
            <p className="text-muted-foreground">Comece digitando o prato principal que você está pensando em fazer, seja "Salmão Grelhado" ou "Risoto de Limão Siciliano".</p>
          </div>
          <div className="p-6 rounded-lg bg-card shadow-sm">
            <h3 className="font-headline text-xl font-bold mb-2">2. Receba Sugestões</h3>
            <p className="text-muted-foreground">Nossa IA irá analisar o perfil de sabor do seu prato e sugerir os melhores acompanhamentos, bebidas e sobremesas.</p>
          </div>
          <div className="p-6 rounded-lg bg-card shadow-sm">
            <h3 className="font-headline text-xl font-bold mb-2">3. Explore as Receitas</h3>
            <p className="text-muted-foreground">Gostou de uma sugestão? Clique para ver a receita completa em um site parceiro e comece a cozinhar!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
