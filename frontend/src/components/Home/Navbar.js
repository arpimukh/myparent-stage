import {  Zap,Menu} from 'lucide-react';
import React, { useState, useEffect } from 'react';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
}
export default Navbar