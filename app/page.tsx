import Hero from "./components/Hero";
import DealsGrid from "./components/DealsGrid";
import DestinationReveal from "./components/DestinationReveal";
import MoodSelector from "./components/MoodSelector";
import VoucherShowcase from "./components/VoucherShowcase";
import TravelHacks from "./components/TravelHacks";
import BlogSection from "./components/BlogSection";
import ExceptionalHotels from "./components/ExceptionalHotels";
import FollowUs from "./components/FollowUs";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <DealsGrid />
      <DestinationReveal />
      <MoodSelector />
      <VoucherShowcase />
      <TravelHacks />
      <BlogSection />
      <ExceptionalHotels />
      <FollowUs />
      <Newsletter />
      <Footer />
    </main>
  );
}

