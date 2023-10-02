import { cookies } from 'next/headers';
import axios from '../../_lib/api';
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Welcome to Lily Health" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(req: Request) {
try{
  const data = await req.json();
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  

  return axios.post('/api/bookings', {data}, {
    headers: {
      Authorization: token?.value ? `Bearer ${token?.value}`: null,
    },
  })
  .then((response) => {
    return NextResponse.json({
        message: `Booking with ID: ${response.data.data.id} created successfully!`
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