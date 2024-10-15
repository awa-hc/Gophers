"use client";

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

  return (
    <div>
      <h1>PymHungry</h1>
      <form onSubmit={uploadFile}>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button type="submit">Upload</button>
      </form>
      {response && (
        <div>
          <h2>Results</h2>
          <p>{response.predicted_class}</p>
          <p>{response.second_class}</p>
          <p>{response.third_class}</p>
          <p></p>
        </div>
      )}
    </div>
  );
}
