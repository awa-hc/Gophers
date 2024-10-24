"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { form } from "framer-motion/client";
import { useEffect, useState } from "react";

interface PredictionResponse {
  predicted_class: string;
  second_class: string;
  third_class: string;
}

export default function PymHungry() {
  const apiURl = process.env.NEXT_PUBLIC_PY_API_URL;
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<PredictionResponse | null>(null);

  const uploadFile = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file... with APIURL", apiURl);
    try {
      const res = await fetch(`${apiURl}/predict/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload = (files: File[]) => {
    switch (files[0].type) {
      case "image/jpeg":
        setFile(files[0]);
        break;
      case "image/jpg":
        setFile(files[0]);
        break;
      case "image/png":
        setFile(files[0]);
        break;
      default:
        alert("Please select a valid image file");
        break;
    }
  };

  return (
    <div className="grid place-items-center p-5">
      <h1 className="text-4xl text-flower">PymHungry</h1>
      <p className="w-2/3 p-2 text-center">
        in this page you can upload a fruit image and get a prediction of what
        fruit it is in next feature we will add more fruits to predict, and also
        we will add a feature to predict the fruit from the camera and make a
        receipt with fruit, so stay tuned
      </p>
      <p className="py-4 text-flower text-sm text-center">
        techs used in this project: Python, FastAPI, TensorFlow
      </p>
      <form
        onSubmit={uploadFile}
        className="w-2/3 flex flex-col items-center justify-center"
      >
        <FileUpload
          fileType={["image/jpeg", "image/jpg", "image/png"]}
          identifier="image-upload"
          onChange={handleFileUpload}
        />
        <button type="submit" className="px-4 py-2 rounded-xl bg-blue-500 mb-4">Upload</button>
      </form>
      {response && (
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2>Results</h2>
          <p> the most probably is: {response.predicted_class}</p>
          <p> the second most probably is: {response.second_class}</p>
          <p> the third most probably is: {response.third_class}</p>
        </div>
      )}
    </div>
  );
}
