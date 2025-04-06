"use client";

import Box from "../Box";
import PersonNode from "./PersonNode";
import ZoneBlock from "./ZoneBlock";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BoxEvent, simulateBoxFlow } from "@/engine/EventEngine";

export default function ArtFloor() {
  const [boxEvents, setBoxEvents] = useState<BoxEvent[]>([]);

  useEffect(() => {
    const stop = simulateBoxFlow(
      (e) => setBoxEvents((prev) => [...prev, e]),
      1500
    );
    return stop;
  }, []);

  const latest: Record<string, BoxEvent> = {};
  boxEvents.forEach((e) => (latest[e.id] = e));

  const positions: Record<string, { x: number; y: number }> = {
    thrown: { x: 100, y: 300 },
    scanned: { x: 180, y: 300 },
    received: { x: 260, y: 300 },
    picked_up: { x: 260, y: 240 },
    delivered: { x: 260, y: 160 },
  };

  return (
    <div className="relative w-full h-[420px] bg-slate-800 rounded-md border border-slate-700 overflow-hidden">
      {/* Trailer and Door */}
      <ZoneBlock
        label="Trailer ID: TRL-9482"
        x={0}
        y={280}
        color="bg-red-900"
        w={80}
        h={24}
      />
      <ZoneBlock
        label="Door 363"
        x={20}
        y={310}
        color="bg-red-700"
        w={60}
        h={24}
      />

      {/* Conveyor Belt Path (U-shape) */}
      {/* Horizontal from Trailer to turn */}
      <div className="absolute left-[80px] top-[292px] w-[80px] h-[10px] bg-slate-600 rounded" />
      {/* Vertical downward into U */}
      <div className="absolute left-[160px] top-[200px] w-[10px] h-[100px] bg-slate-600 rounded" />
      {/* Horizontal across to printer */}
      <div className="absolute left-[160px] top-[200px] w-[120px] h-[10px] bg-slate-600 rounded" />

      {/* Cage Carts inside conveyor bend */}
      {[0, 1, 2, 3].map((n) => (
        <ZoneBlock
          key={n}
          label="Cage"
          x={90 + n * 30}
          y={260}
          w={28}
          h={28}
          color="bg-gray-500"
        />
      ))}

      {/* Printer and stand (bottom right) */}
      <ZoneBlock
        label="Printer"
        x={260}
        y={180}
        color="bg-green-600"
        w={50}
        h={24}
      />
      <ZoneBlock
        label="Stand"
        x={280}
        y={200}
        color="bg-slate-700"
        w={40}
        h={20}
      />
      <ZoneBlock
        label="Pallets"
        x={330}
        y={150}
        color="bg-slate-600"
        w={50}
        h={20}
      />
      <ZoneBlock
        label="Door 361"
        x={280}
        y={310}
        color="bg-red-700"
        w={60}
        h={24}
      />

      {/* People */}
      <PersonNode
        name="Joshua"
        role="thrower"
        status="working"
        x={40}
        y={280}
      />
      <PersonNode
        name="Nina"
        role="receiver"
        status="working"
        x={290}
        y={210}
      />
      <PersonNode name="Leo" role="driver" status="moving" x={350} y={240} />

      {/* Boxes flowing down the belt */}
      {Object.values(latest).map((box) => (
        <motion.div
          key={box.id}
          initial={false}
          animate={{ x: positions[box.status].x, y: positions[box.status].y }}
          transition={{ duration: 0.5 }}
          className="absolute"
        >
          <Box id={box.id} status={box.status} />
        </motion.div>
      ))}
    </div>
  );
}
