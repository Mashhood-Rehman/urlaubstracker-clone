import Hero from "./components/Hero";
import DealsGrid from "./components/DealsGrid";
import DestinationReveal from "./components/DestinationReveal";
import MoodSelector from "./components/MoodSelector";
import VoucherShowcase from "./components/VoucherShowcase";
import AppAndHacks from "./components/AppAndHacks";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <DealsGrid />
      <DestinationReveal />
      <MoodSelector />
      <VoucherShowcase />
      <AppAndHacks />
      <Newsletter />
      <Footer />
    </main>
  );
}
