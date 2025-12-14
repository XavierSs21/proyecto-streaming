import Header from '@/components/Header'
import Footer from '@/components/Home/Footer'
import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header/>

        <div className='container mx-auto flex-1 py-10 bg-red'>
            {children}
        </div>
      
        <Footer/>
    </div>
  )
}

export default Layout