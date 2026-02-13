// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const UserBookings = ({ token, userId }) => {
//     const [bookings, setBookings] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [bookingError, setBookingError] = useState(null)

//     useEffect(() => {
//         const fetchBookings = async () => {
//             if (!token || !userId) {
//                 setLoading(false)
//                 return
//             }
//             try {
//                 const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/bookings/`,
//                     {
//                         headers: {
//                             Authorization: `Token ${token}`
//                         }
//                     }
//                 )
//                 setBookings(response.data)
//             } catch (error) {
//                 console.log("fetching details failed", error)
//                 setBookingError(error.response?.data?.message || "Failed to fetch bookings")
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchBookings()
//     }, [userId, token])

//     if (!token || !userId) {
//         return (
//             <div className="text-center py-12">
//                 <p className="text-gray-500">Please login to view your bookings</p>
//             </div>
//         )
//     }

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//         )
//     }

//     if (bookingError) {
//         return (
//             <div className="text-center py-12">
//                 <p className="text-red-500">{bookingError}</p>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-7xl mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
//                     <p className="mt-2 text-gray-600">View all your bus ticket bookings</p>
//                 </div>

//                 {bookings.length === 0 ? (
//                     <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
//                         <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                         <p className="mt-4 text-gray-500 text-lg">No bookings found</p>
//                         <p className="text-gray-400">Start your journey by booking a bus!</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-4">
//                         {bookings.map((item, index) => (
//                             <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
//                                 <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//                                     <div className="flex-1">
//                                         <div className="flex items-center mb-3">
//                                             <div className="flex-shrink-0">
//                                                 <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                                                     <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                                     </svg>
//                                                 </div>
//                                             </div>
//                                             <div className="ml-4">
//                                                 <h3 className="text-lg font-semibold text-gray-900">Bus #{item.bus}</h3>
//                                                 <p className="text-sm text-gray-500">Booking ID: {item.id}</p>
//                                             </div>
//                                         </div>
                                        
//                                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                                             <div className="flex items-center text-gray-600">
//                                                 <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                 </svg>
//                                                 <span className="text-sm">User: {item.user}</span>
//                                             </div>
//                                             <div className="flex items-center text-gray-600">
//                                                 <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//                                                 </svg>
//                                                 <span className="text-sm">Seat: {item.seat}</span>
//                                             </div>
//                                             <div className="flex items-center text-gray-600">
//                                                 <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                 </svg>
//                                                 <span className="text-sm">{new Date(item.booking_time).toLocaleString()}</span>
//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="mt-4 md:mt-0 md:ml-6">
//                                         <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                             Confirmed
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default UserBookings






import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserBookings = ({ token, userId }) => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [bookingError, setBookingError] = useState(null)

    useEffect(() => {
        const fetchBookings = async () => {
            if (!token || !userId) {
                setLoading(false)
                return
            }
            
            console.log("Fetching bookings for user:", userId) // Debug log
            console.log("Using token:", token) // Debug log
            
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/bookings/`,
                    {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    }
                )
                
                console.log("Full API Response:", response) // Debug log
                console.log("Response data:", response.data) // Debug log
                
                // Check if response.data is an array
                if (Array.isArray(response.data)) {
                    setBookings(response.data)
                } 
                // Check if response.data has a results property (common for paginated responses)
                else if (response.data.results && Array.isArray(response.data.results)) {
                    setBookings(response.data.results)
                }
                // Check if response.data is an object with bookings property
                else if (response.data.bookings && Array.isArray(response.data.bookings)) {
                    setBookings(response.data.bookings)
                }
                // If it's a single object, wrap it in an array
                else if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                    console.log("Response is an object, wrapping in array")
                    setBookings([response.data])
                }
                else {
                    console.log("Unexpected response format:", response.data)
                    setBookings([])
                }
                
            } catch (error) {
                console.error("Fetching details failed", error)
                console.error("Error response:", error.response) // Debug log
                setBookingError(
                    error.response?.data?.detail || 
                    error.response?.data?.message || 
                    "Failed to fetch bookings"
                )
            } finally {
                setLoading(false)
            }
        }
        
        fetchBookings()
    }, [userId, token])

    // Helper function to safely get nested data
    const getBookingDetails = (booking) => {
        // Try different possible data structures
        return {
            id: booking.id || booking.booking_id || 'N/A',
            user: booking.user || booking.user_id || booking.username || userId,
            bus: booking.bus || booking.bus_name || booking.bus_id || 'N/A',
            seat: booking.seat || booking.seat_number || booking.seat_id || 'N/A',
            booking_time: booking.booking_time || booking.created_at || booking.date || new Date().toISOString(),
            status: booking.status || booking.booking_status || 'Confirmed'
        }
    }

    if (!token || !userId) {
        return (
            <div className="text-center py-12">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Authentication Required</h3>
                    <p className="mt-2 text-sm text-gray-500">Please login to view your bookings</p>
                    <div className="mt-6">
                        <a href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Go to Login
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600">Loading your bookings...</p>
                </div>
            </div>
        )
    }

    if (bookingError) {
        return (
            <div className="text-center py-12">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <svg className="mx-auto h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Error Loading Bookings</h3>
                    <p className="mt-2 text-sm text-red-600">{bookingError}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header with stats */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                    <p className="mt-2 text-gray-600">
                        You have {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No bookings found</h3>
                        <p className="mt-2 text-gray-500">Start your journey by booking a bus!</p>
                        <div className="mt-6">
                            <a 
                                href="/buses" 
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Browse Buses
                                <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking, index) => {
                            const details = getBookingDetails(booking)
                            
                            return (
                                <div 
                                    key={details.id || index} 
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Status Bar */}
                                    <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
                                    
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                            {/* Left Section - Booking Info */}
                                            <div className="flex-1">
                                                <div className="flex items-start space-x-4">
                                                    {/* Bus Icon */}
                                                    <div className="flex-shrink-0">
                                                        <div className="h-14 w-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                                            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Booking Details */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center flex-wrap gap-3">
                                                            <h3 className="text-xl font-bold text-gray-900">
                                                                Bus {details.bus}
                                                            </h3>
                                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                {details.status}
                                                            </span>
                                                        </div>
                                                        
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Booking ID: {details.id}
                                                        </p>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                                            <div className="flex items-center text-gray-600">
                                                                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                                <span className="text-sm">User: {details.user}</span>
                                                            </div>
                                                            
                                                            <div className="flex items-center text-gray-600">
                                                                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                                </svg>
                                                                <span className="text-sm">Seat: {details.seat}</span>
                                                            </div>
                                                            
                                                            <div className="flex items-center text-gray-600">
                                                                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                <span className="text-sm">
                                                                    {new Date(details.booking_time).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Right Section - Actions */}
                                            <div className="mt-4 lg:mt-0 lg:ml-6 flex items-center space-x-3">
                                                <button 
                                                    onClick={() => {/* Add view ticket functionality */}}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                >
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    View
                                                </button>
                                                <button 
                                                    onClick={() => {/* Add download ticket functionality */}}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                                >
                                                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserBookings