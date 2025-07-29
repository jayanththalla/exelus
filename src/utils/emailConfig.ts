// Server API Configuration
// The form now submits to your custom server instead of EmailJS

export const API_CONFIG = {
  // Your server endpoint
  SUBMIT_QUOTE_URL: '/api/submit-quote',
  
  // Your business email (used as fallback)
  BUSINESS_EMAIL: 'info@exelusinfotech.com',
  
  // Server health check
  HEALTH_CHECK_URL: '/api/health'
};

// Note: Email configuration is now handled server-side in the .env file
// This provides better security and supports file attachments