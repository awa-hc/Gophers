"use client";
import { div } from "framer-motion/client";
import { useEffect, useState } from "react";

interface Project {
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
  useEffect(() => {
    getProjectById(params.id);
    loadProjectFiles(params.id);
  }, []);

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

  return (
    <div>
      <section>
        {project ? <h1>{project.name}</h1> : <h1>Loading...</h1>}

        {project ? (
          <div>
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

            <h2>View result</h2>
            <a target="_blank" href={project.html_url}>
              View HTML
            </a>
            <iframe src={project.view_url} className="w-full h-96"></iframe>
          </div>
        ) : null}
      </section>
      <section>
        {html && css && js ? (
          <div className="text-white">
            <h2 className="text-xl font-bold mb-2">HTML</h2>
            <div className="flex">
              <pre className="bg-gray-800 border border-gray-600 rounded-md p-4 max-h-60 overflow-auto w-full">
                <code className="font-mono whitespace-pre-wrap">
                  {html.split("\n").map((line, index) => (
                    <span key={index}>
                      <span className="text-gray-500 mr-2">{index + 1}</span>
                      {line}
                      <br />
                    </span>
                  ))}
                </code>
              </pre>
            </div>

            <h2 className="text-xl font-bold mb-2">CSS</h2>
            <div className="flex">
              <pre className="bg-gray-800 border border-gray-600 rounded-md p-4 max-h-60 overflow-auto w-full">
                <code className="font-mono whitespace-pre-wrap">
                  {css.split("\n").map((line, index) => (
                    <span key={index}>
                      <span className="text-gray-500 mr-2">{index + 1}</span>
                      {line}
                      <br />
                    </span>
                  ))}
                </code>
              </pre>
            </div>

            <h2 className="text-xl font-bold mb-2">JS</h2>
            <div className="flex">
              <pre className="bg-gray-800 border border-gray-600 rounded-md p-4 max-h-60 overflow-auto w-full">
                <code className="font-mono whitespace-pre-wrap">
                  {js.split("\n").map((line, index) => (
                    <span key={index}>
                      <span className="text-gray-500 mr-2">{index + 1}</span>
                      {line}
                      <br />
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        ) : (
          <h1 className="text-white">Loading...</h1>
        )}
      </section>
    </div>
  );
}
