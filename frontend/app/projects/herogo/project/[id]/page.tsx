"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  html_url: string;
  css_url: string;
  js_url: string;
  view_url: string;
  created_at: string;
  updated_at: string;

  // Add other properties of the project as needed
}

export default function Page({ params }: { params: { id: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [project, setProject] = useState<Project | null>(null);
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [cssFile, setCssFile] = useState<File | null>(null);
  const [jsFile, setJsFile] = useState<File | null>(null);

  useEffect(() => {
    getProjectById(params.id);
    loadProjectFiles(params.id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (htmlFile) formData.append("html", htmlFile);
    if (cssFile) formData.append("css", cssFile);
    if (jsFile) formData.append("js", jsFile);

    try {
      const response = await fetch(
        `${apiUrl}/api/projects/${params.id}/files`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      document.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileUpload = (files: File[]) => {
    switch (files[0].type) {
      case "text/html":
        setHtmlFile(files[0]);
        break;
      case "text/css":
        setCssFile(files[0]);
        break;
      case "text/javascript":
        setJsFile(files[0]);
        break;
      default:
        break;
    }
  };

  const getProjectById = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/projects/${id}`, {
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
      setProject(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  const loadProjectFiles = async (id: string) => {
    try {
      const res = await fetch(apiUrl + "/api/projects/" + id + "/files", {
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
      console.log("fies", data);
      setCss(data.css);
      setJs(data.js);
      setHtml(data.html);
    } catch (error) {
      console.error("Error fetching project files:", error);
    }
  };

  const deleteProject = async (id: string) => {
    console.log("click");
    try {
      const res = await fetch(apiUrl + "/api/projects/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      document.location.href = "/projects/herogo";
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="p-10 flex items-center justify-center  flex-col">
      <section className="w-full  max-w-3xl xl:max-w-7xl mx-auto rounded-lg p-8">
        {project ? (
          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2  w-full g-red-500">
              <section className="bg-gray-700 rounded-lg p-5 mb-5 h-full lg:row-span-1 flex flex-col">
                <h1 className="text-flower text-4xl md:text-5xl mb-3">
                  {project.name}
                </h1>

                <span className="text-blue-400 italic">Details:</span>
                <h1>
                  Created at:{" "}
                  {new Date(project.created_at).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h1>
                <h1>
                  Last update at:{" "}
                  {new Date(project.updated_at).toLocaleString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h1>

                {project.view_url && (
                  <a
                    href={project.view_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-flower hover:underline"
                  >
                    Click here to open the project
                  </a>
                )}

                <button
                  onClick={() => deleteProject(project.id)} // Asegúrate de que esta función se llame correctamente
                  className="flex px-4 py-2 rounded-xl bg-red-500 mt-auto w-max"
                >
                  Delete Project
                </button>
              </section>

              {project.view_url ? (
                <div className="lg:col-span-2 lg:row-span-1 h-full clear-start flex flex-col">
                  <h1 className="text-lg font-bold text-flower italic bg-gray-700 py-2 px-4 rounded-lg w-max mb-2">
                    This is a preview of your page!
                  </h1>

                  <iframe
                    src={project.view_url}
                    className="w-full bg-white h-full rounded-lg"
                  ></iframe>
                </div>
              ) : (
                <p className="lg:col-span-2 text-red-400">
                  No HTML file available.
                </p>
              )}

              {project.html_url ? (
                <div className="p-2 border rounded-xl">
                  <h1 className="text-lg font-bold">HTML:</h1>
                  <div className="flex">
                    <pre className="bg-gray-800 border border-gray-600 rounded-md p-4 max-h-60 overflow-auto w-full">
                      <code className="font-mono whitespace-pre-wrap">
                        {html.split("\n").map((line, index) => (
                          <span key={index}>
                            <span className="text-gray-500 mr-2">
                              {index + 1}
                            </span>
                            {line}
                            <br />
                          </span>
                        ))}
                      </code>
                    </pre>
                  </div>
                  <FileUpload
                    identifier="html-upload"
                    onChange={handleFileUpload}
                    fileType={[".html"]}
                  />
                </div>
              ) : (
                <div>
                  <p className="text-red-400">No HTML file available.</p>
                  <FileUpload
                    identifier="html-upload"
                    onChange={handleFileUpload}
                    fileType={[".html"]}
                  />
                </div>
              )}

              {project.css_url ? (
                <div className="p-2 border rounded-xl">
                  <h1 className="text-lg font-bold">CSS:</h1>
                  <div className="flex">
                    <pre className="bg-gray-800 border border-gray-600 rounded-md p-4 max-h-60 overflow-auto w-full">
                      <code className="font-mono whitespace-pre-wrap">
                        {css.split("\n").map((line, index) => (
                          <span key={index}>
                            <span className="text-gray-500 mr-2">
                              {index + 1}
                            </span>
                            {line}
                            <br />
                          </span>
                        ))}
                      </code>
                    </pre>
                  </div>
                  <FileUpload
                    onChange={handleFileUpload}
                    fileType={[".css"]}
                    identifier="css-upload"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-red-400">No CSS file available.</p>
                  <FileUpload
                    onChange={handleFileUpload}
                    fileType={[".css"]}
                    identifier="css-upload"
                  />
                </div>
              )}

              {project.js_url ? (
                <div className="p-2 border rounded-xl">
                  <h1 className="text-lg font-bold">JavaScript:</h1>
                  <div className="text-red-600 bg-red-300 px-2 py-2 flex gap-5 rounded-lg items-center">
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
                      className="icon icon-tabler h-full w-20 icons-tabler-outline icon-tabler-exclamation-circle"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 9v4" />
                      <path d="M12 16v.01" />
                    </svg>
                    may in safari can not upload javascript file if fileType is
                    application/x-javascript{" "}
                  </div>

                  <div className="flex ">
                    <pre className="bg-gray-800 border border-gray-600 rounded-md p-4 max-h-60 overflow-auto w-full">
                      <code className="font-mono whitespace-pre-wrap">
                        {js.split("\n").map((line, index) => (
                          <span key={index}>
                            <span className="text-gray-500 mr-2">
                              {index + 1}
                            </span>
                            {line}
                            <br />
                          </span>
                        ))}
                      </code>
                    </pre>
                  </div>
                  <FileUpload
                    onChange={handleFileUpload}
                    fileType={[".js"]}
                    identifier="js-upload"
                  />
                </div>
              ) : (
                <div>
                  <p className="text-red-400">No JavaScript file available.</p>
                  <div className="text-red-600 bg-red-300 px-2 py-2 flex gap-5 rounded-lg items-center">
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
                      className="icon icon-tabler h-full w-20 icons-tabler-outline icon-tabler-exclamation-circle"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 9v4" />
                      <path d="M12 16v.01" />
                    </svg>
                    may in safari can not upload javascript file if fileType is
                    application/x-javascript{" "}
                  </div>
                  <FileUpload
                    onChange={handleFileUpload}
                    fileType={[".js"]}
                    identifier="js-upload"
                  />
                </div>
              )}
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-300 ease-in-out delay-100"
            >
              Upload Files
            </button>
          </div>
        ) : (
          <div className="bg-gray-700 py-10 px-4 rounded-lg">
            <div className="flex  gap-2 text-red-400 animate-bounce">
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 9v4" />
                <path d="M12 16v.01" />
              </svg>
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-error-404"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7v4a1 1 0 0 0 1 1h3" />
                <path d="M7 7v10" />
                <path d="M10 8v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1 -1v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1z" />
                <path d="M17 7v4a1 1 0 0 0 1 1h3" />
                <path d="M21 7v10" />
              </svg>
            </div>
            <div className="flex text-flower items-center justify-center h-full">
              <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
                <div className="w-full lg:w-1/2 mx-8">
                  <div className="text-7xl text-blue-400 font-dark font-extrabold mb-8">
                    404{" "}
                    <p className="text-sm text-blue-400 flex flex-wrap gap-2">
                      Unfortunately, the page with id{" "}
                      <span className="text-red-400 text-base flex items-center">
                        {params.id}
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
                          className="icon icon-tabler icons-tabler-outline icon-tabler-rocket animate ml-1"
                          aria-hidden="true" // Opcional para accesibilidad
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
                          <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
                          <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        </svg>
                      </span>{" "}
                      is not among us.
                    </p>
                  </div>
                  <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
                    Sorry we couldn&apos;t find the page you&pos;re looking for
                  </p>

                  <a
                    href="/projects/herogo"
                    className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-blue-400 active:bg-red-600 hover:bg-red-700"
                  >
                    back to homepage
                  </a>
                </div>
                <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
                  <img
                    src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
                    className=""
                    alt="Page not found"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
