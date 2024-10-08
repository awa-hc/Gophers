import { cn } from "@/utils/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};
export const FileUpload = ({
    onChange,
    fileType,
    identifier, // Agregar un identificador único como prop
  }: {
    onChange?: (files: File[]) => void;
    fileType: string;
    identifier: string; // Identificador único
  }) => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleFileChange = (newFiles: File[]) => {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      onChange && onChange(newFiles);
    };
  
    const handleClick = () => {
      fileInputRef.current?.click();
    };
  
    const { getRootProps, isDragActive } = useDropzone({
      multiple: false,
      noClick: true,
      onDrop: handleFileChange,
      onDropRejected: (error) => {
        console.log(error);
      },
    });
  
    return (
      <div className="w-full" {...getRootProps()}>
        <motion.div
          onClick={handleClick}
          whileHover="animate"
          className={`p-10 group/file-${identifier} block rounded-lg cursor-pointer w-full relative overflow-hidden`} // Usar el identificador aquí
        >
          <input
            ref={fileInputRef}
            id={`file-upload-handle-${identifier}`} // Asegurarse de que el id sea único
            type="file"
            accept={fileType}
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
            className="hidden"
          />
  
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-bold text-blue-400 text-base">
              Upload file
            </p>
  
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {files.length > 0 &&
                files.map((file, idx) => (
                  <motion.div
                    key={`file-${identifier}-${idx}`} // Asegurarse de que la key sea única
                    layoutId={idx === 0 ? `file-upload-${identifier}` : `file-upload-${identifier}-${idx}`}
                    className={cn(
                      "relative overflow-hidden z-40 bg-white flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                      "shadow-sm"
                    )}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-base text-black font-black text-flower  max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm bg-blue-400 text-white shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                    </div>
  
                    <div className="flex text-flower text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-black">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-red-400 "
                      >
                        {file.type}
                      </motion.p>
  
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modified{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              {!files.length && (
                <motion.div
                  layoutId={`file-upload-${identifier}`} // Asegurarse de que el layoutId sea único
                  variants={mainVariant}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    "relative group-hover/file:shadow-2xl z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                    "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                  )}
                </motion.div>
              )}
  
              {!files.length && (
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  