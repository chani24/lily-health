import { cookies } from 'next/headers';
import axios from '../../_lib/api';
import { NextResponse } from "next/server";

import sendMail from '../../_lib/email';

function generateRandomAlphabets() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomAlphabets = '';
  for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomAlphabets += alphabet.charAt(randomIndex);
  }
  return randomAlphabets;
}

// To handle a GET request to /api
export async function GET(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Welcome to Lily Health" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cookieStore = cookies();
    const token = cookieStore.get('token');
    const reference = generateRandomAlphabets();

    const bookingExists = await axios
      .get('/api/bookings?populate=*&filters[dateString][$eq]=' + data.dateString + '&filters[time][$eq]=' + data.time);

    if (bookingExists.data.data.length > 0) {
      return NextResponse.json({ message: 'Chosen timeslot already booked!' }, { status:400 });
  }
  

  return axios.post('/api/bookings', { data: {...data, reference }
}, {
    headers: {
      Authorization: token?.value ? `Bearer ${token?.value}`: null,
    },
  })
    .then(async (response) => {
      let user;
      if (!data.email) {
          user = await axios
      .get('/api/users/me', {
        headers: {
          Authorization: token?.value ? `Bearer ${token?.value}`: null,
        },
      })
      }
   

      const doctor = await axios
      .get('/api/doctors/' + data.doctor, {
        headers: {
          Authorization: token?.value ? `Bearer ${token?.value}`: null,
        },
      })
      const templateData = {
        doctor_name: doctor?.data?.data?.attributes?.firstName + " " + doctor?.data?.data?.attributes?.lastName,
        user_name: data.name ? data.name : user?.data.firstName + ' ' + user?.data.lastName,
        date: data.dateString,
        time: data.time,
          type: data.inPerson ? 'Physical': 'Virtual',
        reference
        }

      sendMail(doctor?.data?.data?.attributes?.emailAddress, 'ea480aa2-d428-4298-b56d-b398b39ebd09', templateData);

      sendMail(data.email ? data.email : user?.data.email, 'e4a7d7b5-d585-4cb4-a6bd-2b6247b05d3a', templateData);
      
      
    return NextResponse.json({
        message: `Booking with ref: ${reference} created successfully!`
      }, { status:200 });

  })
    .catch((error: { response: { data: { error: { message: any; }; }; }; }) => {
      console.log(error);
      if (!error.response.data.error.message) {
          return NextResponse.json({ message: 'Internal server error' }, { status:500 });
      } else {
        const messages = 'Failed to create booking' || error.response.data.error.message;
        console.log(error.response.data.error.message)
          return NextResponse.json({ message: messages }, { status:400 });
      }
    });
  }
catch (e) {
  console.log(e)
    return NextResponse.json({ message: 'Internal server error' }, { status:500 });
  }
}