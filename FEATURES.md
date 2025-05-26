# PDF and Email Features

This document explains how to set up and use the PDF generation and email sending features in the CareerDraft application.

## PDF Generation

The application uses `html2pdf.js` to generate PDFs from HTML content. The PDF generation is handled in the `DocumentActions` component.

### Features:
- Generate PDFs from resume/cover letter content
- Customizable PDF options (margins, format, orientation)
- Download PDF directly to the user's device

### Dependencies:
- `html2pdf.js`: For converting HTML to PDF
- `@types/html2pdf.js`: TypeScript type definitions

## Email Sending

The application uses `nodemailer` to send emails with PDF attachments. The email functionality is implemented using a Next.js API route.

### Features:
- Send emails with PDF attachments
- Support for both HTML and plain text emails
- Preview emails in development using ethereal.email
- Error handling and user feedback

### Dependencies:
- `nodemailer`: For sending emails
- `@types/nodemailer`: TypeScript type definitions

## Setup Instructions

1. Copy the example environment file and update with your settings:
   ```bash
   cp env.example .env.local
   ```

2. Configure the following environment variables in `.env.local`:
   ```
   # Email Configuration
   EMAIL_FROM=your-email@example.com
   
   # SMTP Configuration (for production)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-smtp-username
   SMTP_PASSWORD=your-smtp-password
   
   # For development with ethereal.email (https://ethereal.email/)
   # Leave SMTP_HOST blank to use ethereal test account
   # Check the console logs for the test email URL
   ```

3. For development, you can use ethereal.email for testing email sending:
   - Leave `SMTP_HOST` empty in `.env.local`
   - Check the browser console for the ethereal.email preview URL when sending emails

## Usage

### Generating and Downloading PDFs
1. Click the "Download PDF" button in the document actions
2. The PDF will be generated and downloaded automatically

### Sending Emails
1. Click the "Email Me" button in the document actions
2. The application will:
   - Generate a PDF of the document
   - Send an email with the PDF attachment
   - Show a success message with a preview link (in development)

## Troubleshooting

### PDF Generation Issues
- Ensure all required dependencies are installed
- Check the browser console for any JavaScript errors
- Verify that the HTML content is valid

### Email Sending Issues
- Check the browser console for error messages
- Verify that all required environment variables are set
- In development, check the terminal for ethereal.email login credentials and preview URL
- For production, verify your SMTP server settings

## Security Considerations

- Never commit sensitive information (API keys, SMTP credentials) to version control
- Use environment variables for all sensitive configuration
- Implement proper error handling to avoid leaking sensitive information
- Consider rate limiting for the email API endpoint to prevent abuse
