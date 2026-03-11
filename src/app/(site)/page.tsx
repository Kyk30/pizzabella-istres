import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import MenuPreview from "@/components/MenuPreview";
import Events from "@/components/Events";
import ContactSection from "@/components/ContactSection";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Hero hero={content.hero} />

      {/* About Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="section-title">Bienvenue chez {content.info.name}</h2>
          <div className="w-20 h-1 bg-brand-red mx-auto my-6 rounded-full" />
          <p className="text-lg text-stone-600 leading-relaxed">
            {content.info.description}
          </p>
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🍕</div>
              <p className="text-sm font-medium text-stone-700">40cm</p>
              <p className="text-xs text-stone-500">Genereuses</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🚗</div>
              <p className="text-sm font-medium text-stone-700">Livraison</p>
              <p className="text-xs text-stone-500">Des {content.info.deliveryMinimum}&euro;</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👨‍🍳</div>
              <p className="text-sm font-medium text-stone-700">Artisanal</p>
              <p className="text-xs text-stone-500">Fait maison</p>
            </div>
          </div>
        </div>
      </section>

      <Events events={content.events} />
      <MenuPreview categories={content.menu} />

      {/* Gallery Section */}
      {content.gallery.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="section-title">Galerie</h2>
            <p className="section-subtitle">Quelques-unes de nos creations</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {content.gallery.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-xl overflow-hidden group"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection info={content.info} />
    </>
  );
}
