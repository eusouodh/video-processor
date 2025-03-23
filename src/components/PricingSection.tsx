import React from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PricingSection = () => {
  const { t } = useTranslation();

  const plans = [
    {
      name: t('pricing.plans.starter.name'),
      price: t('pricing.plans.starter.price'),
      description: t('pricing.plans.starter.description'),
      features: t('pricing.plans.starter.features', { returnObjects: true })
    },
    {
      name: t('pricing.plans.creator.name'),
      price: t('pricing.plans.creator.price'),
      description: t('pricing.plans.creator.description'),
      features: t('pricing.plans.creator.features', { returnObjects: true }),
      popular: true
    },
    {
      name: t('pricing.plans.professional.name'),
      price: t('pricing.plans.professional.price'),
      description: t('pricing.plans.professional.description'),
      features: t('pricing.plans.professional.features', { returnObjects: true })
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t('pricing.title')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl bg-white/5 backdrop-blur-sm border ${
                plan.popular ? 'border-blue-500' : 'border-white/10'
              } p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {t('pricing.plans.creator.popular')}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">R${plan.price}</span>
                <span className="text-gray-400">/mês</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-blue-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {t('pricing.cta')}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            {t('pricing.contact')}{' '}
            <a href="#contato" className="text-blue-400 hover:text-blue-300">
              {t('pricing.contactLink')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};