import React from 'react';

const Partners: React.FC = () => {
  const partners = [
    { name: 'BestChange', logo: 'BEST CHANGE' },
    { name: 'Volet', logo: 'volet' },
    { name: 'Kursoff', logo: 'KURSOFF' },
    { name: 'Partner 4', logo: 'LOGO' },
  ];

  return (
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-white">Partners</h2>
        <div className="border border-white/5 bg-[#121212] p-8 rounded-2xl">
          <div className="flex items-center justify-between gap-10">
            {partners.map((partner, index) => (
              <div key={index} className="flex-1 flex items-center justify-center p-6 bg-[#1a1a1a] rounded-xl text-2xl font-black text-gray-600 hover:text-white/80 hover:border-white/10 border border-transparent transition cursor-pointer">
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;