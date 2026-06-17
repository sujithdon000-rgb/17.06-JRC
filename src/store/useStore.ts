import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Product, 
  CartItem, 
  Order, 
  ReturnRequest, 
  User, 
  CategoryBanner, 
  HomepageBanner, 
  OfferSectionConfig,
  CategoryType,
  SubcategoryType,
  Address
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORY_BANNERS, 
  INITIAL_HOME_BANNERS, 
  INITIAL_OFFER_CONFIG 
} from '../data/initialData';

interface NotificationItem {
  id: string;
  message: string;
  date: string;
  read: boolean;
  type: 'order' | 'return' | 'wholesale';
}

interface LiveSimulationState {
  isOpen: boolean;
  type?: 'email' | 'whatsapp' | 'sheets' | 'wholesale';
  title?: string;
  data?: any;
}

interface ShopFilters {
  category: CategoryType | '';
  subcategory: SubcategoryType | '';
  searchQuery: string;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  onlyOffers: boolean;
  onlyBestSellers: boolean;
  onlyNewArrivals: boolean;
}

interface StoreState {
  // Database / Catalog state
  products: Product[];
  categoryBanners: CategoryBanner[];
  homepageBanners: HomepageBanner[];
  offerConfig: OfferSectionConfig;
  
  // User & Auth
  user: User | null;
  isAdminAuth: boolean;
  
  // Cart & Wishlist
  cart: CartItem[];
  wishlist: string[]; // product IDs
  
  // Orders & Returns
  orders: Order[];
  returns: ReturnRequest[];
  adminNotifications: NotificationItem[];
  
  // App UI / Navigation States
  liveSimulation: LiveSimulationState;
  filters: ShopFilters;
  
  // Actions - Actions
  setFilters: (filters: Partial<ShopFilters>) => void;
  resetFilters: () => void;
  
  // Auth Actions
  loginUser: (mobileOrEmail: string, authType: 'otp-mobile' | 'otp-email' | 'google', name?: string) => void;
  logoutUser: () => void;
  saveAddress: (address: Address) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  
  // Cart Actions
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  
  // Checkout & Order
  placeOrder: (customer: Address, paymentMethod: 'UPI' | 'Razorpay' | 'COD', orderNotes?: string) => Order;
  cancelOrder: (orderId: string) => void;
  
