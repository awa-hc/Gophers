"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  html_url: string;
  css_url: string;
  js_url: string;
  view_url: string;
}

export default function HeroGO() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      getProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const getProjects = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/projects/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto px-8">
      <div className="flex justify-between items-center">
        <p className="text-2xl bold pb-2 border-b border-white">
          A page that uploads your HTML, CSS, and JS files to AWS.
          <span className="block text-sm mt-2">
            The uploaded files will be shown in the AWS page. please be aware
            that the files will be public.
          </span>
        </p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showForm ? "Hide Form" : "Upload Project"}
        </button>
      </div>

      {showForm && <UploadForm />}

      <div className="flex flex-wrap justify-evenly">
        {projects.map((project) => (
          <div key={project.id} className="w-full text-center border p-4 m-4">
            <a
              href={project.view_url}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <h2 className="text-lg font-bold">{project.name}</h2>
            </a>
            <div className="mt-2">
              <Link
                href={"/projects/herogo/project/" + project.id}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Project
              </Link>
              <button
                onClick={() => deleteProject(project.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              >
                Delete Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadForm() {
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [cssFile, setCssFile] = useState<File | null>(null);
  const [jsFile, setJsFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (htmlFile) formData.append("html", htmlFile);
    if (cssFile) formData.append("css", cssFile);
    if (jsFile) formData.append("js", jsFile);

    try {
      const response = await fetch("http://localhost:8080/api/projects/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-4 mt-4 bg-gray-100 border rounded">
      <h2 className="text-xl mb-4">Upload HTML, CSS, and JS Files</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-bold">HTML File</label>
          <input
            type="file"
            accept=".html"
            onChange={(e) => setHtmlFile(e.target.files?.[0] || null)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">CSS File</label>
          <input
            type="file"
            accept=".css"
            onChange={(e) => setCssFile(e.target.files?.[0] || null)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">JS File</label>
          <input
            type="file"
            accept=".js"
            onChange={(e) => setJsFile(e.target.files?.[0] || null)}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white font-bold rounded"
        >
          Upload Files
        </button>
      </form>
    </div>
  );
}
