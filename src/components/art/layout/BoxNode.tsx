"use client";

import { BoxStatus } from "@/engine/EventEngine";

interface BoxNodeProps {
  id: string;
  status: BoxStatus;
}

const statusColors: Record<BoxStatus, string> = {
  thrown: "bg-purple-500",
  scanned: "bg-green-400",
  received: "bg-yellow-300",
  picked_up: "bg-blue-400",
  delivered: "bg-slate-500",
};

export default function BoxNode({ id, status }: BoxNodeProps) {
  return (
    <div
      className={`w-6 h-6 rounded text-[10px] font-mono flex items-center justify-center text-black ${statusColors[status]}`}
      title={`Box ${id} - ${status}`}
    >
      {id.slice(-2)}
    </div>
  );
}
