import { useState } from "react";
import { X, Upload, Send } from "lucide-react";

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
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    serviceType: [],
    otherService: "",
    projectDescription: "",
    budgetRange: "",
    startDate: "",
    timeframe: "",
    files: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const serviceOptions = [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "Software Development",
    "IT Consulting",
    "Cloud Solutions",
    "Digital Marketing",
    "Other",
  ];

  const budgetOptions = [
    "<$1,000",
    "$1,000 – $5,000",
    "$5,000 – $10,000",
    "$10,000+",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceTypeChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: prev.serviceType.includes(service)
        ? prev.serviceType.filter((s) => s !== service)
        : [...prev.serviceType, service],
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validFiles = files.filter((file) => file.size <= maxSize);

    if (validFiles.length !== files.length) {
      alert("Some files were too large (max 10MB each) and were not added.");
    }

    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...validFiles],
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email address is required";
    if (!formData.email.includes("@") || !formData.email.includes("."))
      return "Please enter a valid email address";
    if (formData.serviceType.length === 0)
      return "Please select at least one service type";
    if (!formData.projectDescription.trim())
      return "Project description is required";
    if (
      formData.serviceType.includes("Other") &&
      !formData.otherService.trim()
    ) {
      return "Please specify the other service type";
    }
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
    setSubmitStatus("idle");

    try {
      // Create FormData for file upload
      const submitFormData = new FormData();

      // Add form fields
      submitFormData.append("fullName", formData.fullName);
      submitFormData.append("companyName", formData.companyName);
      submitFormData.append("email", formData.email);
      submitFormData.append("phone", formData.phone);
      submitFormData.append(
        "serviceType",
        JSON.stringify(formData.serviceType)
      );
      submitFormData.append("otherService", formData.otherService);
      submitFormData.append("projectDescription", formData.projectDescription);
      submitFormData.append("budgetRange", formData.budgetRange);
      submitFormData.append("startDate", formData.startDate);
      submitFormData.append("timeframe", formData.timeframe);

      // Add files
      formData.files.forEach((file) => {
        submitFormData.append("files", file);
      });

      // Submit to server
      const response = await fetch(
        "https://exelusinfotech.onrender.com/api/submit-quote",
        {
          method: "POST",
          body: submitFormData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Close form after 3 seconds
        setTimeout(() => {
          onClose();
          resetForm();
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to submit quote request");
      }
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setSubmitStatus("error");

      // Fallback: try to open email client
      const subject = encodeURIComponent(
        "Quote Request from " + formData.fullName
      );
      const services = formData.serviceType.includes("Other")
        ? [
            ...formData.serviceType.filter((s) => s !== "Other"),
            formData.otherService,
          ].join(", ")
        : formData.serviceType.join(", ");

      const body = encodeURIComponent(`
NEW QUOTE REQUEST

Client Information:
- Name: ${formData.fullName}
- Company: ${formData.companyName || "Not provided"}
- Email: ${formData.email}
- Phone: ${formData.phone || "Not provided"}

Project Details:
- Services: ${services}
- Description: ${formData.projectDescription}
- Budget: ${formData.budgetRange || "Not specified"}
- Start Date: ${formData.startDate || "Not specified"}
- Timeframe: ${formData.timeframe || "Not specified"}
- Files: ${formData.files.length} file(s) attached

Submitted: ${new Date().toLocaleString()}
      `);

      const mailtoLink = `mailto:info@exelusinfotech.com?subject=${subject}&body=${body}`;

      if (
        confirm(
          "Server is temporarily unavailable. Would you like to open your email client instead?"
        )
      ) {
        window.open(mailtoLink);
        onClose();
        resetForm();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      serviceType: [],
      otherService: "",
      projectDescription: "",
      budgetRange: "",
      startDate: "",
      timeframe: "",
      files: [],
    });
    setSubmitStatus("idle");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full my-8 relative max-h-[90vh] flex flex-col">
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-center justify-between rounded-t-lg z-10">
          <h2 className="text-2xl font-bold text-[#BBE1FA]">Get Your Quote</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="text-lg font-semibold text-[#3282B8] mb-4">
                Client Information
              </h3>

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
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
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
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
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
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                    Phone Number{" "}
                    <span className="text-gray-400 text-xs">(Recommended)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-lg font-semibold text-[#3282B8] mb-4 flex items-center">
                <span className="mr-2">🔹</span>
                Project Details
                <span className="ml-2">🔹</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                    Type of Service Needed{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-700 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.serviceType.includes(service)}
                          onChange={() => handleServiceTypeChange(service)}
                          className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-[#BBE1FAB2] text-sm">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>

                  {formData.serviceType.includes("Other") && (
                    <input
                      type="text"
                      name="otherService"
                      value={formData.otherService}
                      onChange={handleInputChange}
                      className="mt-2 w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Please specify other service"
                      required
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
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Briefly describe what you need, your goals, and any specific requirements..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                      Budget Range{" "}
                      <span className="text-gray-400 text-xs">
                        (Optional but helpful)
                      </span>
                    </label>
                    <select
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option value="">Select budget range</option>
                      {budgetOptions.map((budget) => (
                        <option key={budget} value={budget}>
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                      Expected Start Date{" "}
                      <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                    Timeframe for Completion{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="e.g., 1 month, 3 months, flexible"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-[#BBE1FA] text-sm font-medium mb-2">
                    Upload Documents or Briefs{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-slate-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.zip,.txt,.jpg,.jpeg,.png"
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
                        <div
                          key={index}
                          className="flex items-center justify-between bg-slate-700 px-3 py-2 rounded"
                        >
                          <span className="text-[#BBE1FAB2] text-sm truncate mr-2">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                            MB)
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300 flex-shrink-0"
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

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                <div className="font-semibold mb-1">
                  Quote request sent successfully! ✅
                </div>
                <div className="text-sm">
                  We'll get back to you within 24 hours. Check your email for
                  confirmation.
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-600 text-white p-4 rounded-lg text-center">
                <div className="font-semibold mb-1">
                  Failed to send quote request ❌
                </div>
                <div className="text-sm">
                  Please try again or contact us directly at
                  info@exelusinfotech.com
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer - Sticky */}
        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6 flex justify-end space-x-4 rounded-b-lg">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#3282B8] text-white rounded-lg hover:bg-gradient-to-r hover:from-[#3282B8] hover:to-[#BBE1FA] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 min-w-[140px] justify-center"
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
      </div>
    </div>
  );
};

export default QuoteForm;
