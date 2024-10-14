"use client";
import { Button } from "@/components/ui/button";
import { getOrganisationPaymentPlan } from "@/services/service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const fetchPaymentPlans =async()=>{
    await getOrganisationPaymentPlan().then((res)=>{
      console.log(res);
      sessionStorage.setItem("current_step", res.organization?.next);
    })
  }
  useEffect(()=>{
    fetchPaymentPlans()
  },[])
  return (
    <div className="p-6">
      {/* Payment Plan Header */}
      <h2 className="font-bold text-2xl mb-4">Payment Plan</h2>

      {/* Payment Plan Description */}
      <div className=" mb-6">
        <h3 className="font-semibold text-lg mb-2">Basic Plan</h3>
        <p className="text-gray-700 mb-4">
          Enjoy all the essential features to get started. This plan includes:
        </p>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Access to basic tools and services</li>
          <li>Unlimited product listings</li>
          <li>Email support</li>
          <li>1 GB storage for files</li>
        </ul>
        <p className="text-lg font-bold mt-4">$19.99/month</p>
      </div>

      {/* Pay Now Button */}
      {!isSuccess ? (
        <Button onClick={() => setIsSuccess(true)}>Pay Now</Button>
      ) : (
        <Button onClick={() => router.push("/store/new/collections")}>
          Continue
        </Button>
      )}
    </div>
  );
}

export default Page;
