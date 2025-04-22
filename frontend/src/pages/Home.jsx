import BestSeller from "../components/BestSeller";
import CategoriesSection from "../components/CategoriesSection";
import Hero from "../components/Hero";
import SubscribeSection from "../components/SubscribeSection";
import TheBest from "../components/TheBest";
import Verify from "./Verify";

function Home() {

  return (
    <div className="mx-[3vw] sm:mx-[4vw] md:mx-[5vw] lg:mx-[7vw]">
      <Hero />
      <CategoriesSection />
      <BestSeller />
      <TheBest />
      <SubscribeSection />
    </div>
  );
}

export default Home;