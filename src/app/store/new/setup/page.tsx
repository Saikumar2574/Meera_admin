"use client";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  getOrganisationData,
  updateOrganisationSetup,
} from "@/services/service";

function Page() {
  const router = useRouter();
  const [details, setDetails] = useState({
    storeName: "",
    phoneNumber: "",
    domainName: "",
    frontendStore: "",
    backendStore: "",
    subTitle: "",
    description: "",
    logo: null,
  });

  const fetchDetails = async () => {
    try {
      const res = await getOrganisationData();
      const org = res?.organization;
      if (org) {
        setDetails({
          ...details,
          storeName: org.storeName,
          phoneNumber: org.phoneNumber,
          domainName: org.domainName,
          frontendStore: org.frontendStore,
          backendStore: org.backendStore,
          subTitle: org?.subTitle || "",
          description: org?.description || "",
        });
        sessionStorage.setItem("current_step", org?.next);
      }
    } catch (error) {
      console.error("Error fetching organization data", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDetails((prevDetails: any) => ({
        ...prevDetails,
        logo: file, // Store the file in the state
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      storeName: details.storeName,
      phoneNumber: details.phoneNumber,
      subTitle: details.subTitle,
      description: details.description,
    };
    await updateOrganisationSetup(payload).then((res) => {
      // if(res.organization?.status === "initialized"){
      router.push("/store/new/configuration");
      // }
    });
  };

  return (
    <form className="space-y-4 flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex flex-wrap gap-4">
        {/* Store Name Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="storeName">Store Name</Label>
          <Input
            name="storeName"
            type="text"
            value={details.storeName}
            onChange={handleInputChange}
            placeholder="Store Name"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="storeName">Phone Number</Label>
          <Input
            name="phoneNumber"
            type="number"
            value={details.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Domain Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="domainName">Domain</Label>
          <Input
            name="domainName"
            type="text"
            disabled
            value={details.domainName}
            onChange={handleInputChange}
            placeholder="Domain"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
        {/* Store Frontend Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="frontendStore">Store Frontend</Label>
          <Input
            name="frontendStore"
            type="text"
            disabled
            value={details.frontendStore}
            onChange={handleInputChange}
            placeholder="Store Frontend"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Store Backend Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="backendStore">Store Backend</Label>
          <Input
            name="backendStore"
            type="text"
            disabled
            value={details.backendStore}
            onChange={handleInputChange}
            placeholder="Store Backend"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
        {/* Title Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="title">Sub Title</Label>
          <Input
            name="subTitle"
            type="text"
            value={details.subTitle}
            onChange={handleInputChange}
            placeholder="Sub Title"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Description Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="description">Description</Label>
          <Input
            name="description"
            type="text"
            value={details.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
        {/* Logo Field */}
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label htmlFor="logo">Logo</Label>
          <Input
            name="logo"
            type="file"
            onChange={(e) => handleFileChange(e)}
            placeholder="Logo"
            className="w-full rounded-lg bg-background pl-8"
          />
        </div>
      </div>

      <Button type="submit" className="ml-auto">
        Next
      </Button>
    </form>
  );
}

export default Page;
