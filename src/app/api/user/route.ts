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
              }, { status:200 });
   
          })
          .catch((error) => {
            return NextResponse.json({ message: 'Internal server error' }, { status:500 });});
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: 'Internal server error' }, { status:500 });
    }
};