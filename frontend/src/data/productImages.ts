import catMuesli from "@/assets/cat-muesli.jpg";
import catPancake from "@/assets/cat-pancake.jpg";
import catFlakes from "@/assets/cat-flakes.jpg";
import catMilletRice from "@/assets/cat-millet-rice.jpg";
import catReadyToCook from "@/assets/cat-ready-to-cook.jpg";
import catSweeteners from "@/assets/cat-sweeteners.jpg";
import catRava from "@/assets/cat-rava.jpg";
import catFlour from "@/assets/cat-flour.jpg";
import catPuttu from "@/assets/cat-puttu.jpg";
import catMalt from "@/assets/cat-malt.jpg";

const categoryImages: Record<string, string> = {
  "Sample Set": catMuesli,
  "Muesli & Granola": catMuesli,
  "Pan Cake": catPancake,
  "Ready to Cook": catReadyToCook,
  "Sweeteners": catSweeteners,
  "Flakes": catFlakes,
  "Millet Rava": catRava,
  "Millet Parboiled Rice": catMilletRice,
  "Millet Rice": catMilletRice,
  "Millet Flour": catFlour,
  "Instant Puttu": catPuttu,
  "Malt & Health Mix": catMalt,
  "Porridge Mix": catMalt,
  "Chappati Mix": catFlour,
  "Traditional Rice": catMilletRice,
};

export const productImages: Record<string, string> = {};

export function getProductImage(productId: string, category: string): string {
  return productImages[productId] || categoryImages[category] || catMilletRice;
}
