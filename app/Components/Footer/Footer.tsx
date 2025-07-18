"use client"

import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github,
  Mail,
  Heart,
  MapPin,
  Phone,
  Globe,
  BookOpen,
  Users,
  Star,
  ChevronUp,
  Download,
  Sparkles
} from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Use deterministic values for floating particles to avoid hydration errors
  const floatingParticles = useMemo(() => (
    Array.from({ length: 15 }, (_, i) => {
      // Use a simple deterministic pattern based on index
      const left = `${(i * 7) % 100}%`;
      const top = `${(i * 13) % 100}%`;
      const animationDelay = `${(i % 3) * 0.7}s`;
      const animationDuration = `${2 + (i % 5) * 0.5}s`;
      return {
        left, top, animationDelay, animationDuration
      };
    })
  ), []);

  return (
    <footer id='Footer' className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden" dir="rtl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.05)_0%,transparent_50%)]"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-40 animate-pulse"
            style={style}
          />
        ))}
      </div>

      {/* Enhanced Top Wave */}
      <div className="relative">
        <svg className="w-full h-20 fill-current text-purple-100 dark:text-purple-900/20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="50%" stopColor="rgba(79, 70, 229, 0.3)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
          </defs>
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="url(#waveGradient)"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="rgba(147, 51, 234, 0.2)"></path>
        </svg>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-8 left-8 z-20 group p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-white/20"
        aria-label="العودة للأعلى"
      >
        <ChevronUp className="w-5 h-5 text-white group-hover:animate-bounce" />
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-2 text-center lg:text-right">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative p-2 ">
                  <Image
                    src="/logo.svg"
                    alt="اذكاري"
                    width={120}
                    height={100}
                    className="relative transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              {/* <div className="text-right">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  اذكاري
                </h2>
                <p className="text-purple-200 text-sm mt-1">تطبيق إسلامي شامل</p>
              </div> */}
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
                <Sparkles className="w-6 h-6 text-yellow-400 mx-auto lg:mx-0 mb-3" />
                <p className="text-purple-100 leading-relaxed max-w-md mx-auto lg:mx-0">
                  تطبيق إسلامي شامل يحتوي على القرآن الكريم والأذكار اليومية والأحاديث النبوية الشريفة. 
                  نسعى لتقريب المؤمنين من دينهم وتسهيل العبادة عليهم.
                </p>
              </div>
            </div>

            {/* Enhanced App Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="group bg-gradient-to-br from-emerald-600/20 to-teal-600/20 backdrop-blur-sm rounded-2xl p-6 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <BookOpen className="w-10 h-10 text-emerald-400 mx-auto lg:mx-0 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-bold text-white text-lg mb-2">القرآن الكريم</h4>
                <p className="text-emerald-200 text-sm">تلاوة وتدبر وحفظ</p>
              </div>
              <div className="group bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Star className="w-10 h-10 text-yellow-400 mx-auto lg:mx-0 mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h4 className="font-bold text-white text-lg mb-2">الأذكار اليومية</h4>
                <p className="text-yellow-200 text-sm">لكل وقت ومناسبة</p>
              </div>
            </div>

            {/* App Download Section */}
            {/* <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <Download className="w-6 h-6 text-purple-400" />
                <h4 className="font-bold text-white text-lg">حمّل التطبيق</h4>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    نسخة الويب
                  </span>
                </button>
                <button className="group px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl text-white font-medium hover:from-slate-800 hover:to-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    تحميل التطبيق
                  </span>
                </button>
              </div>
            </div> */}
          </div>

          {/* Enhanced Quick Links */}
          <div className="text-center lg:text-right">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="p-2 bg-purple-600/20 rounded-full">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              روابط سريعة
            </h3>
            <ul className="space-y-4">
              {[
                { href: "/", label: "الصفحة الرئيسية", icon: "home" },
                { href: "/quran-viewer", label: "القرآن الكريم", icon: "book" },
                { href: "/morning", label: "أذكار الصباح", icon: "sun" },
                { href: "/evening", label: "أذكار المساء", icon: "moon" },
                // { href: "/prayers", label: "الأدعية", icon: "hands" },
                // { href: "/hadith", label: "الأحاديث", icon: "scroll" }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group text-purple-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl hover:bg-white/10 backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:bg-purple-600/40 transition-colors duration-300">
                      <span className="w-3 h-3 bg-purple-400 rounded-full group-hover:bg-white transition-colors duration-300"></span>
                    </div>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Contact & Social */}
          <div className="text-center lg:text-right">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center lg:justify-start gap-3">
              <div className="p-2 bg-purple-600/20 rounded-full">
                <Globe className="w-6 h-6 text-purple-400" />
              </div>
              تواصل معنا
            </h3>
            
            {/* Enhanced Contact Info */}
            <div className="space-y-6 mb-8">
              <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-purple-200">
                  <div className="p-2 bg-purple-600/20 rounded-full group-hover:bg-purple-600/40 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-purple-300 mb-1">البريد الإلكتروني</p>
                    <span className="text-sm font-medium">khaledaljabarty@gmail.com</span>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-purple-200">
                  <div className="p-2 bg-purple-600/20 rounded-full group-hover:bg-purple-600/40 transition-colors duration-300">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-purple-300 mb-1">الموقع الإلكتروني</p>
                    <span className="text-sm font-medium">www.imangraphics.net</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Media */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                تابعنا على
              </h4>
              <div className="flex justify-center lg:justify-start gap-3 flex-wrap">
                {[
                  { href: "https://facebook.com", icon: Facebook, color: "hover:bg-blue-600", label: "فيسبوك" },
                  { href: "https://instagram.com", icon: Instagram, color: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600", label: "إنستغرام" },
                  { href: "https://linkedin.com", icon: Linkedin, color: "hover:bg-blue-700", label: "لينكدإن" },
                  { href: "https://github.com", icon: Github, color: "hover:bg-gray-800", label: "جيت هب" },
                  { href: "mailto:khaledaljabarty@gmail.com", icon: Mail, color: "hover:bg-emerald-600", label: "البريد الإلكتروني" }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`group p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 ${social.color} hover:border-transparent transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon size={18} className="group-hover:text-white transition-colors duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Divider */}
        <div className="relative mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-2">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Copyright */}
          <div className="text-center lg:text-right">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="text-purple-200 text-sm font-medium">
                © {currentYear} Imangraphics.net
              </p>
              <p className="text-purple-300 text-xs mt-2">
                جميع الحقوق محفوظة • تم التطوير وفقاً لأحكام الشريعة الإسلامية
              </p>
            </div>
          </div>

          {/* Enhanced Islamic Quote */}
          <div className="text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-3">
                  <div className="p-2 bg-yellow-400/20 rounded-full">
                    <BookOpen className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <p className="text-yellow-300 text-lg font-bold mb-3 leading-relaxed">
                  "وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ"
                </p>
                <p className="text-yellow-200 text-sm">سورة الذاريات - الآية 55</p>
              </div>
            </div>
          </div>

          {/* Enhanced Developer Credit */}
          <div className="text-center lg:text-left">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <p className="flex items-center justify-center lg:justify-start gap-2 text-sm text-purple-200 mb-2">
                <span>تم التصميم والتطوير بـ</span>
                <Heart className="text-red-400 animate-pulse" size={16} />
                <span>بواسطة</span>
              </p>
              <Link 
                href="https://www.imangraphics.net/" 
                target='_blank'
                className="group font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-300 flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="text-lg">خالد إيمان</span>
                <Star className="w-5 h-5 group-hover:animate-spin" />
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Islamic Message */}
        <div className="mt-12 text-center">
          <div className="relative group inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-emerald-600/20 to-teal-600/20 backdrop-blur-sm rounded-full px-8 py-4 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:scale-105">
              <p className="text-emerald-300 text-lg font-bold flex items-center gap-3">
                <span className="text-2xl">🤲</span>
                <span>جزاكم الله خيراً لاستخدام التطبيق • بارك الله فيكم</span>
                <span className="text-2xl">🤲</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}