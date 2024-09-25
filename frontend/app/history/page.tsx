import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import CVDownloadButton from "@/components/ui/CVDownloadButton";

export default function History() {
  const data = [
    {
      title: "2019, my first hello world",
      content: (
        <div>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
            My first hello world was in 2019, when I was 15 years old. with a
            discord bot that can send a message to a channel, builded with
            golang and discordgo (here starts my passion for golang language).
          </p>
          <hr className="my-4"></hr>

          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            this is just a recreation of the original i did not found the
            original.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/first_2019.png"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-contain h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "January 2021, started study at university",
      content: (
        <div>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
            I started my study at the university in January 2021, system
            engineer student career.
          </p>
          <hr className="my-4"></hr>

          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-8">
            I learn a lot of things in this university, programming languages,
            electronic, sistem design, and make a lot of friends.
            <br />I win a programming contest in my first year with my friend
            Jhon C.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/salesiana.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Octuber 2021, university transfer",
      content: (
        <div>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            My father and university sent me an invitation to transfer to
            another university abroad!
            <hr className="my-4"></hr>
          </p>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            I accepted the invitation and I am currently studying at the same
            career at the &apos;universidad tecnologica nacional&apos; in Buenos
            Aires, Argentina.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/UTN.png"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "September 2022 - September 2024,  My first job",
      content: (
        <div>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            I started my first job in September 2022, as a software developer in
            a small company in Santa Cruz, Bolivia.
          </p>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            I work for clients from Argentina, Bolivia, Peru and United States.
            <hr className="my-4"></hr>
            I have gained a comprehensive understanding of the software
            development process, including effective teamwork, various software
            development methodologies, and client collaboration. I am familiar
            with agile methodologies such as Scrum and Kanban, among others.
            Additionally, I have learned that software development encompasses
            much more than just programming.
            <br />I make an amazing friend in this job, his name is Adrian M.
            (owner of the company).
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/ps.jpg"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "December 2023, i started online courses",
      content: (
        <div>
          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            I started my first job in September 2022, as a software developer in
            a small company in Santa Cruz, Bolivia.
          </p>
          <hr className="my-4"></hr>

          <p className="text-neutral-200 text-xs md:text-sm font-normal mb-4">
            I have gained a comprehensive understanding of the software
            development process, including effective teamwork, various software
            development methodologies, and client collaboration. I am familiar
            with agile methodologies such as Scrum and Kanban, among others.
            Additionally, I have learned that software development encompasses
            much more than just programming.
            <br />I make an amazing friend in this job, his name is Adrian M.
            (owner of the company).
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/ec.png"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/ec2.png"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/cudem.jpg"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/cfrba.png"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/cudem2.png"
              alt="cards template"
              width={500}
              height={500}
              className="rounded-lg object-contain bg-white h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-neutral-950 flex items-center justify-center flex-col">
      <div className="w-full">
        <Timeline data={data} />
      </div>

      <div className="my-24 text-center">
        <TextGenerateEffect words="How you can see, is not a lot of history, but is a good start." />
        <p className="mt-12 italic">
          I am continously learning and improving my skills. im excited to see
          what the future holds.
        </p>
        <h1 className="mt-4 text-2xl">also you can download my CV here:</h1>
        <CVDownloadButton />
      </div>
    </div>
  );
}
