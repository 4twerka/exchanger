import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 pt-16 pb-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="flex items-start justify-between">
          
          <div className="flex flex-col gap-6">
            <span className="text-sm text-gray-600">© 2026 Best Obmen</span>
            <div className="flex gap-4 text-gray-500">
              <a href="#" className="hover:text-white transition">FB</a>
              <a href="#" className="hover:text-white transition">TG</a>
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div>Mon-Fri 10:00-22:00 (GMT+3)</div>
              <div>Sat-Sun 10:00-21:00</div>
            </div>
            <a href="mailto:support@best-obmen.com" className="text-sm text-[#10b981] hover:text-[#059669] transition">
              support@best-obmen.com
            </a>
          </div>

          <div className="flex gap-20 text-sm text-gray-500">
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-white transition">AML Policy</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="hover:text-white transition">Site Rules</a>
              <a href="#" className="hover:text-white transition">Partnership Program</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;