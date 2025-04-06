export default function ZoneBlock({
  label,
  x,
  y,
  w = 40,
  h = 40,
  color = "bg-gray-500",
}: {
  label: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  color?: string;
}) {
  return (
    <div
      className={`absolute ${color} text-[9px] text-white text-center rounded-sm`}
      style={{
        left: x,
        top: y,
        width: w,
        height: h,
        lineHeight: `${h}px`,
      }}
    >
      {label}
    </div>
  );
}
