import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MdVerified } from "react-icons/md"; // Material Design
import { GoVerified } from "react-icons/go"; // Github Octicons
import StarRating from '../components/Common/StarRating';
import { Star } from 'lucide-react';
import { FaPhone } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';
import { LuPhone } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';
import {
  // Plus, X, Calendar, Clock, ChevronDown, 
  // ShieldCheck, Car, Utensils, Droplets, 
  // User, Leaf, Sparkles, Check, ChevronLeft, 
  // AlertCircle, PartyPopper, 
  Home,
  Plus, X, Calendar, Clock, ChevronDown,
  Car, Utensils, Droplets, User, Leaf, Sparkles,
  Check, ChevronLeft, AlertCircle, PartyPopper,
  Download, MapPin, AlignLeft, Timer, CreditCard, ShieldCheck, Loader2
} from 'lucide-react';
const SERVICES = [
  { id: 'driver', label: 'Driver', icon: <Car size={18} />, rate: 150 },
  { id: 'cook', label: 'Cook', icon: <Utensils size={18} />, rate: 250 },
  { id: 'car_wash', label: 'Car Wash', icon: <Droplets size={18} />, rate: 100 },
  { id: 'maid', label: 'Maid', icon: <User size={18} />, rate: 100 },
  { id: 'gardening', label: 'Gardening', icon: <Leaf size={18} />, rate: 140 },
  { id: 'bathroom_cleaning', label: 'Bathroom Cleaning', icon: <Sparkles size={18} />, rate: 180 },
];
const ParentDashboard = () => {
  const router = useRouter()
  const [userData, setUserData] = useState(null)
  const [loggedInParent, setLoggedInParent] = useState(null)
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [searchFilters, setSearchFilters] = useState({
    parentName: '',
    serviceType: ''
  })

  // Real-time data states
  // const [services, setServices] = useState([])
  const [events, setEvents] = useState([])
  const [isLoadingParents, setIsLoadingParents] = useState(true)
  const [parentError, setParentError] = useState(null)

  // Verification modal state
  const [verificationModal, setVerificationModal] = useState({
    isOpen: false,
    parentId: null,
    parentName: '',
    file: null
  })

  const [clientServices, setClientServices] = useState([])
  const [closedServices, setClosedServices] = useState([])
  const [isLoadingServices, setIsLoadingServices] = useState(true)
  const [servicesError, setServicesError] = useState(null)

  // Search results page state
  const [showSearchResults, setShowSearchResults] = useState(false)
  
  //start: create new service functionality
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [mapUrl, setMapUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState({
    service: SERVICES[0],
    date: '',
    time: '',
    duration: 1,
    address: '',
    pincode: '',
    instructions: '',
    id: ''
  });

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
  const serviceCharge = bookingData.service.rate * bookingData.duration;
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
      setBookingData(prev => ({ ...prev, id: `RZP_${Math.floor(Math.random() * 1000000)}` }));//arpita
      setStep(6); // Move to Success
    }, 2500);
  };

  const resetModal = () => {
    setIsOpen(false);
    setTimeout(() => { setStep(1); setIsProcessing(false); }, 500);
  };
  //end:create new service functionality
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    const userRole = localStorage.getItem('userRole')

    if (!user || userRole !== 'parent') {
      router.push('/login')
      return
    }
    setUserData(user)
    fetchParent(user.id)
    if (bookingData.pincode.length === 6) {
      const encodedPin = encodeURIComponent(bookingData.pincode);
            setMapUrl(`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedPin}`);
    //   try{
    //   const data=  fetch(`http://www.postalpincode.in/api/pincode/${bookingData.pincode}`) .then(res => res.json());
        
    //     // .catch(err => console.error('Error fetching pincode:', err));
        
    //       if (data.Status === 'Success' && data.PostOffices.length > 0) {
    //         const postOffice = data.PostOffices[0];
    //         const addressText = `${postOffice.Name}, ${postOffice.Block}, ${postOffice.District}, ${postOffice.State} - ${bookingData.pincode}`;
    //         setBookingData(prev => ({ ...prev, address: addressText }));
    //         const encodedPin = encodeURIComponent(bookingData.pincode);
    //         setMapUrl(`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedPin}`);
    //       }    
    // } catch (error) {
    //       console.error('Error fetching pincode:', error);
    // }
       
    
    // fetchClientServices(user.id)
    //fetchDashboardData(user.id)
  }}, [bookingData.pincode])




  // Fetch parents from backend
  const fetchParent = async (userId) => {
    setIsLoadingParents(true)
    setParentError(null)
    console.log('🔍 Fetching parent data for user ID:', userId)
    try {
      const response = await fetch(`http://localhost:5001/api/dashboard/parent/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      const result = await response.json()
      console.log('📦 Parent API response:', result)

      if (result.success) {
        // Map the backend data to the format we need
        const parentsData = result.data.parent[0];
        const serviceList = result.data.serviceList;
        const closedServiceList = result.data.closedServiceList;
        const events = result.data.events;

        console.log('📊 Mapped parents:', parentsData)
        setUserData(parentsData)
        setClientServices(serviceList)
        setClosedServices(closedServiceList)
        setEvents(events)
      } else {
        setParentError(result.message || 'Failed to fetch parents')
      }
    } catch (error) {
      console.error('❌ Error fetching parents:', error)
      setParentError('Failed to load parents. Please try again.')
    } finally {
      setIsLoadingParents(false)
    }
  }


  // // Fetch client services from backend
  // const fetchClientServices = async () => {
  //   setIsLoadingServices(true)
  //   setServicesError(null)

  //   try {
  //     // const response = await fetch('http://localhost:5001/api/client-services', {
  //     //   headers: {
  //     //     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  //     //   }
  //     // })

  //    // const result = await response.json()
  //     const result = {
  //       success: true,
  //       data: [
  //         {clientServices
  //           clientId: 201,
  //           ServiceName: 'Home Care Services',
  //           ServiceDescription: 'Comprehensive home care for elderly clients.',
  //           vendorName: 'Sarah Thompson', 

  //           vendorContact: '9922345678',
  //           serviceStatus: 'Active',
  //           creationDate: '21/10/2025'
  //         }
  //       ]
  //     }

  //     console.log('📋 Client services fetched:', result)

  //     if (result.success && result.data.length > 0) {
  //       setClientServices(result.data)
  //     } else {
  //       // Use dummy data if no data from backend
  //       setClientServices([
  //         {
  //           ServiceName: 'Home Care Services',
  //           ServiceDescription: 'Comprehensive home care for elderly clients.',
  //           vendorName: 'Sarah Thompson',
  //           vendorContact: '9922345678',
  //           waitingDays: '5',
  //           creationDate: '21/10/2025'
  //         }
  //       ])
  //     }
  //   } catch (error) {
  //     console.error('❌ Error fetching client services:', error)
  //     setServicesError('Failed to load client services. Please try again.')
  //   } finally {
  //     setIsLoadingServices(false)
  //   }
  // }

  const fetchClosedClientServicesLast30Days = async () => {
    setIsLoadingServices(true)
    setServicesError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/client-services`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      const result = await response.json()
      console.log('📋 Client services fetched:', result)

      if (result.success && result.data.length > 0) {
        setClosedServices(result.data)
      } else {
        // Use dummy data if no data from backend
        setClosedServices([
          {
            ServiceName: 'Home Care Services',
            ServiceDescription: 'Comprehensive home care for elderly clients.',
            vendorName: 'Sarah Thompson',
            vendorContact: '9922345678',
            waitingDays: '5',
            creationDate: '21/10/2025',
            completionDate: '25/10/2025'
          }
        ])
      }
    } catch (error) {
      console.error('❌ Error fetching client services:', error)
      setServicesError('Failed to load client services. Please try again.')
    } finally {
      setIsLoadingServices(false)
    }
  }
  // // Check for logged-in parent on component mount
  // useEffect(() => {
  //   const checkParentAuth = () => {
  //     const parentDetails = JSON.parse(localStorage.getItem('user') || 'null')
  //     const userRole = localStorage.getItem('userRole')

  //     console.log('🔍 Checking parent authentication...')
  //     console.log('User role:', userRole)
  //     console.log('Parent details:', parentDetails)

  //   //   if (userRole === 'parent' && parentDetails) {
  //   //     try {
  //   //       const parsedParent = JSON.parse(parentDetails)
  //   //       setLoggedInParent(parsedParent)
  //   //       console.log('✅ Parent authenticated:', parsedParent)
  //   //     } catch (error) {
  //   //       console.error('❌ Error parsing parent details:', error)
  //   //     }
  //   //   } else {
  //   //     console.log('⚠️ No parent logged in')
  //   //   }
  //   // }
  //   if (!parentDetails || userRole !== 'parent') {
  //     router.push('/login')
  //     return
  //   }
  //   setUserData(parentDetails)
  //   checkParentAuth()
  //   fetchParents()
  //   fetchClientServices()
  // }
  // }, [])

  // Search functionality - Open in separate view
  const handleSearch = () => {
    let filtered = parents

    if (searchFilters.parentName) {
      filtered = filtered.filter(parent =>
        parent.parentName.toLowerCase().includes(searchFilters.parentName.toLowerCase())
      )
    }

    if (searchFilters.serviceType) {
      filtered = filtered.filter(parent =>
        parent.service.toLowerCase().includes(searchFilters.serviceType.toLowerCase())
      )
    }

    setFilteredParents(filtered)
    setShowSearchResults(true)
    console.log('🔍 Search results:', filtered)
  }

  // Back to main view
  const handleBackToMain = () => {
    setShowSearchResults(false)
    setSearchFilters({ parentName: '', serviceType: '' })
    setFilteredParents(parents)
  }

  // Reset search
  const handleResetSearch = () => {
    setSearchFilters({ parentName: '', serviceType: '' })
    setFilteredParents(parents)
  }

  const handleAddNewParent = () => {
    alert('Add New Parent functionality would open a form here')
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('parentDetails')
      localStorage.removeItem('authToken')
      localStorage.removeItem('userRole')
      router.push('/login')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#4FC3F7'
      case 'Assign': return '#F06292'
      case 'Close': return '#FFB74D'
      default: return '#9E9E9E'
    }
  }

  const handleServiceStatusChange = async (index, newStatus) => {
    const service = clientServices[index]
    console.log(`🔄 Changing status of rownum: ${index}, service ID ${service.id} to ${newStatus}`)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/services/${service.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ action: newStatus, vendor_id: service.vendorId })
      })

      const result = await response.json()

      if (result.success) {
        const updatedServices = [...clientServices]
        updatedServices[index].serviceStatus = newStatus
        setClientServices(updatedServices)
        console.log('✅ Status updated successfully')
      } else {
        alert('Failed to update status: ' + result.message)
      }
    } catch (error) {
      console.error('❌ Error updating status:', error)
      // Update locally even if API fails
      const updatedServices = [...clientServices]
      updatedServices[index].serviceStatus = newStatus
      setClientServices(updatedServices)
    }
  }

  // Check if a parent row matches the logged-in parent
  const isLoggedInParentRow = (parentId) => {
    return loggedInParent && loggedInParent.parentId === parentId
  }

  // Refresh data
  const handleRefresh = () => {
    fetchParents()
    fetchClientServices()
  }

  const updateReview = async (index, rating) => {
    const service = closedServices[index]
    console.log(`📝 Updating review for service ID ${service.id} with rating ${rating}`)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/services/${service.id}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ rating: rating })
      })

      const result = await response.json()

      if (result.success) {
        const updatedServices = [...closedServices]
        updatedServices[index].rating = rating
        setClosedServices(updatedServices)
        console.log('✅ Review saved successfully')
        alert('Thank you for your rating!')
      } else {
        alert('Failed to save review: ' + result.message)
      }
    } catch (error) {
      console.error('❌ Error saving review:', error)
      alert('Failed to save review. Please try again.')
    }
  }
  // Open verification modal
  const openVerificationModal = (parentId, parentName) => {
    setVerificationModal({
      isOpen: true,
      parentId,
      parentName,
      file: null
    })
  }

  // Close verification modal
  const closeVerificationModal = () => {
    setVerificationModal({
      isOpen: false,
      parentId: null,
      parentName: '',
      file: null
    })
  }

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check if file is a zip
      if (!file.name.endsWith('.zip')) {
        alert('Please upload a ZIP file')
        return
      }
      setVerificationModal(prev => ({ ...prev, file }))
    }
  }
  // //add create new service functionality
  // const SERVICES = [
  //   { id: 'DV', label: 'Driver', icon: <Car size={18} /> },
  //   { id: 'CK', label: 'Cook', icon: <Utensils size={18} /> },
  //   { id: 'CW', label: 'Car Wash', icon: <Droplets size={18} /> },
  //   { id: 'MD', label: 'Maid', icon: <User size={18} /> },
  //   { id: 'GD', label: 'Gardening', icon: <Leaf size={18} /> },
  //   { id: 'BC', label: 'Bathroom Cleaning', icon: <Sparkles size={18} /> },
  // ];


  // const [isOpen, setIsOpen] = useState(false);
  // const [step, setStep] = useState(1); // 1: Service, 2: Schedule, 3: Success
  // const [bookingData, setBookingData] = useState({
  //   service: SERVICES[0],
  //   date: '',
  //   time: ''
  // });

  //   // Helper: Generate next 7 days with day and date
  //   const getAvailableDates = () => {
  //     return Array.from({ length: 7 }, (_, i) => {
  //       const d = new Date();
  //       d.setDate(d.getDate() + i);
  //       return {
  //         full: d.toISOString().split('T')[0],
  //         day: d.toLocaleDateString('en-US', { weekday: 'short' }),
  //         date: d.getDate(),
  //         month: d.toLocaleDateString('en-US', { month: 'short' })
  //       };
  //     });
  //   };

  //   // Helper: Generate 1-hour slots (07:30 to 18:30)
  const getTimeSlots = () => {
    const slots = [];
    let start = 7; 
    while (start < 19) {
      const h1 = Math.floor(start);
      //const m1 = (start % 1) * 60 === 30 ? "30" : "00";
      // const h2 = Math.floor(start + 1);
      // const m2 = ((start + 1) % 1) * 60 === 30 ? "30" : "00";
      const format = (h, m) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr}:${m} ${ampm}`;
      };
      slots.push(`${format(h1, m1)}`);
      start += 1;
    }
    return slots;
  };

  //   const dates = getAvailableDates();
  //   const timeSlots = getTimeSlots();

  //   const handleConfirm = () => {
  //     setStep(3);
  //   };

  //   const resetModal = () => {
  //     setIsOpen(false);
  //     setTimeout(() => {
  //       setStep(1);
  //       setBookingData({ service: SERVICES[0], date: '', time: '' });
  //     }, 500);
  //   };

  //end: create new service functionality

  // Submit verification
  const handleVerificationSubmit = async () => {
    if (!verificationModal.file) {
      alert('Please select a ZIP file to upload')
      return
    }

    const formData = new FormData()
    formData.append('verification_doc', verificationModal.file)
    formData.append('parent_id', verificationModal.parentId)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'}/api/dashboard/parent-details/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        alert('Parent verified successfully!')
        closeVerificationModal()
        // Refresh parents list
        fetchParents()
      } else {
        alert('Verification failed: ' + result.message)
      }
    } catch (error) {
      console.error('❌ Verification error:', error)
      alert('Verification failed. Please try again.')
    }
  }

  // Render Search Results Page
  if (showSearchResults) {
    return (
      <>
        <Head>
          <title>Search Results - Parent Management</title>
        </Head>

        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '30px' }}>
              <button
                onClick={handleBackToMain}
                style={{
                  background: 'white',
                  color: '#667eea',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                ← Back to Main
              </button>
            </div>

            <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                Search Results
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
                Found {filteredParents.length} parent(s)
              </p>
            </div>

            {/* Search Results Table */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1.5fr 2fr 1fr 1.5fr 1fr',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '15px',
                borderRadius: '10px 10px 0 0',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                <div>SERVICE</div>
                <div>VENDOR NAME</div>
                <div>VENDOR ID</div>
                <div>CONTACT NUMBER</div>
                <div>VERIFIED</div>
              </div>

              {filteredParents.length === 0 ? (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  background: '#f7fafc'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
                  <p style={{ color: '#718096', fontSize: '16px' }}>No parents found matching your search</p>
                </div>
              ) : (
                filteredParents.map((parent, index) => (
                  <div key={index} style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 2fr 1fr 1.5fr 1fr',
                    padding: '15px',
                    borderBottom: '1px solid #f0f0f0',
                    background: index % 2 === 0 ? '#fafafa' : 'white',
                    fontSize: '14px',
                    alignItems: 'center'
                  }}>
                    <div>{parent.service}</div>
                    <div style={{ fontWeight: '600' }}>{parent.parentName}</div>
                    <div style={{ fontWeight: '600' }}>{parent.parentId}</div>
                    <div>{parent.contactNumber}</div>
                    <div>
                      {parent.isVerified ? (
                        <span style={{
                          background: '#c6f6d5',
                          color: '#22543d',
                          padding: '6px 12px',
                          borderRadius: '15px',
                          fontSize: '12px',
                          fontWeight: '600',
                          display: 'inline-block'
                        }}>
                          ✓ Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => openVerificationModal(parent.parentId, parent.parentName)}
                          style={{
                            background: '#ed8936',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: '600',
                            cursor: 'pointer'
                          }}
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  // Main Page
  return (
    <>
      <Head>
        <title>Parent Management - Parent Care Services</title>
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header - Title in one line, no refresh button */}
          <div style={{ textAlign: 'center', color: 'white', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
              Parent Dashboard
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: '0.9' }}>
              Streamline your parent relationships and service management with our comprehensive platform
            </p>
          </div>

          {/* Logged In Parent Info Card */}
          {loggedInParent && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '30px',
              marginBottom: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
              border: '3px solid #48bb78'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>🔐</span>
                  Logged In Parent Details
                </h2>
                <button
                  onClick={handleLogout}
                  style={{
                    background: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Logout
                </button>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #e2e8f0'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Parent ID
                      </label>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginTop: '5px' }}>
                        {userData.id}
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Parent Name
                      </label>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginTop: '5px' }}>
                        {userData.name}
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Email
                      </label>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#4299e1', marginTop: '5px' }}>
                        {userData.email}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Contact Number
                      </label>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginTop: '5px' }}>
                        {userData.phone}
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Service Type
                      </label>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#2d3748', marginTop: '5px' }}>
                        {userData.serviceType}
                      </div>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Login Time
                      </label>
                      <div style={{ fontSize: '14px', color: '#718096', marginTop: '5px' }}>
                        {new Date(userData.loginTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {userData.address && (
                  <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                    <label style={{ fontSize: '12px', color: '#718096', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Address
                    </label>
                    <div style={{ fontSize: '14px', color: '#4a5568', marginTop: '5px' }}>
                      {userData.address}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Profile Information Card */}
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d3748', marginBottom: '25px' }}>
              Profile Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', background: '#f7fafc', padding: '25px', borderRadius: '10px' }}>
              <div>
                <div style={{ color: '#718096', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Parent Id/Name
                </div>
                <div style={{ color: '#2d3748', fontSize: '16px', fontWeight: '600' }}>
                  {userData?.id || 'N/A'}|{userData?.name || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ color: '#718096', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Contact No
                </div>
                <div style={{ color: '#2d3748', fontSize: '16px', fontWeight: '600' }}>
                  {userData?.phone || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ color: '#718096', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Emergency Contact
                </div>
                <div style={{ color: '#2d3748', fontSize: '16px', fontWeight: '600' }}>
                  {userData?.emergency_contact_name || 'N/A'}  | {userData?.emergency_contact || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ color: '#718096', fontSize: '12px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Alotted Daughter:
                </div>
                <div style={{ color: '#2d3748', fontSize: '16px', fontWeight: '600' }}>
                  {userData?.daughter_id || 'N/A'}  | {userData?.daughter_name || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Active Service Queue Section */}
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d3748' }}>
                Active Service Requests
              </h2>
              {/*<motion.button style={{ background: '#48bb78', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              + New Service Request
            </motion.button>
            {/*adding service div to open on click of 'new service request' button*/}
              <motion.button
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                //bg-yellow-400 text-indigo-600 px-4 py-2 rounded text-sm font-semibold hover:bg-yellow-300 transition-all hover:scale-105
                className="flex items-center gap-2 bg-yellow-400 text-indigo-600 px-4 py-2 rounded-2xl text-sm font-semibold hover:bg-yellow-300 transition-all hover:scale-105"
              // bg-yellow-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100"
              >
                <Plus size={20} /> Create New Service
              </motion.button>
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
                              {step === 2 && "2. Schedule Time"}
                              {step === 3 && "3. Select Address"}
                              {step === 4 && "4. Instructions/Details"}
                              {step === 5 && "5. Payment"}
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
                          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                            
                            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                              {dates.map((d) => (
                                <button key={d.full} onClick={() => setBookingData({ ...bookingData, date: `${d.day}, ${d.month} ${d.date}` })}
                                  className={`flex-shrink-0 w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${bookingData.date.includes(d.date) ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                                >
                                  <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                                  <span className="text-xl font-black">{d.date}</span>
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}>
                                <option value="">Start Slot</option>
                                {getSlots().map(slot =>  
                                <option value={slot.display} selected={slot.display === bookingData.time }>{slot.display}</option>)}
                              </select>
                              <select className="bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}>
                                {[1, 2, 4, 8].map(h => <option key={h} value={h}>{h} Hour{h > 1 ? 's' : ''}</option>)}
                              </select>
                            </div>
                            <button disabled={!bookingData.time ||!bookingData.date} onClick={() => setStep(3)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Continue</button>
                          </motion.div>
                        )}

                        {/* STEP 3 & 4 (Address & Instructions) - Compressed for display */}
                        {step === 3 && (
                          <div className="space-y-4">
                            {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 3: Address</h2> */}
                            <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative border-2 border-slate-50">
                               {bookingData.pincode.length === 6 ? <iframe width="100%" height="100%" frameBorder="0" src={mapUrl}></iframe> : <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 font-bold text-[10px] uppercase">Pin to Preview Map</div>}
                            </div>
                            <input placeholder="Pincode" maxLength={6} onChange={(e) => setBookingData({ ...bookingData, pincode: e.target.value })} value={bookingData.pincode} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none" />
                            <textarea placeholder="Address Details" onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })} value={bookingData.address} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-24" />
                            <button disabled={!bookingData.pincode ||!bookingData.address} onClick={() => setStep(4)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Next</button>
                          </div>
                        )}

                        {step === 4 && (
                          <div className="space-y-4">
                            {/* <h2 className="text-2xl font-black text-slate-800 tracking-tight">Step 4: Details</h2> */}
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Special Instructions</label>
                            <textarea placeholder="Any notes for the professional?" onChange={(e) => setBookingData({ ...bookingData, instructions: e.target.value })} value={bookingData.instructions} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold text-sm outline-none h-32" />
                            <button onClick={() => setStep(5)} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold">Proceed to Payment</button>
                          </div>
                        )}

                        {/* STEP 5: RAZORPAY PAYMENT GATEWAY */}
                        {step === 5 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                            <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden">
                              <div className="relative z-10">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Final Amount</p>
                                <h3 className="text-4xl font-black tracking-tighter">{totalAmount}</h3>
                              </div>
                              <ShieldCheck className="absolute -right-4 -bottom-4 text-white/5" size={120} />
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between text-sm font-bold text-slate-500">
                                <span>{bookingData.service.label} ({bookingData.duration}hr)</span>
                                <span>${serviceCharge.toFixed(2)}</span>
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
                        {step === 6 && (
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
                                <span className="text-slate-800 font-bold">{bookingData.date}</span>
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
              {/* enc of service div*/}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 2fr 1fr 1fr  1fr 1fr 1fr 1fr',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '5px',
              borderRadius: '10px 10px 0 0',
              fontWeight: '600',
              fontSize: '12px'
            }}>

              <div>SERVICE TYPE</div>
              <div>SERVICE DESCRIPTION</div>
              <div>VENDOR DETAILS</div>
              <div>APPOINTMENT DATE</div>
              <div>CREATED ON</div>
              <div>UPDATED ON</div>
              <div>STATUS</div>
              <div>ESCALATE</div>
              <div>CANCEL</div>
              {/*this column contains escalate button*/}

              {/* <div>DAUGHTER CONTACT NO</div>
    <div>SERVICE STATUS</div> */}
            </div>

            {/* Loading State */}
            {!isLoadingServices && (
              <div style={{
                padding: '5px',
                textAlign: 'center',
                background: '#f7fafc',
                borderRadius: '0 0 10px 10px'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
                <p style={{ color: '#718096' }}>Loading client services...</p>
              </div>
            )}

            {/* Client Services Table Rows - Always show dummy data */}
            {isLoadingServices && clientServices.map((service, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 2fr 1fr 1fr  1fr 1fr 1fr 1fr',
                padding: '5px',
                borderBottom: '1px solid #f0f0f0',
                alignItems: 'center',
                background: index % 2 === 0 ? '#fafafa' : 'white',
                fontSize: '13px'
              }}>

                <div >{service.service_type}</div>
                <div> {service.special_instructions ? service.special_instructions : 'Basic ' + service.service_type + ' service'}. <br /> charge: {service.service_charge}
                  <br />
                </div>
                <div style={{ fontWeight: '600' }}>{service.is_verified ? (
                  <MdVerified style={{ color: '#1d9bf0', verticalAlign: 'middle' }} />
                ) : ''} {service.vendor_name} <br />
                  <LuPhone className="w-4 h-4 " />{service.vendor_contact_no} <br />
                  {/* <StarRating rating={service.rating}
totalStars={5} 
onRatingChange={(rating) => console.log('Selected:', rating)} 
/>  */}
                  <div className="flex justify-left mb-4">
                    {
                      [1, 2, 3, 4, 5].map((star) => (
                        <Star
                          size={16}
                          fill={service.rating >= star ? "#f59e0b" : "gray"}
                          className={service.rating >= star ? "text-amber-500" : "text-slate-200"}
                          strokeWidth={1.5}
                        />
                      ))}
                  </div>
                  {/* {service.phone} */}

                </div>
                {/* <div>{service.waitingDays}</div> */}
                <div>{service.booking_date}</div>
                <div>{service.created_at}</div>
                <div>{service.updated_at}</div>
                <div style={{ fontWeight: '600', color: service.status === 'open' || service.status === 'assigned' || service.status === 'accepted' ? '#38a169' : service.status === 'escalated' ? '#dd6b20' : '#e53e3e' }}>{service.status.toUpperCase()}</div>
                <div>
                  <button
                    onClick={() => handleServiceStatusChange(index, 'escalated')}
                    style={{
                      background: '#e2e8f0',
                      color: '#4a5568',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Escalate
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleServiceStatusChange(index, 'cancelled')}
                    style={{
                      background: '#e2e8f0',
                      color: '#4a5568',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Service Queue Section */}
          <div style={{ background: 'white', borderRadius: '15px', padding: '30px', marginBottom: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#2d3748', marginBottom: '25px' }}>
              Closed Service Requests
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '5px',
              borderRadius: '10px 10px 0 0',
              fontWeight: '600',
              fontSize: '12px'
            }}>

              <div>SERVICE TYPE</div>
              <div>SERVICE DESCRIPTION</div>
              <div>VENDOR DETAILS</div>
              <div>APPOINTMENT DATE</div>
              <div>CLOSED ON</div>
              <div>STATUS</div>
              <div>RATE US</div>
              <div>RE-OPEN</div>
              <div>SAVE RATING</div>
              {/*this column contains escalate button*/}

              {/* <div>DAUGHTER CONTACT NO</div>
    <div>SERVICE STATUS</div> */}
            </div>

            {/* Loading State */}
            {!isLoadingServices && (
              <div style={{
                padding: '5px',
                textAlign: 'center',
                background: '#f7fafc',
                borderRadius: '0 0 10px 10px'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
                <p style={{ color: '#718096' }}>Loading client services...</p>
              </div>
            )}

            {/* Client Services Table Rows - Always show dummy data */}
            {isLoadingServices && closedServices.map((service, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr  1fr 1fr 1fr 1fr',
                padding: '5px',
                borderBottom: '1px solid #f0f0f0',
                alignItems: 'center',
                background: index % 2 === 0 ? '#fafafa' : 'white',
                fontSize: '13px'
              }}>

                <div >{service.service_type}</div>
                <div> {service.special_instructions ? service.special_instructions : 'Basic ' + service.service_type + ' service'}. <br /> charge: {service.service_charge}
                  <br />
                </div>
                <div style={{ fontWeight: '600' }}>{service.is_verified ? (
                  <MdVerified style={{ color: '#1d9bf0', verticalAlign: 'middle' }} />
                ) : ''} {service.vendor_name} <br />
                  <LuPhone className="w-4 h-4 " />{service.vendor_contact_no}
                  {/* <StarRating rating={service.rating}
totalStars={5} 
onRatingChange={(rating) => console.log('Selected:', rating)} 
/>  */}

                  {/* {service.phone} */}

                </div>
                {/* <div>{service.waitingDays}</div> */}
                <div>{service.booking_date}</div>
                <div>{service.updated_at}</div>
                <div style={{ fontWeight: '600', color: service.status === 'open' || service.status === 'assigned' || service.status === 'accepted' ? '#38a169' : service.status === 'escalated' ? '#dd6b20' : '#e53e3e' }}>{service.status.toUpperCase()}</div>
                <div className="flex justify-center gap-2 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform active:scale-90"
                    >
                      <Star
                        size={36}
                        fill={(hover || rating) >= star ? "#f59e0b" : "none"}
                        className={(hover || rating) >= star ? "text-amber-500" : "text-slate-200"}
                        strokeWidth={2.5}
                      />
                    </button>
                  ))}
                </div>
                <div>
                  <button
                    onClick={() => handleServiceStatusChange(index, 'reopened')}
                    style={{
                      background: '#e2e8f0',
                      color: '#4a5568',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Re-Open
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => updateReview(index, rating)}
                    style={{
                      background: '#e2e8f0',
                      color: '#4a5568',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    SAVE RATING
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {verificationModal.isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
              Verify Parent
            </h2>
            <p style={{ color: '#718096', marginBottom: '30px' }}>
              {verificationModal.parentName}
            </p>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '10px', fontWeight: '600' }}>
                Upload Verification Document (ZIP file)
              </label>
              <input
                type="file"
                accept=".zip"
                onChange={handleFileSelect}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px dashed #cbd5e0',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              />
              {verificationModal.file && (
                <p style={{ marginTop: '10px', color: '#48bb78', fontSize: '14px' }}>
                  ✓ {verificationModal.file.name}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
              <button
                onClick={closeVerificationModal}
                style={{
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleVerificationSubmit}
                disabled={!verificationModal.file}
                style={{
                  background: verificationModal.file ? '#48bb78' : '#cbd5e0',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: verificationModal.file ? 'pointer' : 'not-allowed',
                  fontSize: '14px'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ParentDashboard