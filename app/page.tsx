import CardsLayout from "./Components/CardsLayout/CardsLayout";
import DhikrSearch from "./Components/DhikrSearch/DhikrSearch";
import HadithViewer from "./Components/HadithViewer/HadithViewer";
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20 overflow-hidden">
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-orange-400/25 to-yellow-400/25 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-lg rotate-45 blur-sm animate-spin-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-indigo-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        </div>

        <div className="relative md:w-[95%] mx-auto px-4">
          <div className="relative">
            {/* Enhanced main hero container with glassmorphism */}
            <div className="relative bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-teal-600/90 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl border border-white/20">
              {/* Background Quran Image with better overlay */}
              <div className="absolute inset-0">
                <Image
                  src="/quran-cover.jpg"
                  alt="Islamic Quran Background"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="opacity-25 scale-105 transition-transform duration-700 hover:scale-110"
                />
              </div>
              
              {/* Multi-layered gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/85 via-indigo-600/80 to-teal-600/85"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
              
              {/* Enhanced animated pattern overlay */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.4)_0%,transparent_50%)] animate-pulse-slow"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.3)_0%,transparent_50%)] animate-pulse-slow delay-1000"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)] animate-pulse-slow delay-2000"></div>
              </div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-float"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400/60 rounded-full animate-float-delayed"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-float-slow"></div>
                <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-cyan-400/50 rounded-full animate-float"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10 text-center py-20 px-8">
                {/* Enhanced decorative element */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-white/15 rounded-full backdrop-blur-sm mb-8 border border-white/30 shadow-lg hover:scale-110 transition-transform duration-500">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg">
                    <div className="w-full h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-spin-slow opacity-80"></div>
                  </div>
                </div>
                
                {/* Enhanced main title with better animations */}
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
                  <span className="inline-block animate-fade-in-up hover:scale-105 transition-transform duration-300">مرحبا بك في</span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-fade-in-up delay-300 hover:scale-105 transition-transform duration-300 bg-300% animate-gradient-x">
                    موقع اذكاري
                  </span>
                </h1>
                
                {/* Enhanced subtitle */}
                <p className="text-xl md:text-2xl text-white/95 mb-10 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500 font-medium">
                  رحلتك الإيمانية تبدأ هنا - أذكار وأدعية لكل وقت ومكان
                  <br />
                  <span className="text-lg text-white/80 block mt-2">اكتشف السكينة والطمأنينة مع مجموعة شاملة من الأذكار الأصيلة</span>
                </p>
                
                {/* Enhanced features highlight with hover effects */}
                <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in-up delay-700">
                  <div className="group bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="text-white/95 text-base font-semibold group-hover:text-white transition-colors">القرآن الكريم</span>
                  </div>
                  <div className="group bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="text-white/95 text-base font-semibold group-hover:text-white transition-colors">الأذكار اليومية</span>
                  </div>
                  <div className="group bg-white/15 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <span className="text-white/95 text-base font-semibold group-hover:text-white transition-colors">الأحاديث النبوية</span>
                  </div>
                </div>
                
                {/* Enhanced scroll indicator */}
                <div className="animate-bounce-slow mt-8 cursor-pointer hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center hover:border-white/80 transition-colors duration-300">
                    <div className="w-1.5 h-4 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Search Section */}
      <section className="relative py-16">
        <div className="md:w-[95%] w-full mx-auto md:px-4">
          {/* Enhanced section header */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl mb-6 backdrop-blur-sm border border-purple-200/30">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                ابحث في الأذكار
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              ابحث عن الأذكار والأدعية التي تحتاجها في حياتك اليومية بسهولة ويسر
            </p>
            
            {/* Decorative line */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
            </div>
          </div>
          
          {/* Enhanced search component wrapper */}
          <div className="relative w-[95%] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-3xl blur-2xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-teal-400/20 to-cyan-400/20 rounded-3xl blur-xl transform -rotate-1"></div>
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-10 border border-white/40 dark:border-slate-700/60 shadow-2xl hover:shadow-3xl transition-shadow duration-500">
              <DhikrSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Cards Section */}
      <section className="relative py-16">
        <div className="md:w-[95%] w-full mx-auto md:px-4">
          {/* Enhanced section header */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-indigo-500/20 to-teal-500/20 rounded-2xl mb-6 backdrop-blur-sm border border-indigo-200/30">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-teal-600 bg-clip-text text-transparent">
                اختر من الأذكار
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              مجموعة شاملة من الأذكار والأدعية المنظمة حسب الأوقات والمناسبات
            </p>
            
            {/* Enhanced decorative divider */}
            <div className="flex items-center justify-center mt-10 mb-6">
              <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
              <div className="mx-6 relative">
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-ping opacity-50"></div>
              </div>
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Cards layout with enhanced wrapper */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <CardsLayout />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Hadith Section */}
      <section className="relative py-16 bg-gradient-to-br from-slate-100/80 via-purple-100/60 to-teal-100/80 dark:from-slate-800/60 dark:via-purple-900/30 dark:to-teal-900/30 backdrop-blur-sm">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
        
        <div className="relative md:w-[95%] w-full mx-auto md:px-4">
          {/* Enhanced section header */}
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-200/30">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                الأحاديث النبوية
              </h2>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              أحاديث مختارة من السنة النبوية الشريفة
            </p>
          </div>
          
          {/* Enhanced hadith viewer wrapper */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-3xl blur-2xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-cyan-400/20 to-blue-400/20 rounded-3xl blur-xl transform -rotate-1"></div>
            <div className="relative bg-white/85 dark:bg-slate-800/85 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-700/60 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              <HadithViewer />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer wave decoration */}
      <div className="relative mt-16">
        <svg className="w-full h-32 fill-current text-gradient-to-r from-purple-100 via-indigo-100 to-teal-100 dark:from-purple-900/30 dark:via-indigo-900/30 dark:to-teal-900/30" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor:"rgb(168 85 247)", stopOpacity:0.3}} />
              <stop offset="50%" style={{stopColor:"rgb(99 102 241)", stopOpacity:0.2}} />
              <stop offset="100%" style={{stopColor:"rgb(20 184 166)", stopOpacity:0.3}} />
            </linearGradient>
          </defs>
          <path fill="url(#waveGradient)" d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".4"></path>
          <path fill="url(#waveGradient)" d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".6"></path>
          <path fill="url(#waveGradient)" d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" opacity=".8"></path>
        </svg>
      </div>

      
    </main>
  );
}