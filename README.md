# CareerDraft - AI-Powered Resume Builder

CareerDraft is a modern, AI-powered resume and cover letter builder that helps you create professional documents tailored to your dream job. The application uses AI to generate personalized content based on your experience and the job description.

## Features

- 🚀 AI-generated resumes and cover letters
- 📝 Customizable templates
- 🔄 Real-time preview
- 📥 Download as PDF
- 📧 Email documents directly
- 🔒 Secure authentication with Firebase
- 🎨 Modern, responsive UI

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **AI**: Groq API with LLaMA3
- **PDF Generation**: html2pdf.js
- **Email**: Nodemailer with ethereal.email (dev) / SendGrid (prod)
- **UI Components**: Headless UI, Hero Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Firebase project with Authentication and Firestore enabled
- Groq API key
- (Optional) SendGrid account for production email

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/careerdraft.git
   cd careerdraft
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Copy the example environment file and update with your settings:
   ```bash
   cp env.example .env.local
   ```

4. Configure environment variables in `.env.local` (see [Configuration](#configuration))

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Groq API
NEXT_PUBLIC_GROQ_API_KEY=your-groq-api-key

# Email Configuration (for production)
EMAIL_FROM=your-email@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password

# For development, leave SMTP_HOST empty to use ethereal.email
```

## Features Documentation

For detailed documentation on specific features, see:

- [PDF Generation and Email Features](./FEATURES.md)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcareerdraft&env=NEXT_PUBLIC_FIREBASE_API_KEY,NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,NEXT_PUBLIC_FIREBASE_PROJECT_ID,NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,NEXT_PUBLIC_FIREBASE_APP_ID,NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,NEXT_PUBLIC_GROQ_API_KEY,EMAIL_FROM,SMTP_HOST,SMTP_PORT,SMTP_SECURE,SMTP_USER,SMTP_PASSWORD&envDescription=Firebase%20and%20email%20configuration%20is%20required.&envLink=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcareerdraft%23configuration&project-name=careerdraft&repository-name=careerdraft)

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

You can also deploy to other platforms that support Next.js:

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Heroku](https://www.heroku.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on the [GitHub repository](https://github.com/yourusername/careerdraft/issues).
