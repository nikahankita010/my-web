import { motion } from 'framer-motion';
import { Star, BadgeCheck, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

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

interface ReviewCardProps {
  review: Review;
  colorScheme: {
    gradient: string;
    buttonBg: string;
    starColor: string;
    accentBg: string;
    borderColor: string;
  };
  isFeatured?: boolean;
}

export default function ReviewCard({ review, colorScheme, isFeatured }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0);

  const handleHelpful = () => {
    if (!isHelpful) {
      setIsHelpful(true);
      setHelpfulCount(helpfulCount + 1);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`p-6 rounded-2xl transition-all backdrop-blur-sm ${
        isFeatured
          ? `bg-gradient-to-br ${colorScheme.accentBg} border-2 ${colorScheme.borderColor} shadow-lg`
          : 'bg-white/80 border border-gray-200 hover:border-gray-300 shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-gray-900 text-lg">{review.userName}</h4>
            {review.isVerified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.4 }}
              >
                <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-100" />
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: i * 0.05, type: 'spring' }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">
              {review.rating}.0
            </span>
          </div>

          {review.isVerified && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200"
            >
              Pelanggan Terverifikasi
            </motion.span>
          )}
        </div>

        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-700 leading-relaxed mb-4"
      >
        {review.comment}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleHelpful}
        disabled={isHelpful}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
          isHelpful
            ? `bg-gradient-to-r ${colorScheme.buttonBg} text-white`
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-white' : ''}`} />
        {isHelpful ? 'Terbantu' : 'Membantu'} ({helpfulCount})
      </motion.button>
    </motion.div>
  );
}
