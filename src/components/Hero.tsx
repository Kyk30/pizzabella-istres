import Link from "next/link";
import { HeroContent } from "@/lib/types";

export default function Hero({ hero }: { hero: HeroContent }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {hero.backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-stone-900 to-brand-red-dark" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl md:text-8xl opacity-10 rotate-12">🍕</div>
      <div className="absolute bottom-10 right-10 text-6xl md:text-8xl opacity-10 -rotate-12">🍕</div>
      <div className="absolute top-1/4 right-1/4 text-4xl opacity-5 rotate-45">🌿</div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-4 drop-shadow-lg">
          {hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-stone-200 mb-8 font-light">
          {hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={hero.ctaLink} className="btn-primary text-lg !px-10 !py-4">
            {hero.ctaText}
          </Link>
          <Link href="/contact" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-brand-dark text-lg !px-10 !py-4">
            Nous Contacter
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-6 text-stone-300">
          <div className="flex items-center gap-2">
            <span>🚗</span>
            <span>Livraison</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🏠</span>
            <span>A emporter</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⏰</span>
            <span>Mar-Dim 18h-22h</span>
          </div>
        </div>
      </div>
    </section>
  );
}
