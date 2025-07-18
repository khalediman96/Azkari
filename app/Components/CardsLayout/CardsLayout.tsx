import Link from 'next/link';
import Image from 'next/image';
import Styles from './CardsLayout.module.css';

const cards = [
  {
    title: 'القرآن الكريم',
    image: '/alquran.png',
    route: '/quran-viewer',
    gradient: 'from-emerald-400 to-teal-600',
    iconBg: 'bg-emerald-100',
  },
  {
    title: 'أذكار الصباح',
    image: '/morning.svg',
    route: '/morning',
    gradient: 'from-amber-400 to-orange-500',
    iconBg: 'bg-amber-100',
  },
  {
    title: 'أذكار المساء',
    image: '/evening.svg',
    route: '/evening',
    gradient: 'from-purple-400 to-indigo-600',
    iconBg: 'bg-purple-100',
  },
  {
    title: 'أذكار النوم',
    image: '/sleeping.svg',
    route: '/sleep',
    gradient: 'from-blue-400 to-indigo-600',
    iconBg: 'bg-blue-100',
  },
  {
    title: 'أذكار بعد الصلاة',
    image: '/prayer.svg',
    route: '/prayer',
    gradient: 'from-rose-400 to-pink-600',
    iconBg: 'bg-rose-100',
  },
  {
    title: 'أذكار الوضوء',
    image: '/wudhu.svg',
    route: '/wudu',
    gradient: 'from-cyan-400 to-blue-500',
    iconBg: 'bg-cyan-100',
  },
  {
    title: 'أذكار الاستيقاظ',
    image: '/wake.svg',
    route: '/waking',
    gradient: 'from-yellow-400 to-orange-500',
    iconBg: 'bg-yellow-100',
  },
  {
    title: 'أذكار دخول وخروج المنزل',
    image: '/house.svg',
    route: '/home',
    gradient: 'from-green-400 to-emerald-600',
    iconBg: 'bg-green-100',
  },
  {
    title: 'أذكار الحج والعمرة',
    image: '/Hajj.svg',
    route: '/hajj',
    gradient: 'from-violet-400 to-purple-600',
    iconBg: 'bg-violet-100',
  },
  // New cards added
  {
    title: 'أذكار الطعام والشراب',
    image: '/food.svg',
    route: '/food',
    gradient: 'from-orange-400 to-red-500',
    iconBg: 'bg-orange-100',
  },
  {
    title: 'أذكار المطر والرعد',
    image: '/weather.svg',
    route: '/weather',
    gradient: 'from-blue-500 to-purple-600',
    iconBg: 'bg-blue-100',
  },
  {
    title: 'أذكار السفر',
    image: '/travel.svg',
    route: '/travel',
    gradient: 'from-teal-400 to-green-600',
    iconBg: 'bg-teal-100',
  },
  {
    title: 'أذكار الخوف والكرب',
    image: '/distress.svg',
    route: '/distress',
    gradient: 'from-gray-500 to-slate-700',
    iconBg: 'bg-gray-100',
  },
  {
    title: 'أذكار المرض والشفاء',
    image: '/healing.svg',
    route: '/healing',
    gradient: 'from-emerald-500 to-green-700',
    iconBg: 'bg-emerald-100',
  },
  {
    title: 'أذكار المجلس',
    image: '/gathering.svg',
    route: '/gathering',
    gradient: 'from-indigo-400 to-blue-600',
    iconBg: 'bg-indigo-100',
  },
  {
    title: 'أذكار الزواج',
    image: '/marriage.svg',
    route: '/marriage',
    gradient: 'from-pink-400 to-rose-600',
    iconBg: 'bg-pink-100',
  },
  {
    title: 'أذكار لبس الثوب الجديد',
    image: '/clothes.svg',
    route: '/clothes',
    gradient: 'from-purple-500 to-violet-700',
    iconBg: 'bg-purple-100',
  },
  {
    title: 'أذكار المقابر والجنائز',
    image: '/cemetery.svg',
    route: '/cemetery',
    gradient: 'from-slate-400 to-gray-600',
    iconBg: 'bg-slate-100',
  },
  {
    title: 'أذكار الاستغفار والتوبة',
    image: '/istighfar.svg',
    route: '/istighfar',
    gradient: 'from-red-400 to-pink-600',
    iconBg: 'bg-red-100',
  },
  {
    title: 'أذكار عامة',
    image: '/dhikr.svg',
    route: '/dhikr',
    gradient: 'from-yellow-500 to-amber-600',
    iconBg: 'bg-yellow-100',
  },
];

export default function CardsLayout() {
  return (
    <div className="w-[95%]  mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.route}
            className="group relative block rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_0%,transparent_70%)] group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            
            {/* Content Container */}
            <div className="relative h-48 flex flex-col items-center justify-center p-6">
              {/* Icon Container */}
              <div className={`${card.iconBg} rounded-2xl p-4 mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}>
                <Image
                  src={card.image}
                  alt={card.title}
                  width={60}
                  height={60}
                  className="drop-shadow-sm"
                />
              </div>
              
              {/* Title */}
              <h2 className="text-lg font-bold text-white text-center leading-snug drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                {card.title}
              </h2>
              
              {/* Hover indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white/60 group-hover:w-16 transition-all duration-300" />
            </div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </Link>
        ))}
      </div>
    </div>
  );
}