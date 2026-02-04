// const About = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
//           About Us
//         </h2>
//         <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
//           Our mission is to provide peace of mind to families by offering reliable, 
//           professional care services tailored to your parent's unique needs. We understand 
//           the challenges of ensuring your loved ones receive the support they deserve while 
//           maintaining their independence and dignity. With years of experience and a 
//           compassionate team, we're here to bridge the gap between family care and 
//           professional assistance, making daily life easier and more enjoyable for your parents.
//         </p>
//       </div>
//     </section>
//   )
// }

// export default About

// pages/about.js
// import React from 'react';
// import Head from 'next/head';
// import { 
//   Car, 
//   ChefHat, 
//   Droplets, 
//   BrushCleaning, 
//   Sprout, 
//   ShowerHead 
// } from 'lucide-react';

// const services = [
//   { name: 'Driver Services', icon: <Car size={32} /> },
//   { name: 'Professional Cook', icon: <ChefHat size={32} /> },
//   { name: 'Car Wash', icon: <Droplets size={32} /> },
//   { name: 'Maid Services', icon: <BrushCleaning size={32} /> },
//   { name: 'Gardening & Landscaping', icon: <Sprout size={32} /> },
//   { name: 'Bathroom Cleaning', icon: <ShowerHead size={32} /> },
// ];

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-white font-sans text-slate-800">
//       <Head>
//         <title>About Us | Vendor Pro</title>
//       </Head>

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 py-20 px-4 text-center text-white">
//         <h1 className="text-5xl font-bold mb-4 tracking-tight">Vendor Pro</h1>
//         <p className="text-xl opacity-90 mb-8">Your On-Demand Service Hub</p>
        
//         {/* App Store Buttons */}
//         <div className="flex justify-center gap-4 flex-wrap">
//           <button className="bg-black hover:bg-slate-900 transition flex items-center px-6 py-2 rounded-xl border border-white/20">
//             <span className="text-left ml-2">
//               <p className="text-[10px] uppercase">Download on the</p>
//               <p className="text-lg font-semibold leading-none">App Store</p>
//             </span>
//           </button>
//           <button className="bg-black hover:bg-slate-900 transition flex items-center px-6 py-2 rounded-xl border border-white/20">
//             <span className="text-left ml-2">
//               <p className="text-[10px] uppercase">Get it on</p>
//               <p className="text-lg font-semibold leading-none">Google Play</p>
//             </span>
//           </button>
//         </div>
//       </section>

//       {/* About Description */}
//       <section className="max-w-4xl mx-auto py-16 px-6 text-center">
//         <h2 className="text-3xl font-bold text-slate-900 mb-6">About Us</h2>
//         <p className="text-lg text-slate-600 leading-relaxed mb-8">
//           Vendor Pro connects you with trusted, professional service providers right at your fingertips. 
//           From household chores to personal assistance, our app simplifies your life, offering reliable 
//           and convenient solutions. We are committed to excellence, quality, and exceptional customer satisfaction.
//         </p>
        
//         {/* Pagination Dots (Visual Only) */}
//         <div className="flex justify-center gap-2">
//           <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
//           <div className="h-2 w-2 rounded-full bg-slate-300"></div>
//           <div className="h-2 w-2 rounded-full bg-slate-300"></div>
//         </div>
//       </section>

//       {/* Services Grid */}
//       <section className="max-w-6xl mx-auto pb-24 px-6">
//         <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Services</h2>
        
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {services.map((service, index) => (
//             <div 
//               key={index} 
//               className="group cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-700 p-6 rounded-2xl text-white text-center flex flex-col items-center justify-center gap-4 shadow-lg hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
//             >
//               <div className="opacity-90 group-hover:scale-110 transition-transform">
//                 {service.icon}
//               </div>
//               <p className="text-sm font-medium leading-tight">
//                 {service.name}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer Branding */}
//       <footer className="py-10 text-center border-t border-slate-100">
//         <p className="text-slate-400 text-sm">© 2026 Vendor Pro Inc. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
import React from 'react';
import Head from 'next/head';
import { 
  Car, 
  ChefHat, 
  CarFront, 
  BrushCleaning, 
  Sprout, 
  ShowerHead 
} from 'lucide-react';

const services = [
  { name: 'Driver Services', icon: <Car size={32} /> },
  { name: 'Professional Cook', icon: <ChefHat size={32} /> },
  { name: 'Car Wash', icon: <CarFront size={32} /> },
  { name: 'Maid Services', icon: <BrushCleaning size={32} /> },
  { name: 'Gardening & Landscaping', icon: <Sprout size={32} /> },
  { name: 'Bathroom Cleaning', icon: <ShowerHead size={32} /> },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <Head>
        <title>About Us | Living Trail</title>
      </Head>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center border-4 border-pink-200/50 rounded-full bg-white/10 backdrop-blur-sm shadow-xl">
             {/* Replace this SVG with your actual exported logo file */}
            <div className="relative w-32 h-32 flex items-center justify-center border-4 border-pink-200/50 rounded-full bg-white backdrop-blur-sm shadow-xl">
            <img 
              src="/images/logo.svg" 
              alt="Living Trail Logo" 
              className="w-full h-full object-contain"
            />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Living Trail</h1>
        <p className="text-xl opacity-90 mb-8">Your On-Demand Service Hub</p>
        
        {/* App Store Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-black hover:bg-slate-900 transition flex items-center px-6 py-2 rounded-xl border border-white/20">
            <span className="text-left ml-2">
              <p className="text-[10px] uppercase">Download on the</p>
              <p className="text-lg font-semibold leading-none">App Store</p>
            </span>
          </button>
          <button className="bg-black hover:bg-slate-900 transition flex items-center px-6 py-2 rounded-xl border border-white/20">
            <span className="text-left ml-2">
              <p className="text-[10px] uppercase">Get it on</p>
              <p className="text-lg font-semibold leading-none">Google Play</p>
            </span>
          </button>
        </div>
      </section>

      {/* About Description */}
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">About Us</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Living Trail connects you with trusted, professional service providers right at your fingertips. 
          From household chores to personal assistance, our app simplifies your life, offering reliable 
          and convenient solutions. We are committed to excellence, quality, and exceptional customer satisfaction.
        </p>
        
        {/* Pagination Dots (Visual Only) */}
        <div className="flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto pb-24 px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Services</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-700 p-6 rounded-2xl text-white text-center flex flex-col items-center justify-center gap-4 shadow-lg hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="opacity-90 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <p className="text-sm font-medium leading-tight">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}