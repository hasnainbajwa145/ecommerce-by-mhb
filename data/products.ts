export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  soldCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  description: string;
  sizes?: string[];
  colors?: string[];
}

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Minimalist Diamond Solitaire Ring',
    category: 'jewellery',
    price: 850.00,
    discountPrice: 699.00,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 8,
    soldCount: 145,
    isBestseller: true,
    isTrending: true,
    description: 'A striking 18k white gold band featuring a flawless 0.5-carat round brilliant solitaire diamond. Meticulously handcrafted by Master Jewelers in Geneva.',
    sizes: ['5', '6', '7', '8'],
    colors: ['Gold', 'Silver']
  },
  {
    id: 'prod-2',
    name: 'Luxury Chronograph Rose Gold Watch',
    category: 'watches',
    price: 1200.00,
    rating: 4.8,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 12,
    soldCount: 94,
    isTrending: true,
    description: 'Engineered with precision quartz movement, a solid 18k rose gold plated bezel, and a premium hand-stitched Italian black leather strap.',
    colors: ['Rose Gold', 'Black']
  },
  {
    id: 'prod-3',
    name: 'Saffiano Italian Leather Handbag',
    category: 'bags',
    price: 650.00,
    discountPrice: 480.00,
    rating: 4.7,
    reviewCount: 68,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc15aeb9?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 5,
    soldCount: 220,
    isBestseller: true,
    description: 'Structured signature tote bag in scratch-resistant Saffiano calfskin leather. Accented with golden emblem lock and spacious velvet interior.',
    colors: ['Cognac', 'Emerald', 'Black']
  },
  {
    id: 'prod-4',
    name: 'Tortoiseshell Acetate Sunglasses',
    category: 'glasses',
    price: 280.00,
    rating: 4.6,
    reviewCount: 15,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 25,
    soldCount: 380,
    isNew: true,
    description: 'Iconic chunky square silhouette frames handcrafted from durable organic bio-acetate. Fitted with premium polarized UV400 protective lenses.',
    colors: ['Tortoiseshell', 'Amber']
  },
  {
    id: 'prod-5',
    name: 'Suede Combat Chelsea Boots',
    category: 'shoes',
    price: 450.00,
    discountPrice: 380.00,
    rating: 4.8,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 7,
    soldCount: 76,
    isTrending: true,
    isNew: true,
    description: 'An elegant crossover between casual Chelsea look and utility combat. Featuring fine Italian split suede and rugged slip-resistant Vibram rubber soles.',
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Sand', 'Taupe']
  },
  {
    id: 'prod-6',
    name: 'Cashmere Ribbed Knit Cardigan',
    category: 'women',
    price: 320.00,
    rating: 4.9,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 15,
    soldCount: 110,
    isBestseller: true,
    description: 'Spun from pure grade-A Mongolian cashmere fibers. A relaxed drape silhouette with horn-button front closure and refined ribbed cuff detailing.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Oatmeal', 'Cream', 'Charcoal']
  },
  {
    id: 'prod-7',
    name: 'Premium Wool Tailored Blazer',
    category: 'men',
    price: 580.00,
    discountPrice: 490.00,
    rating: 4.7,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: true,
    stockCount: 6,
    soldCount: 53,
    description: 'Double-breasted unstructured blazer jacket in fine breathable virgin wool. Fully lined with signature silk jacquard for smooth layering.',
    sizes: ['48', '50', '52', '54'],
    colors: ['Navy', 'Grey']
  },
  {
    id: 'prod-8',
    name: 'Solid 18k Gold Chain Necklace',
    category: 'jewellery',
    price: 950.00,
    rating: 4.9,
    reviewCount: 81,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'
    ],
    inStock: false,
    stockCount: 0,
    soldCount: 312,
    isBestseller: true,
    description: 'Classic link cable chain necklace crafted entirely from high-polished solid 18-karat yellow gold. Equipped with secure lobster clasp.',
    colors: ['Yellow Gold']
  }
];
