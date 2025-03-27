//// filepath: src/App.jsx
import Header from './assets/layout/Header';
import Glav from './assets/Pages/Glav';
import Product from './assets/Pages/Product';
import Footer from './assets/layout/Footer';
import Map from './assets/components/Map';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AboutUs from './assets/components/AboutUs';
import { Helmet } from "react-helmet-async";
import UnderConstructionModal from './assets/components/UnderConstructionModal';
import BottomNav from './assets/components/BottomNav';

function App() {
  return (
    <>
    <Helmet>
        <title>Tabys Stroy | Главная страница</title>
      </Helmet>
      <UnderConstructionModal />
      <Header />
    <div className="app-container">
      <main className="main-content">
        <Glav />
        <Product />
        <AboutUs />
        <Map />
      </main>
    </div>
    <Footer />
    <BottomNav />
    </>
  );
}

export default App;