import { useState } from 'react'
import Head from 'next/head'
import RegistrationCards from '../components/Registration/RegistrationCards'
import FormModal from '../components/Registration/FormModal'
import Hero1 from '../components/Home/Hero1'
export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)

  const openForm = (role) => {
    setSelectedRole(role)
    setIsModalOpen(true)
  }

  const closeForm = () => {
    setIsModalOpen(false)
    setSelectedRole(null)
  }

  return (
    <>
      <Head>
        <title>Register - Living Trail</title>
        <meta name="description" content="Register for Parent Care Services - Choose your role" />
      </Head>
       <Hero1 />
      <div className="min-h-screen bg-gradient-primary py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h3 className="text-xl md:text-xl font-bold mb-4">
             REGISTER NOW!
            </h3>
            <p className="text-xl opacity-90">
              Choose your role to get started with our most trusted platform as a trusted partner or a Relationship Manager.
            </p>
          </div>
          
          <RegistrationCards onOpenForm={openForm} />
          
          <FormModal 
            isOpen={isModalOpen}
            onClose={closeForm}
            selectedRole={selectedRole}
          />
        </div>
      </div>
    </>
  )
}