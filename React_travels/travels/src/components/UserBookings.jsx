import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserBookings = ( {token, userId}) => {
    const [bookings, setBookings] = useState([])
    const [bookingError, setBookingError] = useState(null)

useEffect(()=>{
    const fetchBookings = async()=>{
        if(!token || !userId){
            return
        }
        try {
            const response = await axios.get(`https://fullstack-project-1-aqqj.onrender.com/api/user/${userId}/bookings/`,
                {
                    headers:{
                        Authorization : `Token ${token}`
                    }
                }
            )
            console.log("Booking data = ", response.data)
            setBookings(response.data)
            console.log("checking for user bookings =", response.data)


        } catch (error) {
            console.log("fetching details failed", error)
            setBookingError(
                error.response?.data?.message
            )
        }
    }
    fetchBookings()
},[userId, token])
  return (
    <div>
      {bookings.map((item)=>{
        return (
            <div>
                {item.user}-
                {item.bus}-
                {item.seat}-
                {item.booking_time}

            </div>
        )
      })}
    </div>
  )
}

export default UserBookings
