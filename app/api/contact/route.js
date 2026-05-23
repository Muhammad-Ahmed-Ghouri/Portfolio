import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 2. Email options configure karein
    const mailOptions = {
      from: `"Portfolio Signal" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `⚡ New Transmission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Portfolio Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #050810; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f5;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #0b0f1e; border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <!-- Header Glow Accent -->
            <tr>
              <td style="background: linear-gradient(90deg, #2563eb, #3b82f6); height: 4px;"></td>
            </tr>
            
            <!-- Main Content Area -->
            <tr>
              <td style="padding: 40px 35px;">
                
                <!-- Watermark Logo Style -->
                <table width="100%">
                  <tr>
                    <td>
                      <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #60a5fa; display: block; margin-bottom: 4px;">Incoming Signal</span>
                      <h2 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">New Message Received</h2>
                    </td>
                  </tr>
                </table>
                
                <hr style="border: 0; height: 1px; background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), transparent); margin: 25px 0;">
                
                <!-- Sender Details Table -->
                <table width="100%" style="border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #7b8bab; text-transform: uppercase; letter-spacing: 0.05em; width: 100px;">Sender:</td>
                    <td style="padding: 6px 0; font-size: 15px; color: #e2e8f5; font-weight: 600;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #7b8bab; text-transform: uppercase; letter-spacing: 0.05em;">Identity:</td>
                    <td style="padding: 6px 0; font-size: 15px; color: #60a5fa; font-weight: 500;">
                      <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; border-bottom: 1px dashed rgba(96, 165, 250, 0.4);">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-size: 13px; color: #7b8bab; text-transform: uppercase; letter-spacing: 0.05em;">Subject:</td>
                    <td style="padding: 6px 0; font-size: 15px; color: #ffffff; font-weight: 500;">${subject}</td>
                  </tr>
                </table>
                
                <!-- Message Box Section -->
                <table width="100%" style="margin-top: 30px;">
                  <tr>
                    <td>
                      <div style="background-color: rgba(59, 130, 246, 0.04); border-left: 3px solid #3b82f6; border-radius: 4px 12px 12px 4px; padding: 24px 20px; border-top: 1px solid rgba(59, 130, 246, 0.08); border-right: 1px solid rgba(59, 130, 246, 0.08); border-bottom: 1px solid rgba(59, 130, 246, 0.08);">
                        <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #7b8bab;">Transmission Content:</p>
                        <div style="font-size: 15px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap; font-family: inherit;">${message.replace(/\n/g, '<br>')}</div>
                      </div>
                    </td>
                  </tr>
                </table>
                
                <!-- Quick Action Button -->
                <table width="100%" style="margin-top: 35px; text-align: center;">
                  <tr>
                    <td>
                      <a href="mailto:${email}" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: #ffffff; font-size: 14px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);">
                        Quick Reply
                      </a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
            
            <!-- Footer Strip -->
            <tr>
              <td style="padding: 20px 35px; background-color: #080c16; border-top: 1px solid rgba(59, 130, 246, 0.08); text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #526484; letter-spacing: 0.02em;">
                  Portfolio Automated Notification System &middot; ${new Date().getFullYear()}
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    // 3. Email send karein
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 },
    );
  }
}
