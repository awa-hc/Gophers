"use client";
import { LinkPreview } from "@/components/ui/link-preview";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

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
        <p className="text-2xl bold pb-2 border-b border-white xl:text-5xl">
          A page that uploads your HTML, CSS, and JS files to AWS S3 Bucket.
          <span className="block text-sm mt-2">
            The files you upload will appear on the AWS page and This Page.
            Please note that these files will be publicly accessible.
          </span>
        </p>
      </div>

      {showForm && <UploadForm />}

      <div className="flex flex-col lg:flex-row mt-6 items-start justify-between lg:justify-evenly">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            document.location.href =
              "/projects/herogo/project/" +
              (document.getElementById("project_id") as HTMLInputElement).value;
          }}
          className="flex flex-col sm:flex-row gap-2 items-center mb-4 lg:mb-0"
        >
          <p className="text-center sm:text-left">
            Do you have a project id? Search now.
          </p>
          <div className="w-full flex  gap-4">
            <input
              type="text"
              placeholder="1"
              id="project_id"
              className="bg-gray-600 w-full sm:w-auto rounded-lg px-4 py-2 text-white"
            />
            <button
              type="submit"
              className="transition-colors duration-150 ease-linear bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex  items-center justify-evenly"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 mr-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </button>
          </div>
        </form>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-150 ease-linear"
        >
          {showForm ? "Hide Form" : "Create Project"}
        </button>
      </div>

      <div className="flex flex-wrap justify-evenly">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col lg:flex-row items-center justify-between w-full bg-gray-600 rounded-xl text-center border p-4 m-4"
          >
            <LinkPreview
              url={project.view_url}
              className="font-bold text-white text-flower hover:bg-gray-800 transition-colors duration-150 ease-linear px-4 py-2 rounded-lg mb-4 lg:mb-0"
            >
              <h2>{project.name}</h2>
              <p className="text-sm">{project.html_url}</p>
            </LinkPreview>

            <div className="flex flex-col sm:flex-row items-center justify-center">
              <Link
                href={"/projects/herogo/project/" + project.id}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-4"
              >
                Edit Project
              </Link>

              <button
                onClick={() => deleteProject(project.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
  const [projectname, setProjectname] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Framer Motion hooks
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        scope.current,
        { opacity: 1, y: 0 },
        { duration: 0.5, delay: stagger(0.1) }
      );
    }
  }, [isInView, animate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = new URLSearchParams({
      name: projectname,
      user_id: "1",
    });

    try {
      const response = await fetch(`${apiUrl}/api/projects/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      document.location.href = `/projects/herogo/project/${data.id}`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0, y: 50 }} // Animación inicial
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animación cuando entra en la vista
      className="p-4 mt-4 bg-gray-700  rounded"
    >
      <h2 className="text-xl mb-4">Select your project name</h2>
      <input
        type="text"
        className="w-full p-2 mb-4 text-black rounded-xl focus:bg-gray-700 focus:text-white ease-in-out transition-colors duration-500"
        placeholder="Project Name"
        onChange={(e) => setProjectname(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white font-bold rounded"
      >
        Create Project
      </button>
    </motion.div>
  );
}
