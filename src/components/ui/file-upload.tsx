// import { cn } from "@/lib/utils";
// import React, { useRef, useState } from "react";
// import { motion } from "framer-motion";
// // import { IconUpload } from "@tabler/icons-react";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "lucide-react";

// const mainVariant = {
//     initial: {
//         x: 0,
//         y: 0,
//     },
//     animate: {
//         x: 20,
//         y: -20,
//         opacity: 0.9,
//     },
// };

// const secondaryVariant = {
//     initial: {
//         opacity: 0,
//     },
//     animate: {
//         opacity: 1,
//     },
// };

// export const FileUpload = ({
//     onChange,
// }: {
//     onChange?: (files: File[]) => void;
// }) => {
//     const [files, setFiles] = useState<File[]>([]);
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleFileChange = (newFiles: File[]) => {
//         setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//         onChange && onChange(newFiles);
//     };

//     const handleClick = () => {
//         fileInputRef.current?.click();
//     };

//     const { getRootProps, isDragActive } = useDropzone({
//         multiple: false,
//         noClick: true,
//         onDrop: handleFileChange,
//         onDropRejected: (error) => {
//             console.log(error);
//         },
//     });

//     return (
//         <div className="w-full" {...getRootProps()}>
//             <motion.div
//                 onClick={handleClick}
//                 whileHover="animate"
//                 className="group/file block relative p-10 rounded-lg w-full overflow-hidden cursor-pointer"
//             >
//                 <input
//                     ref={fileInputRef}
//                     id="file-upload-handle"
//                     type="file"
//                     onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
//                     className="hidden"
//                 />
//                 <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
//                     <GridPattern />
//                 </div>
//                 <div className="flex flex-col justify-center items-center">
//                     <p className="z-20 relative font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
//                         Upload file
//                     </p>
//                     <p className="z-20 relative mt-2 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base">
//                         Drag or drop your files here or click to upload
//                     </p>
//                     <div className="relative mx-auto mt-10 w-full max-w-xl">
//                         {files.length > 0 &&
//                             files.map((file, idx) => (
//                                 <motion.div
//                                     key={"file" + idx}
//                                     layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
//                                     className={cn(
//                                         "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
//                                         "shadow-sm"
//                                     )}
//                                 >
//                                     <div className="flex justify-between items-center gap-4 w-full">
//                                         <motion.p
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             layout
//                                             className="max-w-xs text-neutral-700 dark:text-neutral-300 text-base truncate"
//                                         >
//                                             {file.name}
//                                         </motion.p>
//                                         <motion.p
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             layout
//                                             className="flex-shrink-0 dark:bg-neutral-800 shadow-input px-2 py-1 rounded-lg w-fit text-neutral-600 dark:text-white text-sm"
//                                         >
//                                             {(file.size / (1024 * 1024)).toFixed(2)} MB
//                                         </motion.p>
//                                     </div>

//                                     <div className="flex md:flex-row flex-col justify-between items-start md:items-center mt-2 w-full text-neutral-600 dark:text-neutral-400 text-sm">
//                                         <motion.p
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             layout
//                                             className="bg-gray-100 dark:bg-neutral-800 px-1 py-0.5 rounded-md"
//                                         >
//                                             {file.type}
//                                         </motion.p>

//                                         <motion.p
//                                             initial={{ opacity: 0 }}
//                                             animate={{ opacity: 1 }}
//                                             layout
//                                         >
//                                             modified{" "}
//                                             {new Date(file.lastModified).toLocaleDateString()}
//                                         </motion.p>
//                                     </div>
//                                 </motion.div>
//                             ))}
//                         {!files.length && (
//                             <motion.div
//                                 layoutId="file-upload"
//                                 variants={mainVariant}
//                                 transition={{
//                                     type: "spring",
//                                     stiffness: 300,
//                                     damping: 20,
//                                 }}
//                                 className={cn(
//                                     "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
//                                     "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
//                                 )}
//                             >
//                                 {isDragActive ? (
//                                     <motion.p
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         className="flex flex-col items-center text-neutral-600"
//                                     >
//                                         Drop it
//                                         <Upload className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
//                                     </motion.p>
//                                 ) : (
//                                     <Upload className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
//                                 )}
//                             </motion.div>
//                         )}

//                         {!files.length && (
//                             <motion.div
//                                 variants={secondaryVariant}
//                                 className="z-30 absolute inset-0 flex justify-center items-center bg-transparent opacity-0 mx-auto mt-4 border border-sky-400 border-dashed rounded-md w-full max-w-[8rem] h-32"
//                             ></motion.div>
//                         )}
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export function GridPattern() {
//     const columns = 41;
//     const rows = 11;
//     return (
//         <div className="flex flex-wrap flex-shrink-0 justify-center items-center gap-x-px gap-y-px bg-gray-100 dark:bg-neutral-900 scale-105">
//             {Array.from({ length: rows }).map((_, row) =>
//                 Array.from({ length: columns }).map((_, col) => {
//                     const index = row * columns + col;
//                     return (
//                         <div
//                             key={`${col}-${row}`}
//                             className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${index % 2 === 0
//                                 ? "bg-gray-50 dark:bg-neutral-950"
//                                 : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
//                                 }`}
//                         />
//                     );
//                 })
//             )}
//         </div>
//     );
// }
