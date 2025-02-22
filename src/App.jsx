//// filepath: src/App.jsx
import './assets/styles/App.css';
import Header from './assets/layout/Header';
import Glav from './assets/Pages/Glav';
import Product from './assets/Pages/Product';
import Footer from './assets/layout/Footer';
import Map from './assets/components/Map';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Glav />
        <Product />
        <Map />
      </main>
      <Footer />
    </div>
  );
}

export default App;