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
  Sparkles,
  ArrowUp
} from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Use deterministic values for floating particles to avoid hydration errors
  const floatingParticles = useMemo(() => (
    Array.from({ length: 12 }, (_, i) => {
      // Use a simple deterministic pattern based on index
      const left = `${(i * 8) % 100}%`;
      const top = `${(i * 11) % 100}%`;
      const animationDelay = `${(i % 4) * 0.8}s`;
      const animationDuration = `${3 + (i % 4) * 0.7}s`;
      return {
        left, top, animationDelay, animationDuration
      };
    })
  ), []);

  return (
    <footer id='Footer' className="relative bg-gradient-to-b from-[#061f13] via-[#0a2618] to-[#030f09] text-white overflow-hidden" dir="rtl">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#177c52]/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#c27c18]/12 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#0a5c34]/15 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Subtle dot pattern instead of grid lines */}
        <div className="absolute inset-0 opacity-10">
          <svg width="40" height="40" viewBox="0 0 40 40" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-[#47b484] to-[#efb63c] rounded-full opacity-60 animate-pulse"
            style={style}
          />
        ))}
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 z-50 group p-4 bg-gradient-to-r from-[#177c52] to-[#0a5c34] rounded-2xl shadow-2xl hover:shadow-[#177c52]/30 transition-all duration-300 hover:scale-110 border border-[#efb63c]/20 backdrop-blur-sm"
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:animate-bounce" />
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-4 mb-8 p-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">
            <div className="relative group">
              <div className="absolute inset-0  rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative p-3">
                <Image
                  src="/logoi.svg"
                  alt="اذكاري"
                  width={80}
                  height={80}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#47b484] via-[#efb63c] to-[#47b484] bg-clip-text text-transparent">
            اذكاري
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            تطبيق إسلامي شامل يحتوي على القرآن الكريم والأذكار اليومية والأحاديث النبوية الشريفة
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* App Features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#177c52] to-[#0a5c34] rounded-xl">
                <Sparkles className="w-6 h-6 text-[#efb63c]" />
              </div>
              مميزات التطبيق
            </h3>
            
            <div className="space-y-4">
              <div className="group p-6 bg-gradient-to-br from-[#177c52]/15 to-[#0d6642]/10 backdrop-blur-sm rounded-2xl border border-[#177c52]/30 hover:border-[#177c52]/50 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#177c52]/20 rounded-xl group-hover:bg-[#177c52]/30 transition-colors duration-300">
                    <BookOpen className="w-6 h-6 text-[#47b484]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">القرآن الكريم</h4>
                    <p className="text-[#7ab894] text-sm">تلاوة وتدبر وحفظ مع الترجمة</p>
                  </div>
                </div>
              </div>
              
              <div className="group p-6 bg-gradient-to-br from-[#c27c18]/15 to-[#8a530d]/10 backdrop-blur-sm rounded-2xl border border-[#c27c18]/25 hover:border-[#efb63c]/40 transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#c27c18]/20 rounded-xl group-hover:bg-[#c27c18]/30 transition-colors duration-300">
                    <Star className="w-6 h-6 text-[#efb63c]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">الأذكار اليومية</h4>
                    <p className="text-[#d4a45a] text-sm">أذكار الصباح والمساء والنوم</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#c27c18] to-[#8a530d] rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              روابط سريعة
            </h3>
            
            <div className="space-y-3">
              {[
                { href: "/", label: "الصفحة الرئيسية" },
                { href: "/quran-viewer", label: "القرآن الكريم" },
                { href: "/morning", label: "أذكار الصباح" },
                { href: "/evening", label: "أذكار المساء" },
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-[#efb63c] rounded-full group-hover:bg-[#47b484] transition-colors duration-300"></div>
                  <span className="text-slate-300 group-hover:text-white font-medium transition-colors duration-300">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-[#0d6c5a] to-[#094536] rounded-xl">
                <Globe className="w-6 h-6 text-[#efb63c]" />
              </div>
              تواصل معنا
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">البريد الإلكتروني</p>
                  <span className="text-sm font-medium text-white">khaledaljabarty@gmail.com</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Globe className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">الموقع الإلكتروني</p>
                  <span className="text-sm font-medium text-white">www.imangraphics.net</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                تابعنا على
              </h4>
              <div className="flex gap-3 flex-wrap">
                {[
                  { href: "https://facebook.com", icon: Facebook, color: "hover:bg-blue-600", label: "فيسبوك" },
                  { href: "https://instagram.com", icon: Instagram, color: "hover:bg-pink-600", label: "إنستغرام" },
                  { href: "https://linkedin.com", icon: Linkedin, color: "hover:bg-blue-700", label: "لينكدإن" },
                  { href: "https://github.com", icon: Github, color: "hover:bg-gray-700", label: "جيت هب" },
                  { href: "mailto:khaledaljabarty@gmail.com", icon: Mail, color: "hover:bg-emerald-600", label: "البريد" }
                ].map((social, index) => (
                  <Link 
                    key={index}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 ${social.color} hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                    title={social.label}
                  >
                    <social.icon size={20} className="text-white" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-12">
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#177c52] to-[#c27c18] rounded-full p-3">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Copyright */}
          <div className="text-center lg:text-right">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="text-white font-medium mb-2">
                © {currentYear} Imangraphics.net
              </p>
              <p className="text-slate-400 text-sm">
                جميع الحقوق محفوظة
              </p>
            </div>
          </div>

          {/* Islamic Quote */}
          <div className="text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#c27c18]/20 to-[#efb63c]/15 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#c27c18]/10 to-[#efb63c]/10 backdrop-blur-sm rounded-3xl p-8 border border-[#c27c18]/30 hover:border-[#efb63c]/50 transition-all duration-300">
                <div className="p-3 bg-[#c27c18]/20 rounded-full w-fit mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-[#efb63c]" />
                </div>
                <p className="text-[#efb63c] text-lg font-bold mb-3 leading-relaxed">
                  "وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ"
                </p>
                <p className="text-[#d4a843] text-sm">سورة الذاريات - الآية 55</p>
              </div>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="text-center lg:text-left">
            <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <p className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-300 mb-3">
                <span>تم التصميم والتطوير بـ</span>
                <Heart className="text-red-400 animate-pulse" size={16} />
              </p>
              <Link 
                href="https://www.imangraphics.net/" 
                target='_blank'
                className="group font-bold text-[#efb63c] hover:text-[#f5cc5e] transition-colors duration-300 flex items-center justify-center lg:justify-start gap-2"
              >
                <span className="text-xl">خالد إيمان</span>
                <Star className="w-5 h-5 group-hover:animate-spin" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Islamic Message */}
        <div className="mt-16 text-center">
          <div className="inline-block p-6 bg-gradient-to-r from-[#177c52]/15 to-[#0a5c34]/10 backdrop-blur-sm rounded-3xl border border-[#47b484]/30">
            <p className="text-[#47b484] text-lg font-bold flex items-center gap-4">
              <span className="text-2xl">🤲</span>
              <span>جزاكم الله خيراً لاستخدام التطبيق • بارك الله فيكم</span>
              <span className="text-2xl">🤲</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}