
import Footer from "@/components/layout/Footer";
import AboutWe from "@/components/ui/aboutWe";
import FeedBack from "@/components/ui/FeedBack";
import Hero from "@/components/ui/Hero";
import Products from "@/components/ui/products";
import WhyUs from "@/components/ui/whyUs";

export default function Page() {
  return <div className="bg-[#07120f]">
    <Hero />
    <WhyUs />
    <Products />
    <AboutWe />
    <FeedBack />
    <Footer />
  </div>;
}
