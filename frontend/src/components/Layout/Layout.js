import { useState } from 'react'
import Link from 'next/link'
import Navbar from '../Home/Navbar'
import { User, Zap,Apple,Menu,X} from 'lucide-react';

const Layout = ({ children }) => {
  const [email, setEmail] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  const cities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Surat'
  ]

  const handleCityChange = (e) => {
    const city = e.target.value
    setSelectedCity(city)
    if (city) {
      setTimeout(() => {
        alert(`Great! Services for ${city} are now available.`)
      }, 500)
    }
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (email) {
      alert('Thank you for subscribing! You will receive our latest updates.')
      setEmail('')
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [navPincode, setNavPincode] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
     <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
              <Zap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Living Trail
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">How it Works</a>
            <a href="#" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Services</a>
            <button className="text-purple-600 font-semibold hover:bg-purple-50 px-4 py-2 rounded-lg transition-all">Login</button>
            <button className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-200 hover:scale-105 transition-all active:scale-95">Register</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
           {/* Pincode Search */}
        {/* <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Enter Pincode for availability" 
            className="w-full pl-12 pr-32 py-5 rounded-2xl border-2 border-gray-100 focus:border-purple-600 focus:ring-0 outline-none shadow-xl shadow-gray-100 transition-all text-lg"
            value={navPincode}
            onChange={(e) => setNavPincode(e.target.value)}
          />
          <button className="absolute right-2 inset-y-2 bg-purple-600 text-white px-6 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center gap-2">
            Check <ChevronRight className="w-4 h-4" />
          </button>
        </div> */}
          <a href="#" className="block py-2 text-gray-600 font-medium">How it Works</a>
          <a href="#" className="block py-2 text-gray-600 font-medium">Services</a>
          <hr />
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button className="w-full text-purple-600 py-2 font-semibold">Login</button>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold">Register</button>
          </div>
        </div>
      )}
    </nav>
  );
     // <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <Zap className="text-purple-400 w-5 h-5" />
            </div>
            <span className="text-2xl font-bold">Living Trail</span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8">
            The world's first premium on-demand service hub designed for the modern busy individual. Quality and reliability in every tap.
          </p>
          <div className="flex gap-4">
            <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-purple-600 transition-colors">
              <Apple className="w-6 h-6" />
            </div>
            <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-purple-600 transition-colors">
              <User className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-gray-400">
            <li>Support: help@livingtrail.com</li>
            <li>Partners: partners@livingtrail.com</li>
            <li>Global HQ: Silicon Valley, CA</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © 2024 Living Trail Inc. All rights reserved.
      </div>
    </footer>
    </div>
  )
}

export default Layout