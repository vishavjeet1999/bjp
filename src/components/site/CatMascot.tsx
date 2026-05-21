import { motion } from "framer-motion";
import image from "./image.png";

export function CatMascot({ className = "" }: { className?: string }) {
  return (
    <img
      src={image}
      alt="Billa mascot — a sleek nocturnal cat silhouette"
      width={400}
      height={400}
    />
    // <motion.svg
    //   viewBox="0 0 400 400"
    //   className={className}
    //   initial={{ opacity: 0, scale: 0.9 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    //   aria-label="Billa mascot — a sleek nocturnal cat silhouette"
    //   role="img"
    // >
    //   <defs>
    //     <radialGradient id="halo" cx="50%" cy="50%" r="50%">
    //       <stop offset="0%" stopColor="oklch(0.85 0.16 85)" stopOpacity="0.5" />
    //       <stop offset="60%" stopColor="oklch(0.65 0.22 300)" stopOpacity="0.15" />
    //       <stop offset="100%" stopColor="transparent" />
    //     </radialGradient>
    //     <linearGradient id="catFill" x1="0" y1="0" x2="0" y2="1">
    //       <stop offset="0%" stopColor="oklch(0.22 0.04 280)" />
    //       <stop offset="100%" stopColor="oklch(0.08 0.02 280)" />
    //     </linearGradient>
    //     <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
    //       <stop offset="0%" stopColor="oklch(0.85 0.16 85)" />
    //       <stop offset="100%" stopColor="oklch(0.65 0.22 300)" />
    //     </linearGradient>
    //   </defs>

    //   <circle cx="200" cy="210" r="170" fill="url(#halo)" />

    //   {/* Body */}
    //   <motion.g
    //     animate={{ y: [0, -6, 0] }}
    //     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    //   >
    //     <path
    //       d="M120 320 C 110 230, 130 175, 200 175 C 270 175, 290 230, 280 320 Z"
    //       fill="url(#catFill)"
    //       stroke="url(#edge)"
    //       strokeWidth="1.2"
    //     />
    //     {/* Head */}
    //     <path
    //       d="M140 200
    //          L 158 130
    //          L 188 178
    //          L 212 178
    //          L 242 130
    //          L 260 200
    //          Q 260 250, 200 250
    //          Q 140 250, 140 200 Z"
    //       fill="url(#catFill)"
    //       stroke="url(#edge)"
    //       strokeWidth="1.4"
    //     />
    //     {/* Inner ears */}
    //     <path d="M168 152 L178 180 L188 168 Z" fill="oklch(0.65 0.22 300 / 0.5)" />
    //     <path d="M232 152 L222 180 L212 168 Z" fill="oklch(0.65 0.22 300 / 0.5)" />

    //     {/* Eyes */}
    //     <motion.g
    //       animate={{ opacity: [1, 1, 0.1, 1, 1] }}
    //       transition={{ duration: 5, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
    //     >
    //       <ellipse cx="180" cy="208" rx="6" ry="9" fill="oklch(0.85 0.16 85)" />
    //       <ellipse cx="220" cy="208" rx="6" ry="9" fill="oklch(0.85 0.16 85)" />
    //     </motion.g>

    //     {/* Nose + whiskers */}
    //     <path d="M196 226 L204 226 L200 232 Z" fill="oklch(0.65 0.22 300)" />
    //     <path
    //       d="M170 232 L150 228 M170 238 L150 240 M230 232 L250 228 M230 238 L250 240"
    //       stroke="oklch(0.85 0.16 85 / 0.45)"
    //       strokeWidth="1"
    //       strokeLinecap="round"
    //     />
    //   </motion.g>
    // </motion.svg>
  );
}
