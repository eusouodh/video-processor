import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Scissors, Video, Wand2, ChevronRight, Github, Twitter, Linkedin, Calendar, Music2, Upload, Share2, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { PricingSection } from './PricingSection';
import { Footer } from './Footer';
import { useTranslation } from 'react-i18next';

const RetroGrid = ({
  angle = 65,
  cellSize = 60,
  opacity = 0.5,
  lightLineColor = "#9CA3AF",
  darkLineColor = "#4B5563"
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-line": lightLineColor,
    "--dark-line": darkLineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent to-90%" />
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      id: 'video-processing',
      icon: <Video className="w-12 h-12" />,
      title: t('features.videoProcessing.title'),
      description: t('features.videoProcessing.description'),
      image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 'audio-extraction',
      icon: <Music2 className="w-12 h-12" />,
      title: t('features.audioExtraction.title'),
      description: t('features.audioExtraction.description'),
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 'automation',
      icon: <Wand2 className="w-12 h-12" />,
      title: t('features.automation.title'),
      description: t('features.automation.description'),
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 'scheduling',
      icon: <Calendar className="w-12 h-12" />,
      title: t('features.scheduling.title'),
      description: t('features.scheduling.description'),
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  const timelineSteps = [
    {
      number: "1",
      icon: <Upload className="w-6 h-6" />,
      title: t('process.steps.upload.title'),
      description: t('process.steps.upload.description'),
    },
    {
      number: "2", 
      icon: <Scissors className="w-6 h-6" />,
      title: t('process.steps.processing.title'),
      description: t('process.steps.processing.description'),
    },
    {
      number: "3",
      icon: <Share2 className="w-6 h-6" />,
      title: t('process.steps.sharing.title'),
      description: t('process.steps.sharing.description'),
    }
  ];

  const benefits = [
    {
      value: t('benefits.stats.content.value'),
      label: t('benefits.stats.content.label'),
      description: t('benefits.stats.content.description')
    },
    {
      value: t('benefits.stats.engagement.value'),
      label: t('benefits.stats.engagement.label'),
      description: t('benefits.stats.engagement.description')
    },
    {
      value: t('benefits.stats.time.value'),
      label: t('benefits.stats.time.label'),
      description: t('benefits.stats.time.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="absolute top-0 z-[0] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      
      <div className="relative">
        <RetroGrid />
        
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-sm font-medium text-white">Video Processing AI</span>
              <ChevronRight className="w-4 h-4" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
              {t('hero.title')}
            </h1>

            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to="/register"
                className="relative inline-block overflow-hidden rounded-full p-[1.5px]"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl hover:bg-gray-800 transition-colors">
                  {t('hero.cta')}
                </div>
              </Link>

              <Link
                to="/login"
                className="px-8 py-3 rounded-full border-2 border-white/20 text-white hover:bg-white/10 transition-colors"
              >
                {t('header.login')}
              </Link>
            </div>
          </motion.div>

          <div className="mt-32" id="features">
            <h2 className="text-4xl font-bold text-center mb-16">{t('features.title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-32 py-20" id="benefits">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-4xl mx-auto"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  {t('benefits.title')}
                </h2>
                <p className="text-xl text-gray-300 mb-16">
                  {t('benefits.subtitle')}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-4">
                      {benefit.value}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.label}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-32" id="process">
            <h2 className="text-4xl font-bold text-center mb-16">{t('process.title')}</h2>
            <div className="max-w-4xl mx-auto">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative flex items-center gap-8 mb-16 last:mb-0"
                >
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute left-10 top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent" />
                  )}
                  
                  <div className="relative z-10 flex-shrink-0 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>

                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-bold text-blue-400">
                        {step.number}
                      </span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="pricing" className="mt-32">
            <PricingSection />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};