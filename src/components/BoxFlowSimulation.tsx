"use client";

import { useEffect, useState } from "react";

type BoxStatus = "thrown" | "received" | "delivered";

type Box = {
  id: string;
  status: BoxStatus;
  timestamp: number;
};

export default function BoxFlowSimulation({
  setNumber,
}: {
  setNumber: number;
}) {
  const [boxes, setBoxes] = useState<Box[]>([]);

  // Periodically add a new box to the system
  useEffect(() => {
    const interval = setInterval(() => {
      const id = `B${Date.now()}`;
      setBoxes((prev) => [
        ...prev,
        { id, status: "thrown", timestamp: Date.now() },
      ]);
    }, 1200); // simulate ~50 CPM

    return () => clearInterval(interval);
  }, []);

  // Advance the status of each box and remove old ones
  useEffect(() => {
    const updater = setInterval(() => {
      setBoxes(
        (prev) =>
          prev
            .map((box) => {
              const age = Date.now() - box.timestamp;
              if (box.status === "thrown" && age > 1000)
                return { ...box, status: "received" as BoxStatus };
              if (box.status === "received" && age > 2000)
                return { ...box, status: "delivered" as BoxStatus };
              return box;
            })
            .filter((b) => Date.now() - b.timestamp < 4000) // cleanup old boxes
      );
    }, 300);

    return () => clearInterval(updater);
  }, []);

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 mt-6">
      <h3 className="text-white text-sm font-bold mb-2">
        📦 ART Set {setNumber} — Live Box Flow
      </h3>

      <div className="flex justify-between text-xs text-slate-400 mb-2 px-2">
        <span>Thrower</span>
        <span>Receiver</span>
        <span>Driver</span>
      </div>

      <div className="flex space-x-4 items-center justify-between relative h-20 px-4">
        {/* Thrown */}
        <div className="w-1/3 h-full border-r border-slate-700 relative">
          {boxes
            .filter((b) => b.status === "thrown")
            .map((b) => (
              <div
                key={b.id}
                className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded-sm text-[10px] animate-pulse"
              >
                {b.id}
              </div>
            ))}
        </div>

        {/* Received */}
        <div className="w-1/3 h-full border-r border-slate-700 relative">
          {boxes
            .filter((b) => b.status === "received")
            .map((b) => (
              <div
                key={b.id}
                className="absolute top-2 left-2 bg-yellow-300 text-black px-2 py-1 rounded-sm text-[10px] animate-bounce"
              >
                {b.id}
              </div>
            ))}
        </div>

        {/* Delivered */}
        <div className="w-1/3 h-full relative">
          {boxes
            .filter((b) => b.status === "delivered")
            .map((b) => (
              <div
                key={b.id}
                className="absolute top-2 left-2 bg-blue-400 text-black px-2 py-1 rounded-sm text-[10px] animate-fadeIn"
              >
                {b.id}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
