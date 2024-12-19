import { emailTransporter } from './config';
import { EmailData } from './types';
import { createConsultationEmail } from './templates';

export async function sendConsultationEmail(data: EmailData): Promise<void> {
  const { subject, html } = createConsultationEmail(data);
  
  try {
    console.log('Verifying SMTP configuration...');
    console.log('SMTP Settings:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? '(set)' : '(not set)',
      from: process.env.SMTP_FROM ? '(set)' : '(not set)',
    });

    await emailTransporter.verify();
    console.log('SMTP verification successful');
    
    console.log('Sending email...');
    const result = await emailTransporter.sendMail({
      from: process.env.SMTP_FROM,
      to: ['joseph@platteneye.co.uk', 'daniel@platteneye.co.uk'],
      subject,
      html,
    });
    
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
}