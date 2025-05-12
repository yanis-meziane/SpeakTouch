import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Baby,
  Clock,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import * as bcrypt from "bcryptjs";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    accountType: "0", // Default to child
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateFirstStep = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0) {
      newErrors.age = "Please enter a valid age";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecondStep = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateFirstStep()) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateSecondStep()) {
      try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formData.password, salt);

        // Prepare the final submission data
        const submissionData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: parseInt(formData.age),
          accountType: formData.accountType,
          email: formData.email,
          hashedPassword: hashedPassword,
        };

        // REQUEST TO BACKEND FOR SIGNUP
        console.log("Submission Data:", submissionData);
      } catch (error) {
        console.error("Signup error:", error);
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your <span className="text-indigo-600">SpeakTouch</span>{" "}
            Account
          </h2>
          <p className="text-gray-600">
            {step === 1
              ? "Tell us a bit about yourself"
              : "Secure your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-indigo-600" />
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.firstName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-2 text-indigo-600" />
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.lastName
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Age and Account Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-indigo-600" />
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.age
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="Age"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 flex items-center">
                    <Baby className="h-4 w-4 mr-2 text-indigo-600" />
                    Account Type
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="0">Child</option>
                    <option value="1">Adult</option>
                  </select>
                </div>
              </div>

              {/* Next Step Button */}
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-full transition flex items-center justify-center"
              >
                Next Step
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-indigo-600" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-indigo-200"
                  }`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-indigo-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={formData.showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.password
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        showPassword: !prev.showPassword,
                      }))
                    }
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {formData.showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-indigo-600" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={formData.showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-indigo-200"
                    }`}
                    placeholder="********"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        showConfirmPassword: !prev.showConfirmPassword,
                      }))
                    }
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {formData.showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Button Group */}
              <div className="grid grid-cols-2 gap-4">
                {/* Previous Step Button */}
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-full transition flex items-center justify-center"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-full transition flex items-center justify-center"
                >
                  Create Account
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
