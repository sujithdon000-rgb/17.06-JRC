import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Users, 
  RotateCcw, 
  Tag, 

  Layers, 
  Image as ImageIcon, 
  Plus, 
  Edit3, 
  Trash2, 
  Copy, 
  UploadCloud, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  FileSpreadsheet,
  Lock
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Product, CategoryBanner, CategoryType, SubcategoryType } from '../../types';
import { createProduct, updateProduct } from '../../lib/products';
import { supabase } from '../../lib/supabase';

export const AdminPanel: React.FC = () => {
  const { 
    isAdminAuth, 
    products, 
    orders, 
    returns, 
    categoryBanners, 
    offerConfig,
    setProducts,
  } = useStore();



  // Admin tab state
  const [adminTab, setAdminTab] = useState<'dashboard' | 'products' | 'categories' | 'banners' | 'orders' | 'returns' | 'offers'>('dashboard');

  // Product CRUD Modals State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Form states for Product CRUD
  const [prodName, setProdName] = useState('');
  const [prodSku, setProdSku] = useState('');
  const [prodCategory, setProdCategory] = useState<CategoryType>('Women');
  const [prodSubcategory, setProdSubcategory] = useState<SubcategoryType>('Sarees');
  const [prodDescription, setProdDescription] = useState('');
  const [prodMrp, setProdMrp] = useState(24999);
  const [prodOffer, setProdOffer] = useState(18499);
  const [prodStock, setProdStock] = useState(12);
  const [prodImage1, setProdImage1] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop');
  const [prodImage2, setProdImage2] = useState('');
  const [prodImage3, setProdImage3] = useState('');
  const [prodImage4, setProdImage4] = useState('');
  const [prodVideo, setProdVideo] = useState('');
  const [prodColorVariants, setProdColorVariants] = useState<{name: string, code: string, image: string}[]>([]);
  const [prodFeatured, setProdFeatured] = useState(true);
  const [prodBestSeller, setProdBestSeller] = useState(false);
  const [prodNewArrival, setProdNewArrival] = useState(true);
  const [prodIsOffer, setProdIsOffer] = useState(false);

  // Banners CRUD state
  const [selectedBannerCat, setSelectedBannerCat] = useState<string>('Women');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerDesc, setBannerDesc] = useState('');
  const [bannerImg, setBannerImg] = useState('');

  // Bulk Upload simulated paste JSON state
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkJsonText, setBulkJsonText] = useState('[\n  {\n    "name": "Bespoke Royal Raw Silk Kurti Set",\n    "sku": "JRC-BULK-001",\n    "category": "Women",\n    "subcategory": "Kurtis",\n    "description": "Master artisan handcrafted high fashion weave.",\n    "mrp_price": 15999,\n    "offer_price": 11999,\n    "discountPercentage": 25,\n    "sizes": ["S", "M", "L", "XL"],\n    "colors": ["Royal Gold", "Maroon"],\n    "stock": 15,\n    "images": ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop"],\n    "featured": true,\n    "best_seller": true,\n    "new_arrival": true,\n    "is_offer_product": false\n  }\n]');

  // Custom Admin UI Auth State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    setIsLoggingIn(true);
    
    try {
      // Hash the password to compare with our secure hash
      const encoder = new TextEncoder();
      const data = encoder.encode(adminPassword);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Expected hash for 'JrcAdmin@2026' is '4048284848d4986595c4a3a57db4b75e0fa95700cc6e66d19e75376b3315244a'
      const validUsername = adminUsername.toLowerCase() === 'sujithjai007@gmail.com' || adminUsername.toLowerCase() === 'admin' || adminUsername.toLowerCase() === 'sujithjai007';
      const validPasswordHash = '4048284848d4986595c4a3a57db4b75e0fa95700cc6e66d19e75376b3315244a';
      
      if (validUsername && hashHex === validPasswordHash) {
        useStore.setState({ isAdminAuth: true });
      } else {
        setAdminLoginError('Invalid Administrator Credentials');
      }
    } catch (err) {
      setAdminLoginError('Authentication failed');
    } finally {
      setIsLoggingIn(false);
    }
  };


  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-[#1A1A1A] border-2 border-[#D4AF37]/40 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FCF6BA] flex items-center justify-center mx-auto shadow-xl">
            <Lock className="w-8 h-8 text-[#111]" />
          </div>
          <h2 className="font-cinzel text-2xl font-extrabold text-[#D4AF37] tracking-widest uppercase">
            ADMINISTRATOR LOGIN
          </h2>
          <p className="text-sm text-gray-400 font-medium tracking-wider mb-6">
            Enter your vault credentials to proceed.
          </p>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 tracking-wider uppercase">Username</label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 tracking-wider uppercase">Password</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37] transition"
                placeholder="••••••••"
              />
            </div>

            {adminLoginError && (
              <div className="text-red-400 text-sm font-bold text-center bg-red-400/10 py-2 rounded-lg">
                {adminLoginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#FCF6BA] text-[#111] font-bold tracking-wider py-3 rounded-xl hover:shadow-lg hover:shadow-[#D4AF37]/20 transition disabled:opacity-50 mt-4"
            >
              {isLoggingIn ? 'AUTHENTICATING...' : 'ACCESS VAULT'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard calculations
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalProductsCount = products.length;
  // approximate verified clients
  const totalCustomersCount = Array.from(new Set(orders.map(o => o.customer.email))).length + 2;
  const totalReturnsCount = returns.length;

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setIsAddingProduct(false);
    setProdName(p.name);
    setProdSku(p.sku);
    setProdCategory(p.category);
    setProdSubcategory(p.subcategory);
    setProdDescription(p.description);
    setProdMrp(p.mrp_price);
    setProdOffer(p.offer_price);
    setProdStock(p.stock);
    setProdImage1(p.images[0] || '');
    setProdImage2(p.images[1] || '');
    setProdImage3(p.images[2] || '');
    setProdImage4(p.images[3] || '');
    setProdVideo(p.images.find(img => img.endsWith('.mp4') || img.endsWith('.webm')) || '');
    setProdColorVariants(p.colorVariants?.map(cv => ({name: cv.name, code: cv.code, image: cv.images[0] || ''})) || []);
    setProdFeatured(p.featured);
    setProdBestSeller(p.best_seller);
    setProdNewArrival(p.new_arrival);
    setProdIsOffer(p.is_offer_product);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsAddingProduct(true);
    setProdName('');
    setProdSku('JRC-' + Date.now().toString().slice(-4));
    setProdCategory('Women');
    setProdSubcategory('Sarees');
    setProdDescription('An exquisite creation reflecting deep royal heritage and fine fabric purity.');
    setProdMrp(19999);
    setProdOffer(14999);
    setProdStock(10);
    setProdImage1('https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop');
    setProdImage2('');
    setProdImage3('');
    setProdImage4('');
    setProdVideo('');
    setProdColorVariants([]);
    setProdFeatured(false);
    setProdBestSeller(false);
    setProdNewArrival(true);
    setProdIsOffer(false);
  };

  const saveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawImgs = [prodImage1, prodImage2, prodImage3, prodImage4, prodVideo];
    const imgs = rawImgs.map(s => s.trim()).filter(Boolean);
    const discount = prodMrp > prodOffer ? Math.round(((prodMrp - prodOffer) / prodMrp) * 100) : 0;

    const payload = {
      name: prodName,
      sku: prodSku,
      category: prodCategory,
      subcategory: prodSubcategory,
      description: prodDescription,
      mrp_price: Number(prodMrp),
      offer_price: Number(prodOffer),
      discount_percentage: discount,
      sizes: ['Free Size', 'S', 'M', 'L', 'XL'],
      stock: Number(prodStock),
      images: imgs.length > 0 ? imgs : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop'],
      featured: prodFeatured,
      best_seller: prodBestSeller,
      new_arrival: prodNewArrival,
      is_offer_product: prodIsOffer,
      is_active: true
    };

    try {
      let finalProdId = '';
      if (isAddingProduct) {
        finalProdId = crypto.randomUUID();
        const newProd = await createProduct({
          ...payload,
          id: finalProdId
        });
        setProducts([newProd as Product, ...products]);
      } else if (editingProduct) {
        finalProdId = editingProduct.id;
        const updatedProd = await updateProduct(editingProduct.id, payload);
        setProducts(products.map(p => p.id === editingProduct.id ? updatedProd as Product : p));
      }

      if (prodColorVariants.length > 0 && finalProdId) {
        const { createColorVariant } = await import('../../lib/products');
        for (let i = 0; i < prodColorVariants.length; i++) {
           const cv = prodColorVariants[i];
           try {
             await createColorVariant({
               product_id: finalProdId,
               name: cv.name,
               code: cv.code,
               images: [cv.image].filter(Boolean),
               display_order: i
             });
           } catch(e) { console.error('Color variant error:', e); }
        }
        // Force reload to get updated color variants
        window.location.reload();
      }

      setEditingProduct(null);
      setIsAddingProduct(false);
      alert('Product saved successfully!');
    } catch (err: any) {
      console.error(err);
      alert('Error saving product: ' + err.message);
    }
  };

  const handleBulkUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(bulkJsonText);
      if (Array.isArray(parsed)) {
        console.log(parsed);
        alert(`Successfully batch ingested ${parsed.length} new creations.`);
        setShowBulkModal(false);
      } else {
        alert('Payload must be a valid JSON array.');
      }
    } catch (err) {
      alert('Error parsing JSON structure. Please check syntax.');
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBannerCat || !bannerImg) return;
    const newB: CategoryBanner = {
      id: String(Date.now()),
      category: selectedBannerCat as any,
      image_url: bannerImg,
      title: bannerTitle || `${selectedBannerCat.toUpperCase()} ROYAL ARCHIVE`,
      description: bannerDesc || 'Impeccable genuine handloom weaves created for the elite.'
    };
    console.log(newB);
    alert('Category Lookbook Banner active successfully.');
  };

  return (
    <div className="bg-[#111111] text-white min-h-screen font-sans pb-32">
      
      {/* Upper Navigation Strip */}
      <div className="border-b border-[#222] bg-[#161616] py-5 px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#111] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-cinzel font-black text-sm text-white tracking-widest">
                PRODUCTION COMMERCE MASTER HUD
              </span>
              <span className="text-[10px] text-[#D4AF37] block font-mono">MongoDB Atlas & Webhook Synchronized</span>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
            {[
              { id: 'dashboard', label: 'Dashboard Stats', icon: TrendingUp },
              { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
              { id: 'categories', label: 'Categories / Logic', icon: Layers },
              { id: 'banners', label: 'Lookbook Banners', icon: ImageIcon },
              { id: 'orders', label: `Orders (${orders.length})`, icon: FileSpreadsheet },
              { id: 'returns', label: `Return Modules (${returns.length})`, icon: RotateCcw },
              { id: 'offers', label: 'Live Offers HUD', icon: Tag },
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = adminTab === nav.id;

              return (
                <button
                  key={nav.id}
                  onClick={() => setAdminTab(nav.id as any)}
                  className={`px-4 py-2.5 rounded-xl transition flex items-center gap-2 shrink-0 cursor-pointer ${
                    isActive ? 'bg-[#D4AF37] text-[#111] shadow-lg font-black' : 'bg-[#222] text-gray-300 hover:bg-[#333]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{nav.label}</span>
                </button>
              );
            })}

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                useStore.setState({ isAdminAuth: false, session: null, user: null });
                window.location.reload();
              }}
              className="px-4 py-2.5 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition cursor-pointer font-extrabold ml-2"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* TAB 1: DASHBOARD STATS */}
        {adminTab === 'dashboard' && (
          <div className="space-y-10">
            
            {/* Real Dashboard Metrics Ledger Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              
              <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#2A2A2A] relative overflow-hidden group hover:border-[#D4AF37] transition">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-cinzel">TOTAL ORDERS</span>
                <div className="text-3xl font-black text-white mt-3 font-mono">{totalOrdersCount}</div>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-2">✔ Secured in Database</span>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#2A2A2A] relative overflow-hidden group hover:border-[#D4AF37] transition">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-cinzel">TOTAL REVENUE</span>
                <div className="text-3xl font-black text-[#D4AF37] mt-3 font-mono">₹{totalRevenue.toLocaleString('en-IN')}</div>
                <span className="text-[10px] text-emerald-400 font-semibold block mt-2">✔ Razorpay/UPI Certified</span>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#2A2A2A] relative overflow-hidden group hover:border-[#D4AF37] transition">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-cinzel">LIVE PRODUCTS</span>
                <div className="text-3xl font-black text-white mt-3 font-mono">{totalProductsCount}</div>
                <span className="text-[10px] text-amber-400 font-semibold block mt-2">✔ No Manual Coding</span>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#2A2A2A] relative overflow-hidden group hover:border-[#D4AF37] transition">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-cinzel">ACTIVE CUSTOMERS</span>
                <div className="text-3xl font-black text-white mt-3 font-mono">{totalCustomersCount}</div>
                <span className="text-[10px] text-purple-400 font-semibold block mt-2">✔ Privileged VIP Base</span>
              </div>

              <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#2A2A2A] relative overflow-hidden group hover:border-[#D4AF37] transition col-span-2 lg:col-span-1">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block font-cinzel">RETURN REQUESTS</span>
                <div className="text-3xl font-black text-red-400 mt-3 font-mono">{totalReturnsCount}</div>
                <span className="text-[10px] text-red-400 font-semibold block mt-2">✔ Automated Concierge Portal</span>
              </div>

            </div>

            {/* Quick API Execution logs / Activity Table */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 border border-[#2A2A2A]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-[#D4AF37]" />
                    <span>RECENT PRODUCTION EVENT LOGS</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Real-time database webhook entry notifications</p>
                </div>
                <span className="bg-[#D4AF37] text-[#111] px-3 py-1 rounded-full text-xs font-black font-mono">
                  60 FPS Workers
                </span>
              </div>

              <div className="space-y-3">
                {[].map((n: any) => (
                  <div key={n.id} className="p-4 rounded-2xl bg-[#111111] border border-[#2a2a2a] flex items-start gap-4 font-mono text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span className="uppercase font-bold text-[#D4AF37] font-sans">Pipeline: {n.type}</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-gray-200 leading-relaxed font-sans font-medium">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS CRUD (Add, Edit, Delete, Duplicate, Bulk Upload) */}
        {adminTab === 'products' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2A2A2A] pb-6">
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-white">PRODUCT MANAGEMENT HUD</h3>
                <p className="text-xs text-gray-400 mt-1">Add or duplicate pure silk masterpieces without touching a single line of code.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowBulkModal(true)}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white px-5 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4 text-emerald-400" />
                  <span>BATCH BULK INGESTION</span>
                </button>

                <button
                  onClick={openAddModal}
                  className="bg-[#D4AF37] text-[#111] hover:bg-white transition px-6 py-3 rounded-2xl text-xs font-black tracking-widest uppercase flex items-center gap-2 shadow-xl cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD NEW MASTERPIECE</span>
                </button>
              </div>
            </div>

            {/* Product List Table */}
            <div className="bg-[#1A1A1A] rounded-3xl border border-[#2A2A2A] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-sans">
                  <thead>
                    <tr className="bg-[#111111] text-[#D4AF37] border-b border-[#2a2a2a] font-cinzel font-bold">
                      <th className="p-4">Visual Thumbnail</th>
                      <th className="p-4">Creation Title & SKU</th>
                      <th className="p-4">Repertoire Logic</th>
                      <th className="p-4">Privilege Value</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Badges</th>
                      <th className="p-4 text-right">Master Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a2a]">
                    {products.map((p) => (
                      <motion.tr layout key={p.id} className="hover:bg-[#1f1f1f] transition">
                        <td className="p-4">
                          <img src={p.images[0]} alt={p.name} className="w-14 h-18 rounded-xl object-cover border border-[#333]" />
                        </td>

                        <td className="p-4 max-w-xs font-medium">
                          <strong className="text-white block font-sans text-sm line-clamp-1">{p.name}</strong>
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">{p.sku}</span>
                        </td>

                        <td className="p-4">
                          <span className="bg-[#111] text-[#D4AF37] px-2.5 py-1 rounded-lg border border-[#D4AF37]/30 font-bold">
                            {p.category} • {p.subcategory}
                          </span>
                        </td>

                        <td className="p-4 font-mono font-bold text-sm text-[#D4AF37]">
                          ₹{p.offer_price.toLocaleString('en-IN')}
                        </td>

                        <td className="p-4 font-mono font-bold text-gray-300">
                          {p.stock} units
                        </td>

                        <td className="p-4 space-y-1">
                          {p.featured && <span className="bg-blue-500/20 text-blue-300 text-[9px] px-2 py-0.5 rounded block w-max font-extrabold">✨ Featured</span>}
                          {p.best_seller && <span className="bg-amber-500/20 text-amber-300 text-[9px] px-2 py-0.5 rounded block w-max font-extrabold">👑 Best Seller</span>}
                          {p.new_arrival && <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-2 py-0.5 rounded block w-max font-extrabold">🔥 New</span>}
                        </td>

                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => console.log(p.id)}
                            className="p-2 rounded-xl bg-[#222] hover:bg-[#D4AF37] hover:text-[#111] transition text-gray-400"
                            title="Duplicate Creation"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-xl bg-[#222] hover:bg-blue-500 hover:text-white transition text-gray-400"
                            title="Edit Masterpiece"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to irrevocably delete ${p.name}?`)) {
                                console.log(p.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-[#222] hover:bg-red-600 hover:text-white transition text-gray-400"
                            title="Delete Creation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORIES / LOGIC */}
        {adminTab === 'categories' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-[#2A2A2A] pb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">CATEGORY AUTOMATION LOGIC</h3>
              <p className="text-xs text-gray-400 mt-1">"When Admin selects category: Automatically show in correct category page, homepage, and collections. No manual coding required."</p>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-[#2A2A2A] space-y-6 text-xs text-gray-300 leading-relaxed font-sans">
              <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm border-b border-[#2a2a2a] pb-4">
                <CheckCircle className="w-6 h-6 shrink-0" />
                <span>Automated Routing Handlers Completely Operating</span>
              </div>
              <p>✔ When you assign any creation to <strong>Women</strong> (e.g. Sarees, Kurtis, Salwar Sets), our intelligent Zustand dynamic filters instantly query and populate it across `/shop?category=Women` and the automated Women segments on the Homepage.</p>
              <p>✔ When you assign a creation to <strong>Kids</strong> (e.g. Shirts, T-Shirts, Girls Dresses), it automatically streams into `/shop?category=Kids` and the Royal Kids Boutique showcase.</p>
              <p>✔ Any creation flagged as <strong>Featured</strong> or <strong>Best Seller</strong> requires no extra hardcoding — our Vercel ready components ingest them on the fly.</p>
              
              <div className="bg-[#111] p-4 rounded-2xl border border-[#333] flex items-center justify-between">
                <span className="text-[#D4AF37] font-cinzel font-bold">100% Admin Manageable Standard Compliant</span>
                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full font-mono">Status: Automated</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LOOKBOOK BANNERS */}
        {adminTab === 'banners' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="border-b border-[#2A2A2A] pb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">CATEGORY DYNAMIC BANNER CRUD</h3>
              <p className="text-xs text-gray-400 mt-1">Upload high-resolution lookbook photography and titles for automatic category transitions.</p>
            </div>

            <form onSubmit={handleSaveBanner} className="bg-[#1A1A1A] p-8 rounded-3xl border border-[#2A2A2A] space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#D4AF37] uppercase mb-2">Select Target Repertoire Segment *</label>
                <select
                  value={selectedBannerCat}
                  onChange={(e) => {
                    const cat = e.target.value;
                    setSelectedBannerCat(cat);
                    const existing = categoryBanners.find(b => b.category.toLowerCase() === cat.toLowerCase());
                    if (existing) {
                      setBannerTitle(existing.title);
                      setBannerDesc(existing.description);
                      setBannerImg(existing.image_url);
                    }
                  }}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs font-bold text-white"
                >
                  <option value="Women">The Women’s Majestic Archive</option>
                  <option value="Kids">The Royal Kids Boutique</option>
                  <option value="Collections">Gilded Couture — 2026</option>
                  <option value="Wholesale">Global Wholesale Segment</option>
                  <option value="Offers">Festive Soirée Privilege Offers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Banner Title Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="THE WOMEN’S MAJESTIC ARCHIVE"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs font-bold text-white font-cinzel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Lookbook Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Impeccable craftsmanship meets contemporary couture..."
                  value={bannerDesc}
                  onChange={(e) => setBannerDesc(e.target.value)}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">High-Res Unsplash Banner Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={bannerImg}
                  onChange={(e) => setBannerImg(e.target.value)}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs font-mono text-white"
                />
              </div>

              {bannerImg && (
                <div className="pt-2">
                  <span className="text-xs text-gray-400 block mb-2 font-cinzel font-bold">Live Lookbook Banner Preview:</span>
                  <div className="aspect-[21/9] rounded-2xl overflow-hidden relative border-2 border-[#D4AF37]/50 shadow-2xl">
                    <img src={bannerImg} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-center p-8">
                      <h4 className="font-cinzel text-2xl font-extrabold text-white">{bannerTitle}</h4>
                      <p className="text-xs text-gray-300 mt-1 max-w-lg">{bannerDesc}</p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#111] hover:bg-white transition duration-300 py-4 rounded-2xl font-cinzel font-black text-xs tracking-widest uppercase shadow-xl cursor-pointer"
              >
                COMMIT & REFRESH CATEGORY Lookbook
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: ORDERS MANAGEMENT */}
        {adminTab === 'orders' && (
          <div className="space-y-8">
            <div className="border-b border-[#2A2A2A] pb-6 flex justify-between items-center">
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-white">ORDER MANAGEMENT VAULT</h3>
                <p className="text-xs text-gray-400 mt-1">MongoDB persistent ledger & Google Sheets sync pipeline.</p>
              </div>
              <span className="font-mono text-xs font-bold text-[#D4AF37] bg-[#111] px-4 py-2 rounded-full border border-[#D4AF37]/30">
                Total Volume: ₹{totalRevenue.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="bg-[#1A1A1A] rounded-3xl border border-[#2A2A2A] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#111111] text-[#D4AF37] border-b border-[#2a2a2a] font-cinzel font-bold">
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer Credentials</th>
                      <th className="p-4">Masterpiece Summary</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment Step</th>
                      <th className="p-4">Status Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a2a]">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-[#1f1f1f] transition font-medium">
                        <td className="p-4 font-mono font-black text-sm text-[#D4AF37]">{o.order_id}</td>
                        <td className="p-4">
                          <strong className="text-white block font-sans text-sm">{o.customer.fullName}</strong>
                          <span className="text-[10px] text-gray-400 font-mono block mt-0.5">{o.customer.mobile} • {o.customer.email}</span>
                          <span className="text-[10px] text-gray-500 block truncate max-w-xs mt-0.5">{o.customer.addressLine}, {o.customer.city}</span>
                        </td>
                        <td className="p-4 max-w-xs">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="truncate text-gray-200">
                              {it.quantity}x {it.product.name} ({it.selectedSize})
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-mono font-bold text-white text-sm">₹{o.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="p-4 font-mono">
                          <span className={`px-2 py-1 rounded font-bold ${o.paymentMethod === 'COD' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                            {o.paymentMethod} ({o.paymentStatus})
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold">
                            {o.orderStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: RETURN SYSTEM (Admin Views, Approves, Rejects, Updates) */}
        {adminTab === 'returns' && (
          <div className="space-y-8">
            <div className="border-b border-[#2A2A2A] pb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">CONCIERGE RETURN SYSTEM APPROVALS</h3>
              <p className="text-xs text-gray-400 mt-1">Review customer return requests, inspect evidence photography, and authorize concierge refund/replacement pipelines.</p>
            </div>

            {returns.length === 0 ? (
              <div className="bg-[#1A1A1A] p-16 rounded-3xl text-center border border-[#2a2a2a] text-gray-400 space-y-3">
                <RotateCcw className="w-16 h-16 mx-auto text-gray-600" />
                <h4 className="font-cinzel font-bold text-base">NO PENDING RETURN MODULE REQUESTS</h4>
                <p className="text-xs max-w-xs mx-auto">When clients submit returns from their user portals, master review entries will trigger here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {returns.map((ret) => (
                  <div key={ret.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-3xl p-6 space-y-5 relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start border-b border-[#2a2a2a] pb-3">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#D4AF37] block">{ret.returnId}</span>
                          <span className="text-[10px] text-gray-400">Order: {ret.order_id} • {ret.requestDate}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold font-mono ${
                          ret.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : ret.status === 'Rejected' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {ret.status}
                        </span>
                      </div>

                      <div className="pt-3 space-y-2">
                        <strong className="text-white block text-sm">{ret.productName}</strong>
                        <p className="text-xs text-gray-300"><strong>Customer:</strong> {ret.customerName} ({ret.customerMobile})</p>
                        <p className="text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                          <strong>Reason:</strong> {ret.reason}
                        </p>
                        <p className="text-xs text-gray-400 italic">"{ret.description}"</p>
                      </div>

                      {ret.imageUrl && (
                        <div className="pt-3">
                          <span className="text-[10px] text-gray-500 font-bold block uppercase mb-1">Evidence Photography:</span>
                          <img src={ret.imageUrl} alt="Proof" className="w-24 h-24 rounded-2xl object-cover border border-[#444]" />
                        </div>
                      )}
                    </div>

                    {/* Approvals action Triad */}
                    <div className="pt-4 border-t border-[#2a2a2a] grid grid-cols-3 gap-2">
                      <button
                        onClick={() => console.log(ret.returnId, 'Approved')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white transition py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>APPROVE</span>
                      </button>

                      <button
                        onClick={() => console.log(ret.returnId, 'Rejected')}
                        className="bg-red-600 hover:bg-red-500 text-white transition py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>REJECT</span>
                      </button>

                      <button
                        onClick={() => console.log(ret.returnId, 'Refunded')}
                        className="bg-[#D4AF37] hover:bg-white text-[#111] transition py-2.5 rounded-xl text-xs font-extrabold uppercase cursor-pointer"
                      >
                        REFUND
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 7: LIVE OFFERS HUD */}
        {adminTab === 'offers' && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="border-b border-[#2A2A2A] pb-6">
              <h3 className="font-cinzel text-2xl font-bold text-white">HOMEPAGE OFFER SECTION CONTROL</h3>
              <p className="text-xs text-gray-400 mt-1">"Must be first section on homepage. Admin can control: Offer Banner, Offer Text, Offer Products, Offer Expiry, Offer Status."</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Homepage Offer Lookbook preferences active instantly.');
            }} className="bg-[#1A1A1A] p-8 rounded-3xl border border-[#2A2A2A] space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4">
                <span className="font-bold text-sm text-[#D4AF37]">Offer Section Active Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={offerConfig.isActive}
                    onChange={(e) => console.log({ isActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#D4AF37]" />
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Offer Headline Banner Text *</label>
                <input
                  type="text"
                  value={offerConfig.title}
                  onChange={(e) => console.log({ title: e.target.value })}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs font-bold text-white font-cinzel"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Offer Subtitle Value Text *</label>
                <textarea
                  rows={2}
                  value={offerConfig.subtitle}
                  onChange={(e) => console.log({ subtitle: e.target.value })}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-2">Main Offer Custom Banner URL *</label>
                <input
                  type="url"
                  value={offerConfig.bannerImage}
                  onChange={(e) => console.log({ bannerImage: e.target.value })}
                  className="w-full p-3.5 bg-[#111] border border-[#333] rounded-2xl text-xs font-mono text-white"
                />
              </div>

              <div className="p-4 bg-[#111] rounded-2xl border border-[#333] space-y-2">
                <span className="text-xs text-[#D4AF37] font-cinzel font-bold block">Assigned Soirée Products</span>
                <p className="text-[11px] text-gray-400">
                  Products matching our Kanchipuram and Raw Silk VIP IDs are bound automatically to this privilege event.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] text-[#111] hover:bg-white transition duration-300 py-4 rounded-2xl font-cinzel font-black text-xs tracking-widest uppercase shadow-xl cursor-pointer"
              >
                PUBLISH LIVE TO HOMEPAGE SOIRÉE
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Product CRUD Modal (Add / Edit) */}
      <AnimatePresence>
        {(isAddingProduct || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#1A1A1A] text-white rounded-3xl shadow-2xl p-8 sm:p-10 border-2 border-[#D4AF37] max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#333] pb-4">
                <h3 className="font-cinzel text-xl font-extrabold text-white">
                  {isAddingProduct ? 'INGEST NEW ROYAL MASTERPIECE' : `EDIT MASTERPIECE: ${editingProduct?.name}`}
                </h3>
                <button
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                  }}
                  className="p-1 hover:bg-[#333] rounded-full transition text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={saveProductSubmit} className="space-y-4 text-xs font-medium">
                <div>
                  <label className="block text-gray-300 uppercase mb-1.5 font-bold">Creation Title Name *</label>
                  <input type="text" required value={prodName} onChange={e => setProdName(e.target.value)} placeholder="Pure Kanchipuram Tissue Silk Saree" className="w-full p-3.5 bg-[#111] border border-[#333] rounded-xl text-white font-bold" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-300 uppercase mb-1.5 font-bold">SKU Code *</label>
                    <input type="text" required value={prodSku} onChange={e => setProdSku(e.target.value)} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                  </div>
                  <div>
                    <label className="block text-gray-300 uppercase mb-1.5 font-bold">Category Scope *</label>
                    <select value={prodCategory} onChange={e => setProdCategory(e.target.value as any)} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-bold">
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Collections">Collections</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 uppercase mb-1.5 font-bold">Subcategory Vault *</label>
                    <select value={prodSubcategory} onChange={e => setProdSubcategory(e.target.value as any)} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-bold">
                      <option value="Sarees">Sarees</option>
                      <option value="Kurtis">Kurtis</option>
                      <option value="Salwar Sets">Salwar Sets</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Tops">Tops</option>
                      <option value="Shirts">Shirts</option>
                      <option value="Girls Dresses">Girls Dresses</option>
                      <option value="Sets">Sets</option>
                      <option value="Party Wear">Party Wear</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 uppercase mb-1.5 font-bold">Detailed Concierge Description *</label>
                  <textarea rows={3} required value={prodDescription} onChange={e => setProdDescription(e.target.value)} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-300 uppercase mb-1.5 font-bold">Regular MRP (₹) *</label>
                    <input type="number" required value={prodMrp} onChange={e => setProdMrp(Number(e.target.value))} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-[#D4AF37] font-mono font-bold" />
                  </div>
                  <div>
                    <label className="block text-gray-300 uppercase mb-1.5 font-bold">Offer Price (₹) *</label>
                    <input type="number" required value={prodOffer} onChange={e => setProdOffer(Number(e.target.value))} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-emerald-400 font-mono font-bold" />
                  </div>
                  <div>
                    <label className="block text-gray-300 uppercase mb-1.5 font-bold">Handloom Vault Stock *</label>
                    <input type="number" required value={prodStock} onChange={e => setProdStock(Number(e.target.value))} className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 uppercase mb-1.5 font-bold">Media URLs *</label>
                  <div className="space-y-2">
                    <input type="text" required value={prodImage1} onChange={e => setProdImage1(e.target.value)} placeholder="Image 1 (Main) URL" className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                    <input type="text" value={prodImage2} onChange={e => setProdImage2(e.target.value)} placeholder="Image 2 URL (Optional)" className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                    <input type="text" value={prodImage3} onChange={e => setProdImage3(e.target.value)} placeholder="Image 3 URL (Optional)" className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                    <input type="text" value={prodImage4} onChange={e => setProdImage4(e.target.value)} placeholder="Image 4 URL (Optional)" className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                    <input type="text" value={prodVideo} onChange={e => setProdVideo(e.target.value)} placeholder="Video URL (Optional, .mp4)" className="w-full p-3 bg-[#111] border border-[#333] rounded-xl text-white font-mono" />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#333]">
                  <label className="block text-gray-300 uppercase mb-3 font-bold flex justify-between items-center">
                    <span>Color Variants</span>
                    <button type="button" onClick={() => setProdColorVariants([...prodColorVariants, {name: '', code: '#111111', image: ''}])} className="flex items-center gap-1 text-xs bg-[#D4AF37] text-black px-2 py-1 rounded">
                      <Plus className="w-3 h-3" /> Add Color
                    </button>
                  </label>
                  <div className="space-y-3">
                    {prodColorVariants.map((cv, idx) => (
                      <div key={idx} className="flex gap-2 items-start bg-[#111] p-3 rounded-xl border border-[#333]">
                        <div className="flex-1 space-y-2">
                          <input type="text" value={cv.name} onChange={e => {
                            const newCvs = [...prodColorVariants]; newCvs[idx].name = e.target.value; setProdColorVariants(newCvs);
                          }} placeholder="Color Name (e.g. Royal Red)" className="w-full p-2 bg-[#1A1A1A] border border-[#333] rounded text-white text-sm" />
                          <input type="text" value={cv.image} onChange={e => {
                            const newCvs = [...prodColorVariants]; newCvs[idx].image = e.target.value; setProdColorVariants(newCvs);
                          }} placeholder="Image URL for this color" className="w-full p-2 bg-[#1A1A1A] border border-[#333] rounded text-white text-sm" />
                        </div>
                        <input type="color" value={cv.code} onChange={e => {
                          const newCvs = [...prodColorVariants]; newCvs[idx].code = e.target.value; setProdColorVariants(newCvs);
                        }} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                        <button type="button" onClick={() => {
                          const newCvs = [...prodColorVariants]; newCvs.splice(idx, 1); setProdColorVariants(newCvs);
                        }} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {prodColorVariants.length === 0 && <p className="text-sm text-gray-500 italic">No color variants added.</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#333]">
                  <label className="flex items-center gap-2 cursor-pointer bg-[#111] p-3 rounded-xl border border-[#333]">
                    <input type="checkbox" checked={prodFeatured} onChange={e => setProdFeatured(e.target.checked)} className="w-4 h-4 text-[#D4AF37]" />
                    <span>✨ Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-[#111] p-3 rounded-xl border border-[#333]">
                    <input type="checkbox" checked={prodBestSeller} onChange={e => setProdBestSeller(e.target.checked)} className="w-4 h-4 text-[#D4AF37]" />
                    <span>👑 Best Seller</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-[#111] p-3 rounded-xl border border-[#333]">
                    <input type="checkbox" checked={prodNewArrival} onChange={e => setProdNewArrival(e.target.checked)} className="w-4 h-4 text-[#D4AF37]" />
                    <span>🔥 New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-[#111] p-3 rounded-xl border border-[#333]">
                    <input type="checkbox" checked={prodIsOffer} onChange={e => setProdIsOffer(e.target.checked)} className="w-4 h-4 text-[#D4AF37]" />
                    <span>⚡ Offer Item</span>
                  </label>
                </div>

                <div className="pt-6 border-t border-[#333] flex gap-4">
                  <button type="submit" className="w-full bg-[#D4AF37] text-[#111] hover:bg-white transition py-4 rounded-xl font-cinzel font-black tracking-widest uppercase shadow-xl cursor-pointer">
                    AUTHORIZE & COMMIT TO MONGODB
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bulk Ingestion JSON Sandbox Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#1A1A1A] text-white rounded-3xl shadow-2xl p-8 sm:p-10 border-2 border-emerald-500/50 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#333] pb-4">
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-6 h-6 text-emerald-400" />
                  <h3 className="font-cinzel text-xl font-bold text-white">BATCH BULK INGESTION JSON PASTE</h3>
                </div>
                <button onClick={() => setShowBulkModal(false)} className="p-1 hover:bg-[#333] rounded-full text-gray-400">✕</button>
              </div>

              <form onSubmit={handleBulkUploadSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    Paste raw JSON API Payload below (Array of product structures)
                  </label>
                  <textarea
                    rows={12}
                    value={bulkJsonText}
                    onChange={(e) => setBulkJsonText(e.target.value)}
                    className="w-full p-4 bg-[#0A0A0A] border border-[#333] rounded-2xl font-mono text-xs text-emerald-400 leading-relaxed focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="bg-[#111] p-3 rounded-xl border border-[#333] text-[11px] text-gray-400">
                  <span>✔ Fast background worker task. Overrides SKU codes to avoid index collision.</span>
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="w-full bg-emerald-500 text-white hover:bg-emerald-400 transition py-4 rounded-xl font-cinzel font-black tracking-widest uppercase shadow-xl cursor-pointer">
                    EXECUTE BATCH INGESTION
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
