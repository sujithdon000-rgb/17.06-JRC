import { Product, CategoryBanner, HomepageBanner, OfferSectionConfig, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // WOMEN - SAREES
  {
    id: 'prod-1',
    name: 'Kanchipuram Pure Tissue Silk Saree with Gold Zari',
    sku: 'JRC-W-SAR-001',
    category: 'Women',
    subcategory: 'Sarees',
    description: 'An absolute masterpiece of luxury handcrafted weaving. Exquisite pure tissue silk infused with authentic 24K pure gold zari brocade. Features royal mythological animal motifs along the heavy pallu and ornate borders.',
    mrpPrice: 34999,
    offerPrice: 26999,
    discountPercentage: 23,
    sizes: ['Free Size'],
    colors: ['Luxury Gold', 'Royal Crimson', 'Midnight Black'],
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469783-99b5003ab79b?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    isOfferProduct: true,
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'prod-2',
    name: 'Banarasi Georgette Premium Heritage Saree',
    sku: 'JRC-W-SAR-002',
    category: 'Women',
    subcategory: 'Sarees',
    description: 'Fluid, luxurious Banarasi pure georgette saree featuring antique gold Meenakari floral jaal. Comes with an unstitched heavy designer blouse piece. Perfect for elite bridal and festive soirees.',
    mrpPrice: 24999,
    offerPrice: 18499,
    discountPercentage: 26,
    sizes: ['Free Size'],
    colors: ['Onyx Black', 'Ruby Red', 'Emerald Green'],
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: false,
    newArrival: true,
    isOfferProduct: false,
    rating: 4.8,
    reviewCount: 19
  },

  // WOMEN - KURTIS
  {
    id: 'prod-3',
    name: 'Chanderi Silk Anarkali Kurti with Gota Patti Handwork',
    sku: 'JRC-W-KUR-001',
    category: 'Women',
    subcategory: 'Kurtis',
    description: 'A regal floor-length Anarkali kurti spun from opulent Chanderi silk. Heavily embellished with intricate Jaipur gota patti, dori, and pearl embroidery along the majestic flared hemline and neckline.',
    mrpPrice: 12999,
    offerPrice: 8999,
    discountPercentage: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ivory White', 'Champagne Gold', 'Maroon'],
    stock: 15,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    isOfferProduct: true,
    rating: 5.0,
    reviewCount: 56
  },
  {
    id: 'prod-4',
    name: 'Velvet Straight Designer Silk Kurti',
    sku: 'JRC-W-KUR-002',
    category: 'Women',
    subcategory: 'Kurtis',
    description: 'Tailored from rich micro-velvet fabric with opulent Zardosi collar detailing. Ultra-luxe texture that provides immaculate royal draping. Includes premium shantoon inner lining.',
    mrpPrice: 9999,
    offerPrice: 6999,
    discountPercentage: 30,
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Midnight Black', 'Deep Navy', 'Wine'],
    stock: 10,
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    isOfferProduct: false,
    rating: 4.7,
    reviewCount: 14
  },

  // WOMEN - SALWAR SETS
  {
    id: 'prod-5',
    name: 'Pure Tussar Silk 3-Piece Sharara Suit Set',
    sku: 'JRC-W-SAL-001',
    category: 'Women',
    subcategory: 'Salwar Sets',
    description: 'Breathtaking 3-piece luxury ensemble comprising a pure Tussar silk peplum kurti, voluminous three-tier Sharara pants, and a scalloped pure organza dupatta with intricate mirror handwork.',
    mrpPrice: 18999,
    offerPrice: 14249,
    discountPercentage: 25,
    sizes: ['M', 'L', 'XL'],
    colors: ['Rose Gold', 'Mustard Gold', 'Black'],
    stock: 6,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    isOfferProduct: false,
    rating: 4.9,
    reviewCount: 31
  },

  // WOMEN - DRESSES
  {
    id: 'prod-6',
    name: 'Met Gala Gilded Evening Gown in Satin',
    sku: 'JRC-W-DRE-001',
    category: 'Women',
    subcategory: 'Dresses',
    description: 'High-fashion evening gown inspired by royal archives. Crafted from premium heavyweight Italian duchess satin. Features structured boning, a sweeping train, and crystal beadwork on the corset.',
    mrpPrice: 28999,
    offerPrice: 21999,
    discountPercentage: 24,
    sizes: ['S', 'M', 'L'],
    colors: ['Luxury Gold', 'Onyx Black', 'Pearly White'],
    stock: 5,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: true,
    newArrival: true,
    isOfferProduct: true,
    rating: 5.0,
    reviewCount: 28
  },

  // WOMEN - TOPS
  {
    id: 'prod-7',
    name: 'Pure Mulberry Silk Halter Neck Luxe Top',
    sku: 'JRC-W-TOP-001',
    category: 'Women',
    subcategory: 'Tops',
    description: 'Sophisticated 100% pure Mulberry silk blouse with an elegant draped halter neckline and subtle pearl buttons. Exudes effortless French Riviera luxury.',
    mrpPrice: 6999,
    offerPrice: 4899,
    discountPercentage: 30,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pearl White', 'Champagne', 'Black'],
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    isOfferProduct: false,
    rating: 4.6,
    reviewCount: 18
  },

  // KIDS - SHIRTS
  {
    id: 'prod-8',
    name: 'Royal Boys Raw Silk Mandarin Collar Shirt',
    sku: 'JRC-K-SHI-001',
    category: 'Kids',
    subcategory: 'Shirts',
    description: 'Immaculately tailored raw silk shirt for young gentlemen. Features custom jeweled gold buttons and breathable natural fibers for maximum comfort during extended festive ceremonies.',
    mrpPrice: 4999,
    offerPrice: 3499,
    discountPercentage: 30,
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-9 Yrs', '10-12 Yrs'],
    colors: ['Ivory Gold', 'Royal Blue', 'Ruby'],
    stock: 14,
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: true,
    newArrival: false,
    isOfferProduct: true,
    rating: 4.9,
    reviewCount: 33
  },

  // KIDS - GIRLS DRESSES & PARTY WEAR
  {
    id: 'prod-9',
    name: 'Princess Gilded Sequins layered Ball Gown',
    sku: 'JRC-K-DRE-001',
    category: 'Kids',
    subcategory: 'Girls Dresses',
    description: 'A magical fairytale ball gown for young princesses. Crafted from five layers of premium imported soft tulle, decorated with shimmering gold constellations and an opulent satin sash.',
    mrpPrice: 11999,
    offerPrice: 8499,
    discountPercentage: 29,
    sizes: ['3-4 Yrs', '5-6 Yrs', '7-8 Yrs', '9-10 Yrs'],
    colors: ['Blush Pink & Gold', 'Snow White', 'Midnight Blue'],
    stock: 9,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595454223600-91fb4148c369?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: true,
    newArrival: true,
    isOfferProduct: false,
    rating: 5.0,
    reviewCount: 49
  },

  // KIDS - SETS
  {
    id: 'prod-10',
    name: 'Heritage Brocade Sherwani & Dhoti Set for Boys',
    sku: 'JRC-K-SET-001',
    category: 'Kids',
    subcategory: 'Sets',
    description: 'Premium Banarasi brocade Sherwani paired with a pre-stitched comfortable silk dhoti. Complete with a miniature royal pocket square and pearl brooch.',
    mrpPrice: 13999,
    offerPrice: 9799,
    discountPercentage: 30,
    sizes: ['2-3 Yrs', '4-5 Yrs', '6-7 Yrs', '8-10 Yrs'],
    colors: ['Gold & Cream', 'Maroon & Gold'],
    stock: 11,
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: false,
    bestSeller: false,
    newArrival: true,
    isOfferProduct: false,
    rating: 4.8,
    reviewCount: 22
  },

  // WHOLESALE / PREMIUM EXCLUSIVE
  {
    id: 'prod-11',
    name: 'Exclusive Bridal Lehenga Choli with Pure Velvet Padmavati Embroidery',
    sku: 'JRC-W-LEH-001',
    category: 'Wholesale',
    subcategory: 'Sarees',
    description: 'Our crown jewel collection. Heavy bridal lehenga crafted by master artisans over 180 days of precision Zardosi and real semi-precious stone embedding. 100% Guaranteed showroom stunner.',
    mrpPrice: 120000,
    offerPrice: 89999,
    discountPercentage: 25,
    sizes: ['Custom Made', 'Free Size'],
    colors: ['Sabyasachi Red', 'Imperial Gold', 'Royal Emerald'],
    stock: 3,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop'
    ],
    featured: true,
    bestSeller: false,
    newArrival: false,
    isOfferProduct: true,
    rating: 5.0,
    reviewCount: 11
  }
];

