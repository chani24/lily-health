import axios from '../../_lib/api';
import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: Request) {
  // Do whatever you want
  return NextResponse.json({ message: "Welcome to Lily Health" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(req: Request) {
  try {
    const data = await req.json();
    return axios.post('/api/auth/reset-password', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response: any) => {
        console.log(response)
        return NextResponse.json({ message: `Your password has been reset, you will be redirected to login` }, { status: 200 });
      })
      .catch((error: { response: { data: { error: { message: any; }; }; }; }) => {
        console.log(error);
        if (!error.response.data.error.message) {
          return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        } else {
          const messages = error.response.data.error.message;
          return NextResponse.json({ message: messages }, { status: 400 });
        }
      });
  }
  catch (e) {
    console.log(e)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}