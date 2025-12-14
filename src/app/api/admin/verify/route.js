import dbConnect from '@/../lib/db';
import User from '@/../models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const { userId, status, backOfficeLink, backOfficeUsername } = await req.json();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        status,
        backOfficeLink,
        backOfficeUsername
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
