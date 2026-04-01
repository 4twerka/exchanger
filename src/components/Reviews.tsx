import React from 'react';

const ReviewCard: React.FC<{ name: string; date: string; text: string }> = ({ name, date, text }) => (
  <div className="flex-1 border border-white/5 bg-[#1a1a1a] p-6 rounded-xl flex flex-col gap-4 hover:border-white/10 transition">
    <div className="flex items-center justify-between">
      <span className="font-bold text-lg text-white">{name}</span>
      <span className="text-sm text-gray-500">{date}</span>
    </div>
    <p className="text-gray-400 text-base leading-relaxed">{text}</p>
  </div>
);

const Reviews: React.FC = () => {
  const reviews = [
    { name: 'Nasatya', date: '26/03/2026, 13:30', text: 'The exchange was very successful, everything went smoothly! Many thanks!' },
    { name: 'Maria', date: '17/03/2026, 19:55', text: 'Excellent exchanger! Everything is quick and problem-free. We will continue working together.' },
    { name: 'Ivan', date: '06/03/2026, 18:25', text: 'A reliable service, the funds arrived quickly. Thank you!' },
  ];

  return (
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-white">Reviews</h2>
        <div className="flex items-stretch gap-6 mb-12">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
        <div className="flex justify-center">
          <button className="px-10 py-3 border border-white/10 rounded-full font-bold text-sm text-gray-300 hover:border-[#10b981] hover:text-[#10b981] transition">
            Show More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;