import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BusSeats = ({ token }) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedSeat, setSelectedSeat] = useState(null)

    const { busId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios(`http://127.0.0.1:8000/api/buses/${busId}`)
                setBus(response.data)
                setSeats(response.data.seats || [])
            } catch (error) {
                console.log('Error in fetching details', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = async (seatId) => {
        if (!token) {
            alert("Please login for booking a seat")
            navigate('/login')
            return
        }
        
        setSelectedSeat(seatId)
        
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/booking/",
                { seat: seatId },
                {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            )
            alert("Booking Successful!")
            
            setSeats(prevSeats =>
                prevSeats.map(seat =>
                    seat.id === seatId ? { ...seat, is_booked: true } : seat
                )
            )
        } catch (error) {
            alert(error.response?.data?.error || "Booking Failed")
        } finally {
            setSelectedSeat(null)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Bus Details Card */}
                {bus && (
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl mb-8 p-6 text-white">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">{bus.bus_name}</h1>
                                <p className="text-blue-100">Bus Number: {bus.number}</p>
                            </div>
                            <div className="mt-4 md:mt-0 flex items-center space-x-4">
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <span>{bus.origin} → {bus.destination}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{bus.start_time} - {bus.reach_time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Seat Layout */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Select Your Seat</h2>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                                <span className="text-sm text-gray-600">Booked</span>
                            </div>
                        </div>
                    </div>

                    {/* Bus Seat Grid */}
                    <div className="relative">
                        {/* Driver Area */}
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                            <div className="bg-gray-200 px-6 py-2 rounded-lg text-sm text-gray-600">
                                Driver
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 mt-8">
                            {seats.map((seat) => (
                                <button
                                    key={seat.id}
                                    onClick={() => handleBook(seat.id)}
                                    disabled={seat.is_booked}
                                    className={`
                                        relative p-4 rounded-lg border-2 transition-all duration-200
                                        ${seat.is_booked 
                                            ? 'bg-red-50 border-red-300 cursor-not-allowed opacity-75' 
                                            : 'bg-green-50 border-green-300 hover:bg-green-100 hover:border-green-500'
                                        }
                                        ${selectedSeat === seat.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
                                    `}
                                >
                                    <div className="text-center">
                                        <svg className={`h-6 w-6 mx-auto mb-1 ${seat.is_booked ? 'text-red-500' : 'text-green-600'}`} 
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span className={`text-sm font-medium ${seat.is_booked ? 'text-red-700' : 'text-green-700'}`}>
                                            Seat {seat.seat_number}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Booking Info */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="font-semibold">Note:</span> Click on an available seat to book it. 
                            {!token && " You need to login first to book a seat."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BusSeats