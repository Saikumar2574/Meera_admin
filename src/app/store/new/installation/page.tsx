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
  getOrganisationPlugin,
  updateOrganisationPlugin,
} from "@/services/service";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [platform, setPlatform] = useState("");
  const fetchPlugin = async () => {
    await getOrganisationPlugin().then((res) => {
      setPlatform(res.organization.platform);
      if (res.organization?.next)
        sessionStorage.setItem("current_step", res.organization?.next);
    });
  };
  useEffect(() => {
    fetchPlugin();
  }, []);

  const handleNext = async () => {
    // await updateOrganisationPlugin(platform).then((res) => {
    //   console.log(res);
    router.push("/store/new/payment");
    // });
  };

  return (
    <div className="p-6">
      
      <div className="mt-4">
        <h6 className="font-bold text-2xl mb-4">Install & Activate Plugin</h6>
        <ul className="list-disc ml-5 mb-6 space-y-2 text-gray-700 dark:text-gray-400">
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
        onClick={() => handleNext()}
        className="ml-auto flex px-6 py-3 gap-4 text-lg"
      >
        Next <MoveRight />
      </Button>
    </div>
  );
}

export default Page;