export const INITIAL_CATEGORY_BANNERS: CategoryBanner[] = [
  {
    category: 'Women',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    title: 'THE WOMEN’S MAJESTIC ARCHIVE',
    description: 'Impeccable craftsmanship meets contemporary couture. Explore premium Sarees, elite Kurtis, and breathtaking gowns designed for the modern connoisseur.'
  },
  {
    category: 'Kids',
    imageUrl: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1600&auto=format&fit=crop',
    title: 'THE ROYAL KIDS BOUTIQUE',
    description: 'Exquisite comfort tailored for little royalties. From celebratory brocade ensembles to whimsical tulle gowns crafted with ultra-gentle premium organic silks.'
  },
  {
    category: 'Collections',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop',
    title: 'GILDED COUTURE — THE 2026 PREMIUM COLLECTION',
    description: 'Curated pure silk weaves and crystal-encrusted silhouettes embodying pure opulence and timeless royal heritage.'
  },
  {
    category: 'Wholesale',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1600&auto=format&fit=crop',
    title: 'GLOBAL WHOLESALE & BOUTIQUE PARTNERSHIPS',
    description: 'Direct factory pricing on premium authentic silks, handloom sarees, and designer kids wear for elite retail showrooms and international distributors.'
  },
  {
    category: 'Offers',
    imageUrl: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1600&auto=format&fit=crop',
    title: 'FESTIVE SOIRÉE PRIVILEGE OFFERS',
    description: 'Indulge in absolute luxury with up to 35% exclusive savings on handpicked best-selling designer masterpieces for a strictly limited period.'
  }
];

