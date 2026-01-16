import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send } from 'lucide-react';
import { useState } from 'react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: {
    userName: string;
    rating: number;
    comment: string;
    isVerified: boolean;
  }) => void;
  colorScheme: {
    gradient: string;
    buttonBg: string;
    starColor: string;
    accentBg: string;
    borderColor: string;
  };
  itemName: string;
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  colorScheme,
  itemName,
}: ReviewModalProps) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !userName.trim() || !comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      onSubmit({
        userName: userName.trim(),
        rating,
        comment: comment.trim(),
        isVerified: false,
      });

      setUserName('');
      setRating(0);
      setComment('');
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  const ratingLabels = [
    '',
    'Sangat Buruk',
    'Kurang',
    'Cukup',
    'Bagus',
    'Sangat Bagus',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
                <h2 className="text-2xl font-bold text-gray-900">Tulis Ulasan</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${colorScheme.accentBg} border ${colorScheme.borderColor}`}>
                  <p className="text-sm text-gray-700">
                    Bagikan pengalaman Anda tentang{' '}
                    <span className="font-bold">{itemName}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Masukkan nama Anda"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Rating
                  </label>

                  <div className="flex items-center justify-center gap-3 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <motion.div
                          animate={{
                            scale: star <= (hoveredRating || rating) ? 1.1 : 1,
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Star
                            className={`w-12 h-12 transition-all ${
                              star <= (hoveredRating || rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {(rating > 0 || hoveredRating > 0) && (
                      <motion.div
                        key={hoveredRating || rating}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center"
                      >
                        <p className={`font-bold text-lg bg-gradient-to-r ${colorScheme.gradient} bg-clip-text text-transparent`}>
                          {ratingLabels[hoveredRating || rating]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Ulasan Anda
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda..."
                    required
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 10 karakter ({comment.length}/10)
                  </p>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || rating === 0 || !userName.trim() || comment.length < 10}
                  className={`w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    isSubmitting || rating === 0 || !userName.trim() || comment.length < 10
                      ? 'bg-gray-300 cursor-not-allowed'
                      : `bg-gradient-to-r ${colorScheme.buttonBg} hover:shadow-lg`
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Ulasan
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
