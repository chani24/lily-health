import axios from '../../_lib/api';
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
      const data = await req.json();
        return axios
          .post('/api/auth/local', data)
          .then((response) => {
            const jwt = response.data.jwt;
            const id = response.data.user.id;
    
              const resp = new NextResponse(JSON.stringify({ message: response.data.user }), { status: 200 });
              
              resp.cookies.set({
                name: "token",
                value: jwt,
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
              });
              resp.cookies.set({
                name: "userId",
                value: id,
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
              });
            
            return resp;
             
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
    
}
