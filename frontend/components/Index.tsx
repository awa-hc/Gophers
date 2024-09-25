"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SparklesCore } from "./ui/sparkles";
import { TypewriterEffectSmooth } from "./ui/typewritter-effect";
import { PinContainer } from "./ui/3d-pin";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";

const World = dynamic(
  () => import("@/components/ui/globe").then((m) => m.World),
  {
    ssr: false,
  }
);
const words = [
  {
    text: "Build",
  },
  {
    text: "awesome",
  },
  {
    text: "apps",
  },
  {
    text: "with",
  },
  {
    text: "golang",
    className: "text-blue-500 dark:text-blue-500",
  },
  {
    text: "and",
  },
  {
    text: "angular.",
    className: "text-red-500 dark:text-red-500",
  },
];
export function Index() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#000000",
    showAtmosphere: true,
    atmosphereColor: "#000000",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255, 1)",
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    initialPosition: { lat: -38.4161, lng: -23.6167 },
    autoRotate: true,
    autoRotateSpeed: 1,
  };
  const colors = ["#ffffff", "#ffffff", "#ffffff"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -1.303396,
      endLng: 36.852443,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: -15.785493,
      startLng: -47.909029,
      endLat: 36.162809,
      endLng: -115.119411,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: 21.3099,
      startLng: -157.8581,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 3,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: -34.6037,
      startLng: -58.3816,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 4,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 14.5995,
      startLng: 120.9842,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -33.8688,
      endLng: 151.2093,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 5,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 48.8566,
      endLng: -2.3522,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: -15.432563,
      startLng: 28.315853,
      endLat: 1.094136,
      endLng: -63.34546,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 37.5665,
      startLng: 126.978,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 6,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -15.595412,
      endLng: -56.05918,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 48.8566,
      startLng: -2.3522,
      endLat: 52.52,
      endLng: 13.405,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 7,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: -8.833221,
      startLng: 13.264837,
      endLat: -33.936138,
      endLng: 18.436529,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 49.2827,
      startLng: -123.1207,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 8,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: 40.7128,
      endLng: -74.006,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 51.5072,
      startLng: -0.1276,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 9,
      startLat: 1.3521,
      startLng: 103.8198,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.5,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: 28.6139,
      endLng: 77.209,
      arcAlt: 0.7,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 10,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 52.3676,
      endLng: 4.9041,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 41.9028,
      startLng: 12.4964,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: -6.2088,
      startLng: 106.8456,
      endLat: 31.2304,
      endLng: 121.4737,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 11,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 1.3521,
      endLng: 103.8198,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 34.0522,
      startLng: -118.2437,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },

    {
      order: 12,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 12,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 34.0522,
      endLng: -118.2437,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 52.52,
      startLng: 13.405,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: 11.986597,
      startLng: 8.571831,
      endLat: 35.6762,
      endLng: 139.6503,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 13,
      startLat: -22.9068,
      startLng: -43.1729,
      endLat: -34.6037,
      endLng: -58.3816,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 14,
      startLat: -33.936138,
      startLng: 18.436529,
      endLat: 21.395643,
      endLng: 39.883798,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
  ];

  return (
    <div className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2  py-20 h-auto md:h-screen bg-black w-full">
        <div className="md:h-[40rem]  bg-black flex flex-col mt-32 items-center justify-center  rounded-md">
          <h1 className="md:text-5xl text-4xl lg:text-8xl font-bold text-center text-white relative z-20 text-flower">
            Horacio Cortez Noe
          </h1>
          <div className="w-full md:w-[40rem] h-40 relative">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] md:w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px md:w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] md:w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px md md:w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
          <div className="max-w-7xl mx-auto w-full relative overflow-hidden  md:h-[40rem] px-4">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="div"
            >
              <h2 className="text-center text-flower text-xl md:text-4xl font-bold text-white">
                I am ready to GO!
              </h2>
              <p className="text-center text-flower mt-5 text-white text-lg md:text-2xl ">
                Go all with me, modern software development, and consulting
              </p>
              <span className="w-full items-center mx-auto px-6 flex flex-col justify-center">
                <TextGenerateEffect words="My experience are based in  Argentina 🇦🇷, Bolivia 🇧🇴, and the United States 🇺🇸!" />
              </span>
            </motion.div>
          </div>
        </div>
        <div>
          {/* <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent dark:to-black to-white z-40" /> */}
          <div className="w-full mt-20 -bottom-10 h-72 overflow-hidden md:h-[700px] z-10">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
        </div>
      </div>
      <div className="h-full bg-black w-full">
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <p className="text-neutral-200 text-xs sm:text-base  ">
            I can help you with your next project
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Link href="/meet" passHref>
              <button className="w-40 h-10 rounded-xl bg-black border border-white b text-white text-sm">
                Schedule a meeting
              </button>
            </Link>
            <Link href="/contact" passHref>
              <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-full grid grid-cols-1 md:grid-cols-2  bg-black md:w-3/4 place-content-center place-items-center mx-auto">
        <div className="h-full w-2/3 col-span-1 md:col-span-2 text-center flex flex-col items-center mt-24 justify-start">
          <TextGenerateEffect words="Here are some of my projects and collaborations!" />
        </div>
        <div>
          <PinContainer
            title="Go Study"
            href="https://gophers-pied.vercel.app/"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[10rem] lg:w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Go Study
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  A platform for task management and study planning.
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center w-full rounded-lg mt-4">
                <img
                  src="/gostudy.png"
                  alt="Go Study"
                  className="object-contain h-3/4 w-3/4"
                />
              </div>
            </div>
          </PinContainer>
        </div>

        <div>
          <PinContainer
            title="Proadent"
            href="https://gophers-pied.vercel.app/"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[10rem] lg:w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Proadent
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  System for managing dental clinics and patient records.
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center w-full rounded-lg mt-4">
                <img
                  src="/proadent.png"
                  alt="proadent"
                  className="object-contain h-3/4 w-3/4"
                />
              </div>
            </div>
          </PinContainer>
        </div>

        <div className="mt-28">
          <PinContainer
            title="Mango Motels"
            href="https://gophers-pied.vercel.app/"
          >
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[10rem] lg:w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Mango Motels
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Landing page for a motel chain in Santa Cruz, Bolivia.
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center w-full rounded-lg mt-4">
                <img
                  src="/mango.png"
                  alt="Mango Motels"
                  className="object-cover"
                />
              </div>
            </div>
          </PinContainer>
        </div>

        <div className="mt-28">
          <PinContainer title="needex" href="https://gophers-pied.vercel.app/">
            <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[10rem] lg:w-[20rem] h-[20rem] ">
              <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                Needex
              </h3>
              <div className="text-base !m-0 !p-0 font-normal">
                <span className="text-slate-500 ">
                  Application for tecnician services and job management.
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center w-full rounded-lg mt-4">
                <img
                  src="/needex.png"
                  alt="Go Study"
                  className="object-contain h-3/4 w-3/4"
                />
              </div>
            </div>
          </PinContainer>
        </div>
      </div>
      <div className="h-full flex flex-col items-center my-24 justify-start">
        <TextGenerateEffect words="I am ready to GO!, We are ready to GO!" />
      </div>
      <div className="h-full bg-black w-full">
        <p>
          Footer with social media links, contact information, and other
          information
        </p>
      </div>
    </div>
  );
}
