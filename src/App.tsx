import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToHash } from "@/components/site/ScrollToHash";
import Index from "./pages/Index";
import Villa from "./pages/Villa";
import WayanadGuide from "./pages/WayanadGuide";
import NotFound from "./pages/NotFound";

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/villa" element={<Villa />} />
        <Route path="/wayanad-guide" element={<WayanadGuide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
