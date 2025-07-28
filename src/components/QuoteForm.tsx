import { useState } from 'react';
import { X, Upload, Send } from 'lucide-react';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceType: string[];
  otherService: string;
  projectDescription: string;
  budgetRange: string;
  startDate: string;
  timeframe: string;
  files: File[];
}

const QuoteForm = ({ isOpen, onClose }: QuoteFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    serviceType: [],
    otherService: '',
    projectDescription: '',
    budgetRange: '',
    startDate: '',
    timeframe: '',
    files: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const serviceOptions = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Software Development',
    'IT Consulting',
    'Cloud Solutions',
    'Digital Marketing',
    'Other'
  ];

  const budgetOptions = [
    '<$1,000',
    '$1,000 – $5,000',
    '$5,000 – $10,000',
    '$10,000+'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceTypeChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType.includes(service)
        ? prev.serviceType.filter(s => s !== service)
        : [...prev.serviceType, service]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Full name is required';
    if (!formData.email.trim()) return 'Email address is required';
    if (!formData.email.includes('@')) return 'Please enter a valid email address';
    if (formData.serviceType.length === 0) return 'Please select at least one service type';
    if (!formData.projectDescription.trim()) return 'Project description is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      
      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'files') {
          formData.files.forEach(file => {
            submitData.append('files', file);
          });
        } else if (key === 'serviceType') {
          submitData.append(key, JSON.stringify(value));
        } else {
          submitData.append(key, value as string);
        }
      });

      // Send email using a service like EmailJS or your backend
      // For now, we'll simulate the email sending
      await sendQuoteEmail(formData);
      
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (error) {
      console.error('Error sending quote request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendQuoteEmail = async (data: FormData) => {
    // This is a placeholder for email sending functionality
    // You would integrate with EmailJS, your backend API, or another email service
    
    const emailContent = `
      New Quote Request from ${data.fullName}
      
      Client Information:
      - Full Name: ${data.fullName}
      - Company: ${data.companyName || 'Not provided'}
      - Email: ${data.email}
      - Phone: ${data.phone || 'Not provided'}
      
      Project Details:
      - Services: ${data.serviceType.join(', ')}
      ${data.otherService ? `- Other Service: ${data.otherService}` : ''}
      - Description: ${data.projectDescription}
      - Budget Range: ${data.budgetRange || 'Not specified'}
      - Start Date: ${data.startDate || 'Not specified'}
      - Timeframe: ${data.timeframe || 'Not specified'}
      - Files: ${data.files.length} file(s) attached
    `;

    console.log('Email content:', emailContent);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      serviceType: [],
      otherService: '',
      projectDescription: '',
      budgetRange: '',
      startDate: '',
      timeframe: '',
      files: []
    });
    setSubmitStatus('idle');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#BBE1FA]">Get Your Quote</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Information */}
          <div>
            <h3 className="text-lg font-semibold text-[#3282B8] mb-4">Client Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter company name (optional)"
                />
              </div>

              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Enter phone number (recommended)"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-lg font-semibold text-[#3282B8] mb-4">🔹 Project Details 🔹</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Type of Service Needed <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.serviceType.includes(service)}
                        onChange={() => handleServiceTypeChange(service)}
                        className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-[#BBE1FAB2] text-sm">{service}</span>
                    </label>
                  ))}
                </div>
                
                {formData.serviceType.includes('Other') && (
                  <input
                    type="text"
                    name="otherService"
                    value={formData.otherService}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    placeholder="Please specify other service"
                  />
                )}
              </div>

              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Project Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Briefly describe what you need..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                    Budget Range
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select budget range</option>
                    {budgetOptions.map((budget) => (
                      <option key={budget} value={budget}>{budget}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                    Expected Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Timeframe for Completion
                </label>
                <input
                  type="text"
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., 1 month, 3 months, flexible"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                  Upload Documents or Briefs
                </label>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.zip,.txt,.jpg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-[#BBE1FAB2] text-sm">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      PDF, DOCX, ZIP, TXT, JPG, PNG (Max 10MB each)
                    </p>
                  </label>
                </div>

                {formData.files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded">
                        <span className="text-[#BBE1FAB2] text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#3282B8] text-white rounded-lg hover:bg-gradient-to-r hover:from-[#3282B8] hover:to-[#BBE1FA] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Quote Request</span>
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-600 text-white p-3 rounded-lg text-center">
              Quote request sent successfully! We'll get back to you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="bg-red-600 text-white p-3 rounded-lg text-center">
              Failed to send quote request. Please try again or contact us directly.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;