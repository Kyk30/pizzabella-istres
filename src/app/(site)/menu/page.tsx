import { getContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Carte - Pizza Bella Istres",
  description: "Découvrez notre carte complète : pizzas base tomate, base crème, spéciales, entrées, desserts et boissons.",
};

export const revalidate = 60;

export default async function MenuPage() {
  const content = await getContent();

  return (
    <>
      {/* Header Banner */}
      <div className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            Notre Carte
          </h1>
          <p className="text-stone-400 text-lg">
            Toutes nos pizzas sont preparees en 40cm avec des ingredients frais
          </p>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className="sticky top-16 md:top-20 bg-white border-b border-stone-200 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {content.menu.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                         text-stone-600 hover:text-brand-red hover:bg-red-50 transition-colors"
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {content.menu.map((category) => (
          <section key={category.id} id={category.id} className="mb-16 scroll-mt-32">
            <div className="mb-8">
              <h2 className="text-3xl font-heading font-bold text-brand-dark">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-stone-500 mt-1">{category.description}</p>
              )}
              <div className="w-16 h-1 bg-brand-red mt-3 rounded-full" />
            </div>

            <div className="space-y-1">
              {category.items.map((item, index) => (
                <div
                  key={item.id}
                  className={`flex justify-between items-start gap-4 p-4 rounded-lg
                    ${index % 2 === 0 ? "bg-white" : "bg-brand-cream/50"}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-brand-dark text-lg">
                        {item.name}
                      </h3>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-stone-500 mt-0.5">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xl font-bold text-brand-red whitespace-nowrap">
                    {item.price.toFixed(2)} &euro;
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Call to Action */}
        <div className="text-center bg-brand-dark text-white rounded-2xl p-8 md:p-12 mt-8">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            Envie de commander ?
          </h3>
          <p className="text-stone-400 mb-6">
            Appelez-nous pour passer commande en livraison ou a emporter
          </p>
          <a
            href={`tel:${content.info.phone.replace(/\s/g, "")}`}
            className="btn-primary text-lg !px-10"
          >
            📞 {content.info.phone}
          </a>
          <p className="text-stone-500 text-sm mt-4">
            Livraison a partir de {content.info.deliveryMinimum}&euro; de commande
          </p>
        </div>
      </div>
    </>
  );
}
