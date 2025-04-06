"use client";

import { ScheduleRecord } from "@/schedule/ScheduleTypes";

interface Props {
  schedule: ScheduleRecord;
}

export default function InboundScheduleView({ schedule }: Props) {
  const artLine = (set: number, line: number) =>
    schedule.assignments.filter(
      (a) => a.subzone === "ART" && a.set === set && a.line === line
    );

  const driverBySet = (set: number) =>
    schedule.assignments.find(
      (a) => a.subzone === "ART" && a.set === set && a.notes?.includes("Driver")
    );

  const dockAssignments = schedule.assignments.filter(
    (a) => a.subzone === "ManualDock"
  );

  const setLines = {
    1: [1, 2],
    2: [3, 4],
  } as Record<number, number[]>;

  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-yellow-400 mb-3">
        🗓️ Inbound Scheduling
      </h2>

      {[1, 2].map((set) => (
        <div key={set} className="mb-6">
          <h3 className="text-md font-semibold text-green-400 mb-2">
            ART Set {set} — Team Assignments
          </h3>
          <div className="grid grid-cols-3 gap-2 items-start">
            {/* Line A */}
            <div>
              <h4 className="text-green-300 text-xs text-center mb-1">
                Line {setLines[set][0]}
              </h4>
              <div className="grid grid-cols-1 gap-1">
                {artLine(set, setLines[set][0]).map((a, i) => (
                  <div
                    key={i}
                    className="bg-slate-900 border border-slate-700 px-2 py-1 rounded text-center"
                  >
                    <div className="text-[10px] uppercase text-slate-400">
                      {a.notes?.split(" - ")[0]}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {a.notes?.split(" - ")[1] || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Driver */}
            <div>
              <h4 className="text-green-300 text-xs text-center mb-1">
                Driver
              </h4>
              {driverBySet(set) && (
                <div className="bg-slate-900 border border-slate-700 px-2 py-3 rounded text-center">
                  <div className="text-[10px] uppercase text-slate-400">
                    {driverBySet(set)?.notes?.split(" - ")[0]}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {driverBySet(set)?.notes?.split(" - ")[1] || "—"}
                  </div>
                </div>
              )}
            </div>

            {/* Line B */}
            <div>
              <h4 className="text-green-300 text-xs text-center mb-1">
                Line {setLines[set][1]}
              </h4>
              <div className="grid grid-cols-1 gap-1">
                {artLine(set, setLines[set][1]).map((a, i) => (
                  <div
                    key={i}
                    className="bg-slate-900 border border-slate-700 px-2 py-1 rounded text-center"
                  >
                    <div className="text-[10px] uppercase text-slate-400">
                      {a.notes?.split(" - ")[0]}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {a.notes?.split(" - ")[1] || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Manual Dock Display */}
      <h3 className="text-md font-semibold text-blue-300 mb-2">
        Manual Dock — Doors 330–350
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
        {dockAssignments.map((a, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-700 px-2 py-1 rounded text-center"
          >
            <div className="text-[10px] uppercase text-slate-400">
              {a.notes?.split(" - ")[0]}
            </div>
            <div className="text-sm font-bold text-white">
              {a.notes?.split(" - ")[1] || "—"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
