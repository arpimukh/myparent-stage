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
  Apple,Loader2,PartyPopper
} from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
// --- Assets & Mock Data ---
      
const SERVICES = [
//   { id: 1, name: 'Driver Services', icon: <Car className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600' },
//   { id: 2, name: 'Professional Cook', icon: <Utensils className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600' },
//   { id: 3, name: 'Car Wash', icon: <Droplets className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600' },
//   { id: 4, name: 'Maid Services', icon: <Brush className="w-8 h-8" />, color: 'bg-pink-100 text-pink-600' },
//   { id: 5, name: 'Gardening & Landscaping', icon: <Flower2 className="w-8 h-8" />, color: 'bg-green-100 text-green-600' },
//   { id: 6, name: 'Bathroom Cleaning', icon: <ShowerHead className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-600' },
// ];
{ id: 'driver',service_type_id: 1, label: 'Driver',name: 'Driver Services', icon: <Car className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600', rate: 150 },
  { id: 'cook', service_type_id: 3, label: 'Cook',  name: 'Professional Cook', icon: <Utensils className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', rate: 250 },
  { id: 'car_wash', service_type_id: 4, label: 'Car Wash', name: 'Car Wash', icon: <Droplets className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', rate: 100 },
  { id: 'domestic_help', service_type_id: 2, label: 'Domestic Help', name: 'Maid Services', icon: <User className="w-8 h-8" />, color: 'bg-pink-100 text-pink-600' , rate: 100 },
  { id: 'gardening', service_type_id: 5, label: 'Gardening', name: 'Gardening & Landscaping', icon: <Flower2 className="w-8 h-8" />, color: 'bg-green-100 text-green-600', rate: 140 },
  { id: 'bathroom_cleaning', service_type_id: 6, label: 'Bathroom Cleaning', name: 'Bathroom Cleaning', icon: <ShowerHead className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-600', rate: 180 },
];

const OFFERS = [
  { id: 1, title: 'Get 20% Off First Booking', desc: 'Use code WELCOME20', bgColor: 'from-purple-600 to-blue-600' },
  { id: 2, title: 'Summer Car Spa Sale', desc: 'Packages starting at 300/-', bgColor: 'from-blue-500 to-indigo-500' },
  { id: 3, title: 'Refer a Friend', desc: 'Earn 50/- credit per referral', bgColor: 'from-indigo-600 to-purple-500' },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Designer',
    text: "This App changed how I manage my home. Reliable, fast, and the quality is unmatched.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    text: "Booking is effortless! My driver arrived in minutes and saved me so much time during my commute.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Marketing Manager',
    text: "The gardening team did an amazing job. My backyard has never looked better. Highly recommend!",
    rating: 4,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  }
];


// --- Components ---


const Hero = () => {
  const [pincode, setPincode] = useState('');

  const [verify_pincode, setVerifyPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const handleCheckPincode = async () => {
    if (!pincode.trim()) {
      alert('Please enter a pincode');
      return;
    }

    // Mock pincode validation for Bangalore, Kolkata, Pune
    const validPincodes = {
      '560001': 'Bangalore',
      '560034': 'Bangalore',
      '560093': 'Bangalore',
      '700001': 'Kolkata',
      '700012': 'Kolkata',
      '700071': 'Kolkata',
      '411001': 'Pune',
      '411002': 'Pune',
      '411046': 'Pune'
    };
    if (Object.keys(validPincodes).some(code => code.startsWith(pincode.substring(0, 4)))) {
      setPincodeStatus({
        available: true,
        city: validPincodes[pincode],
        message: `✓ Services available in ${validPincodes[pincode]}`
      });
    } else {
      setPincodeStatus({
        available: false,
        city: null,
        message: '✗ Services not available in this area'
      });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/images/services-collage-placeholder.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="top-0 max-w-7xl mx-auto px-4 text-center">
        {/* Pincode Search */}
        <div className="max-w-md mx-auto relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-600 transition-colors">
            <MapPin className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            placeholder="Enter Pincode for availability" 
            className="w-full pl-12 pr-32 py-5 rounded-2xl border-2 border-gray-100 focus:border-purple-600 focus:ring-0 outline-none shadow-xl shadow-gray-100 transition-all text-lg"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            maxLength="6"
          />
          <button 
            onClick={handleCheckPincode}
            className="absolute right-2 inset-y-2 bg-purple-600 text-white px-6 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            Check <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pincode Status Message */}
        {pincodeStatus && (
          <div className={`mt-4 max-w-md mx-auto p-4 rounded-xl font-bold text-sm ${pincodeStatus.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {pincodeStatus.message}
          </div>
        )}

        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
          Premium Care for Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Modern Lifestyle</span>
        </h1> 
        <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Book trusted professionals for every need. From expert drivers to spotless cleaning, we handle the chores so you can live more.
        </p>

        <div className="mt-12 flex justify-center items-center gap-8 grayscale opacity-50">
          <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Vetted Pros</div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5"/> Quick Arrival</div>
          <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500"/> 4.8+ Rating</div>
        </div>
      </div>
    </section>
  );
};
const ServicesSection = () => {
  const [step, setStep] = useState(1);  
  const [bookingData, setBookingData] = useState({
    client_id: '',
    client_name: '',
    client_phone: '',
    client_pin: '',
    client_email:'',
    service: SERVICES[0],
    selectedSubtypes: [],
    date: '',
    displayDate: '',
    booking_time: '',
    booking_date: '',
    created_at: '',
    updated_at: '',
    booking_hours: 1,
    duration: 1,
    address: '',
    pincode: '',
    instructions: '',
    phone: '',
    id: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [mapUrl, setMapUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleCheckPincode = async (client_pincode) => {
    if (!client_pincode.trim()) {
      alert('Please enter a pincode');
      
    }

    // Mock pincode validation for Bangalore, Kolkata, Pune
    const validPincodes = {
      '560001': 'Bangalore',
      '560034': 'Bangalore',
      '560093': 'Bangalore',
      '700001': 'Kolkata',
      '700012': 'Kolkata',
      '700071': 'Kolkata',
      '411001': 'Pune',
      '411002': 'Pune',
      '411046': 'Pune'
    };
    //setPincodeStatus(
    //if (Object.keys(validPincodes).some(code => code.startsWith(client_pincode.substring(0, 4)))) {
      // setPincodeStatus({
      //   available: true,
      //   city: validPincodes[client_pincode],
      //   message: `✓ Services available in ${validPincodes[client_pincode]}`
    if(client_pincode.length===6 &&Object.hasOwn(validPincodes, client_pincode)) {
      alert`✓ Services available in ${validPincodes[client_pincode]}`
      // });
    } else {
      //setPincodeStatus({
        // available: false,
        // city: null,
        // message: '✗ Services not available in this area'
      //});
      if(client_pincode.length === 6)
      alert(`✗ Services not available in this area`);
    }
  };
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input automatically
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };
  const fetchServiceSubtypes = async (selectedType_id) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/services/service-type/${selectedType_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const result = await response.json();
        console.log('📦 service-type API response:', result);

        if (result.success) {
           setServiceData(result.data.serviceDetails[0].resource_details);
          console.log('Select serviceData:', result.data.serviceDetails[0].resource_details);
          
        }
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };
  const handleSendOTP = async (phone) => {
    setIsLoading(true);
    console.log(`Sending OTP to: ${phone}`);
    // Call API to send OTP
    if(phone.length !== 10) { alert("Please enter a valid 10-digit phone number"); setIsLoading(false); return;}
    await fetch('http://localhost:5001/api/auth/otp/send', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: phone }) 
    });
    alert(
      `OTP sent to ${phone}. `
    );
    setIsLoading(false);
   // setStep(2);
  };

  const handleVerify = async (phone, otp) => {
    setIsLoading(true);
    const res = await fetch(`http://localhost:5001/api/auth/otp/verify`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ phone, otp }) 
    });
    if (res.ok) {alert("Verified!"); createAdhocUser();setStep(2);} else {alert("Invalid OTP"); };
    setIsLoading(false);

  };
  const createAdhocUser = async () => {
    const res = await fetch(`http://localhost:5001/api/adhoc/user`, { 
        method: 'POST',
        headers: {
            //'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
           name:bookingData.client_name, phone:phone, pin:bookingData.client_pin, email:bookingData.client_email }) 
    });
    
    if (res.ok) {
      alert("Verified!"); 
      const result = await res.json();
        console.log(' User created:', result)

        if (result.data) {
          console.log(' User id:',  result.data.id);  
          setBookingData({ ...bookingData, client_id: result.data.id });
        }
        console.log(' bookingData after user creation:', bookingData)
      setStep(2);
    } 
    else 
      {alert("Invalid OTP"); };
  }
  const createAdhocServiceRequest = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try { 
        //http://localhost:5001/api/services/service-type/${bookingData.service.id}
        const response = await fetch(`http://localhost:5001/api/adhoc/services/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            client_id: bookingData.client_id,
            client_name: bookingData.client_name,
            client_phone: phone,
            service_type: bookingData.service.id,
            service_subtypes: selectedSubtypes,
            duration: bookingData.duration,
            date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            booking_time: bookingData.booking_time,
            client_email: bookingData.client_email,
            pincode: bookingData.pincode,
            address: bookingData.address,
            special_instructions: bookingData.instructions,
            service_charge: Array.isArray(selectedSubtypes) ? selectedSubtypes.reduce((total, s) => { return total + (s && s.rate_type==='hourly' ? (bookingData.duration || 1) * s.cost : s?.cost || 0)}, 0) : Object.values(selectedSubtypes).filter(v => v).reduce((total, s) => { return total + (s && s.rate_type==='hourly' ? (bookingData.duration || 1) * s.cost : s?.cost || 0)}, 0)  
            })
          })
        const result = await response.json();
        console.log('📦 service-type API response:', result)

        if (result.success) {
          
          alert(`Service request created successfully! Our team will contact you shortly. Please note the service id: ${result.data.id} for further communication. `);
          console.log(' serviceID:', result.data.id);
        } else {
          console.warn('Unexpected API response structure:', result);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load services", err)
        setIsLoading(false);
      }
    }, 400);
  }

  const isValidEndTime = (startInMinutes, durationInMinutes) => {
    const MAX_END = 20 * 60 + 30; // 20:30 or 8:30 PM
    return (startInMinutes + durationInMinutes) <= MAX_END;
  };
  const getSlots = () => {
    const slots = [];
    const START = 7 * 60;        // 7:00 AM
    const END_START = 19 * 60 + 30; // 7:30 PM (Last allowed start time)
    
    for (let min = START; min <= END_START; min += 15) {
        const hh = Math.floor(min / 60);
        const mm = min % 60;
        const display = `${hh % 12 || 12}:${mm.toString().padStart(2, '0')} ${hh >= 12 ? 'PM' : 'AM'}`;
        const value = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}`;
        slots.push({ value, display });
    }
    return slots;
};
  function addHoursToTime(timeString, hoursToAdd) {
    // 1. Create a placeholder Date object with the time string.
    // We use a generic date (e.g., today's date) to ensure the time portion is parsed correctly in the local timezone.
    // The 'T' separates date and time for ISO 8601 compatibility, but for time-only strings in local time, 
    // we can use a space and rely on the Date constructor's flexibility.
    const now = new Date();
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0; // 12:00 AM is 0 hours in 24-hour format
    }

    // Set the hours and minutes on the Date object
    now.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, milliseconds

    // 2. Add the specified hours
    now.setHours(now.getHours() + hoursToAdd);

    // 3. Format the new time back to "HH:MM AM/PM" format
    const newHours = now.getHours();
    const newMinutes = now.getMinutes();
    const newPeriod = newHours >= 12 ? 'PM' : 'AM';
    const displayHours = newHours % 12 || 12; // Convert 0 to 12 for 12-hour format

    // Pad minutes with leading zero if necessary
    const displayMinutes = newMinutes < 10 ? `0${newMinutes}` : newMinutes;

    return `${displayHours}:${displayMinutes} ${newPeriod}`;
  }


  // Calculation Logic
  const serviceCharge = Array.isArray(selectedSubtypes) ? selectedSubtypes.reduce((total, s) => { return total + (s && s.rate_type==='hourly' ? (bookingData.duration || 1) * s.cost : s?.cost || 0)}, 0) : Object.values(selectedSubtypes).filter(v => v).reduce((total, s) => { return total + (s && s.rate_type==='hourly' ? (bookingData.duration || 1) * s.cost : s?.cost || 0)}, 0)
  const tax = Number((serviceCharge * 0.18).toFixed(2)); // 18% GST typical for Razorpay regions
  const totalAmount = (serviceCharge + tax).toFixed(2);

  // Helper: Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split('T')[0],
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    };
  });

  // Simulated Razorpay Payment Trigger
  const handleRazorpayPayment = () => {
    setIsProcessing(true);

    // Simulate Razorpay processing delay
    setTimeout(() => {
      setIsProcessing(false);
      //setBookingData(prev => ({ ...prev, id: `RZP_${Math.floor(Math.random() * 1000000)}` }));
      setBookingData(prev => ({ ...prev, id: `${Math.floor(Math.random() * 1000000)}` }));//arpita
      console.log('Creating new service request:', bookingData);
      createAdhocServiceRequest(bookingData); //api/services
      setStep(7); // Move to Success
    }, 2500);
  };

  const resetModal = () => {
    setBookingData({
      client_name: '',
      client_phone: '',
      client_pin:'',
      client_email:'',
      client_id:'',
      service: SERVICES[0],
      selectedSubtypes: [],
      date: '',
      booking_date: '',
      created_at: '',
      updated_at: '',
      booking_hours: 1,
      gst: 0,
      displayDate: '',
      booking_time: '',
      duration: 1,
      address: '',
      pincode: '',
      instructions: '',
      phone: '',
      id: ''
    });
    setSelectedSubtypes([]);
    setIsOpen(false);
    setTimeout(() => { setStep(1); setIsProcessing(false); }, 500);
  };
   const handleServiceClick = (type) => {
    const newSubtypes = Array.isArray(type) ? type : [type];
    setSelectedSubtypes(prev => {
      const combined = [...prev, ...newSubtypes];
      return [...new Set(combined.map(s => JSON.stringify(s)))].map(s => JSON.parse(s));
    });
  };

  return (
    <section className="bg-gray-50 py-24">
      <div className="top-20 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            {/* <span className="text-purple-600 font-bold tracking-widest uppercase text-sm">Our Ecosystem</span> */}
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Start booking on the most trusted 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"> &nbsp;  Home Service Platform</span></h2>
            <h4 className="text-gray-500" >Every professional is background checked and trained to deliver the highest standard of service.</h4>
          </div>
        </div>
{/*
{SERVICES.map((s) => (
                                <button key={s.id} onClick={() => { setBookingData({ ...bookingData, service: s }); fetchServiceSubtypes(s.service_type_id); setStep(2); }}
                                  className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-slate-50 bg-slate-50 hover:border-indigo-600 hover:bg-white transition-all group"
                                >
                                  <span className="mb-3 p-3 bg-white rounded-2xl shadow-sm group-hover:text-indigo-600">{s.icon}</span>
                                  <span className="font-bold text-slate-700 text-sm">{s.label}</span>
                                </button>
                              ))}
*/}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-100 transition-all cursor-pointer group"
              onClick={() => {
                setBookingData({ 
                  client_name: '',
                  client_phone: '',
                  client_pin: '',
                  client_email:'',
                  //client_id: '', commenting as want to avoid resetting client_id if user is already logged in and selecting another service, can be reset when user clicks on "Book Another Service" after completion
                  service: service,
                  selectedSubtypes: [],
                  date: '',
                  displayDate: '',
                  booking_time: '',
                  duration: 1,
                  address: '',
                  pincode: '',
                  instructions: '',
                  phone: '',
                  id: ''
                });
                fetchServiceSubtypes(service.service_type_id);
                bookingData.client_id ? setStep(2) : setStep(1);
                setIsOpen(true); // Open the modal
              }}
            >
              <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm lg:text-base leading-tight">
                {service.name}
              </h3>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Book Now <ChevronRight className="w-3 h-3" />
              </p>
            </div>
          ))}
            </div>
            {isOpen && (
              <motion.div layout className="relative bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-2xl overflow-hidden z-10">
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                  <X size={18} />
                </button>
                {/* Progress Header */}
                            {step < 6 && (
                            <div className="px-8 pt-8 flex items-center justify-between">
                              <div className="flex items-left gap-1">
                              {step > 1 && (
                                <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-slate-100 rounded-full">
                                <ChevronLeft size={20} />
                                </button>
                              )}
                              <h2 className="text-xl font-black text-slate-800 tracking-tight relative">
                                {step === 1 && `Book ${bookingData.service?.name || 'a Service'}` }
                                {step === 2 && `2. `+ (bookingData.service ? bookingData.service.label : "Select Service")}
                                {step === 3 && "3. Schedule Time"}
                                {step === 4 && "4. Select Address"}
                                {step === 5 && "5. Instructions/Details"}
                                {step === 6 && "6. Payment"}
                                <span className={`block h-1 bg-indigo-600 ${step === 1 ? 'w-full' : step === 2 ? 'w-full' : step === 3 ? 'w-full' : step === 4 ? 'w-full' : step === 5 ? 'w-full' : 'w-full'} mt-1`}></span>
                              </h2>
                              </div>
                              {/* <button onClick={resetModal} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                              <X size={18} />
                              </button> */}
                            </div>
                            )}

                <div className="p-8">
                  {/* STEP 1: SERVICE */}
                  {step === 1 && (
                    //<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 1: Verify Contact Number</h2> 
                              {/* <div className="space-y-4"> */}
                            {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 3: Address</h2> */}
                              
                              <div className="space-y-6">
                                <div className="space-y-1">
                                  
                                                      
                                                      <input type="text"
                                                      placeholder=" Name: e.g. John Doe"
                                                      value={bookingData.client_name}
                                                      onChange={(e) => setBookingData({ ...bookingData, client_name: e.target.value })}
                                                      className="w-full bg-slate-50 border-none p-5 rounded-2xl text-lg font-bold placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"/>
                                                      </div>
                                                      <div className="space-y-1">
                                                      
                                                      <input 
                                                        type="text"
                                                        placeholder=" Pincode: e.g. 123456"
                                                        value={bookingData.client_pin}
                                                        onChange={(e) => {
                                                          const value = e.target.value;
                                                          if (/^\d{0,6}$/.test(value)) {
                                                            setBookingData({ ...bookingData, client_pin: value });
                                                          }
                                                          }}
                                                          className="w-full bg-slate-50 border-none p-5 rounded-2xl text-lg font-bold placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                                        />
                                                        </div>

                                                        <div className="space-y-1">
                                                        </div>
                                                        <div className="space-y-1">
                                                      
                                                      <input 
                                                        type="text"
                                                        placeholder=" email: john.doe@aboc.com"
                                                        value={bookingData.client_email}
                                                        onChange={(e) => {
                                                          const value = e.target.value;
                                                          if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                                                            setBookingData({ ...bookingData, client_email: value });
                                                          }
                                                          }}
                                                          className="w-full bg-slate-50 border-none p-5 rounded-2xl text-lg font-bold placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                                        />
                                                        </div>

                                                        <div className="space-y-1">
                                                        </div>
                                                        <div className="space-y-1 flex items-center gap-4">
                                                        <input
                                                            type={"phone"}
                                                            placeholder={"Contact Number: e.g. 9876543210"}
                                                            value={phone}
                                                            onChange={(e) => {const value = e.target.value;
                                                                      if (/^\d{0,10}$/.test(value)) {
                                                                         setPhone(value);
                                                                         setBookingData({ ...bookingData, client_phone: value });
                                                                      }
                                                                      }}
                                                            className="flex-1 bg-slate-50 border-none p-5 rounded-2xl text-lg font-bold placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                                                          />
                                                          <button
                                                            onClick={() => handleSendOTP(phone)}
                                                            disabled={isLoading}
                                                            className="bg-[#5249f0] hover:bg-[#4339d9] text-white py-5 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70"
                                                          >
                                                            {isLoading ? "Processing..." : "Verify"}
                                                          </button>
                                                        </div>
                                            </div>
                                
                                
                              
                                <div className="space-y-6 mt-6">
                                <div>
                                <h3 className="text-2xl font-black text-slate-800">Verify Code</h3>
                                <p className="text-sm font-medium text-slate-400 mt-1">
                                  Sent to <span className="text-slate-600 font-bold">{phone}</span>
                                </p>
                                </div>

                          {/* OTP Input Grid */}
                          <div className="flex justify-between gap-2">
                            {otp.map((data, index) => (
                              <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                                className="w-12 h-14 bg-slate-50 border-2 border-transparent focus:border-[#5249f0] focus:bg-white rounded-xl text-center text-xl font-black outline-none transition-all"
                              />
                            ))}
                          </div>

                          <div className="flex justify-between items-center px-1">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              {timer > 0 ? `Resend in 0:${timer.toString().padStart(2, '0')}` : "Ready to resend"}
                            </p>
                            <button 
                              disabled={timer > 0}
                              className="text-xs font-black text-[#5249f0] uppercase tracking-widest disabled:opacity-30"
                            >
                              Resend Code
                            </button>
                          </div>

                          <button 
                            onClick={() => handleVerify(phone, otp.join(''))}
                            disabled={otp.join('').length < 6 || isLoading}
                            className="w-full bg-[#5249f0] hover:bg-[#4339d9] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50"
                          >
                            {isLoading ? "Verifying..." : "Confirm & Continue"}
                          </button>
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
                                  onChange={() => { handleServiceClick(item); setBookingData({...bookingData, serviceSubType: item}); }}
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
                      <button key={d.full} onClick={() => setBookingData({ ...bookingData, booking_date: `${d.full}`,displayDate: `${d.day}, ${d.month} ${d.date}` })} className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${bookingData.booking_date === `${d.full}` ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 bg-slate-50 text-slate-500'}`}>
                      <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                      <span className="text-xl font-black">{d.date}</span>
                    </button>
                  ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" defaultValue={bookingData.booking_time}  onChange={(e) => setBookingData({ ...bookingData, booking_time: e.target.value })}>
                          <option value="">Start Slot</option>
                          {getSlots().map(slot =>  
                          <option onChange={(e) => setBookingData({ ...bookingData, booking_time: e.target.value })} value={slot.display}>{slot.display}</option>)}
                        </select>
                        <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}>
                          {[1, 2, 4, 8].map(h => <option key={h} value={h} >{h} hour</option>)}
                        </select>
                      </div>
                      <button disabled={!bookingData.booking_time ||!bookingData.booking_date} onClick={() => setStep(4)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Continue</button>
                    </motion.div>
                  )}

                  {/* STEP 3 & 4 (Address & Instructions) - Compressed for display */}
                  {step === 4 && (
                    <div className="space-y-4">
                      {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 3: Address</h2> */}
                      <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative border-2 border-slate-50">
                          {bookingData.pincode.length === 6 ? <iframe width="100%" height="100%" frameBorder="0" src={mapUrl}></iframe> : <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-bold text-[10px] uppercase">Pin to Preview Map</div>}
                      </div>
                      <input placeholder="Pincode" maxLength={6} onChange={(e) => handleCheckPincode(e.target.value)?setBookingData({ ...bookingData, pincode: e.target.value }):null} value={bookingData.pincode} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" />
                      <textarea placeholder="Address Details" onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })} value={bookingData.address} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-24" />
                      <button disabled={!bookingData.pincode ||!bookingData.address} onClick={() => setStep(5)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Next</button>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-4">
                      {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 4: Details</h2> */}
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Special Instructions</label>
                      <textarea placeholder="Any notes for the professional?" onChange={(e) => setBookingData({ ...bookingData, instructions: e.target.value })} value={bookingData.instructions} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-32" />
                      <button onClick={() => { createAdhocServiceRequest(); setStep(6); }} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Proceed to Payment</button>
                    {/* invoke DB update APIfrom updateServcice */}
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
                          <span className="text-slate-800 font-bold">{bookingData.booking_time}-{addHoursToTime(bookingData.booking_time, bookingData.duration)}</span>
                        </div>
                      </div>

                      <button onClick={resetModal} className="w-full$ bg-indigo-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 uppercase tracking-widest text-sm">Return to Dashboard</button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
      </div>
    </section>
  );
};
const OfferSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === OFFERS.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-20">
      <div className="relative overflow-hidden rounded-3xl h-48 lg:h-56">
        {OFFERS.map((offer, idx) => (
          <div 
            key={offer.id}
            className={`absolute inset-0 w-full h-full p-8 lg:p-12 flex items-center justify-between transition-all duration-700 ease-in-out bg-gradient-to-r ${offer.bgColor} text-white ${idx === current ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
          >
            <div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">Special Offer</span>
              <h2 className="text-3xl lg:text-4xl font-bold mb-2">{offer.title}</h2>
              <p className="text-white/80 text-lg">{offer.desc}</p>
            </div>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold shadow-xl hidden sm:block">Claim Now</button>
          </div>
        ))}
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {OFFERS.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 rounded-full transition-all ${idx === current ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};



const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Trusted by 10,000+ Professionals</h2>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-50 relative">
              <div className="absolute -top-6 left-8">
                <div className="bg-purple-600 rounded-full p-2 text-white">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100" />
                <div>
                  <h4 className="font-bold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



// --- Main App Component ---

export default function App() {
  const [bookingData, setBookingData] = useState({
    service: SERVICES[0],
    selectedSubtypes: [],
    date: '',
    displayDate: '',
    booking_time: '',
    duration: 1,
    address: '',
    pincode: '',
    instructions: '',
    id: ''
  });
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const handleServiceClick = (type) => {
    const newSubtypes = Array.isArray(type) ? type : [type];
    setSelectedSubtypes(prev => {
      const combined = [...prev, ...newSubtypes];
      return [...new Set(combined.map(s => JSON.stringify(s)))].map(s => JSON.parse(s));
    });
  };
  const fetchServiceSubtypes = async (selectedType_id) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/services/service-type/${selectedType_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const result = await response.json();
        console.log('📦 service-type API response:', result);

        if (result.success) {
          setServiceData(result.data.serviceDetails[0].resource_details);
          console.log('Select serviceData:', result.data.serviceDetails[0].resource_details);
        }
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-purple-100 selection:text-purple-900">
      
      <main>
        
         <ServicesSection setBookingData={setBookingData} fetchServiceSubtypes={fetchServiceSubtypes} />
         <Hero />
        <OfferSlider />
       
        <Testimonials />
        
        {/* App Download CTA */}
        <section className="max-w-7xl mx-auto px-4 mb-24">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] p-8 lg:p-20 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
             <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Experience the trail on the go.</h2>
             <p className="text-indigo-200 text-lg mb-10 max-w-xl mx-auto">Download our mobile app for real-time tracking, instant booking, and exclusive member discounts.</p>
             <div className="flex flex-wrap justify-center gap-4">
               <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform shadow-lg">
                 <Apple className="w-6 h-6 fill-current" /> App Store
               </button>
               <button className="bg-indigo-700/50 border border-indigo-400/30 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform backdrop-blur-sm">
                 <Zap className="w-6 h-6 fill-current" /> Play Store
               </button>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
