// EmailJS Configuration
// Replace these with your actual EmailJS credentials

export const EMAIL_CONFIG = {
  // Get these from your EmailJS dashboard
  SERVICE_ID: 'service_exelus', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_quote', // Replace with your EmailJS template ID
  AUTO_REPLY_TEMPLATE_ID: 'template_auto_reply', // Replace with your auto-reply template ID
  PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
  
  // Your business email
  BUSINESS_EMAIL: 'info@exelusinfotech.com',
  
  // Email templates
  QUOTE_EMAIL_TEMPLATE: `
    New Quote Request - {{from_name}}
    
    Client Information:
    - Name: {{from_name}}
    - Company: {{company_name}}
    - Email: {{from_email}}
    - Phone: {{phone}}
    
    Project Details:
    - Services: {{services}}
    - Description: {{project_description}}
    - Budget: {{budget_range}}
    - Start Date: {{start_date}}
    - Timeframe: {{timeframe}}
    - Files: {{files_count}} file(s)
    
    Submitted: {{submission_date}}
  `,
  
  AUTO_REPLY_TEMPLATE: `
    Dear {{to_name}},
    
    Thank you for your interest in Exelus InfoTech!
    
    We have received your quote request for {{services}}.
    Our team will review your requirements and get back to you within 24 hours.
    
    Best regards,
    The Exelus InfoTech Team
  `
};

// EmailJS Setup Instructions:
/*
1. Go to https://www.emailjs.com/ and create an account
2. Create a new service (Gmail, Outlook, etc.)
3. Create email templates with the following template IDs:
   - template_quote (for receiving quote requests)
   - template_auto_reply (for sending auto-replies to clients)
4. Get your Service ID, Template IDs, and Public Key
5. Replace the values above with your actual credentials
6. Update the template content in your EmailJS dashboard to match your needs

Template Variables to use in EmailJS:
- {{from_name}} - Client's full name
- {{from_email}} - Client's email
- {{company_name}} - Client's company
- {{phone}} - Client's phone
- {{services}} - Selected services
- {{project_description}} - Project description
- {{budget_range}} - Budget range
- {{start_date}} - Expected start date
- {{timeframe}} - Project timeframe
- {{files_count}} - Number of files uploaded
- {{files_info}} - File names and sizes
- {{submission_date}} - When the form was submitted
- {{to_email}} - Recipient email (for auto-reply)
- {{to_name}} - Recipient name (for auto-reply)
*/