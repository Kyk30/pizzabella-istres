import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();

  return (
    <>
      <Header info={content.info} />
      <main className="flex-1">{children}</main>
      <Footer info={content.info} />
    </>
  );
}
