const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    // Allowed file types
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|zip|rar/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only specific file types are allowed!'));
    }
  }
});

// Configure nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // You can change this to your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your app password
    }
  });
};

// Format email content
const formatQuoteEmail = (formData, files) => {
  const services = Array.isArray(formData.serviceType)
    ? formData.serviceType.join(', ')
    : formData.serviceType;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #3282B8; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .section { margin-bottom: 20px; padding: 15px; border-left: 4px solid #3282B8; background: #f9f9f9; }
    .section h3 { margin-top: 0; color: #3282B8; }
    .files { background: #e8f4f8; padding: 15px; border-radius: 5px; }
    .footer { background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 New Quote Request - Exelus InfoTech</h1>
  </div>
  
  <div class="content">
    <div class="section">
      <h3>👤 Client Information</h3>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Company:</strong> ${formData.companyName || 'Not provided'}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
    </div>

    <div class="section">
      <h3>🔧 Project Details</h3>
      <p><strong>Services Needed:</strong> ${services}</p>
      ${formData.otherService ? `<p><strong>Other Service:</strong> ${formData.otherService}</p>` : ''}
      <p><strong>Project Description:</strong></p>
      <p style="background: white; padding: 10px; border-radius: 3px;">${formData.projectDescription}</p>
      <p><strong>Budget Range:</strong> ${formData.budgetRange || 'Not specified'}</p>
      <p><strong>Expected Start Date:</strong> ${formData.startDate || 'Not specified'}</p>
      <p><strong>Timeframe:</strong> ${formData.timeframe || 'Not specified'}</p>
    </div>

    ${files && files.length > 0 ? `
    <div class="section">
      <h3>📎 Attached Files</h3>
      <div class="files">
        ${files.map((file, index) => `
          <p>📄 ${file.originalname} (${(file.size / 1024 / 1024).toFixed(2)} MB)</p>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <div class="section">
      <h3>📅 Submission Details</h3>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Source:</strong> Exelus InfoTech Website</p>
    </div>
  </div>

  <div class="footer">
    <p>This quote request was submitted through your website contact form.</p>
    <p>Please respond within 24 hours for the best client experience.</p>
  </div>
</body>
</html>
  `;
};

// Format auto-reply email
const formatAutoReplyEmail = (formData) => {
  const services = Array.isArray(formData.serviceType)
    ? formData.serviceType.join(', ')
    : formData.serviceType;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #3282B8; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .highlight { background: #e8f4f8; padding: 15px; border-radius: 5px; margin: 15px 0; }
    .footer { background: #f0f0f0; padding: 15px; text-align: center; }
    .contact-info { background: #3282B8; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>✅ Quote Request Received - Exelus InfoTech</h1>
  </div>
  
  <div class="content">
    <p>Dear <strong>${formData.fullName}</strong>,</p>
    
    <p>Thank you for your interest in Exelus InfoTech! We have successfully received your quote request for <strong>${services}</strong>.</p>
    
    <div class="highlight">
      <h3>📋 Your Request Summary:</h3>
      <p><strong>Services:</strong> ${services}</p>
      <p><strong>Budget Range:</strong> ${formData.budgetRange || 'To be discussed'}</p>
      <p><strong>Expected Start:</strong> ${formData.startDate || 'To be discussed'}</p>
      <p><strong>Company:</strong> ${formData.companyName || 'Individual'}</p>
    </div>

    <p><strong>What happens next?</strong></p>
    <ul>
      <li>✅ Our team will review your requirements within 24 hours</li>
      <li>📞 We'll contact you to discuss your project in detail</li>
      <li>📄 You'll receive a customized proposal with timeline and pricing</li>
      <li>🚀 Once approved, we'll begin your project immediately</li>
    </ul>

    <div class="contact-info">
      <h3>📞 Need to reach us urgently?</h3>
      <p><strong>Email:</strong> info@exelusinfotech.com</p>
      <p><strong>Phone:</strong> +91 70130 92021</p>
      <p><strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM IST</p>
    </div>

    <p>We're excited to work with you and help bring your vision to life!</p>
    
    <p>Best regards,<br>
    <strong>The Exelus InfoTech Team</strong><br>
    <em>Transforming Ideas Into Digital Solutions</em></p>
  </div>

  <div class="footer">
    <p>This is an automated confirmation email. Please do not reply to this email.</p>
    <p>© ${new Date().getFullYear()} Exelus InfoTech. All rights reserved.</p>
  </div>
</body>
</html>
  `;
};

// Quote submission endpoint
app.post('/api/submit-quote', upload.array('files', 10), async (req, res) => {
  try {
    console.log('Received quote request:', req.body);
    console.log('Files:', req.files);

    const formData = req.body;
    const files = req.files || [];

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: fullName, email, or projectDescription'
      });
    }

    // Parse serviceType if it's a string
    if (typeof formData.serviceType === 'string') {
      try {
        formData.serviceType = JSON.parse(formData.serviceType);
      } catch (e) {
        formData.serviceType = [formData.serviceType];
      }
    }

    const transporter = createTransporter();

    // Prepare attachments
    const attachments = files.map(file => ({
      filename: file.originalname,
      path: file.path
    }));

    // Email to business
    const businessEmailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
      subject: `🎯 New Quote Request from ${formData.fullName} - ${formData.companyName || 'Individual'}`,
      html: formatQuoteEmail(formData, files),
      attachments: attachments
    };

    // Email to client (auto-reply)
    const clientEmailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: '✅ Quote Request Received - Exelus InfoTech',
      html: formatAutoReplyEmail(formData)
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessEmailOptions),
      transporter.sendMail(clientEmailOptions)
    ]);

    // Clean up uploaded files after sending emails
    setTimeout(() => {
      files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }, 5000); // Delete files after 5 seconds

    res.json({
      success: true,
      message: 'Quote request submitted successfully! We\'ll get back to you within 24 hours.',
      data: {
        submissionId: Date.now(),
        filesUploaded: files.length,
        clientEmail: formData.email
      }
    });

  } catch (error) {
    console.error('Error processing quote request:', error);

    // Clean up files if there was an error
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Exelus InfoTech Quote API'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Quote API server running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.EMAIL_USER}`);
  console.log(`📁 File uploads directory: ${uploadsDir}`);
});

module.exports = app;