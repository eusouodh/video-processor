import React, { useState } from 'react';
import { Youtube, Twitter, Disc as Discord } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../store/languageStore';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const { setLanguage } = useLanguageStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Integration with email service will be handled here
    console.log('Email submitted:', email);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Logo and Social */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded"></div>
              <span className="text-xl font-bold">{t('footer.company.title')}</span>
            </div>
            <p className="text-gray-400">
              {t('footer.company.description')}
            </p>
            <div className="flex space-x-4">
              <select 
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-700"
                onChange={handleLanguageChange}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube className="w-6 h-6" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Discord className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Column 2: AI Tools */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.aiTools.title')}</h3>
            <ul className="space-y-3">
              <li><Link to="/tools/product-swap" className="text-gray-400 hover:text-white">{t('footer.aiTools.productSwap')}</Link></li>
              <li><Link to="/tools/product-avatar" className="text-gray-400 hover:text-white">{t('footer.aiTools.productAvatar')}</Link></li>
              <li><Link to="/tools/ai-avatar" className="text-gray-400 hover:text-white">{t('footer.aiTools.aiAvatar')}</Link></li>
              <li><Link to="/tools/video-materials" className="text-gray-400 hover:text-white">{t('footer.aiTools.videoMaterials')}</Link></li>
              <li><Link to="/tools/video-url" className="text-gray-400 hover:text-white">{t('footer.aiTools.videoUrl')}</Link></li>
              <li><Link to="/tools/ai-talking-photo" className="text-gray-400 hover:text-white">{t('footer.aiTools.talkingPhoto')}</Link></li>
              <li><Link to="/tools" className="text-gray-400 hover:text-white flex items-center">
                {t('footer.aiTools.seeAll')} <span className="ml-2">→</span>
              </Link></li>
            </ul>
          </div>

          {/* Column 3: Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.useCases.title')}</h3>
            <ul className="space-y-3">
              <li><Link to="/use-cases/ads" className="text-gray-400 hover:text-white">{t('footer.useCases.advertising')}</Link></li>
              <li><Link to="/use-cases/affiliate" className="text-gray-400 hover:text-white">{t('footer.useCases.affiliate')}</Link></li>
              <li><Link to="/use-cases/ecommerce" className="text-gray-400 hover:text-white">{t('footer.useCases.ecommerce')}</Link></li>
              <li><Link to="/use-cases/dtc" className="text-gray-400 hover:text-white">{t('footer.useCases.dtc')}</Link></li>
              <li><Link to="/use-cases/ai-stream" className="text-gray-400 hover:text-white">{t('footer.useCases.aiStream')}</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.newsletter.title')}</h3>
            <p className="text-gray-400 mb-4">
              {t('footer.newsletter.description')}
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletter.placeholder')}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {t('footer.newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white">{t('footer.legal.privacy')}</Link>
              <Link to="/terms" className="hover:text-white">{t('footer.legal.terms')}</Link>
            </div>
            <p className="text-sm text-gray-400">
              {t('footer.legal.rights', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};