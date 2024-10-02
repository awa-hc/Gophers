import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FloatingNav } from "@/components/ui/floating-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Horacio Cortez Noe",
  description: "My portfolio make with React and Golang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Navitems = [
    {
      name: "Home",
      link: "/",
      icon: (
        <div className="h-full w-full text-black">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-home"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
          </svg>
        </div>
      ),
    },
    {
      name: "My History",
      link: "/history",
      icon: (
        <div className="h-full w-full text-black">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            <path d="M15 9l5 -5" />
            <path d="M16 4l4 0l0 4" />
          </svg>
        </div>
      ),
    },
    {
      name: "Projects",
      link: "/projects",
      icon: (
        <div className="h-full w-full text-black">
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
            className="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            <path d="M15 9l5 -5" />
            <path d="M16 4l4 0l0 4" />
          </svg>
        </div>
      ),
    },
    // {
    //   name: "Meet",
    //   link: "/meet",
    //   icon: (
    //     <div className="h-4 w-4 text-white">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="24"
    //         height="24"
    //         viewBox="0 0 24 24"
    //         fill="none"
    //         stroke="currentColor"
    //         strokeWidth="2"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="icon icon-tabler icons-tabler-outline icon-tabler-phone-outgoing"
    //       >
    //         <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //         <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
    //         <path d="M15 9l5 -5" />
    //         <path d="M16 4l4 0l0 4" />
    //       </svg>
    //     </div>
    //   ),
    // },
  ];

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
        />
      </head>
      <body className={inter.className}>
        <FloatingNav navItems={Navitems} />
        {children}
      </body>
    </html>
  );
}
