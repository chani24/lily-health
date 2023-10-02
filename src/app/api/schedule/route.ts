import axios from '../../_lib/api';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


function generateHourlyBookings() {
  const startDate = new Date()
  const bookings = [];
  const daysToGenerate = 5; // Generate for 5 days
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const saturday = 'Saturday';

  // Helper function to check if a day is a Sunday
  function isSunday(date: Date) {
    return date.getDay() === 0;
  }

  // Loop through each day and generate bookings
  for (let i = 0; i < daysToGenerate; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Check if it's not a Sunday
    if (!isSunday(currentDate)) {
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

      let startTime = 8;
      let endTime = 17; // 5 PM for weekdays

      // Check if it's Saturday
      if (dayOfWeek === saturday) {
        endTime = 15; // 3 PM for Saturday
      }

      const bookingsForDay = [];

      // Generate bookings from startTime to endTime
      for (let hour = startTime; hour <= endTime; hour++) {
        const booking = `${hour}:00`
        bookingsForDay.push(booking);
      }

      bookings.push({
        date: currentDate, //.toISOString().split('T')[0],
        times: bookingsForDay,
      });
    }
  }

  return bookings;
}



// To handle a GET request to /api
export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        if (!token) {
            return NextResponse.json({ message: 'not authorized' }, { status:403 });
        }

        const hourlyBookings = generateHourlyBookings();
      

        return NextResponse.json({
         data: hourlyBookings
        }, { status: 200 });
      
        return axios
          .get('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token?.value}`,
            },
          })
          .then((response) => {

            return NextResponse.json({
                user: response.data.username,
                email: response.data.email,
                id: response.data.id,
              }, { status:200 });
   
          })
          .catch((error) => {
            if (!error.response.data.error.message) {
                return NextResponse.json({ message: 'Internal server error' }, { status:500 });
            } else {
              const messages = error.response.data.error.message;
              console.log(error.response.data.error.details)
                return NextResponse.json({ message: messages }, { status:403 });
    
            }
          });
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: 'Internal server error' }, { status:500 });
    }
};