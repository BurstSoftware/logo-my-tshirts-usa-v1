import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/lib/cart';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import ProductPage from '@/pages/ProductPage';
import DesignerPage from '@/pages/DesignerPage';
import CheckoutPage from '@/pages/CheckoutPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/designer" element={<DesignerPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
