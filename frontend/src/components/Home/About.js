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
import { useState, useEffect } from 'react'
import { 
  Car, 
  ChefHat, 
  CarFront, 
  BrushCleaning, 
  Sprout, 
  ShowerHead 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { name: 'Driver Services', icon: <Car size={32} /> },
  { name: 'Professional Cook', icon: <ChefHat size={32} /> },
  { name: 'Car Wash', icon: <CarFront size={32} /> },
  { name: 'Maid Services', icon: <BrushCleaning size={32} /> },
  { name: 'Gardening & Landscaping', icon: <Sprout size={32} /> },
  { name: 'Bathroom Cleaning', icon: <ShowerHead size={32} /> },
];
export default function AboutPage() {

const [isOpen, setIsOpen] = useState(false);
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

      {/* About Description
      <section className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">About Us</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-8">
          Living Trail connects you with trusted, professional service providers right at your fingertips. 
          From household chores to personal assistance, our app simplifies your life, offering reliable 
          and convenient solutions. We are committed to excellence, quality, and exceptional customer satisfaction.
        </p>
        
        {/* Pagination Dots (Visual Only) 
        <div className="flex justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300"></div>
        </div>
      </section> */}

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto pb-24 px-6">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Services</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} onClick={() => setIsOpen(true)}
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
        <AnimatePresence>
                {isOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetModal} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />

                    <motion.div layout className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-2xl overflow-hidden z-10">

                      {/* Progress Header */}
                      {step < 6 && (
                        <div className="px-8 pt-8 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {step > 1 && (
                              <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-slate-100 rounded-full">
                                <ChevronLeft size={20} />
                              </button>
                            )}
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">
                              {step === 1 && "1. Select Service"}
                              {step === 2 && `2. ${bookingData.service ? bookingData.service.label : "Select Service"}`}
                              {step === 3 && "3. Schedule Time"}
                              {step === 4 && "4. Select Address"}
                              {step === 5 && "5. Instructions/Details"}
                              {step === 6 && "6. Payment"}
                              <span className={`block h-1 bg-indigo-600 ${step === 1 ? 'w-full' : step === 2 ? 'w-full' : step === 3 ? 'w-full' : step === 4 ? 'w-full' : step === 5 ? 'w-full' : 'w-full'} mt-1`}></span>
                            </h2>
                          </div>
                          <button onClick={resetModal} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                            <X size={18} />
                          </button>
                        </div>
                      )}

                      <div className="p-8">
                        {/* STEP 1: SERVICE */}
                        {step === 1 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 1: Service</h2> */}
                            <div className="grid grid-cols-2 gap-3">
                              {SERVICES.map((s) => (
                                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); setStep(2); }}
                                  className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-slate-50 bg-slate-50 hover:border-indigo-600 hover:bg-white transition-all group"
                                >
                                  <span className="mb-3 p-3 bg-white rounded-2xl shadow-sm group-hover:text-indigo-600">{s.icon}</span>
                                  <span className="font-bold text-slate-700 text-sm">{s.label}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: SCHEDULE */}
                        {step === 2 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ overflowY: 'scroll', maxHeight: '400px' }}> 
                            {serviceData.map((subCatagory, i) => (
                              <div key={subCatagory.subtype_header}>
                                <div className="flex items-center mb-6">
                                  {/* <button onClick={() => setStep(3)} className="mr-4 text-gray-500">←</button> */}
                                <h3 className="text-xl font-bold">
                                  {subCatagory.subtype_header || "Select Options"}
                                   { subCatagory.subtype_header.includes('Preference') && (
                                  <h3 className="text-sm text-gray-500 ml-4">We try to meet your preference based on availabilities but doesn't ensure definite matches</h3>
                                  )}
                                </h3>
                               
                               
                              </div>

                              <div className="space-y-4">
                                {subCatagory.subtypes.map((item, index) => (
                                  <label 
                                    key={`${subCatagory.subtype_header.replace(/\s+/g, '-')}-${index}`} 
                                    className="flex items-center justify-between p-4 border rounded-2xl  hover:border-blue-500 transition"
                                  >
                                    <div className="flex items-center gap-3">
                                      <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600"
                                       // checked={!!selectedSubtypes[item.subtype]}
                                        onChange={() => handleCheckboxChange(item.subtype)}
                                      />
                                      <span className="text-gray-700 font-medium">{item.subtype}</span>
                                    </div>
                                    { !subCatagory.subtype_header.includes('Preference') && (
                                    <span className="text-blue-600 font-bold">₹{item.cost} [{item.rate_type}]</span>
                                    )}
                                  </label>
                                ))}
                              </div>
                            </div>
                        ))}
                          <button className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-bold hover:opacity-90" onClick={() =>{ setBookingData({...bookingData, serviceSubType: selectedSubtypes});setStep(3);}}>
                            Continue
                          </button>
                        </motion.div>
                      )}
                      { /* Step 3: Schedule Time */}
                        {step === 3 && (
                          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                              {dates.map((d) => (
                           <button key={d.full} onClick={() => setBookingData({ ...bookingData, date: `${d.full}`,displayDate: `${d.day}, ${d.month} ${d.date}` })} className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${bookingData.date === `${d.full}` ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
                            <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                            <span className="text-xl font-black">{d.date}</span>
                          </button>
                        ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" defaultValue={bookingData.time}  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}>
                                <option value="">Start Slot</option>
                                {getSlots().map(slot =>  
                                <option value={slot.display} >{slot.display}</option>)}
                              </select>
                              <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}>
                                {[1, 2, 4, 8].map(h => <option key={h} value={h}>{h} Hour{h > 1 ? 's' : ''}</option>)}
                              </select>
                            </div>
                            <button disabled={!bookingData.time ||!bookingData.date} onClick={() => setStep(4)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Continue</button>
                          </motion.div>
                        )}

                        {/* STEP 3 & 4 (Address & Instructions) - Compressed for display */}
                        {step === 4 && (
                          <div className="space-y-4">
                            {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 3: Address</h2> */}
                            <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative border-2 border-slate-50">
                               {bookingData.pincode.length === 6 ? <iframe width="100%" height="100%" frameBorder="0" src={mapUrl}></iframe> : <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-bold text-[10px] uppercase">Pin to Preview Map</div>}
                            </div>
                            <input placeholder="Pincode" maxLength={6} onChange={(e) => setBookingData({ ...bookingData, pincode: e.target.value })} value={bookingData.pincode} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" />
                            <textarea placeholder="Address Details" onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })} value={bookingData.address} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-24" />
                            <button disabled={!bookingData.pincode ||!bookingData.address} onClick={() => setStep(5)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Next</button>
                          </div>
                        )}

                        {step === 5 && (
                          <div className="space-y-4">
                            {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 4: Details</h2> */}
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Special Instructions</label>
                            <textarea placeholder="Any notes for the professional?" onChange={(e) => setBookingData({ ...bookingData, instructions: e.target.value })} value={bookingData.instructions} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-32" />
                            <button onClick={() => setStep(6)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Proceed to Payment</button>
                          </div>
                        )}

                        {/* STEP 5: RAZORPAY PAYMENT GATEWAY */}
                        {step === 6 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                              <div className="relative z-10">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Final Amount</p>
                                <h3 className="text-4xl font-black tracking-tighter">{totalAmount} /-</h3>
                              </div>
                              <ShieldCheck className="absolute -right-4 -bottom-4 text-white/5" size={120} />
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between text-sm font-bold text-slate-500">
                                <span>{bookingData.service.label} ({bookingData.duration}hr)</span>
                                <span>{serviceCharge.toFixed(2)} /-</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-slate-500 pb-3 border-b border-slate-100">
                                <span>GST (18%)</span>
                                <span>{tax} /-</span>
                              </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center gap-4">
                              <img src="https://razorpay.com/favicon.png" className="w-6 h-6" alt="Razorpay" />
                              <div>
                                <p className="text-[10px] font-black text-blue-800 uppercase">Secured by Razorpay</p>
                                <p className="text-[10px] text-blue-600 font-medium">Cards, UPI, Netbanking supported</p>
                              </div>
                            </div>

                            <button
                              onClick={handleRazorpayPayment}
                              disabled={isProcessing}
                              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all hover:bg-indigo-700 active:scale-95"
                            >
                              {isProcessing ? (
                                <>
                                  <Loader2 className="animate-spin" size={20} />
                                  Processing...
                                </>
                              ) : (
                                `Pay Now ${totalAmount}/-`
                              )}
                            </button>
                          </motion.div>
                        )}

                        {/* STEP 6: SUCCESS */}
                        {step === 7 && (
                          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6">
                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                              <PartyPopper size={48} />
                            </div>
                            <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">Payment Successful!</h2>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-8">Booking ID: {bookingData.id}</p>

                            <div className="bg-slate-50 rounded-[2.5rem] p-8 text-left space-y-4 mb-8">
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Service</span>
                                <span className="text-slate-800 font-bold flex items-center gap-2">
                                  {bookingData.service.icon} {bookingData.service.label}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Date</span>
                                <span className="text-slate-800 font-bold">{bookingData.displayDate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Time Slot</span>
                                <span className="text-slate-800 font-bold">{bookingData.time}-{addHoursToTime(bookingData.time, bookingData.duration)}</span>
                              </div>
                            </div>

                            <button onClick={resetModal} className="w-full$ bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 uppercase tracking-widest text-sm">Return to Dashboard</button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
      </section>

      
    </div>
  );
}