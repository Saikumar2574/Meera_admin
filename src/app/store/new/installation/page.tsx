"use client";
import { Button } from "@/components/ui/button";
import {
  getOrganisationPlugin,
  updateOrganisationPlugin,
} from "@/services/service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [platform, setPlatform] = useState("");
  const fetchPlugin = async () => {
    await getOrganisationPlugin().then((res) => {
      setPlatform(res.organization.platform);
      if(res.organization?.next)
      sessionStorage.setItem("current_step", res.organization?.next);
    });
  };
  useEffect(() => {
    fetchPlugin();
  }, []);

  const handleNext = async () => {
    await updateOrganisationPlugin(platform).then((res) => {
      console.log(res);
      router.push("/store/new/payment");
    });
  };

  return (
    <div className="p-6">
      {/* Title */}
      <h6 className="font-bold text-2xl mb-4">Install & Activate Plugin</h6>

      {/* Dummy Points */}
      <ul className="list-disc ml-5 mb-6 space-y-2 text-gray-700">
        <li>Download the plugin from the provided link.</li>
        <li>Navigate to your WordPress dashboard.</li>
        <li>Go to the "Plugins" section and click "Add New".</li>
        <li>Upload the downloaded plugin file and click "Install".</li>
        <li>Once installed, click "Activate" to enable the plugin.</li>
      </ul>
      {/* Plugin Link */}
      <div className="my-4">
        <p className="text-sm text-gray-500">
          Plugin Link:{" "}
          <a
            href="https://example.com/plugin-download"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            https://example.com/plugin-download
          </a>
        </p>
      </div>
      {/* {!isValid ? (
        <Button type="button" onClick={() => setIsValid(true)}>
          Validate
        </Button>
      ) : ( */}
      <Button onClick={() => handleNext()}>Next</Button>
      {/* )} */}
    </div>
  );
}

export default Page;
