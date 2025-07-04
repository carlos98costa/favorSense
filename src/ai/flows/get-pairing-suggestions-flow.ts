'use server';
/**
 * @fileOverview A flow to get food pairing suggestions for a given dish.
 *
 * - getPairingSuggestions - A function that returns pairings for a dish.
 */

import { ai } from '@/ai/genkit';
import {
  PairingSuggestionsInputSchema,
  type PairingSuggestionsInput,
  PairingSuggestionsOutputSchema,
  type PairingSuggestionsOutput,
} from '@/ai/schemas/pairing-suggestions-schema';


export async function getPairingSuggestions(input: PairingSuggestionsInput): Promise<PairingSuggestionsOutput> {
  return getPairingSuggestionsFlow(input);
}

const getPairingSuggestionsPrompt = ai.definePrompt({
    name: 'getPairingSuggestionsPrompt',
    input: { schema: PairingSuggestionsInputSchema },
    output: { schema: PairingSuggestionsOutputSchema },
    prompt: `Você é um chef e sommelier de classe mundial com um profundo conhecimento de perfis de sabor, texturas e ciência dos alimentos. Um usuário especificou um prato e quer que você atue como um "Guia de Harmonização".

Sua tarefa é analisar o prato do usuário e fornecer sugestões de harmonização inteligentes, criativas e bem justificadas em várias categorias.

Prato do Usuário: "{{{dish}}}"

**Seu Processo de Raciocínio (para cada sugestão):**
1.  **Analisar o Prato Base:**
    *   **Identificar Componentes Chave e Tipo:** O que é "{{{dish}}}"? Uma proteína, um prato de vegetais, um prato à base de grãos (como risoto), uma refeição completa?
    *   **Determinar o Perfil de Sabor:** É ácido, gorduroso, picante, doce, umami, amargo, salgado, herbáceo, terroso?
    *   **Considerar Textura e Intensidade:** É cremoso, crocante, leve, pesado, delicado, robusto?
    *   **Identificar Cozinha/Origem:** Pertence a uma tradição culinária específica (ex: italiana, brasileira, asiática)?

2.  **Gerar Sugestões de Harmonização usando Princípios de Harmonização:**
    *   **Complementaridade (Similaridade):** Combine sabores semelhantes. Um prato de limão com um vinho branco cítrico.
    *   **Contraste (Equilíbrio):** Combine elementos contrastantes para equilibrar o paladar. Um prato rico e gorduroso com uma bebida ácida para cortar a gordura. Um prato picante com um componente ligeiramente doce para amenizar o calor.
    *   **Harmonização Regional:** Sugira itens da mesma culinária de origem.

**Instruções para a Saída:**
*   **Prato Base:** Forneça o nome do prato original e uma descrição curta e apetitosa.
*   **Proteínas:** Se o prato base for um acompanhamento (como "Purê de Batatas") ou um vegetal (como "Aspargos Assados"), sugira 1-2 proteínas que o transformariam em uma refeição completa. Se o prato base já for uma proteína (como "Frango Assado"), este array deve estar vazio.
*   **Acompanhamentos:** Se o prato base for uma proteína principal ou um prato completo, sugira 2-3 acompanhamentos. Se o prato base for um acompanhamento (como "Batatas Fritas"), este array deve estar vazio.
*   **Bebidas:** Sugira 2-3 bebidas. Inclua uma mistura de opções como vinho, cerveja ou bebidas não alcoólicas, quando apropriado.
*   **Sobremesas:** Sugira 1-2 sobremesas que complementariam a refeição.
*   **Justificativa:** Para CADA sugestão, forneça uma justificativa concisa, mas perspicaz, explicando *por que* é uma boa combinação. Esta é a parte mais importante.
*   **URL:** Para CADA sugestão, forneça uma URL válida e funcional para uma receita de um site de receitas conhecido (como tudogostoso.com.br, receiteria.com.br, etc.). A URL deve levar diretamente para a receita.

Retorne APENAS a saída JSON estruturada. Não seja conversacional.`,
});

const getPairingSuggestionsFlow = ai.defineFlow(
  {
    name: 'getPairingSuggestionsFlow',
    inputSchema: PairingSuggestionsInputSchema,
    outputSchema: PairingSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await getPairingSuggestionsPrompt(input);
    if (!output) {
      throw new Error("Could not generate pairing suggestions for the given dish.");
    }
    return output;
  }
);
