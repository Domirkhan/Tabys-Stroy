import '../../assets/styles/Product.css';
function Product() {
    const products = [
      {
        name: 'Перфоратор Bosch GBH 2-26',
        price: 12999,
        oldPrice: 15999,
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400',
      },
      {
        name: 'Шуруповерт DeWalt DCD777',
        price: 8999,
        oldPrice: 10999,
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400',
      },
      {
        name: 'Болгарка Makita GA5030',
        price: 5999,
        oldPrice: 7499,
        image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a961?auto=format&fit=crop&w=400',
      },
      {
        name: 'Лобзик Milwaukee M18',
        price: 9999,
        oldPrice: 12499,
        image: 'https://images.unsplash.com/photo-1426927308491-6380b6a9936f?auto=format&fit=crop&w=400',
      },
    ];
  
    return (
      <>
        <section className="product-section py-20 bg-light-gray">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-3xl font-bold text-center mb-12">Популярные товары</h2>
            <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div key={index} className="product-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="product-name text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="price-wrapper flex items-center space-x-2 mb-4">
                    <span className="current-price text-xl font-bold text-primary">{product.price} тг</span>
                    <span className="old-price text-sm text-gray-400 line-through">{product.oldPrice}тг</span>
                  </div>
                  <button className="add-to-cart-btn w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    В корзину
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
  export default Product;
  