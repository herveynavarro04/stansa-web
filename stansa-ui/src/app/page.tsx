import { SiteNav } from '@/components/site-nav';
import { Hero } from '@/components/hero';
import { ProductsSection } from '@/components/products-section';
import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { SiteFooter } from '@/components/site-footer';

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <ProductsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