  // Return Actions
  requestReturn: (orderId: string, productName: string, reason: string, description: string, imageUrl?: string) => void;
  updateReturnStatus: (returnId: string, status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded') => void;
  
  // Admin CRUD - Products
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  bulkUploadProducts: (products: Omit<Product, 'id'>[]) => void;
  
  // Admin CRUD - Category Banners
  updateCategoryBanner: (banner: CategoryBanner) => void;
  
  // Admin CRUD - Homepage Banners
  addHomeBanner: (banner: Omit<HomepageBanner, 'id'>) => void;
  deleteHomeBanner: (id: string) => void;
  updateHomeBanner: (banner: HomepageBanner) => void;
  
  // Admin CRUD - Offers
  updateOfferConfig: (config: Partial<OfferSectionConfig>) => void;
  
  // Simulation Modal action
  openSimulation: (type: LiveSimulationState['type'], title: string, data: any) => void;
  closeSimulation: () => void;
  markNotificationsRead: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: INITIAL_PRODUCTS,
      categoryBanners: INITIAL_CATEGORY_BANNERS,
      homepageBanners: INITIAL_HOME_BANNERS,
      offerConfig: INITIAL_OFFER_CONFIG,
      user: {
        id: 'usr-1',
        name: 'Aishwarya Singhania',
        email: 'aishwarya.singhania@example.com',
        mobile: '+91 98765 43210',
        isVerified: true,
        authType: 'otp-mobile',
        savedAddresses: [
          {
            fullName: 'Aishwarya Singhania',
            mobile: '+91 98765 43210',
            email: 'aishwarya.singhania@example.com',
            addressLine: 'A-45, Vasant Vihar, Ultra Premium Mansions',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110057'
          }
        ]
      },
      isAdminAuth: true, // Started with demo admin logged in for easy testing
      cart: [],
      wishlist: ['prod-1', 'prod-6'],
      orders: [
        {
          id: 'ord-101',
          orderId: 'JRC-2026-8819',
          date: 'February 15, 2026',
          customer: {
            fullName: 'Aishwarya Singhania',
            mobile: '+91 98765 43210',
            email: 'aishwarya.singhania@example.com',
            addressLine: 'A-45, Vasant Vihar, Ultra Premium Mansions',
            city: 'New Delhi',
            state: 'Delhi',
            pincode: '110057'
          },
          items: [
            {
              product: INITIAL_PRODUCTS[0],
              selectedSize: 'Free Size',
              selectedColor: 'Luxury Gold',
              quantity: 1
            }
          ],
          totalAmount: 26999,
          subtotal: 34999,
          discount: 8000,
          shippingFee: 0,
          paymentMethod: 'UPI',
          paymentStatus: 'Paid',
          orderStatus: 'Delivered',
          trackingNumber: 'DEL-JRC-99881'
        }
      ],
      returns: [],
      adminNotifications: [
        {
          id: 'notif-1',
          message: 'New Order JRC-2026-8819 received from Aishwarya Singhania (₹26,999). Placed via Google Sheets Bot.',
          date: 'February 15, 2026',
          read: false,
          type: 'order'
        }
      ],
      liveSimulation: {
        isOpen: false
      },
      filters: {
        category: '',
        subcategory: '',
        searchQuery: '',
        maxPrice: 150000,
        sizes: [],
        colors: [],
        onlyOffers: false,
        onlyBestSellers: false,
        onlyNewArrivals: false
      },

      // Actions
      setFilters: (newFilters) => set((state) => ({ filters: { ...state.filters, ...newFilters } })),
      resetFilters: () => set({
        filters: {
          category: '',
          subcategory: '',
          searchQuery: '',
          maxPrice: 150000,
          sizes: [],
          colors: [],
          onlyOffers: false,
          onlyBestSellers: false,
          onlyNewArrivals: false
        }
      }),

      loginUser: (mobileOrEmail, authType, name) => set((state) => {
        const existing = state.user;
        const displayName = name || (existing ? existing.name : 'Valued Connoisseur');
        return {
          user: {
            id: 'usr-' + Date.now().toString().slice(-4),
            name: displayName,
            email: authType === 'otp-email' ? mobileOrEmail : 'user@jeevruthi.com',
            mobile: authType === 'otp-mobile' ? mobileOrEmail : '+91 98765 00000',
            isVerified: true,
            authType,
            savedAddresses: existing?.savedAddresses || []
          }
        };
      }),

      logoutUser: () => set({ user: null }),

      saveAddress: (newAddr) => set((state) => {
        if (!state.user) return state;
        return {
          user: {
            ...state.user,
            savedAddresses: [...state.user.savedAddresses, newAddr]
          }
        };
      }),

      loginAdmin: (pass) => {
        if (pass === 'admin123' || pass === 'premium2026') {
          set({ isAdminAuth: true });
          return true;
        }
        return false;
      },
      logoutAdmin: () => set({ isAdminAuth: false }),

      addToCart: (product, size, color, quantity = 1) => set((state) => {
        const existingIndex = state.cart.findIndex(
          item => item.product.id === product.id && 
                  item.selectedSize === size && 
                  item.selectedColor === color
        );

        if (existingIndex > -1) {
          const newCart = [...state.cart];
          newCart[existingIndex].quantity += quantity;
          return { cart: newCart };
        } else {
          return {
            cart: [...state.cart, { product, selectedSize: size, selectedColor: color, quantity }]
          };
        }
      }),

      removeFromCart: (index) => set((state) => ({
        cart: state.cart.filter((_, i) => i !== index)
      })),

      updateCartQuantity: (index, quantity) => set((state) => {
        const newCart = [...state.cart];
        if (quantity <= 0) {
          return { cart: state.cart.filter((_, i) => i !== index) };
        }
        newCart[index].quantity = quantity;
        return { cart: newCart };
      }),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) => set((state) => {
        const exists = state.wishlist.includes(productId);
        if (exists) {
          return { wishlist: state.wishlist.filter(id => id !== productId) };
        } else {
          return { wishlist: [...state.wishlist, productId] };
        }
      }),

      placeOrder: (customer, paymentMethod, orderNotes) => {
        const { cart, orders, adminNotifications } = get();
        
        let subtotal = 0;
        let discount = 0;
        let totalAmount = 0;

        cart.forEach(item => {
          const mrpSum = item.product.mrpPrice * item.quantity;
          const offerSum = item.product.offerPrice * item.quantity;
          subtotal += mrpSum;
          discount += (mrpSum - offerSum);
          totalAmount += offerSum;
        });

        const newOrder: Order = {
          id: 'ord-' + Date.now().toString().slice(-4),
          orderId: 'JRC-2026-' + Math.floor(1000 + Math.random() * 9000),
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          customer,
          items: [...cart],
          totalAmount,
          subtotal,
          discount,
          shippingFee: 0,
          paymentMethod,
          paymentStatus: paymentMethod === 'COD' ? 'Pending COD' : 'Paid',
          orderStatus: 'Order Placed',
          orderNotes,
          trackingNumber: 'JRC-TRK-' + Math.floor(100000 + Math.random() * 900000)
        };

        const newNotif: NotificationItem = {
          id: 'notif-' + Date.now(),
          message: `NEW ORDER ${newOrder.orderId}: ₹${newOrder.totalAmount.toLocaleString('en-IN')} via ${paymentMethod} from ${customer.fullName}. Added to Google Sheets & Sent WhatsApp.`,
          date: newOrder.date,
          read: false,
          type: 'order'
        };

        set({
          orders: [newOrder, ...orders],
          cart: [],
          adminNotifications: [newNotif, ...adminNotifications],
          liveSimulation: {
            isOpen: true,
            type: 'sheets',
            title: `Order ${newOrder.orderId} Successfully Synced to MongoDB & Google Sheets`,
            data: newOrder
          }
        });

        return newOrder;
      },

