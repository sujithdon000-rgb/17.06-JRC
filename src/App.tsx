import { useState, useEffect } from 'react';
import { useStore } from './store/useStore';
import { Product, CategoryType, SubcategoryType } from './types';

// Modals
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';
import { SearchModal } from './components/common/SearchModal';
import { NotificationModal } from './components/common/NotificationModal';
import { SchemaMarkup } from './components/common/SchemaMarkup';

// Homepage Core
import { OffersSection } from './components/home/OffersSection';
import { HeroBanner } from './components/home/HeroBanner';
import { HomeShowcaseSections } from './components/home/HomeShowcaseSections';

// Commerce Segments
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutPage } from './components/cart/CheckoutPage';

// User & Admin Dashboards
import { DashboardPage } from './components/user/DashboardPage';
import { AdminPanel } from './components/admin/AdminPanel';

// Content Portals
import { WholesalePortal } from './components/pages/WholesalePortal';
import { ReturnPolicyPage } from './components/pages/ReturnPolicyPage';
import { ShippingPolicyPage } from './components/pages/ShippingPolicyPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsConditionsPage } from './components/pages/TermsConditionsPage';

export function App() {
  const { addToCart } = useStore();

  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubcategoryType | undefined>(undefined);
  
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Modals UI triggers
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedCategory, selectedSubcategory, activeProduct]);

  // Master Navigation Bridge
  const handleNavigate = (page: string, category?: CategoryType, subcategory?: SubcategoryType) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setCurrentPage(page);
    setActiveProduct(null); // reset product view
  };

  const handleSelectProduct = (prod: Product) => {
    setActiveProduct(prod);
    setCurrentPage('product-detail');
  };

  const handleQuickAddToCart = (prod: Product, size: string, color: string, quantity = 1) => {
    addToCart(prod, size, color, quantity);
    setCartDrawerOpen(true);
  };

  const handleBuyNow = (prod: Product, size: string, color: string, quantity = 1) => {
    addToCart(prod, size, color, quantity);
    setCurrentPage('checkout');
  };

  return (
    <div className="bg-[#FCFCFC] text-[#111111] min-h-screen flex flex-col justify-between antialiased selection:bg-[#D4AF37] selection:text-white font-sans">
      
      {/* Search Engine Rich Snippet Ingestion */}
      <SchemaMarkup />

      {/* Real-time production webhook visual modal engine */}
      <NotificationModal />

      {/* Main Brand Logo-Only Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Live Workspace Pages Area */}
      <main className="flex-1">
        
        {/* HOMEPAGE VIEW (Mandatory Precise Section Order) */}
        {currentPage === 'home' && !activeProduct && (
          <div className="w-full">
            {/* 1. OFFERS SECTION (FIRST) */}
            <OffersSection
              onSelectProduct={handleSelectProduct}
              onNavigateShop={(cat) => handleNavigate('shop', cat)}
            />

            {/* 2. HERO BANNER */}
            <HeroBanner
              onNavigateShop={(cat) => handleNavigate('shop', cat)}
            />

            {/* 3 to 10. NEW ARRIVALS, FEATURED COLLECTIONS, BEST SELLERS, WOMEN COLLECTIONS, KIDS COLLECTIONS, PREMIUM COLLECTIONS, CUSTOMER REVIEWS, STORE LOCATION */}
            <HomeShowcaseSections
              onSelectProduct={handleSelectProduct}
              onNavigateShop={(cat, sub) => handleNavigate('shop', cat, sub)}
              onAddToCart={handleQuickAddToCart}
            />
          </div>
        )}

        {/* REPERTOIRE CATALOG SHOP VIEW */}
        {currentPage === 'shop' && !activeProduct && (
          <ShopPage
            initialCategory={selectedCategory}
            initialSubcategory={selectedSubcategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleQuickAddToCart}
          />
        )}

        {/* DETAILED PRODUCT PAGE VIEW */}
        {currentPage === 'product-detail' && activeProduct && (
          <ProductDetailPage
            product={activeProduct}
            onBack={() => {
              if (selectedCategory) {
                setCurrentPage('shop');
              } else {
                setCurrentPage('home');
              }
              setActiveProduct(null);
            }}
            onAddToCart={handleQuickAddToCart}
            onBuyNow={handleBuyNow}
            onSelectSimilar={handleSelectProduct}
          />
        )}

        {/* SECURE CHECKOUT FUNNEL VIEW */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {/* PRIVILEGED CUSTOMER VIP DASHBOARD */}
        {currentPage === 'dashboard' && (
          <DashboardPage
            onSelectProduct={handleSelectProduct}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* ADMINISTRATIVE VAULT */}
        {currentPage === 'admin' && (
          <AdminPanel />
        )}

        {/* B2B WHOLESALE EDI SANCTUARY */}
        {currentPage === 'wholesale-portal' && (
          <WholesalePortal
            onNavigateHome={() => handleNavigate('home')}
            onNavigateShop={(cat) => handleNavigate('shop', cat)}
          />
        )}

        {/* CONCIERGE POLICIES VIEW */}
        {currentPage === 'return-policy' && (
          <ReturnPolicyPage
            onBack={() => handleNavigate('home')}
            onNavigateDashboard={() => handleNavigate('dashboard')}
          />
        )}

        {currentPage === 'shipping-policy' && (
          <ShippingPolicyPage
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'privacy-policy' && (
          <PrivacyPolicyPage
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'terms-conditions' && (
          <TermsConditionsPage
            onBack={() => handleNavigate('home')}
          />
        )}

      </main>

      {/* Main Brand Logo-Only Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        onNavigateCheckout={() => handleNavigate('checkout')}
      />

      {/* Secure Concierge Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Comprehensive Search Module Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

    </div>
  );
}

export default App;
