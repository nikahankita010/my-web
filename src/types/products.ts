export interface ProductVariant {
  name: string;
  value: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  description: string;
  fullDescription: string;
  mainImage: string;
  gallery: string[];
  gradient: string;
  isLaunching?: boolean;
  discountPercent?: number;
  variants: ProductVariant[];
  ingredients?: string[];
  packaging?: string;
  weight?: string;
  shelf_life?: string;
}

export const productsData: Record<string, ProductDetail> = {
  tempe_kripik: {
    id: 'tempe_kripik',
    name: 'Tempe Kripik',
    price: 5000,
    originalPrice: 20000,
    rating: 4.8,
    description: 'Camilan renyah dari tempe pilihan dengan berbagai varian rasa',
    fullDescription:
      'Tempe Kripik kami adalah camilan yang dibuat dari tempe premium yang dipilih dengan teliti, kemudian digoreng hingga renyah sempurna. Setiap gigitan memberikan tekstur yang krispy dan rasa yang lezat. Produk kami tidak menggunakan pengawet buatan dan ramah lingkungan. Tersedia dalam berbagai pilihan rasa yang menggugah selera.',
    mainImage: 'https://images.pexels.com/photos/35699585/pexels-photo-35699585.jpeg',
    gallery: [
      'https://images.pexels.com/photos/35699585/pexels-photo-35699585.jpeg',
      'https://images.pexels.com/photos/5632656/pexels-photo-5632656.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    gradient: 'from-purple-500 to-fuchsia-500',
    isLaunching: true,
    discountPercent: 25,
    variants: [
      { name: 'Rasa', value: 'Original' },
      { name: 'Rasa', value: 'Pedas' },
      { name: 'Rasa', value: 'Garlic' },
      { name: 'Rasa', value: 'BBQ' },
    ],
    ingredients: [
      'Tempe premium',
      'Minyak sayur',
      'Garam',
      'Bumbu pilihan',
      'Tanpa pengawet buatan',
      'Bersertifikasi halal dan P-IRT',
    ],
    packaging: 'Kemasan plastik alumunium foil premium dengan seal rapat',
    weight: '100g',
    shelf_life: '2 bulan',
  },
  sermier: {
    id: 'sermier',
    name: 'Sermier',
    price: 6000,
    originalPrice: 20000,
    rating: 4.9,
    description: 'Produk premium dengan kualitas terbaik untuk kebutuhan Anda',
    fullDescription:
      'Sermier adalah produk premium hasil penelitian dan pengembangan yang matang. Dibuat dari bahan ketela pilihan berkualitas tinggi, produk ini dirancang untuk memberikan manfaat maksimal. Setiap detail produksi diperhatikan dengan cermat untuk memastikan kualitas terbaik sampai ke tangan Anda.',
    mainImage: 'https://images.pexels.com/photos/35699844/pexels-photo-35699844.jpeg',
    gallery: [
      'https://images.pexels.com/photos/35699844/pexels-photo-35699844.jpeg',
      'https://images.pexels.com/photos/35701945/pexels-photo-35701945.jpeg',
      'https://images.pexels.com/photos/35701946/pexels-photo-35701946.jpeg',
    ],
    gradient: 'from-cyan-500 to-blue-500',
    isLaunching: true,
    discountPercent: 30,
    variants: [
      { name: 'Ukuran', value: 'Small (100g)' },
      { name: 'Ukuran', value: 'Medium (200g)' },
      { name: 'Ukuran', value: 'Large (250g)' },
    ],
    ingredients: [
      'Bahan ketela alami pilihan',
      'Tanpa bahan kimia berbahaya',
      'Produk bersertifikasi halal dan P-IRT',
      'Proses tradisional',
    ],
    packaging: 'Plastik alumunium foil premium',
    weight: '200g (standard)',
    shelf_life: '2 bulan',
  },
  kopi_bubuk: {
    id: 'kopi_bubuk',
    name: 'Kopi Bubuk',
    price: 35000,
    originalPrice: 45000,
    rating: 5.0,
    description: 'Kopi pilihan berkualitas tinggi dengan aroma yang menggugah',
    fullDescription:
      'Kopi Bubuk premium kami dipilih dari biji kopi terbaik dari berbagai perkebunan di Indonesia. Setiap biji dikurasi dengan teliti dan disangrai dengan sempurna untuk menghasilkan aroma yang kaya dan rasa yang kompleks. Cocok untuk semua metode brewing dari espresso hingga pour over.',
    mainImage: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800',
    gallery: [
      'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/919514/pexels-photo-919514.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    gradient: 'from-pink-500 to-rose-500',
    isLaunching: true,
    discountPercent: 25,
    variants: [
      { name: 'Tingkat Kekasaran', value: 'Extra Fine' },
      { name: 'Tingkat Kekasaran', value: 'Medium' },
      { name: 'Tingkat Kekasaran', value: 'Coarse' },
    ],
    ingredients: [
      'Biji kopi arabika premium',
      'Proses sangrai manual',
      'Tanpa tambahan rasa',
      '100% kopi murni',
    ],
    packaging: 'Kemasan vakum dengan valve aromatis',
    weight: '200g',
    shelf_life: '12 bulan (disimpan di tempat sejuk)',
  },
};
