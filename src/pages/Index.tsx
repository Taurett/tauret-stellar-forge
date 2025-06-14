
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Contact from "@/components/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Index = () => {
  return (
    <div className="min-h-screen bg-black">
      <LanguageSwitcher />
      <Hero />
      <Features />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
