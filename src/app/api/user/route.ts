import axios from '../../_lib/api';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

// To handle a GET request to /api
export async function GET(req: Request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        if (!token) {
            return NextResponse.json({ message: 'not authorized' }, { status:403 });
        }
        return axios
          .get('/api/users/me', {
            headers: {
              Authorization: `Bearer ${token.value}`,
            },
          })
          .then((response) => {

            return NextResponse.json({
                user: response.data.username,
                email: response.data.email,
                id: response.data.id,
                lastName: response.data.lastName,
                firstName: response.data.firstName,
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