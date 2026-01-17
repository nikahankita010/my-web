import { motion, AnimatePresence } from 'framer-motion';
import { Star, ThumbsUp, Filter } from 'lucide-react';
import { useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
  helpfulCount?: number;
  isFeatured?: boolean;
}

interface ReviewSectionProps {
  type: 'product' | 'service';
  itemId: string;
  itemName: string;
  averageRating: number;
  totalReviews: number;
}

export default function ReviewSection({
  type,
  itemId,
  itemName,
  averageRating,
  totalReviews,
}: ReviewSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [reviews, setReviews] = useState<Review[]>(getReviewsData(itemId));

  const colorScheme = type === 'product'
    ? {
        gradient: 'from-purple-600 via-fuchsia-500 to-cyan-400',
        buttonBg: 'from-purple-600 to-cyan-500',
        starColor: 'text-purple-500',
        accentBg: 'from-purple-50 to-cyan-50',
        borderColor: 'border-purple-200',
      }
    : {
        gradient: 'from-emerald-600 via-teal-500 to-cyan-400',
        buttonBg: 'from-emerald-600 to-teal-500',
        starColor: 'text-emerald-500',
        accentBg: 'from-emerald-50 to-cyan-50',
        borderColor: 'border-emerald-200',
      };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.rating - a.rating;
  });

  const featuredReview = reviews.find((r) => r.isFeatured);

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const review: Review = {
      ...newReview,
      id: `review-${Date.now()}`,
      date: new Date().toISOString(),
      helpfulCount: 0,
    };
    setReviews([review, ...reviews]);
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <section className="py-12">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className={`text-4xl font-bold mb-2 bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
            Ulasan & Rating
          </h2>
          <p className="text-gray-600">Apa kata pelanggan kami tentang {itemName}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`lg:col-span-1 p-8 rounded-2xl bg-gradient-to-br ${colorScheme.accentBg} border-2 ${colorScheme.borderColor} backdrop-blur-sm`}
          >
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2"
              >
                {averageRating.toFixed(1)}
              </motion.div>

              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        i < Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : i < averageRating
                          ? 'fill-yellow-200 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-600 font-semibold">
                Rincian Ulasan 
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm font-semibold text-gray-700">{star}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: star * 0.1 }}
                      className={`h-full bg-gradient-to-r ${colorScheme.buttonBg}`}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${colorScheme.buttonBg} hover:shadow-lg transition-all`}
            >
              Tulis Ulasan
            </motion.button>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Semua Ulasan ({reviews.length})
              </h3>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy('newest')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                    sortBy === 'newest'
                      ? `bg-gradient-to-r ${colorScheme.buttonBg} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Terbaru
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortBy('highest')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                    sortBy === 'highest'
                      ? `bg-gradient-to-r ${colorScheme.buttonBg} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Rating Tertinggi
                </motion.button>
              </div>
            </div>

            {featuredReview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <ThumbsUp className={`w-5 h-5 ${colorScheme.starColor}`} />
                  <span className="font-bold text-gray-900">Ulasan Terbaik</span>
                </div>
                <ReviewCard review={featuredReview} colorScheme={colorScheme} isFeatured />
              </motion.div>
            )}

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {sortedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <ReviewCard review={review} colorScheme={colorScheme} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReview}
        colorScheme={colorScheme}
        itemName={itemName}
      />
    </section>
  );
}

