# Exelus InfoTech - Landing Page

A modern, responsive landing page for Exelus InfoTech built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, professional design
- 📱 Fully responsive layout
- ⚡ Fast loading with Vite
- 📧 Integrated quote request form with EmailJS
- 🎭 Smooth animations with Framer Motion
- 🎯 SEO optimized
- ♿ Accessible design

## Quote Form Features

- ✅ Complete client information collection
- 📋 Multi-select service options
- 📁 File upload functionality (PDF, DOCX, ZIP, etc.)
- 📧 Automatic email notifications
- 🔄 Auto-reply to clients
- ✨ Form validation and error handling
- 📱 Mobile-friendly modal design

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure EmailJS

1. Go to [EmailJS](https://www.emailjs.com/) and create an account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create two email templates:
   - **Quote Request Template** (ID: `template_quote`)
   - **Auto-Reply Template** (ID: `template_auto_reply`)

4. Update the configuration in `src/utils/emailConfig.ts`:
```typescript
export const EMAIL_CONFIG = {
  SERVICE_ID: 'your_service_id',
  TEMPLATE_ID: 'template_quote',
  AUTO_REPLY_TEMPLATE_ID: 'template_auto_reply',
  PUBLIC_KEY: 'your_public_key',
  BUSINESS_EMAIL: 'your-business@email.com'
};
```

### 3. EmailJS Template Setup

#### Quote Request Template Variables:
```
{{from_name}} - Client's name
{{from_email}} - Client's email
{{company_name}} - Client's company
{{phone}} - Client's phone
{{services}} - Selected services
{{project_description}} - Project description
{{budget_range}} - Budget range
{{start_date}} - Expected start date
{{timeframe}} - Project timeframe
{{files_count}} - Number of files
{{submission_date}} - Submission timestamp
```

#### Auto-Reply Template Variables:
```
{{to_name}} - Client's name
{{to_email}} - Client's email
{{services}} - Selected services
{{company_name}} - Client's company
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx           # Hero section with CTA
│   ├── Services.tsx       # Services showcase
│   ├── WhyChoose.tsx      # Why choose us section
│   ├── Trusted.tsx        # Trusted companies
│   ├── Testimonials.tsx   # Client testimonials
│   ├── Footer.tsx         # Footer with contact info
│   ├── Loader.tsx         # Loading animation
│   └── QuoteForm.tsx      # Quote request modal
├── utils/
│   └── emailConfig.ts     # EmailJS configuration
├── App.tsx                # Main app component
├── App.css               # Global styles
└── main.tsx              # App entry point
```

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **EmailJS** - Email integration
- **Vite** - Build tool
- **Lucide React** - Icons

## Email Integration Details

The quote form automatically:
1. ✅ Validates all required fields
2. 📧 Sends detailed quote request to your business email
3. 🔄 Sends confirmation email to the client
4. 📁 Handles file attachments (up to 10MB each)
5. 🛡️ Provides fallback to mailto: if EmailJS fails
6. ✨ Shows success/error messages to users

## Customization

### Colors
The design uses a blue color scheme defined in Tailwind classes:
- Primary: `#3282B8`
- Secondary: `#BBE1FA`
- Background: `#0f172a` (slate-900)

### Content
Update content in the respective component files:
- Hero text: `src/components/Hero.tsx`
- Services: `src/components/Services.tsx`
- Company info: `src/components/Footer.tsx`

### Email Templates
Customize email templates in your EmailJS dashboard to match your branding and requirements.

## Deployment

The project can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## Support

For questions or support, contact: info@exelusinfotech.com

## License

© 2024 Exelus InfoTech. All rights reserved.