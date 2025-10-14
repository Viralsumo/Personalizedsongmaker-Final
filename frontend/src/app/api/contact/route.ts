import { NextResponse } from 'next/server';
import * as SibApiV3Sdk from '@getbrevo/brevo';

export async function POST(request: Request) {
  // IMPORTANT: Replace with the email you want to receive messages at
  const recipientEmail = 'sanketnkedari@gmail.com';
  // IMPORTANT: Replace with your verified sender email in Brevo
  const senderEmail = 'noreply@personalizedsongmaker.com';

  if (!process.env.BREVO_API_KEY) {
    console.error('Brevo API key is not set in environment variables.');
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = `New Message from ${name} via Contact Form`;
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </body>
      </html>
    `;
    sendSmtpEmail.sender = { name: 'Personalized Song Maker', email: senderEmail };
    sendSmtpEmail.to = [{ email: recipientEmail }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}