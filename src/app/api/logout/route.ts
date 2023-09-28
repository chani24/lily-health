import axios from '../../_lib/api';
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
      const data = await req.json();
      
    
              const resp = new NextResponse(JSON.stringify({ message: "User has been logged out"}), { status: 200 });
              
              resp.cookies.set({
                name: "token",
                value: '',
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
              });
              resp.cookies.set({
                name: "userId",
                value: '',
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                sameSite: 'strict',
                path: '/',
              });
            
            return resp;
             

  }
  catch (e) {
    console.log(e)
      return NextResponse.json({ message: 'Internal server error' }, { status:500 });
    }  
    
}
