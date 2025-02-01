import React from 'react';
import { motion } from 'framer-motion';

interface RatingCard {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ratings: RatingCard[] = [
  {
    name: "J*** K.",
    rating: 5,
    comment: "Best crypto platform I've used. Very intuitive!",
    date: "March 15, 2024"
  },
  {
    name: "S*** M.",
    rating: 5,
    comment: "Great customer service and easy to use interface.",
    date: "March 14, 2024"
  },
  {
    name: "M*** R.",
    rating: 4,
    comment: "Solid platform with good investment options.",
    date: "March 13, 2024"
  },
  {
    name: "E*** W.",
    rating: 5,
    comment: "The analytics tools are incredibly helpful.",
    date: "March 12, 2024"
  },
  {
    name: "D*** K.",
    rating: 5,
    comment: "Secure and reliable platform for crypto trading.",
    date: "March 11, 2024"
  },
  {
    name: "L*** P.",
    rating: 4,
    comment: "Very professional and trustworthy service.",
    date: "March 10, 2024"
  },
  {
    name: "J*** B.",
    rating: 5,
    comment: "Outstanding portfolio management features.",
    date: "March 9, 2024"
  },
  {
    name: "A*** S.",
    rating: 5,
    comment: "The best rates and fastest transactions.",
    date: "March 8, 2024"
  },
  {
    name: "R*** M.",
    rating: 4,
    comment: "Excellent platform for both beginners and pros.",
    date: "March 7, 2024"
  },
  {
    name: "C*** K.",
    rating: 5,
    comment: "Impressive security features and support.",
    date: "March 6, 2024"
  }
];

const Rating: React.FC = () => {
  return (
    <div className="overflow-hidden py-12 bg-[#1E1B2E]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">What Our Users Say</h2>
        
        <div className="flex space-x-6 animate-scroll">
          {ratings.map((rating, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-80 bg-[#2C2844] p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="flex-1">
                  <h3 className="text-[#00E3A5] font-semibold">{rating.name}</h3>
                  <p className="text-gray-400 text-sm">{rating.date}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(rating.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-white">{rating.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rating; 