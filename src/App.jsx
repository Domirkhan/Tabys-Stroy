import Header from "./assets/layout/Header";
import Glav from "./assets/Pages/Glav";
import Footer from "./assets/layout/Footer";
import Map from "./assets/components/Map";
import AboutUs from "./assets/components/AboutUs";
import { Helmet } from "react-helmet-async";
import UnderConstructionModal from "./assets/components/UnderConstructionModal";
import BottomNav from "./assets/components/BottomNav";
import NewProducts from "./assets/components/NewProducts";

function App() {
  return (
    <>
      <Helmet>
        <title>Tabys Stroy | Главная страница</title>
        <link rel="canonical" href="https://tabys-stroy.kz/" />
      </Helmet>
      <UnderConstructionModal />
      <Header />
      <div className="app-container">
        <main className="main-content">
          <div className="animate-fade-up">
            <Glav />
          </div>
          <div className="animate-fade-left delay-200">
            <NewProducts />
          </div>
          <div className="animate-fade-right delay-300">
            <AboutUs />
          </div>
          <div className="animate-fade-up delay-400">
            <Map />
          </div>
        </main>
      </div>
      <Footer />
      <BottomNav />
    </>
  );
}

export default App;
