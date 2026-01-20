import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { articlesData } from '../types/articles';
import { useState } from 'react';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const articles = Object.values(articlesData);

  const categories = [
    { value: 'all', label: 'Semua Artikel' },
    { value: 'berita', label: 'Berita' },
    { value: 'tips', label: 'Tips & Trik' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'update', label: 'Update' },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const sortedArticles = [...filteredArticles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Artikel & Berita
            </h1>
            <p className="text-xl text-gray-600">
              Tips, trik, dan berita terbaru untuk mengembangkan UMKM Anda
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group h-full"
              >
                <Link to={`/artikel/${article.slug}`}>
                  <div className="h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                            article.category === 'berita'
                              ? 'bg-red-500'
                              : article.category === 'tips'
                              ? 'bg-blue-500'
                              : article.category === 'tutorial'
                              ? 'bg-green-500'
                              : 'bg-purple-500'
                          }`}
                        >
                          {article.category.charAt(0).toUpperCase() +
                            article.category.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {article.excerpt}
                      </p>

                      <div className="space-y-3 border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishedAt)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime} min baca</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                          {article.tags.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{article.tags.length - 2}
                            </span>
                          )}
                        </div>

                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-2 text-purple-600 font-semibold mt-3 group-hover:text-pink-600"
                        >
                          Baca Selengkapnya
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {sortedArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                Tidak ada artikel di kategori ini. Coba kategori lain!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
