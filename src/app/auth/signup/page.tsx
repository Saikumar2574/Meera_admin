"use client"
import { signUp } from "@/services/service";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    storeName: "",
    domainName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form inputs
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the API with form data
      const response = await signUp(formData);
      setSuccess(true);
      console.log("Sign up successful:", response);
      router.push("/auth/signin")
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-[34rem] mx-auto">
          <div className="text-center">
            <img
              className="w-auto h-12 mx-auto"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
              alt=""
            />
            <h1 className="mt-12 text-3xl font-bold text-gray-900">
              Create free account
            </h1>
            <p className="mt-4 text-sm font-medium text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis morbi pulvinar venenatis non.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-sm font-bold text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="firstName" className="text-sm font-bold text-gray-900">
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="text-sm font-bold text-gray-900">
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="storeName" className="text-sm font-bold text-gray-900">
                  Store Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="Store Name"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="domainName" className="text-sm font-bold text-gray-900">
                  Domain Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="domainName"
                    value={formData.domainName}
                    onChange={handleChange}
                    placeholder="Domain Name"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="text-sm font-bold text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-bold text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password (min. 8 characters)"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
                    required
                  />
                </div>
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                >
                  Create account
                </button>
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {success && (
              <p className="mt-4 text-sm text-green-500">
                Account created successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Page;
