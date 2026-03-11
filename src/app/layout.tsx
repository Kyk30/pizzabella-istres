import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pizza Bella - Pizzeria Artisanale à Istres",
  description:
    "Pizza Bella, votre pizzeria artisanale à Istres. Pizzas généreuses de 40cm, livraison et à emporter. Ouvert du mardi au dimanche de 18h à 22h.",
  keywords: ["pizza", "pizzeria", "istres", "livraison", "à emporter", "pizza bella"],
  openGraph: {
    title: "Pizza Bella - Pizzeria Artisanale à Istres",
    description: "Pizzas artisanales de 40cm, livraison et à emporter à Istres.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
