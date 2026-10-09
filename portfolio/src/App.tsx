import { Footer, Nav, useHashRoute } from "@/components/site";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";

export default function App() {
  const { caseSlug } = useHashRoute();
  return (
    <div id="top" className="bg-background text-foreground min-h-screen">
      <Nav />
      {caseSlug ? <CaseStudy slug={caseSlug} /> : <Home />}
      <Footer />
    </div>
  );
}
