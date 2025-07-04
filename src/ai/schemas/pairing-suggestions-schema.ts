/**
 * @fileOverview Schemas and types for the pairing suggestions flow.
 * 
 * - PairingSuggestionsInputSchema - Zod schema for the input of the pairing suggestions flow.
 * - PairingSuggestionsInput - The TypeScript type for the input.
 * - PairingSuggestionsOutputSchema - Zod schema for the output of the pairing suggestions flow.
 * - PairingSuggestionsOutput - The TypeScript type for the output.
 */
import { z } from 'zod';

export const PairingSuggestionsInputSchema = z.object({
  dish: z.string().describe('O nome do prato para o qual obter harmonizações (ex: "Salmão Grelhado", "Feijoada").'),
});
export type PairingSuggestionsInput = z.infer<typeof PairingSuggestionsInputSchema>;

const SuggestionSchema = z.object({
    name: z.string().describe('O nome do item sugerido.'),
    justification: z.string().describe('Uma breve explicação do porquê este item combina bem com o prato base.'),
    url: z.string().describe('Uma URL externa plausível para a receita do item sugerido.'),
});

export const PairingSuggestionsOutputSchema = z.object({
  baseDish: z.object({
      name: z.string().describe('O nome do prato base fornecido pelo usuário.'),
      description: z.string().describe('Uma descrição breve e apetitosa do prato base.'),
  }),
  accompaniments: z.array(SuggestionSchema).max(3).describe('Sugestões de acompanhamentos. Deve estar vazio se o prato base for um acompanhamento.'),
  proteins: z.array(SuggestionSchema).max(2).describe('Sugestões de proteínas principais. Só deve ser preenchido se o prato base for um acompanhamento, vegetal ou carboidrato.'),
  beverages: z.array(SuggestionSchema).max(3).describe('Sugestões de bebidas (alcoólicas e não alcoólicas) que harmonizam bem.'),
  desserts: z.array(SuggestionSchema).max(2).describe('Sugestões de sobremesas para servir após a refeição principal.'),
});
export type PairingSuggestionsOutput = z.infer<typeof PairingSuggestionsOutputSchema>;
