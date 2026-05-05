import Link from 'next/link';
import Image from 'next/image';
import Styles from './CardsLayout.module.css';

const cards = [
  {
    title: 'القرآن الكريم',
    image: '/alquran.png',
    route: '/quran-viewer',
    gradient: 'from-[#0a5c34] to-[#083d24]',
    iconBg: 'bg-[#f7f3e9]',
    accent: 'border-[#c27c18]/40',
  },
  {
    title: 'أذكار الصباح',
    image: '/morning.svg',
    route: '/morning',
    gradient: 'from-[#c27c18] to-[#8a530d]',
    iconBg: 'bg-[#fdf3d0]',
    accent: 'border-[#efb63c]/40',
  },
  {
    title: 'أذكار المساء',
    image: '/evening.svg',
    route: '/evening',
    gradient: 'from-[#1a5c7a] to-[#0e3d52]',
    iconBg: 'bg-[#d9f2f9]',
    accent: 'border-[#5bc8e8]/30',
  },
  {
    title: 'أذكار النوم',
    image: '/sleeping.svg',
    route: '/sleep',
    gradient: 'from-[#0f3c6e] to-[#092650]',
    iconBg: 'bg-[#dce8f9]',
    accent: 'border-[#6ba5e0]/30',
  },
  {
    title: 'أذكار بعد الصلاة',
    image: '/prayer.svg',
    route: '/prayer',
    gradient: 'from-[#177c52] to-[#0c4a32]',
    iconBg: 'bg-[#d9f2e6]',
    accent: 'border-[#47b484]/30',
  },
  {
    title: 'أذكار الوضوء',
    image: '/wudhu.svg',
    route: '/wudu',
    gradient: 'from-[#0d6c5a] to-[#094536]',
    iconBg: 'bg-[#d9f0eb]',
    accent: 'border-[#3fbfa8]/30',
  },
  {
    title: 'أذكار الاستيقاظ',
    image: '/wake.svg',
    route: '/waking',
    gradient: 'from-[#d99a22] to-[#9e6310]',
    iconBg: 'bg-[#fdf3d0]',
    accent: 'border-[#efb63c]/40',
  },
  {
    title: 'أذكار دخول وخروج المنزل',
    image: '/house.svg',
    route: '/home',
    gradient: 'from-[#3a6b20] to-[#254513]',
    iconBg: 'bg-[#e5f2d9]',
    accent: 'border-[#7bbf42]/30',
  },
  {
    title: 'أذكار الحج والعمرة',
    image: '/Hajj.svg',
    route: '/hajj',
    gradient: 'from-[#0a6e3f] to-[#06421f]',
    iconBg: 'bg-[#d9f2e6]',
    accent: 'border-[#c27c18]/40',
  },
  {
    title: 'أذكار الطعام والشراب',
    image: '/food.svg',
    route: '/food',
    gradient: 'from-[#8a4010] to-[#5c2908]',
    iconBg: 'bg-[#f9e8d9]',
    accent: 'border-[#d4804a]/30',
  },
  {
    title: 'أذكار المطر والرعد',
    image: '/weather.svg',
    route: '/weather',
    gradient: 'from-[#1a4d7a] to-[#0f2f50]',
    iconBg: 'bg-[#dce8f9]',
    accent: 'border-[#5b8dcc]/30',
  },
  {
    title: 'أذكار السفر',
    image: '/travel.svg',
    route: '/travel',
    gradient: 'from-[#0f5c4a] to-[#083d30]',
    iconBg: 'bg-[#d9f0eb]',
    accent: 'border-[#3fbfa8]/30',
  },
  {
    title: 'أذكار الخوف والكرب',
    image: '/distress.svg',
    route: '/distress',
    gradient: 'from-[#4a4030] to-[#2e2720]',
    iconBg: 'bg-[#eee8d5]',
    accent: 'border-[#b0a080]/30',
  },
  {
    title: 'أذكار المرض والشفاء',
    image: '/healing.svg',
    route: '/healing',
    gradient: 'from-[#1f7a52] to-[#124832]',
    iconBg: 'bg-[#d9f2e6]',
    accent: 'border-[#47b484]/30',
  },
  {
    title: 'أذكار المجلس',
    image: '/gathering.svg',
    route: '/gathering',
    gradient: 'from-[#1a4d6e] to-[#0e2e44]',
    iconBg: 'bg-[#dce8f9]',
    accent: 'border-[#5b8dcc]/30',
  },
  {
    title: 'أذكار الزواج',
    image: '/marriage.svg',
    route: '/marriage',
    gradient: 'from-[#8a3050] to-[#5c1e34]',
    iconBg: 'bg-[#f9dce6]',
    accent: 'border-[#d47a9e]/30',
  },
  {
    title: 'أذكار لبس الثوب الجديد',
    image: '/clothes.svg',
    route: '/clothes',
    gradient: 'from-[#5c3a8a] to-[#3b255a]',
    iconBg: 'bg-[#ecdcf9]',
    accent: 'border-[#a47ad4]/30',
  },
  {
    title: 'أذكار المقابر والجنائز',
    image: '/cemetery.svg',
    route: '/cemetery',
    gradient: 'from-[#3a3a40] to-[#252528]',
    iconBg: 'bg-[#e8e8ec]',
    accent: 'border-[#9090a0]/30',
  },
  {
    title: 'أذكار الاستغفار والتوبة',
    image: '/istighfar.svg',
    route: '/istighfar',
    gradient: 'from-[#8a1a1a] to-[#5c1010]',
    iconBg: 'bg-[#f9dcd9]',
    accent: 'border-[#d47070]/30',
  },
  {
    title: 'أذكار عامة',
    image: '/dhikr.svg',
    route: '/dhikr',
    gradient: 'from-[#c9972c] to-[#8a6015]',
    iconBg: 'bg-[#fdf3d0]',
    accent: 'border-[#efb63c]/40',
  },
];

export default function CardsLayout() {
  return (
    <div className="w-[95%] mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.route}
            className={`group relative block rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 ease-out hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-2 border ${card.accent}`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-85 group-hover:opacity-90 transition-opacity duration-300`} />

            {/* Frosted-glass veil */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
            
            {/* Islamic geometric pattern overlay */}
            <div className="absolute inset-0 opacity-[0.08] islamic-bg-pattern" />
            
            {/* Gold shimmer top edge */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#efb63c]/70 to-transparent" />
            
            {/* Glowing top-right crescent hint */}
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:bg-[#efb63c]/20 transition-all duration-500" />
            
            {/* Content Container */}
            <div className="relative h-48 flex flex-col items-center justify-center p-6 gap-3">
              {/* Icon Container */}
              <div className={`${card.iconBg} rounded-2xl p-3 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/70 backdrop-blur-sm`}>
                <Image
                  src={card.image}
                  alt={card.title}
                  width={52}
                  height={52}
                  className="drop-shadow-sm"
                />
              </div>
              
              {/* Title */}
              <h2 className="text-base font-bold text-white text-center leading-snug drop-shadow-lg group-hover:scale-105 transition-transform duration-300 px-2 py-1 rounded-lg bg-black/10 backdrop-blur-sm border border-white/15">
                {card.title}
              </h2>
              
              {/* Gold hover underline */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-[#efb63c]/80 to-transparent group-hover:w-16 transition-all duration-300" />
            </div>
            
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
        ))}
      </div>
    </div>
  );
}
