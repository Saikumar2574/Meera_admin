"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getOrganisationConfig,
  updateOrganisationConfig,
} from "@/services/service";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    platform: "woocommerce",
    platformUrl: "",
    consumerKey: "",
    consumerSecret: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const fetchConfig = async () => {
    await getOrganisationConfig().then((res) => {
      if (res?.organization?.platform)
        setFormData({
          platform: res.organization.platform || "woocommerce",
          platformUrl: res.organization.platform_url || "",
          consumerKey: res.organization.consumer_key || "",
          consumerSecret: res.organization.consumer_secret || "",
        });
      if (res.organization?.next)
        sessionStorage.setItem("current_step", res.organization?.next);
    });
  };

  // Update form data as user inputs
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form validation and submission
  const handleSubmit = async () => {
    if (
      formData.platform === "woocommerce" &&
      (!formData.consumerKey || !formData.consumerSecret)
    ) {
      alert("Please fill out both Consumer Key and Consumer Secret.");
      return;
    }

    // Proceed with API call to validate or submit the form
    const payload = {
      platformUrl: formData.platformUrl,
      platform: formData.platform,
      consumerKey:
        formData.platform === "woocommerce" ? formData.consumerKey : null,
      consumerSecret:
        formData.platform === "woocommerce" ? formData.consumerSecret : null,
    };

    // try {
    //   const response = await updateOrganisationConfig(payload);
    //   console.log("Response:", response);

    //   if (response) {
    router.push("/store/new/payment");
    //   }
    // } catch (error) {
    //   console.error("Error during form submission:", error);
    //   alert("Something went wrong. Please try again.");
    // }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <h6 className="font-bold text-2xl mb-4">Store Configuration</h6>
        <div className="flex flex-wrap gap-4">
          {/* Store Type Field */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="store-type">Platform</Label>
            <Select
              name="platform"
              onValueChange={(value) =>
                setFormData({ ...formData, platform: value })
              }
              value={formData.platform}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="woocommerce">
                  <span className="font-medium">Wo-Commerce</span>
                </SelectItem>
                <SelectItem value="shopify">
                  <span className="font-medium">Shopify</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Platform URL Field */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="platform-url">Platform URL</Label>
            <Input
              type="search"
              name="platformUrl"
              value={formData.platformUrl}
              onChange={handleInputChange}
              placeholder="Url"
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>

        {formData.platform === "woocommerce" && (
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2 flex-1 min-w-[200px]">
              <Label htmlFor="consumer-key">Consumer Key</Label>
              <Input
                type="text"
                name="consumerKey"
                value={formData.consumerKey}
                onChange={handleInputChange}
                placeholder="Key"
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>

            <div className="space-y-2 flex-1 min-w-[200px]">
              <Label htmlFor="consumer-secret">Consumer Secret</Label>
              <Input
                type="text"
                name="consumerSecret"
                value={formData.consumerSecret}
                onChange={handleInputChange}
                placeholder="Secret"
                className="w-full rounded-lg bg-background pl-8"
              />
            </div>
          </div>
        )}
      </div>
      {!isVerified ? (
        <>
          <Button
            type="button"
            onClick={() => setIsVerified(true)}
            className="flex px-6 py-3 gap-4 text-lg mt-4"
          >
            Verify
          </Button>
        </>
      ) : (
        <>
          <div className="mt-16">
            <h6 className="font-bold text-2xl mb-4">
              Install & Activate Plugin
            </h6>
            <ul className="list-disc ml-5 mb-6 space-y-2 text-gray-700">
              <li>Download the plugin from the provided link.</li>
              <li>Navigate to your WordPress dashboard.</li>
              <li>Go to the "Plugins" section and click "Add New".</li>
              <li>Upload the downloaded plugin file and click "Install".</li>
              <li>Once installed, click "Activate" to enable the plugin.</li>
            </ul>
            {/* Plugin Link */}
            <Button>Download Plugin</Button>
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="ml-auto flex px-6 py-3 gap-4 text-lg"
          >
            Next <MoveRight />
          </Button>
        </>
      )}
    </>
  );
}

export default Page;
