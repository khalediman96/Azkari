import CardsLayout from "./Components/CardsLayout/CardsLayout";
import DhikrSearch from "./Components/DhikrSearch/DhikrSearch";
import HadithViewer from "./Components/HadithViewer/HadithViewer";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7f3e9] via-[#eef7f0] to-[#e8f4ec] dark:from-[#061f13] dark:via-[#0a2618] dark:to-[#0f3422] overflow-hidden">
      {/* Floating Islamic geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden islamic-bg-pattern opacity-40">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-islamic-green-500/20 to-islamic-gold-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-r from-islamic-green-700/15 to-islamic-gold-500/15 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-islamic-gold-400/20 to-islamic-green-400/20 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-islamic-green-600/25 to-islamic-gold-600/25 rounded-lg rotate-45 blur-sm animate-spin-slow"></div>
      </div>

      {/* Hero Section - new split layout */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="relative md:w-[95%] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="relative rounded-3xl overflow-hidden border border-islamic-gold-500/30 bg-[#0a5c34]/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl">
              <div className="absolute inset-0 islamic-bg-pattern opacity-25" />
              <div className="absolute -top-16 -left-10 w-56 h-56 bg-islamic-gold-500/20 blur-3xl rounded-full" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-islamic-green-400/20 blur-3xl rounded-full" />
              <div className="relative z-10 h-full flex flex-col justify-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-islamic-gold-500/20 rounded-2xl border border-islamic-gold-400/40 text-islamic-gold-300 text-2xl mb-6">
                  ☪
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
                  مرحباً بك في <span className="text-islamic-gold-300">أذكاري</span>
                </h1>
                <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8">
                  منصة يومية جامعة للأذكار والأدعية والقرآن الكريم، بتصميم هادئ يساعدك على الطمأنينة والتركيز.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['القرآن الكريم', 'الأذكار اليومية', 'الأحاديث النبوية'].map((label) => (
                    <span key={label} className="px-4 py-2 rounded-xl bg-white/10 border border-islamic-gold-400/30 text-white/95 backdrop-blur-sm text-sm md:text-base">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[420px] rounded-3xl overflow-hidden border border-islamic-gold-500/30 shadow-2xl">
              <Image
                src="/quran-cover.jpg"
                alt="Islamic Quran Background"
                fill
                style={{ objectFit: 'cover' }}
                className="scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#062114]/80 via-[#0a5c34]/35 to-transparent" />
              <div className="absolute inset-0 islamic-bg-pattern opacity-20" />
              <div className="absolute bottom-6 right-6 left-6 p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                <p className="text-islamic-gold-200 text-lg leading-relaxed">
                  ﴿ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ ﴾
                </p>
                <p className="text-white/70 text-sm mt-1">سورة الرعد - الآية 28</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative py-16">
        <div className="md:w-[95%] w-full mx-auto md:px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-islamic-green-500/20 to-islamic-gold-500/15 rounded-2xl mb-6 backdrop-blur-sm border border-islamic-gold-400/25">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-islamic-green-700 to-islamic-gold-600 dark:from-islamic-green-300 dark:to-islamic-gold-400 bg-clip-text text-transparent">
                ابحث في الأذكار
              </h2>
            </div>
            <p className="text-xl text-[#2a5a3a] dark:text-[#b8d4c0] max-w-3xl mx-auto leading-relaxed">
              ابحث عن الأذكار والأدعية التي تحتاجها في حياتك اليومية <br className="block md:hidden" />بسهولة ويسر
            </p>
            <div className="flex items-center justify-center mt-8 islamic-divider w-64 mx-auto">
              <span className="islamic-star"></span>
            </div>
          </div>

          <div className="relative w-[95%] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-green-500/25 to-islamic-gold-500/20 rounded-3xl blur-2xl transform rotate-1"></div>
            <div className="relative bg-[#f7f3e9]/85 dark:bg-[#0f3422]/85 backdrop-blur-xl rounded-3xl p-10 border border-islamic-gold-400/30 dark:border-islamic-green-700/60 shadow-2xl">
              <DhikrSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="relative py-16">
        <div className="md:w-[95%] w-full mx-auto md:px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-islamic-gold-500/15 to-islamic-green-500/20 rounded-2xl mb-6 backdrop-blur-sm border border-islamic-green-400/25">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-islamic-gold-600 to-islamic-green-700 dark:from-islamic-gold-400 dark:to-islamic-green-300 bg-clip-text text-transparent">
                اختر من الأذكار
              </h2>
            </div>
            <p className="text-xl text-[#2a5a3a] dark:text-[#b8d4c0] max-w-3xl mx-auto leading-relaxed">
              مجموعة شاملة من الأذكار والأدعية المنظمة حسب الأوقات والمناسبات
            </p>
            {/* Golden Islamic divider */}
            <div className="flex items-center justify-center mt-10 mb-6 gap-4">
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-islamic-gold-500 to-transparent opacity-70 rounded-full"></div>
              <div className="relative">
                <div className="w-4 h-4 bg-gradient-to-r from-islamic-gold-500 to-islamic-gold-600 rounded-full animate-pulse shadow-md shadow-islamic-gold-500/50"></div>
                <div className="absolute inset-0 w-4 h-4 bg-islamic-gold-400 rounded-full animate-ping opacity-40"></div>
              </div>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-islamic-gold-500 to-transparent opacity-70 rounded-full"></div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-green-100/40 to-islamic-gold-100/30 dark:from-islamic-green-900/20 dark:to-islamic-dark-800/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <CardsLayout />
            </div>
          </div>
        </div>
      </section>

      {/* Hadith Section */}
      <section className="relative py-16 bg-gradient-to-br from-[#eef7f0]/80 via-[#e8f0e4]/60 to-[#f0ece0]/80 dark:from-[#0a2618]/80 dark:via-[#0c3020]/60 dark:to-[#0f2a18]/80 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-islamic-gold-400/15 to-islamic-green-400/15 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-islamic-green-500/10 to-islamic-gold-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative md:w-[95%] w-full mx-auto md:px-4">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-islamic-green-500/20 to-islamic-gold-500/15 rounded-2xl mb-6 backdrop-blur-sm border border-islamic-gold-400/25">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-islamic-green-700 to-islamic-gold-600 dark:from-islamic-green-300 dark:to-islamic-gold-400 bg-clip-text text-transparent">
                الأحاديث النبوية
              </h2>
            </div>
            <p className="text-xl text-[#2a5a3a] dark:text-[#b8d4c0] max-w-3xl mx-auto leading-relaxed">
              أحاديث مختارة من السنة النبوية الشريفة
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-islamic-gold-400/20 to-islamic-green-400/20 rounded-3xl blur-2xl transform rotate-1"></div>
            <div className="relative bg-[#f7f3e9]/90 dark:bg-[#0f3422]/90 backdrop-blur-xl rounded-3xl border border-islamic-gold-400/30 dark:border-islamic-green-700/50 shadow-2xl overflow-hidden">
              <HadithViewer />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}