      cancelOrder: (orderId) => set((state) => ({
        orders: state.orders.map(o => o.orderId === orderId ? { ...o, orderStatus: 'Cancelled' } : o)
      })),

      requestReturn: (orderId, productName, reason, description, imageUrl) => {
        const { returns, adminNotifications, orders } = get();
        const targetOrder = orders.find(o => o.orderId === orderId);

        const newReturn: ReturnRequest = {
          id: 'ret-' + Date.now().toString().slice(-4),
          returnId: 'JRC-RET-' + Math.floor(100 + Math.random() * 900),
          orderId,
          productName,
          customerName: targetOrder ? targetOrder.customer.fullName : 'Premium Customer',
          customerEmail: targetOrder ? targetOrder.customer.email : 'customer@example.com',
          customerMobile: targetOrder ? targetOrder.customer.mobile : '+91 98765 43210',
          reason,
          description,
          imageUrl,
          requestDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          status: 'Pending'
        };

        const newNotif: NotificationItem = {
          id: 'notif-' + Date.now(),
          message: `Return Request ${newReturn.returnId} for Order ${orderId} submitted by ${newReturn.customerName}. Reason: ${reason}.`,
          date: newReturn.requestDate,
          read: false,
          type: 'return'
        };

        set({
          returns: [newReturn, ...returns],
          adminNotifications: [newNotif, ...adminNotifications],
          liveSimulation: {
            isOpen: true,
            type: 'whatsapp',
            title: `WhatsApp Notification Sent for Return Request ${newReturn.returnId}`,
            data: newReturn
          }
        });
      },

      updateReturnStatus: (returnId, status) => set((state) => ({
        returns: state.returns.map(r => r.returnId === returnId ? { ...r, status } : r)
      })),

      // Admin CRUD
      addProduct: (newProd) => set((state) => ({
        products: [
          { 
            ...newProd, 
            id: 'prod-' + Date.now().toString().slice(-4),
            rating: 5.0, 
            reviewCount: 1 
          }, 
          ...state.products
        ]
      })),

      updateProduct: (updatedProd) => set((state) => ({
        products: state.products.map(p => p.id === updatedProd.id ? updatedProd : p)
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id),
        wishlist: state.wishlist.filter(wId => wId !== id),
        cart: state.cart.filter(c => c.product.id !== id)
      })),

      duplicateProduct: (id) => set((state) => {
        const prod = state.products.find(p => p.id === id);
        if (!prod) return state;
        const cloned: Product = {
          ...prod,
          id: 'prod-' + Date.now().toString().slice(-4),
          name: prod.name + ' (Copy)',
          sku: prod.sku + '-COPY'
        };
        return { products: [cloned, ...state.products] };
      }),

      bulkUploadProducts: (newProducts) => set((state) => {
        const mapped = newProducts.map((np, idx) => ({
          ...np,
          id: 'prod-bulk-' + Date.now().toString().slice(-4) + '-' + idx,
          rating: 4.9,
          reviewCount: 10
        }));
        return { products: [...mapped, ...state.products] };
      }),

      updateCategoryBanner: (updatedBanner) => set((state) => ({
        categoryBanners: state.categoryBanners.map(b => b.category === updatedBanner.category ? updatedBanner : b)
      })),

      addHomeBanner: (newBanner) => set((state) => ({
        homepageBanners: [
          ...state.homepageBanners,
          { ...newBanner, id: 'hero-' + Date.now().toString().slice(-4) }
        ]
      })),

      deleteHomeBanner: (id) => set((state) => ({
        homepageBanners: state.homepageBanners.filter(hb => hb.id !== id)
      })),

      updateHomeBanner: (updatedBanner) => set((state) => ({
        homepageBanners: state.homepageBanners.map(hb => hb.id === updatedBanner.id ? updatedBanner : hb)
      })),

      updateOfferConfig: (newConfig) => set((state) => ({
        offerConfig: { ...state.offerConfig, ...newConfig }
      })),

      openSimulation: (type, title, data) => set({
        liveSimulation: { isOpen: true, type, title, data }
      }),

      closeSimulation: () => set({
        liveSimulation: { isOpen: false }
      }),

      markNotificationsRead: () => set((state) => ({
        adminNotifications: state.adminNotifications.map(n => ({ ...n, read: true }))
      }))

    }),
    {
      name: 'jeev-ruthi-collection-store-v1',
      partialize: (state) => ({
        products: state.products,
        categoryBanners: state.categoryBanners,
        homepageBanners: state.homepageBanners,
        offerConfig: state.offerConfig,
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        returns: state.returns,
        user: state.user,
        isAdminAuth: state.isAdminAuth
      })
    }
  )
);
