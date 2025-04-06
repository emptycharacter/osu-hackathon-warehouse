"use client";

import ArtLine from "./ArtLine";

interface ArtSetProps {
  setId: number;
  lines: number[];
  throwerDoors: Record<number, number>; // lineNumber -> door
  printerLabels: Record<number, string>; // lineNumber -> label
}

export default function ArtSet({
  setId,
  lines,
  throwerDoors,
  printerLabels,
}: ArtSetProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {lines.map((lineNumber) => (
        <ArtLine
          key={lineNumber}
          lineNumber={lineNumber}
          doorNumber={throwerDoors[lineNumber]}
          printerLabel={printerLabels[lineNumber]}
        />
      ))}
    </div>
  );
}
