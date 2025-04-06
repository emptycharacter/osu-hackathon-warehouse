"use client";

import { motion } from "framer-motion";

interface BoxProps {
  id: string;
  status: "thrown" | "scanned" | "received" | "picked_up" | "delivered";
}

export default function Box({ id, status }: BoxProps) {
  const statusColorMap = {
    thrown: "bg-blue-500",
    scanned: "bg-green-500",
    received: "bg-yellow-300",
    picked_up: "bg-orange-400",
    delivered: "bg-purple-500",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-6 h-6 rounded-sm ${statusColorMap[status]} shadow-md flex items-center justify-center text-[9px] text-black font-bold`}
    >
      {id.slice(-2)}
    </motion.div>
  );
}
