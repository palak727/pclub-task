import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wind, BedDouble, Bike, BookOpen, Tv } from 'lucide-react';
import { CATEGORIES } from '../../utils/api';

const Hero = () => {
  const getBadgeTone = (slug) => {
    switch (slug) {
      case 'coolers':
        return 'bg-amber-100 text-amber-700';
      case 'mattresses':
        return 'bg-blue-100 text-blue-700';
      case 'cycles':
        return 'bg-emerald-100 text-emerald-700';
      case 'academics':
        return 'bg-purple-100 text-purple-700';
      case 'appliances':
        return 'bg-violet-100 text-violet-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getIcon = (slug) => {
    switch (slug) {
      case 'coolers':
        return <Wind size={22} />;
      case 'mattresses':
        return <BedDouble size={22} />;
      case 'cycles':
        return <Bike size={22} />;
      case 'academics':
        return <BookOpen size={22} />;
      case 'appliances':
        return <Tv size={22} />;
      default:
        return <Wind size={22} />;
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-12 md:py-20 border-b border-slate-200/80">
      {/* Background Soft Glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-royal/10 border border-royal/20 text-royal text-xs font-semibold mb-6 shadow-xs">
              Campus buying and selling for IIT Kanpur students
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6 text-slate-900">
              IITK Campus <br />
              <span className="text-royal">
                Marketplace
              </span>
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
              Buy and sell useful essentials across campus — coolers, cycles, desks, books, appliances, and everyday student gear.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/category/coolers" className="btn-primary shadow-sm">
                Explore Coolers & Cycles
              </Link>
              <Link
                to="/dashboard"
                className="px-6 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition-all shadow-sm"
              >
                List Your Items
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={cat.path}
                className="p-6 bg-white border border-slate-200/80 hover:border-royal/40 hover:shadow-md transition-all group rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${getBadgeTone(cat.slug)} flex items-center justify-center mb-4 text-sm font-bold`}>
                    {getIcon(cat.slug)}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-royal transition-colors">{cat.label}</h3>
                </div>
                <p className="text-slate-500 text-xs mt-3 font-medium">
                  Explore listings
                </p>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;