import { useState } from 'react'
import Head from 'next/head'
import Login from '../components/Auth/Login'

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [showLogin, setShowLogin] = useState(false)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setShowLogin(true)
  }

  const handleLoginSuccess = (user) => {
    alert(`Welcome ${user.name}! You are now logged in as a ${user.role}.`)
    setShowLogin(false)
    
    // Dashboard mapping
    const dashboardRoutes = {
      'daughter': '/daughter-dashboard',
      'parent': '/parent-dashboard',
      'vendor': '/vendor-dashboard'
    }
    
    // Redirect to dashboard based on role
    window.location.href = dashboardRoutes[user.role] || `/dashboard/${user.role}`
  }

  const loginCards = [
    {
      role: 'parent',
      icon: '👴',
      title: 'Client Login',
      description: 'Sign in to your Living Trail portal to unlock our full suite of on-demand services. From master cooks and safe drivers to meticulous bathroom cleaning and gardening, we handle the chores so you can focus on the trail ahead.',
      // 'Your Service Hub, Personalized.Log in to your Living Trail dashboard to manage your premium home services. Whether you need to schedule a five-star cook for tonight, book your driver, or refresh your home with our specialized cleaning teams, your personal trail to a simplified lifestyle starts here.Premium assistance is just one click away.',
      color: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)'
    },
    {
      role: 'daughter',
      icon: '👩',
      title: 'RM Login',
      description: 'Master the Trail. Log in to the Living Trail RM Command Center. Oversee your assigned client portfolios, monitor service provider performance in real-time, and ensure every driver, cook, and cleaning professional maintains our gold standard. Your expertise turns services into seamless experiences.',
      color: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)'
    },
    {
      role: 'vendor',
      icon: '🏢',
      title: 'Vendor Login: Ready to hit the Trail? ',
      description: 'Fuel Your Professional Journey. Access the Living Trail Vendor Portal to manage your roster and growth. Log in to check your active deployments, review client feedback, and ensure every service you provide leaves a trail of perfection. Let your expertise meets our clientele’s needs.',
      color: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)'
    }
  ]

  return (
    <>
      <Head>
        <title>Way to Living Trail &gt;&gt; </title>
      </Head>
      
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', color: 'white', marginBottom: '48px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px' }}>
              Premium Member Login
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: '0.9' }}>
              Select your role to access your dashboard
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {loginCards.map((card) => (
              <div
                key={card.role}
                onClick={() => handleRoleSelect(card.role)}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(0)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{card.icon}</div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px', color: '#2d3748' }}>
                  {card.title}
                </h2>
                <p style={{ color: '#718096', fontSize: '1rem', lineHeight: '1.6', marginBottom: '25px' }}>
                  {card.description}
                </p>
                
                <button style={{
                  background: card.color,
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Login as {card.role.charAt(0).toUpperCase() + card.role.slice(1)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogin && (
        <Login 
          role={selectedRole}
          onClose={() => setShowLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </>
  )
}