function getReviewsData(itemId: string): Review[] {
  const reviewsDatabase: Record<string, Review[]> = {
    tempe_kripik: [
      {
        id: '1',
        userName: 'Siti Nurhaliza',
        rating: 5,
        comment: 'Tempe kripiknya enak banget! Renyah dan bumbunya pas. Anak-anak saya suka sekali. Pasti order lagi!',
        date: '2024-01-10T10:30:00Z',
        isVerified: true,
        helpfulCount: 24,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Budi Santoso',
        rating: 5,
        comment: 'Packaging rapi, rasa original-nya mantap. Cocok buat camilan sehat keluarga.',
        date: '2023-12-08T14:20:00Z',
        isVerified: true,
        helpfulCount: 18,
      },
      {
        id: '3',
        userName: 'Anita Wijaya',
        rating: 4,
        comment: 'Enak, tapi kalau bisa varian pedasnya lebih pedas lagi ya. Overall recommended!',
        date: '2023-04-05T09:15:00Z',
        isVerified: false,
        helpfulCount: 12,
      },
      {
        id: '4',
        userName: 'Rizki Pratama',
        rating: 5,
        comment: 'Teksturnya kriuk-kriuk perfect! Varian garlic favorit saya. Must try!',
        date: '2023-05-03T16:45:00Z',
        isVerified: true,
        helpfulCount: 9,
      },
       {
        id: '5',
        userName: 'Naila farhana',
        rating: 5,
        comment: 'berbentuk kotak dan renyah, jarang tempe se renyah dan sekriuk ini, harus cobain teman-teman!',
        date: '2023-04-04T16:45:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
    ],
    sermier: [
      {
        id: '1',
        userName: 'Dewi Kartika',
        rating: 5,
        comment: 'Produk premium yang benar-benar berkualitas. Packaging mewah dan kualitas terjaga. Sangat puas!',
        date: '2024-01-12T11:00:00Z',
        isVerified: true,
        helpfulCount: 31,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Ahmad Fauzi',
        rating: 5,
        comment: 'Worth it banget! Kualitas sebanding dengan harga. Highly recommended.',
        date: '2023-11-09T15:30:00Z',
        isVerified: true,
        helpfulCount: 22,
      },
      {
        id: '3',
        userName: 'Linda Kusuma',
        rating: 4,
        comment: 'Bagus, tapi kalau harga bisa lebih murah lagi pasti lebih banyak yang beli.',
        date: '2023-01-06T10:20:00Z',
        isVerified: false,
        helpfulCount: 8,
      },
    ],
    kopi_bubuk: [
      {
        id: '1',
        userName: 'Handoko Wijaya',
        rating: 5,
        comment: 'Kopi terbaik yang pernah saya coba! Aroma kuat dan rasa yang kompleks. Perfect untuk espresso.',
        date: '2023-01-11T08:00:00Z',
        isVerified: true,
        helpfulCount: 42,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Maya Sari',
        rating: 5,
        comment: 'Sebagai coffee lover, saya sangat rekomen produk ini. Freshly roasted dan packaging vakum mantap.',
        date: '2023-01-17T13:45:00Z',
        isVerified: true,
        helpfulCount: 28,
      },
      {
        id: '3',
        userName: 'Eko Prasetyo',
        rating: 5,
        comment: 'Biji kopinya premium, hasil seduhan nikmat banget. Worth every rupiah!',
        date: '2022-02-04T09:30:00Z',
        isVerified: true,
        helpfulCount: 19,
      },
      {
        id: '4',
        userName: 'Sarah Fitri',
        rating: 4,
        comment: 'Enak, tapi medium grind-nya agak terlalu kasar untuk french press saya. Overall bagus!',
        date: '2022-07-02T11:15:00Z',
        isVerified: false,
        helpfulCount: 7,
      },
    ],
    design: [
      {
        id: '1',
        userName: 'Rudi Hermawan',
        rating: 5,
        comment: 'Desain logo untuk bisnis saya keren banget! Tim sangat profesional dan revisi cepat. Highly recommended!',
        date: '2024-01-13T14:30:00Z',
        isVerified: true,
        helpfulCount: 8,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Fitri Ayu',
        rating: 5,
        comment: 'Puas dengan hasil desain social media content. Kreatif dan sesuai dengan brand kami.',
        date: '2025-01-10T10:00:00Z',
        isVerified: true,
        helpfulCount: 7,
      },
      {
        id: '3',
        userName: 'Agus Setiawan',
        rating: 4,
        comment: 'Desain bagus, komunikasi lancar. Cuma agak lama prosesnya, tapi hasilnya memuaskan.',
        date: '2025-08-05T16:20:00Z',
        isVerified: true,
        helpfulCount: 4,
      },
     {
        id: '3',
        userName: 'Farhan Asyari',
        rating: 5,
        comment: 'Jujur sy suka hsil designya. Dari awal diskusi udh kelihatan niat dan ngerti maunya client. Desainya ga pasaran, modern, dan detail kecilnya diperhatiin bgt..',
        date: '2023-12-25T16:20:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
      {
        id: '4',
        userName: 'Anisa nur hamida',
        rating: 5,
        comment: 'Designnya keren, clean, dan sesuai brief. Revisi cepet, komunikasinya enak, ga ribet, dan selalu kasih solusi yg masuk akal.',
        date: '2023-12-13T16:20:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
      {
        id: '5',
        userName: 'marsell setiawan',
        rating: 5,
        comment: 'Awalnya cuma punya gambaran dikit..... tapi hasil akhirnya malah di atas ekspektasi. Warna, layout, sampe feel designnya dapet bgt.',
        date: '2023-12-02T16:20:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
      {
        id: '6',
        userName: 'Dimas Ardiananta',
        rating: 4,
        comment: 'Overall puas sih. Designnya eye-catching, keliatan profesional, dan punya ciri khas sendiri. Bakal repeat order kalo butuh lagi. sementara bintang 4 dulu',
        date: '2023-11-28T16:20:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
      {
        id: '7',
        userName: 'Ayu kurniawati',
        rating: 5,
        comment: 'Awalnya cuma kasih gambaran kasar, tapi hasil desainnya bisa nyesuaiin banget sama yang aku mau. Detailnya rapi dan kelihatan niat, bukan desain asal jadi. Komunikasinya juga enak, jadi nggak capek bolak-balik revisi.',
        date: '2023-11-28T16:20:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
      {
        id: '8',
        userName: 'Nabila Maysaroh',
        rating: 5,
        comment: 'aaaaaaaaaaa Desainnya keliatan clean dan modern banget huu, cocok buat kebutuhan branding UMKM saya... Overall puas banget. Trim ksih.',
        date: '2023-11-28T16:20:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
      ],
    bahasa_arab: [
      {
        id: '1',
        userName: 'Nadia Putri',
        rating: 5,
        comment: 'Ustadz sangat sabar dan metode mengajarnya mudah dipahami. Dalam 3 bulan saya sudah bisa percakapan dasar!',
        date: '2025-01-14T09:00:00Z',
        isVerified: true,
        helpfulCount: 8,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Farhan Malik',
        rating: 5,
        comment: 'Jadwal fleksibel dan materi terstruktur dengan baik. Sangat membantu untuk persiapan kuliah di Mesir.',
        date: '2024-11-11T13:30:00Z',
        isVerified: true,
        helpfulCount: 2,
      },
      {
        id: '3',
        userName: 'Aisha Rahman',
        rating: 5,
        comment: 'Belajar bahasa Arab jadi menyenangkan! Pengajar native dan sangat berpengalaman.',
        date: '2024-10-08T15:45:00Z',
        isVerified: true,
        helpfulCount: 1,
      },
    ],
    konseling: [
      {
        id: '1',
        userName: 'Anonymous',
        rating: 5,
        comment: 'Konselor sangat profesional dan empati. Saya merasa didengar dan mendapat dukungan yang saya butuhkan. Terima kasih!',
        date: '2025-02-15T11:00:00Z',
        isVerified: true,
        helpfulCount: 6,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Lia Kusuma',
        rating: 5,
        comment: 'Layanan konseling yang sangat membantu. Ruang aman untuk berbagi dan mendapat perspektif baru.',
        date: '2024-10-12T10:30:00Z',
        isVerified: true,
        helpfulCount: 1,
      },
      {
        id: '3',
        userName: 'Anonymous',
        rating: 5,
        comment: 'Terima kasih atas dukungannya. Konselor memberikan tools yang praktis untuk mengelola stres.',
        date: '2024-01-09T14:00:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
    ],
    olah_data: [
      {
        id: '1',
        userName: 'Dr. Bambang S.',
        rating: 5,
        comment: 'Analisis data untuk riset disertasi saya dikerjakan dengan sangat profesional. Hasil akurat dan dokumentasi lengkap!',
        date: '2025-03-13T15:00:00Z',
        isVerified: true,
        helpfulCount: 9,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Indah Permata',
        rating: 5,
        comment: 'Tim sangat memahami kebutuhan research saya. Visualisasi data juga sangat membantu presentasi.',
        date: '2025-03-20T11:30:00Z',
        isVerified: true,
        helpfulCount: 5,
      },
      {
        id: '3',
        userName: 'Wahyu Santoso',
        rating: 4,
        comment: 'Pengolahan data cepat dan hasil memuaskan. Komunikasi bisa lebih ditingkatkan.',
        date: '2023-11-07T09:45:00Z',
        isVerified: true,
        helpfulCount: 2,
      },
    ],
    penulis_kreatif: [
      {
        id: '1',
        userName: 'Sinta Dewi',
        rating: 5,
        comment: 'Content writing untuk blog website saya sangat berkualitas! SEO-friendly dan engaging. Traffic naik signifikan!',
        date: '2025-01-14T12:00:00Z',
        isVerified: true,
        helpfulCount: 14,
        isFeatured: true,
      },
      {
        id: '2',
        userName: 'Arif Rahman',
        rating: 5,
        comment: 'Copywriting untuk landing page kami excellent! Conversion rate meningkat 30%. Highly recommended!',
        date: '2024-10-11T16:30:00Z',
        isVerified: true,
        helpfulCount: 10,
      },
      {
        id: '3',
        userName: 'Mega Puspita',
        rating: 5,
        comment: 'Penulis sangat memahami brand voice kami. Content konsisten dan berkualitas tinggi.',
        date: '2024-09-08T10:15:00Z',
        isVerified: true,
        helpfulCount: 9,
       }, 
       {
        id: '4',
        userName: 'Someone pokoknya',
        rating: 5,
        comment: 'diluar ekspektasi, alhamdulillah makasih tugas mklah sy jadi lancar dan mendapat sanjungan dari dosen katanya hampir sempurna kaya ai tapi bukan ai. pokok begitulah dan dibonusin free ppt lagi, pokoknya joss workernya.',
        date: '2025-03-08T10:15:00Z',
        isVerified: true,
        helpfulCount: 0,
      },
    ],
  };

  return reviewsDatabase[itemId] || [];
}
