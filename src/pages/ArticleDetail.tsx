import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import { articlesData } from '../types/articles';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = Object.values(articlesData).find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Artikel tidak ditemukan
          </h1>
          <Link
            to="/artikel"
            className="text-purple-600 hover:text-purple-700 font-semibold"
          >
            Kembali ke daftar artikel
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const relatedArticles = Object.values(articlesData)
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/80 border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/artikel"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Artikel
          </Link>
        </div>
      </div>

      <div className="pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-96 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100"
        >
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold text-white mb-4 ${
                  article.category === 'berita'
                    ? 'bg-red-500'
                    : article.category === 'tips'
                    ? 'bg-blue-500'
                    : article.category === 'tutorial'
                    ? 'bg-green-500'
                    : 'bg-purple-500'
                }`}
              >
                {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {article.title}
              </h1>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-6 items-center mb-12 pb-8 border-b-2 border-gray-200"
          >
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{formatDate(article.publishedAt)}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-5 h-5" />
              <span className="font-medium">{article.author}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{article.readTime} min baca</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-auto p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Share artikel"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none mb-16"
          >
            {article.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-bold text-gray-900 mt-8 mb-4"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }

              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-2xl font-bold text-gray-900 mt-6 mb-3"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }

              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 my-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-gray-700">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (paragraph.startsWith('**')) {
                return (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    <strong>{paragraph}</strong>
                  </p>
                );
              }

              return (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Tentang Penulis</h3>
            <p className="text-gray-700">{article.author} adalah kontributor aktif di Masar90 yang berbagi insights dan pengalaman tentang UMKM dan digital marketing.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Tag Artikel</h3>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-semibold cursor-pointer hover:shadow-md transition-shadow"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-t-2 border-gray-200 pt-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Artikel Terkait</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relatedArticle) => (
                  <Link key={relatedArticle.id} to={`/artikel/${relatedArticle.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-lg overflow-hidden bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="h-32 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          src={relatedArticle.thumbnail}
                          alt={relatedArticle.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600">
                          {relatedArticle.title}
                        </h4>
                        <p className="text-xs text-gray-500">{formatDate(relatedArticle.publishedAt)}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
