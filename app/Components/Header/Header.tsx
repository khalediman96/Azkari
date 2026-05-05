"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sling as Hamburger } from 'hamburger-react'
// import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { HomeIcon, UserIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <header className={`
        fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-[#f7f3e9]/95 dark:bg-[#0a2618]/95 backdrop-blur-md shadow-lg border-b border-[#c27c18]/20 dark:border-[#177c52]/30' 
          : 'bg-[#f7f3e9]/80 dark:bg-[#0a2618]/80 backdrop-blur-sm shadow-md border-b border-[#c27c18]/10'
        }
      `}>
        <div className='w-[95%] mx-auto px-4 lg:px-6'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo Section */}
            <div className='flex items-center'>
              <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#177c52] to-[#c27c18] rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <Image
                    src="/logoi.svg"
                    alt="اذكاري"
                    width={120}
                    height={80}
                    className="relative transition-colors duration-300"
                  />
                </div>
               
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className='hidden lg:flex items-center space-x-8 rtl:space-x-reverse'>
              <Link 
                href="/" 
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-[#1a3a26] dark:text-[#d4c9a8] hover:bg-[#0a5c34]/10 dark:hover:bg-[#177c52]/20 transition-all duration-300 hover:scale-105"
              >
                <HomeIcon className="w-5 h-5 text-[#177c52] group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">الرئيسية</span>
              </Link>

              <Link 
                href="https://www.imangraphics.net/" 
                target='_blank'
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-[#1a3a26] dark:text-[#d4c9a8] hover:bg-[#0a5c34]/10 dark:hover:bg-[#177c52]/20 transition-all duration-300 hover:scale-105"
              >
                <UserIcon className="w-5 h-5 text-[#177c52] group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">عن المطور</span>
              </Link>

              <Link 
                href="#Footer" 
                className="group flex items-center gap-2 px-4 py-2 rounded-xl text-[#1a3a26] dark:text-[#d4c9a8] hover:bg-[#0a5c34]/10 dark:hover:bg-[#177c52]/20 transition-all duration-300 hover:scale-105"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#177c52] group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">تواصل معي</span>
              </Link>
            </nav>

            {/* Right Section */}
            <div className='flex items-center md:hidden bg-gradient-to-r from-[#177c52] to-[#0a5c34] rounded-md justify-center gap-4'>
              {/* Mobile Menu Button */}
              
                
                  <Hamburger
                    toggled={isMenuOpen}
                    toggle={setIsMenuOpen}
                    size={24}
                    duration={0.3}
                    color='currentColor'
                  />
              
             
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300
        ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={closeMenu} />

      {/* Mobile Navigation Menu */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 lg:hidden
        bg-[#f7f3e9]/98 dark:bg-[#0a2618]/98 backdrop-blur-md
        border-l border-[#c27c18]/20 dark:border-[#177c52]/40
        transform transition-all duration-300 ease-out
        ${isMenuOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'}
      `}>
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#c27c18]/20 dark:border-[#177c52]/40">
          <div className="flex items-center gap-3">
            <Link href="/"> 
              <Image
                src="/logoi.svg"
                alt="اذكاري"
                width={120}
                height={80}
              />
            </Link>
           
            
            
          </div>
          {/* <button
            onClick={closeMenu}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button> */}
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <nav className="flex-1 px-6 py-8 space-y-2">
            <Link 
              href="/" 
              className="group flex items-center gap-4 p-4 rounded-xl text-[#1a3a26] dark:text-[#d4c9a8] hover:bg-[#0a5c34]/10 dark:hover:bg-[#177c52]/15 transition-all duration-300"
              onClick={closeMenu}
            >
              <div className="p-2 bg-[#d9f2e6] dark:bg-[#177c52]/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <HomeIcon className="w-5 h-5 text-[#177c52]" />
              </div>
              <div>
                <span className="font-semibold text-lg">الرئيسية</span>
                <p className="text-sm text-[#4a7a5a] dark:text-[#7ab894]">العودة للصفحة الرئيسية</p>
              </div>
            </Link>

            <Link 
              href="https://www.imangraphics.net/" 
              target='_blank'
              className="group flex items-center gap-4 p-4 rounded-xl text-[#1a3a26] dark:text-[#d4c9a8] hover:bg-[#0a5c34]/10 dark:hover:bg-[#177c52]/15 transition-all duration-300"
              onClick={closeMenu}
            >
              <div className="p-2 bg-[#d9f2e6] dark:bg-[#177c52]/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <UserIcon className="w-5 h-5 text-[#177c52]" />
              </div>
              <div>
                <span className="font-semibold text-lg">عن المطور</span>
                <p className="text-sm text-[#4a7a5a] dark:text-[#7ab894]">تعرف على المطور</p>
              </div>
            </Link>

            <Link 
              href="#Footer" 
              className="group flex items-center gap-4 p-4 rounded-xl text-[#1a3a26] dark:text-[#d4c9a8] hover:bg-[#0a5c34]/10 dark:hover:bg-[#177c52]/15 transition-all duration-300"
              onClick={closeMenu}
            >
              <div className="p-2 bg-[#d9f2e6] dark:bg-[#177c52]/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-[#177c52]" />
              </div>
              <div>
                <span className="font-semibold text-lg">تواصل معي</span>
                <p className="text-sm text-[#4a7a5a] dark:text-[#7ab894]">للاستفسارات والدعم</p>
              </div>
            </Link>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-[#c27c18]/20 dark:border-[#177c52]/40 bg-gradient-to-r from-[#eef7f0] to-[#f4f1e8] dark:from-[#0a2618]/80 dark:to-[#0f3422]/80">
            <div className="text-center">
              <p className="text-sm text-[#4a7a5a] dark:text-[#7ab894] mb-2">
                جزاكم الله خيراً لاستخدام التطبيق
              </p>
              <div className="flex items-center justify-center gap-2 text-[#177c52]">
                <span className="text-lg">🤲</span>
                <span className="text-sm font-medium">بارك الله فيكم</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}