import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Car,
  Utensils,
  Droplets,
  Brush,
  Flower2,
  ShowerHead,
  Apple,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';

// // --- Assets & Mock Data ---

// const SERVICES = [
//   { id: 1, name: 'Driver Services', icon: <Car className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600' },
//   { id: 2, name: 'Professional Cook', icon: <Utensils className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600' },
//   { id: 3, name: 'Car Wash', icon: <Droplets className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600' },
//   { id: 4, name: 'Maid Services', icon: <Brush className="w-8 h-8" />, color: 'bg-pink-100 text-pink-600' },
//   { id: 5, name: 'Gardening & Landscaping', icon: <Flower2 className="w-8 h-8" />, color: 'bg-green-100 text-green-600' },
//   { id: 6, name: 'Bathroom Cleaning', icon: <ShowerHead className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-600' },
// ];

// const OFFERS = [
//   { id: 1, title: 'Get 20% Off First Booking', desc: 'Use code WELCOME20', bgColor: 'from-purple-600 to-blue-600' },
//   { id: 2, title: 'Summer Car Spa Sale', desc: 'Packages starting at $29', bgColor: 'from-blue-500 to-indigo-500' },
//   { id: 3, title: 'Refer a Friend', desc: 'Earn $10 credit per referral', bgColor: 'from-indigo-600 to-purple-500' },
// ];

// const TESTIMONIALS = [
//   {
//     id: 1,
//     name: 'Sarah Johnson',
//     role: 'Product Designer',
//     text: "Living Trail changed how I manage my home. Reliable, fast, and the quality is unmatched.",
//     rating: 5,
//     img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
//   },
//   {
//     id: 2,
//     name: 'Michael Chen',
//     role: 'Software Engineer',
//     text: "Booking is effortless! My driver arrived in minutes and saved me so much time during my commute.",
//     rating: 5,
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
//   },
//   {
//     id: 3,
//     name: 'Emily Davis',
//     role: 'Marketing Manager',
//     text: "The gardening team did an amazing job. My backyard has never looked better. Highly recommend!",
//     rating: 4,
//     img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
//   }
// ];

// // --- Sub-components ---

