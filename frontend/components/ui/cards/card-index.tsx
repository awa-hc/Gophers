import { title } from "process";
import PropTypes from "prop-types";

import { ReactNode } from "react";

interface CardIndexProps {
  icon: ReactNode;
  name: string;
  description: string;
  subtitle: ReactNode;
  f_list: string;
  f2_list: string;
  f3_list: string;
  f4_list: string;
  title1: string;
  title2: string;
}

export default function CardIndex({
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
  return (
    <div className="flex flex-col items-center p-5 justify-center ">
      <div className="flex flex-col items-center justify-center">
        {icon}
        <span className="text-xl text-flower text-blue-400 mb-2">{name}</span>
      </div>
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
  );
}

// Definición de tipos para las props
CardIndex.propTypes = {
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
