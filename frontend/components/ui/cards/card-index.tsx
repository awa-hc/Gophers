import { useState } from "react";
import PropTypes from "prop-types";

interface CardIndexProps {
  image: string;
  icon: React.ReactNode;
  name: string;
  description: string;
  subtitle: React.ReactNode;
  f_list: string;
  f2_list: string;
  f3_list: string;
  f4_list: string;
  title1: string;
  title2: string;
}

export default function CardIndex({
  image,
  icon,
  name,
  description,
  subtitle,
  f_list,
  f2_list,
  f3_list,
  f4_list,
  title1,
  title2,
}: CardIndexProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative w-full h-[400px] transition-transform duration-300 transform ${
        isHovered ? " rotate-y-180 " : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute w-full h-full backface-hidden flex flex-col gap-4 items-center justify-center p-5  border rounded-lg shadow-md transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-3xl text-flower italic">{name}</h1>
        <img src={image} className="flex-1 w-full h-auto rounded-lg" />
      </div>
      <div
        className={`absolute w-full rotate-y-180  h-full  flex flex-col items-center justify-center p-5  border rounded-lg shadow-md transition-opacity duration-300 ${
          isHovered ? "opacity-100 " : "opacity-0"
        }`}
      >
        {icon}
        <span className="text-xl text-flower text-blue-400 mb-2">{name}</span>
        <p className="line-clamp-4">{description}</p>
        <div className="text-flower text-base w-4/5">
          <span className="text-blue-400 block my-4">{title1}</span>
          {subtitle}
          <span className="text-blue-400 block my-4">{title2}</span>
          <ul>
            <li>{f_list}</li>
            <li>{f2_list}</li>
            <li>{f3_list}</li>
            <li>{f4_list}</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}

// Definición de tipos para las props
CardIndex.propTypes = {
  image: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subtitle: PropTypes.node,
  f_list: PropTypes.string,
  f2_list: PropTypes.string,
  f3_list: PropTypes.string,
  f4_list: PropTypes.string,
  title1: PropTypes.string,
  title2: PropTypes.string,
};
