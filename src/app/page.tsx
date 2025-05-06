import Hero from "@/sections/Hero";
import ForClubs from "@/sections/ForClubs";
import ForSponsors from "@/sections/ForSponsors";
import HowItWorks from "@/sections/HowItWorks";
import Contact from "@/sections/Contact";
import AdOpportunities from "@/components/AdOpportunities";
import SuccessStories from "@/sections/SuccessStories";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <ForClubs />
      <ForSponsors />
      <AdOpportunities />
      <SuccessStories />
      <Contact />
    </main>
  );
}
