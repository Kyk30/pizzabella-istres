import Link from "next/link";
import { MenuCategory } from "@/lib/types";

export default function MenuPreview({ categories }: { categories: MenuCategory[] }) {
  // Show first 3 items from each of the first 2 pizza categories
  const pizzaCategories = categories.filter((c) =>
    c.name.toLowerCase().includes("pizza")
  );
  const previewCategories = pizzaCategories.slice(0, 2);

  return (
    <section id="menu" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="section-title">Notre Carte</h2>
        <p className="section-subtitle">
          Des pizzas artisanales de 40cm, generously garnished with fresh ingredients
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {previewCategories.map((category) => (
            <div key={category.id} className="bg-brand-cream rounded-2xl p-6 md:p-8">
              <h3 className="text-2xl font-heading font-bold text-brand-dark mb-1">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-stone-500 mb-6">{category.description}</p>
              )}

              <div className="space-y-4">
                {category.items.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-brand-dark">{item.name}</h4>
                      <p className="text-sm text-stone-500">{item.description}</p>
                    </div>
                    <span className="text-lg font-bold text-brand-red whitespace-nowrap">
                      {item.price.toFixed(2)} &euro;
                    </span>
                  </div>
                ))}
              </div>

              {category.items.length > 4 && (
                <p className="text-sm text-stone-400 mt-4 text-center">
                  et {category.items.length - 4} autres...
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/menu" className="btn-primary text-lg">
            Voir toute la carte
          </Link>
        </div>
      </div>
    </section>
  );
}
