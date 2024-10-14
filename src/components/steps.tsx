"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Steps() {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  // Load current_step from sessionStorage
  useEffect(() => {
    const storedStep = sessionStorage.getItem("current_step");
    setCurrentStep(storedStep);
  }, [pathname]);

  const steps = [
    { label: "Setup", step: null, path: "/store/new/setup", stepNumber: 1 },
    { label: "Configuration", step: "/organization/config", path: "/store/new/configuration", stepNumber: 2 },
    { label: "Plugin Installation", step: "/organization/plugin", path: "/store/new/installation", stepNumber: 3 },
    { label: "Payment", step: "/organization/payment", path: "/store/new/payment", stepNumber: 4 },
    { label: "Review", step: "/organization/review", path: "/store/new/data-preparation", stepNumber: 5 },
  ];

  // Function to check if a step is active
  const isActiveStep = (stepPath: string) => pathname === stepPath;

  // Function to check if a step is enabled based on current_step
  const isStepEnabled = (stepPath: string) => {
    if (!currentStep) return false; // Disable all if no step in sessionStorage
    const currentIndex = steps.findIndex((step) => step.step === currentStep);
    const stepIndex = steps.findIndex((step) => step.path === stepPath);
    
    // Enable first step by default and any step before or equal to the current step
    return stepIndex === 0 || stepIndex <= currentIndex;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-5">
      <div className="py-5 px-7">
        <nav className="flex flex-wrap items-center gap-7">
          {steps.map((step, index) => (
            <React.Fragment key={step.stepNumber}>
              {isStepEnabled(step.path) ? (
                <Link
                  href={step.path}
                  passHref
                  className={`inline-flex items-center text-base font-medium ${
                    isActiveStep(step.path) ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold ${
                      isActiveStep(step.path)
                        ? "text-white bg-indigo-600 border-transparent"
                        : "text-gray-500 bg-white border-gray-200"
                    } rounded-full`}
                  >
                    {step.stepNumber}
                  </span>
                  {step.label}
                </Link>
              ) : (
                <span
                  className={`inline-flex items-center text-base font-medium text-gray-300 cursor-not-allowed`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold text-gray-300 bg-gray-100 border-gray-200 rounded-full`}
                  >
                    {step.stepNumber}
                  </span>
                  {step.label}
                </span>
              )}

              {index < steps.length - 1 && (
                <div className="hidden sm:block w-6 h-[1.5px] bg-gray-200"></div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Steps;
