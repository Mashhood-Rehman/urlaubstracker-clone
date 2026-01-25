import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import DealsGrid from "./components/DealsGrid";
import DestinationReveal from "./components/DestinationReveal";
import MoodSelector from "./components/MoodSelector";
import VoucherShowcase from "./components/VoucherShowcase";
import TravelHacks from "./components/TravelHacks";
import BlogSection from "./components/BlogSection";
import ExceptionalHotels from "./components/ExceptionalHotels";
import FollowUs from "./components/FollowUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <CategorySection />
      <div className="md:px-24 px-5">

        <DealsGrid />
      </div>
      <DestinationReveal />
      <MoodSelector />
      <VoucherShowcase />
      <TravelHacks />
      <BlogSection />
      <ExceptionalHotels />
      <FollowUs />
      <Footer />
    </main>
  );
}

