"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import {
  getOrganisationData,
  updateOrganisationSetup,
} from "@/services/service";
import { useDropzone } from "react-dropzone";
import { ImageUp, MoveRight } from "lucide-react";
function Page() {
  const router = useRouter();
  const [details, setDetails] = useState({
    storeName: "",
    phoneNumber: "",
    email: "",
    domainName: "",
    frontendStore: "",
    backendStore: "",
    subTitle: "",
    description: "",
    logo: null,
    darkLogo: null,
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for file input
  const darkFileInputRef = useRef<HTMLInputElement | null>(null);
  const fetchDetails = async () => {
    try {
      const res = await getOrganisationData();
      const org = res?.organization;
      if (org) {
        setDetails({
          ...details,
          storeName: org.storeName,
          phoneNumber: org.phoneNumber,
          email:org.email,
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
  const handleFileChange = (file: File, type: string) => {
    setDetails((prevDetails: any) => ({
      ...prevDetails,
      [type]: URL.createObjectURL(file), // Store the image preview URL
    }));
  };

  const handleDeleteImage = (type: string) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [type]: null, // Remove the image
    }));
  };

  const handleBoxClick = (type: string) => {
    if (type === "logo" && fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input for light logo
    } else if (type === "darkLogo" && darkFileInputRef.current) {
      darkFileInputRef.current.click(); // Trigger file input for dark logo
    }
  };
  // Using react-dropzone for drag-and-drop
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0], "logo"); // Handle light logo drop
      }
    },
  });

  const {
    getRootProps: getDarkLogoRootProps,
    getInputProps: getDarkLogoInputProps,
    isDragActive: isDarkLogoDragActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0], "darkLogo"); // Handle dark logo drop
      }
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      storeName: details.storeName,
      phoneNumber: details.phoneNumber,
      subTitle: details.subTitle,
      description: details.description,
    };
    // await updateOrganisationSetup(payload).then((res) => {
      // if(res.organization?.status === "initialized"){
      router.push("/store/new/configuration");
      // }
    // });
  };

  return (
    <form className="space-y-4 flex flex-col" onSubmit={(e) => handleSubmit(e)}>
      <div className="flex  gap-6">
        <div className="flex flex-col  gap-4">
          <div className="space-y-2 min-w-[200px]">
            <Label htmlFor="logo">Light Mode Logo</Label>
            <div
              {...getRootProps()}
              className={`w-48 h-48 border-2 border-dashed ${
                isDragActive ? "border-green-500" : "border-gray-300"
              } rounded-lg flex items-center justify-center relative cursor-pointer`}
            >
              <input {...getInputProps()} />
              {details.logo ? (
                <>
                  <img
                    src={details.logo}
                    alt="Light Logo Preview"
                    className="object-contain w-full h-full"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the file input
                      handleDeleteImage("logo");
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <ImageUp size={40} className="text-gray-400" />
              )}
            </div>
          </div>
          <div className="space-y-2 min-w-[200px]">
            <Label htmlFor="darkLogo">Dark Mode Logo</Label>
            <div
              {...getDarkLogoRootProps()}
              className={`w-48 h-48 border-2 border-dashed ${
                isDarkLogoDragActive ? "border-green-500" : "border-gray-300"
              } rounded-lg flex items-center justify-center relative cursor-pointer`}
            >
              <input {...getDarkLogoInputProps()} />
              {details.darkLogo ? (
                <>
                  <img
                    src={details.darkLogo}
                    alt="Dark Logo Preview"
                    className="object-contain w-full h-full"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the file input
                      handleDeleteImage("darkLogo");
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <ImageUp size={40} className="text-gray-400" />
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 ">
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
          {/* Phone Number Input with Verify Button */}
          <div className="space-y-2 flex-1 min-w-[200px] relative">
            <Label
              htmlFor="phoneNumber"
              className="flex justify-between items-center"
            >
              Phone Number <a className="font-semibold text-green-500">Verified</a>
            </Label>
            <Input
              name="phoneNumber"
              type="number"
              value={details.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>

          {/* Email Input with Verify Button */}
          <div className="space-y-2 flex-1 min-w-[200px] relative">
            <Label
              htmlFor="email"
              className="flex justify-between items-center"
            >
              Email
              <a className="font-semibold text-blue-600">Verify</a>
            </Label>
            <Input
              name="email"
              type="email"
              value={details.email} // Corrected value binding for email
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full rounded-lg bg-background pl-8"
            />
            {/* <Button
              type="button"
              // onClick={() => handleVerify("email")} // Function to handle email verification
              className="absolute right-1 top-[60%] translate-y-[-50%] text-sm px-3 py-1"
            >
              Verify
            </Button> */}
          </div>
         
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label htmlFor="domainName">Website Url</Label>
            <Input
              name="domainName"
              type="text"
              disabled
              value={details.domainName}
              onChange={handleInputChange}
              placeholder="http://www.yourwebsite.com"
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="ml-auto px-6 py-3 gap-4 text-lg">
        Next <MoveRight />
      </Button>
    </form>
  );
}

export default Page;
