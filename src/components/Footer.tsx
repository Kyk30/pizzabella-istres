import Link from "next/link";
import { RestaurantInfo } from "@/lib/types";

export default function Footer({ info }: { info: RestaurantInfo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-400 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍕</span>
              <span className="text-xl font-heading font-bold text-white">
                {info.name}
              </span>
            </div>
            <p className="text-sm">{info.subtitle}</p>
            <p className="text-sm mt-2">
              {info.address}, {info.postalCode} {info.city}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-gold transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-brand-gold transition-colors">
                  La Carte
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${info.phone.replace(/\s/g, "")}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  📞 {info.phone}
                </a>
              </li>
              {info.socialLinks.facebook && (
                <li>
                  <a
                    href={info.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {info.socialLinks.instagram && (
                <li>
                  <a
                    href={info.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-500">
          <p>&copy; {currentYear} {info.name}. Tous droits reserves.</p>
        </div>
      </div>
    </footer>
  );
}
