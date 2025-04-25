import Header from './assets/layout/Header';
import Glav from './assets/Pages/Glav';
import Footer from './assets/layout/Footer';
import Map from './assets/components/Map';
import AboutUs from './assets/components/AboutUs';
import { Helmet } from "react-helmet-async";
import UnderConstructionModal from './assets/components/UnderConstructionModal';
import BottomNav from './assets/components/BottomNav';
import NewProducts from './assets/components/NewProducts'; // Новый компонент

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
          <NewProducts /> {/* Новый компонент для отображения новых товаров */}
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