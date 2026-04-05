import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // 1. Send Welcome Email
    await resend.emails.send({
      from: 'GeminiHub <updates@yourdomain.com>',
      to: email,
      subject: 'Welcome to GeminiHub!',
      html: '<strong>You are now subscribed to the latest Google AI updates!</strong>'
    });

    // 2. (Optional) Add to Resend Audience/Contact List
    await resend.contacts.create({
      email: email,
      firstName: '',
      lastName: '',
      unsubscribed: false,
      audienceId: 'YOUR_AUDIENCE_ID', // Found in Resend Audience settings
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}