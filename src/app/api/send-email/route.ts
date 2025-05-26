import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, subject, text, html, attachments } = await request.json();

    // Validate required fields
    if (!to || !subject || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a test account for development
    const testAccount = await nodemailer.createTestAccount();

    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || testAccount.user, // generated ethereal user
        pass: process.env.SMTP_PASSWORD || testAccount.pass, // generated ethereal password
      },
    });

    // Process attachments
    const processedAttachments = (attachments || []).map((attachment: any) => ({
      filename: attachment.filename,
      content: Buffer.from(attachment.content, 'base64'),
      contentType: attachment.type,
      disposition: attachment.disposition,
    }));

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"CareerDraft" <${process.env.EMAIL_FROM || 'noreply@careerdraft.com'}>`,
      to: to,
      subject: subject,
      text: text,
      html: html || text,
      attachments: processedAttachments,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
    return NextResponse.json({ 
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to send email',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
