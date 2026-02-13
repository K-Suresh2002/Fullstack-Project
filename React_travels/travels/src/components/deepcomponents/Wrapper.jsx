// import React from 'react'
// import { Link, useNavigate } from 'react-router-dom'

// const Wrapper = ({ token, handleLogout, children }) => {
//     const navigate = useNavigate()

//     const logout = () => {
//         handleLogout()
//         navigate('/')
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Navigation Bar */}
//             <nav className="bg-white shadow-lg sticky top-0 z-50">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center h-16">
//                         {/* Logo */}
//                         <div className="flex-shrink-0">
//                             <Link to="/" className="flex items-center space-x-2">
//                              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                                 <span className="text-xl font-bold text-gray-900">BusTravel</span>
//                             </Link>
//                         </div>

//                         {/* Navigation Links */}
//                         <div className="hidden md:block">
//                             <div className="ml-10 flex items-center space-x-4">
//                                 <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">
//                                     Home
//                                 </Link>
//                                 <Link to="/buses" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">
//                                     Buses
//                                 </Link>
//                                 {token && (
//                                     <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150">
//                                         My Bookings
//                                     </Link>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Auth Buttons */}
//                         <div className="flex items-center space-x-4">
//                             {token ? (
//                                 <div className="flex items-center space-x-4">
//                                     <span className="text-sm text-gray-600 hidden sm:inline">
//                                         Welcome, User
//                                     </span>
//                                     <button
//                                         onClick={logout}
//                                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
//                                     >
//                                         <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                         </svg>
//                                         Logout
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <div className="flex items-center space-x-2">
//                                     <Link to="/login">
//                                         <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
//                                             <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                                             </svg>
//                                             Login
//                                         </button>
//                                     </Link>
//                                     <Link to="/register">
//                                         <button className="


import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate()

  const logout = () => {
    handleLogout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">BusTravel</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/buses" className="text-gray-700 hover:text-blue-600">
                Buses
              </Link>
              {token && (
                <Link to="/my-bookings" className="text-gray-700 hover:text-blue-600">
                  My Bookings
                </Link>
              )}
            </div>

            {/* Auth Buttons */}
            {token ? (
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Login
                </Link>
                <Link to="/register" className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Register
                </Link>
              </div>
            )}

          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="p-4">{children}</main>
    </div>
  )
}

export default Wrapper
