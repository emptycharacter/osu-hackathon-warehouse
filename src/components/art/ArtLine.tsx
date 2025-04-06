"use client";

import { useEffect, useState } from "react";
import { simulateBoxFlow, BoxEvent, BoxStatus } from "@/engine/EventEngine";
import Box from "./Box";

interface ArtLineProps {
  lineNumber: number;
  doorNumber: number;
  printerLabel: string;
}

export default function ArtLine({
  lineNumber,
  doorNumber,
  printerLabel,
}: ArtLineProps) {
  const [boxEvents, setBoxEvents] = useState<BoxEvent[]>([]);

  useEffect(() => {
    const stop = simulateBoxFlow((event) =>
      setBoxEvents((prev) => [...prev, event])
    );
    return stop;
  }, []);

  // Group latest status per box ID
  const latestStatusMap: Record<string, BoxStatus> = {};
  boxEvents.forEach((evt) => {
    latestStatusMap[evt.id] = evt.status;
  });

  const boxes = Object.entries(latestStatusMap).map(([id, status]) => ({
    id,
    status,
  }));

  return (
    <div className="border border-slate-700 rounded-md p-3 bg-slate-900 space-y-3">
      <div className="text-slate-300 text-xs font-bold mb-2">
        📦 Line {lineNumber} — Door {doorNumber}
      </div>

      <div className="flex items-center justify-between text-white text-xs">
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-blue-500 mb-1" />
          <span>Thrower</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-6 bg-green-600 text-center rounded text-[10px] text-black font-bold flex items-center justify-center">
            {printerLabel}
          </div>
          <span className="text-slate-400">Printer</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 rounded-full bg-yellow-300 mb-1" />
          <span>Receiver</span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 mt-4">
        {boxes.map((box) => (
          <Box
            key={`${box.id}-${box.status}`}
            id={box.id}
            status={box.status}
          />
        ))}
      </div>
    </div>
  );
}
