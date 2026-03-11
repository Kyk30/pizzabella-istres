import { getContent } from "@/lib/content";
import ContactSection from "@/components/ContactSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Pizza Bella Istres",
  description: "Contactez Pizza Bella à Istres. Adresse, horaires d'ouverture, téléphone et plan d'accès.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const content = await getContent();

  return (
    <>
      {/* Header Banner */}
      <div className="bg-brand-dark text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
            Contact & Infos
          </h1>
          <p className="text-stone-400 text-lg">
            Toutes les informations pour nous trouver et commander
          </p>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid sm:grid-cols-3 gap-4">
          <a
            href={`tel:${content.info.phone.replace(/\s/g, "")}`}
            className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow group"
          >
            <div className="text-3xl mb-2">📞</div>
            <p className="text-sm text-stone-500">Appelez-nous</p>
            <p className="text-lg font-bold text-brand-red group-hover:text-brand-red-dark">
              {content.info.phone}
            </p>
          </a>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-2">⏰</div>
            <p className="text-sm text-stone-500">Ouverture</p>
            <p className="text-lg font-bold text-brand-dark">Mar-Dim 18h-22h</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl mb-2">🚗</div>
            <p className="text-sm text-stone-500">Livraison minimum</p>
            <p className="text-lg font-bold text-brand-dark">
              {content.info.deliveryMinimum}&euro;
            </p>
          </div>
        </div>
      </div>

      <div className="py-8" />
      <ContactSection info={content.info} />

      {/* Accessibility Info */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-brand-cream rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-3">♿ Accessibilite</h3>
              <p className="text-stone-600 text-sm">
                Notre restaurant est accessible aux personnes a mobilite reduite.
              </p>
            </div>
            <div className="bg-brand-cream rounded-xl p-6">
              <h3 className="font-heading font-bold text-lg mb-3">💳 Paiements acceptes</h3>
              <p className="text-stone-600 text-sm">
                Especes, CB (Visa, Mastercard, Maestro), Sans contact, Ticket Restaurant
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
