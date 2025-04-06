"use client";

interface PersonNodeProps {
  name: string;
  role: "thrower" | "receiver" | "driver";
  status?: "idle" | "moving" | "working";
  x: number;
  y: number;
}

const roleColors: Record<"thrower" | "receiver" | "driver", string> = {
  thrower: "bg-blue-500",
  receiver: "bg-yellow-300",
  driver: "bg-red-500",
};

const statusStyles: Record<"idle" | "moving" | "working", string> = {
  idle: "opacity-60",
  moving: "animate-bounce",
  working: "ring-2 ring-green-400",
};

export default function PersonNode({
  name,
  role,
  status = "idle",
  x,
  y,
}: PersonNodeProps) {
  const label = role === "driver" ? "🚗" : name[0];

  return (
    <div
      className={`absolute w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-black ${roleColors[role]} ${statusStyles[status]}`}
      style={{ left: x, top: y }}
      title={`${name} (${role}) - ${status}`}
    >
      {label}
    </div>
  );
}