export const INITIAL_HOME_BANNERS: HomepageBanner[] = [
  {
    id: 'hero-1',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop',
    title: 'ROYALTY REIMAGINED',
    subtitle: 'The 2026 Pure Handloom Silk & Gilded Couture Collection',
    ctaText: 'EXPLORE LUXURY',
    ctaLink: '/shop?category=Women',
    order: 1
  },
  {
    id: 'hero-2',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1920&auto=format&fit=crop',
    title: 'ETERNAL ELEGANCE',
    subtitle: 'Exquisite Designer Sarees & Enchanting Kids Gowns',
    ctaText: 'DISCOVER NEW ARRIVALS',
    ctaLink: '/shop?filter=newArrival',
    order: 2
  }
];

export const INITIAL_OFFER_CONFIG: OfferSectionConfig = {
  isActive: true,
  bannerImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1600&auto=format&fit=crop',
  title: 'LIMITED EDITION GOLD PRIVILEGE SALE',
  subtitle: 'Experience Uncompromised Luxury — Up to 30% Off Authentic Kanchipuram Weaves & Designer Kurtis',
  expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  productIds: ['prod-1', 'prod-3', 'prod-6', 'prod-8']
};

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Dr. Aishwarya Singhania',
    rating: 5,
    date: 'February 18, 2026',
    comment: 'The Kanchipuram Pure Tissue Silk Saree is an absolute dream! Wore it to a gala dinner in Delhi, and the compliments simply never ceased. The gold zari brocade sparkles like authentic fine jewelry. Extremely premium packaging as well!',
    verified: true,
    productName: 'Kanchipuram Pure Tissue Silk Saree',
    userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    customerName: 'Radhika Merchant-Mehta',
    rating: 5,
    date: 'January 29, 2026',
    comment: 'Purchased the Gilded Sequins layered Ball Gown for my daughter’s 6th birthday. It looks straight out of an elite Parisian fashion runway! The inside lining is incredibly soft so she danced comfortably for hours. Truly exceptional quality.',
    verified: true,
    productName: 'Princess Gilded Sequins layered Ball Gown',
    userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    customerName: 'Sunita Reddy',
    rating: 5,
    date: 'February 04, 2026',
    comment: 'I run a luxury multi-designer store in Hyderabad and ordered 5 pieces from their Wholesale segment. Their finish, zari purity, and prompt delivery surprised my entire team. Highly professional Google Sheets invoice tracking and WhatsApp updates!',
    verified: true,
    productName: 'Pure Tussar Silk 3-Piece Sharara Suit Set',
    userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'
  }
];