// const ServiceCollageBg = () => (
//   <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
//     <div className="flex flex-wrap gap-12 rotate-[-12deg] scale-125">
//       {[...Array(20)].map((_, i) => (
//         <div key={i} className="flex flex-col gap-12">
//           <Car className="w-16 h-16" />
//           <Utensils className="w-16 h-16" />
//           <Droplets className="w-16 h-16" />
//           <Brush className="w-16 h-16" />
//           <Flower2 className="w-16 h-16" />
//           <ShowerHead className="w-16 h-16" />
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const Navbar = ({ onNavigate, currentPage }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [navPincode, setNavPincode] = useState('');

//   return (
//     <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center gap-6">
//           <div 
//             className="flex items-center gap-2 shrink-0 cursor-pointer" 
//             onClick={() => onNavigate('home')}
//           >
//             <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
//               <Zap className="text-white w-6 h-6" />
//             </div>
//             <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 hidden sm:block">
//               Living Trail
//             </span>
//           </div>

//           {currentPage === 'home' && (
//             <div className="flex-1 max-w-lg hidden sm:block">
//               <div className="relative group">
//                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-600 transition-colors" />
//                 <input 
//                   type="text" 
//                   placeholder="Search Pincode for availability..." 
//                   className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-base shadow-sm focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
//                   value={navPincode}
//                   onChange={(e) => setNavPincode(e.target.value)}
//                 />
//               </div>
//             </div>
//           )}

//           <div className="hidden md:flex items-center space-x-6 shrink-0">
//             <button onClick={() => onNavigate('home')} className="text-gray-600 hover:text-purple-600 font-medium transition-colors">Services</button>
//             <button className="text-purple-600 font-semibold hover:bg-purple-50 px-4 py-2 rounded-lg transition-all">Login</button>
//             <button 
//               onClick={() => onNavigate('register')}
//               className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-200 hover:scale-105 transition-all active:scale-95"
//             >
//               Register
//             </button>
//           </div>

//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-600">
//               {isOpen ? <X /> : <Menu />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 animate-in slide-in-from-top duration-300">
//           <a href="#" onClick={() => { onNavigate('home'); setIsOpen(false); }} className="block py-2 text-gray-600 font-medium">Services</a>
//           <hr />
//           <div className="grid grid-cols-2 gap-4 pt-2">
//             <button className="w-full text-purple-600 py-2 font-semibold text-center">Login</button>
//             <button 
//               onClick={() => { onNavigate('register'); setIsOpen(false); }}
//               className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold text-center"
//             >
//               Register
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// const RegistrationPage = ({ onNavigate }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     agreed: false
//   });
//   const [isGenerating, setIsGenerating] = useState(true);
//   const [collageUrl, setCollageUrl] = useState('images/services-collage-placeholder.png'); // Local placeholder while generating

//   // Effect to generate the collage background
//   useEffect(() => {
//     const generateCollage = async () => {
//       const apiKey = ""; // Provided by environment
//       const prompt = "A vibrant, modern lifestyle services collage. In one panel, a professional driver in a suit driving a luxury car. In another, a gardener pouring water from a watering can onto lush flowers. A professional sweeper cleaning a modern floor. A chef/cook in whites preparing a gourmet meal. A sparkling clean modern bathroom. A car being washed with high-pressure water foam. High quality, cinematic lighting, professional photography style.";
      
//       try {
//         const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             instances: [{ prompt }],
//             parameters: { sampleCount: 1 }
//           })
//         });

//         if (response.ok) {
//           const result = await response.json();
//           if (result.predictions?.[0]?.bytesBase64Encoded) {
//             setCollageUrl(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to generate image", error);
//       } finally {
//         setIsGenerating(false);
//       }
//     };

//     generateCollage();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Registration attempt:', formData);
//   };

//   return (
//     <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        
//         {/* Left Side: Branding & Info with Background Collage */}
//         <div className="hidden md:flex flex-col justify-between p-12 text-white relative group">
//           {/* Background Image Layer */}
//           <div className="absolute inset-0 z-0">
//             {isGenerating ? (
//               <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-4">
//                 <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
//                 <p className="text-sm font-medium text-slate-400">Curating your service gallery...</p>
//               </div>
//             ) : (
//               <>
//                 <img 
//                   src={collageUrl || "https://images.unsplash.com/photo-1581578731522-540420622205?w=800&q=80"} 
//                   alt="Services Collage" 
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/80 to-blue-900/90 mix-blend-multiply" />
//               </>
//             )}
//           </div>
          
//           <div className="relative z-10">
//             <div className="flex items-center gap-2 mb-12">
//               <Zap className="w-8 h-8 text-purple-300" />
//               <span className="text-2xl font-bold tracking-tight">Living Trail</span>
//             </div>
//             <h2 className="text-4xl font-bold mb-6 leading-tight">Join the premium club of modern living.</h2>
//             <div className="space-y-6">
//               {[
//                 "Access to 500+ vetted professionals",
//                 "Instant booking with real-time tracking",
//                 "Secure payments & 100% satisfaction guarantee",
//                 "Earn rewards with every service"
//               ].map((text, i) => (
//                 <div key={i} className="flex items-center gap-4">
//                   <div className="bg-white/10 p-1 rounded-full backdrop-blur-md">
//                     <CheckCircle2 className="w-5 h-5 text-purple-300" />
//                   </div>
//                   <span className="text-purple-100 font-medium">{text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="relative z-10 pt-12 border-t border-white/10 backdrop-blur-sm">
//             <p className="text-purple-200 text-sm italic">"The easiest way to manage my home life since I moved to the city. Simply brilliant."</p>
//             <p className="mt-2 font-bold">— James L., Premium Member</p>
//           </div>
//         </div>

//         {/* Right Side: Form */}
//         <div className="p-8 lg:p-16">
//           <div className="mb-10 text-center md:text-left">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
//             <p className="text-gray-500">Already have an account? <button className="text-purple-600 font-bold hover:underline">Log in</button></p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-1">
//               <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input 
//                   type="text" 
//                   required
//                   placeholder="John Doe"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
//                   value={formData.fullName}
//                   onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input 
//                   type="email" 
//                   required
//                   placeholder="john@example.com"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
//                   value={formData.email}
//                   onChange={(e) => setFormData({...formData, email: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
//               <div className="relative">
//                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input 
//                   type="tel" 
//                   required
//                   placeholder="+1 (555) 000-0000"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
//                   value={formData.phone}
//                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div className="space-y-1">
//               <label className="text-sm font-bold text-gray-700 ml-1">Create Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input 
//                   type="password" 
//                   required
//                   placeholder="••••••••"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
//                   value={formData.password}
//                   onChange={(e) => setFormData({...formData, password: e.target.value})}
//                 />
//               </div>
//             </div>

//             <div className="flex items-start gap-3 py-2">
//               <input 
//                 type="checkbox" 
//                 required
//                 id="terms"
//                 className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                 checked={formData.agreed}
//                 onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
//               />
//               <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
//                 I agree to the <button type="button" className="text-purple-600 font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-purple-600 font-bold hover:underline">Privacy Policy</button>.
//               </label>
//             </div>

//             <button 
//               type="submit" 
//               className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
//             >
//               Sign Up Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </form>

//           <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
//             <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Or Register With</p>
//             <div className="flex gap-4">
//                <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
//                   <Apple className="w-6 h-6 text-gray-900" />
//                </button>
//                <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
//                   <User className="w-6 h-6 text-blue-600" />
//                </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ... (Rest of the Hero, ServiceMenuAtStart, OfferSliderSmall, Testimonials, and Footer components remain unchanged from the previous version)

// const Hero = () => {
//   return (
//     <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
//       <ServiceCollageBg />
      
//       <div className="absolute top-0 left-0 w-full h-full -z-10">
//         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-3xl opacity-50" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
//         <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
//           Premium Care for Your <br />
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Modern Lifestyle</span>
//         </h1>
//         <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
//           Book trusted professionals for every need. From expert drivers to spotless cleaning, we handle the chores so you can live more.
//         </p>
        
//         <div className="flex justify-center items-center gap-6 grayscale opacity-50 text-sm">
//           <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-purple-600"/> Vetted Pros</div>
//           <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-blue-600"/> Quick Arrival</div>
//           <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500"/> 4.8+ Rating</div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const ServiceMenuAtStart = () => {
//   return (
//     <div className="max-w-7xl mx-auto px-4 mb-12">
//       <div className="flex flex-col lg:flex-row gap-8 items-stretch">
//         <div className="w-full lg:w-2/3 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-50/50">
//           <div className="flex items-center justify-between mb-6 px-2">
//             <h3 className="text-xl font-bold text-gray-900">Book a Service</h3>
//             <span className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase">Instant Booking</span>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {SERVICES.map((service) => (
//               <div 
//                 key={service.id} 
//                 className="flex flex-col items-center p-4 rounded-3xl border border-gray-50 hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer group"
//               >
//                 <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
//                   {React.cloneElement(service.icon, { className: "w-6 h-6" })}
//                 </div>
//                 <h4 className="font-bold text-gray-800 text-xs text-center leading-tight">
//                   {service.name}
//                 </h4>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="w-full lg:w-1/3 min-h-[300px]">
//           <OfferSliderSmall />
//         </div>
//       </div>
//     </div>
//   );
// };

// const OfferSliderSmall = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) => (prev === OFFERS.length - 1 ? 0 : prev + 1));
//     }, 4500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="relative overflow-hidden rounded-[2.5rem] h-full shadow-2xl border border-white">
//       {OFFERS.map((offer, idx) => (
//         <div 
//           key={offer.id}
//           className={`absolute inset-0 w-full h-full p-8 flex flex-col justify-center transition-all duration-700 ease-in-out bg-gradient-to-br ${offer.bgColor} text-white ${idx === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
//         >
//           <span className="bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">Limited Offer</span>
//           <h2 className="text-2xl font-bold mb-3 leading-tight">{offer.title}</h2>
//           <p className="text-white/80 text-sm mb-8 leading-relaxed">{offer.desc}</p>
//           <button className="bg-white text-gray-900 w-full py-3.5 rounded-2xl font-bold text-sm shadow-xl hover:scale-[1.02] transition-transform">Claim Now</button>
//         </div>
//       ))}
      
//       <div className="absolute bottom-6 left-8 flex gap-1.5">
//         {OFFERS.map((_, idx) => (
//           <div 
//             key={idx} 
//             className={`h-1.5 rounded-full transition-all ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Testimonials = () => {
//   return (
//     <section className="py-24 bg-gray-50/50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Trusted by 10,000+ Professionals</h2>
//           <div className="flex justify-center gap-1">
//             {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
//           </div>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {TESTIMONIALS.map((t) => (
//             <div key={t.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 relative">
//               <div className="absolute -top-6 left-8">
//                 <div className="bg-purple-600 rounded-full p-2 text-white shadow-lg">
//                   <Star className="w-4 h-4 fill-current" />
//                 </div>
//               </div>
//               <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.text}"</p>
//               <div className="flex items-center gap-4">
//                 <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100" />
//                 <div>
//                   <h4 className="font-bold text-gray-900">{t.name}</h4>
//                   <p className="text-sm text-gray-400">{t.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white pt-20 pb-10">
//       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
//         <div className="col-span-1 md:col-span-2">
//           <div className="flex items-center gap-2 mb-6">
//             <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
//               <Zap className="text-purple-400 w-5 h-5" />
//             </div>
//             <span className="text-2xl font-bold">Living Trail</span>
//           </div>
//           <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
//             The world's first premium on-demand service hub designed for the modern busy individual. Quality and reliability in every tap.
//           </p>
//           <div className="flex gap-4">
//             <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-purple-600 transition-colors">
//               <Apple className="w-6 h-6" />
//             </div>
//             <div className="bg-gray-800 p-3 rounded-xl cursor-pointer hover:bg-purple-600 transition-colors">
//               <User className="w-6 h-6" />
//             </div>
//           </div>
//         </div>
        
//         <div>
//           <h4 className="font-bold mb-6">Company</h4>
//           <ul className="space-y-4 text-gray-400">
//             <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
//             <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
//             <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
//             <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="font-bold mb-6">Contact</h4>
//           <ul className="space-y-4 text-gray-400">
//             <li>Support: help@livingtrail.com</li>
//             <li>Partners: partners@livingtrail.com</li>
//             <li>Global HQ: Silicon Valley, CA</li>
//           </ul>
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
//         © 2024 Living Trail Inc. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('home');

//   return (
//     <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
//       <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
//       <main>
//         {currentPage === 'home' ? (
//           <>
//             <Hero />
//             <ServiceMenuAtStart />
//             <Testimonials />
            
//             <section className="max-w-7xl mx-auto px-4 mb-24">
//               <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] p-8 lg:p-20 text-center relative overflow-hidden shadow-2xl">
//                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
//                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Experience the trail on the go.</h2>
//                  <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">Download our mobile app for real-time tracking, instant booking, and exclusive member discounts.</p>
//                  <div className="flex flex-wrap justify-center gap-4">
//                    <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg">
//                      <Apple className="w-6 h-6 fill-current" /> App Store
//                    </button>
//                    <button className="bg-indigo-700/50 border border-indigo-400/30 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform backdrop-blur-sm">
//                      <Zap className="w-6 h-6 fill-current" /> Play Store
//                    </button>
//                  </div>
//               </div>
//             </section>
//           </>
//         ) : (
//           <RegistrationPage onNavigate={setCurrentPage} />
//         )}
//       </main>
      
//       <Footer />
//     </div>
//   );
// }


const RegistrationPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    agreed: false
  });
  const [isGenerating, setIsGenerating] = useState(true);
  const [collageUrl, setCollageUrl] = useState('images/services-collage-placeholder.png'); // Local placeholder while generating

  // Effect to generate the collage background
  useEffect(() => {
    const generateCollage = async () => {
      const apiKey = ""; // Provided by environment
      const prompt = "A vibrant, modern lifestyle services collage. In one panel, a professional driver in a suit driving a luxury car. In another, a gardener pouring water from a watering can onto lush flowers. A professional sweeper cleaning a modern floor. A chef/cook in whites preparing a gourmet meal. A sparkling clean modern bathroom. A car being washed with high-pressure water foam. High quality, cinematic lighting, professional photography style.";
      
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            instances: [{ prompt }],
            parameters: { sampleCount: 1 }
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.predictions?.[0]?.bytesBase64Encoded) {
            setCollageUrl(`data:image/png;base64,${result.predictions[0].bytesBase64Encoded}`);
          }
        }
      } catch (error) {
        console.error("Failed to generate image", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generateCollage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempt:', formData);
  };

  return (
    <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Left Side: Branding & Info with Background Collage */}
        <div className="hidden md:flex flex-col justify-between p-12 text-white relative group">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            {isGenerating ? (
              <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
                <p className="text-sm font-medium text-slate-400">Curating your service gallery...</p>
              </div>
            ) : (
              <>
                <img 
                  src={collageUrl || "https://images.unsplash.com/photo-1581578731522-540420622205?w=800&q=80"} 
                  alt="Services Collage" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/80 to-blue-900/90 mix-blend-multiply" />
              </>
            )}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <Zap className="w-8 h-8 text-purple-300" />
              <span className="text-2xl font-bold tracking-tight">Living Trail</span>
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Join the premium club of modern living.</h2>
            <div className="space-y-6">
              {[
                "Access to 500+ vetted professionals",
                "Instant booking with real-time tracking",
                "Secure payments & 100% satisfaction guarantee",
                "Earn rewards with every service"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-white/10 p-1 rounded-full backdrop-blur-md">
                    <CheckCircle2 className="w-5 h-5 text-purple-300" />
                  </div>
                  <span className="text-purple-100 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-12 border-t border-white/10 backdrop-blur-sm">
            <p className="text-purple-200 text-sm italic">"The easiest way to manage my home life since I moved to the city. Simply brilliant."</p>
            <p className="mt-2 font-bold">— James L., Premium Member</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 lg:p-16">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Already have an account? <button className="text-purple-600 font-bold hover:underline">Log in</button></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="tel" 
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:bg-white focus:border-purple-600 focus:ring-4 focus:ring-purple-50 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 py-2">
              <input 
                type="checkbox" 
                required
                id="terms"
                className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                checked={formData.agreed}
                onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the <button type="button" className="text-purple-600 font-bold hover:underline">Terms of Service</button> and <button type="button" className="text-purple-600 font-bold hover:underline">Privacy Policy</button>.
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              Sign Up Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col items-center gap-4">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Or Register With</p>
            <div className="flex gap-4">
               <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <Apple className="w-6 h-6 text-gray-900" />
               </button>
               <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                  <User className="w-6 h-6 text-blue-600" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrationPage;