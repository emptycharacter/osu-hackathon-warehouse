"use client";

import { useState } from "react";
import { mockScheduleFor } from "@/schedule/MockSchedule";
import { ScheduleRecord } from "@/schedule/ScheduleTypes";
import ArtSimulation from "@/components/art/ArtSimulation";
import InboundScheduleView from "@/components/schedule/InboundScheduleView";
import { UserCircle } from "lucide-react";

const tabs = ["ART Simulation", "Schedule"] as const;

export default function HomePage() {
  const [schedule] = useState<ScheduleRecord>(() =>
    mockScheduleFor("2025-04-06", "OM01")
  );

  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("ART Simulation");

  return (
    <main className="min-h-screen p-4 bg-slate-950 text-white font-mono tracking-wide overflow-x-hidden text-xs">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white/90">
            ⚙️ RDC 558 Operations Terminal
          </h1>
          <p className="text-xs text-slate-400">
            Date: {schedule.date} | Shift Start: {schedule.shiftStart}
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <UserCircle className="w-6 h-6" />
          <span className="text-sm">OM01</span>
        </div>
      </header>

      {/* Tab Selector */}
      <div className="flex gap-4 border-b border-slate-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-sm font-semibold tracking-wider uppercase transition-colors duration-150 border-b-2 ${
              activeTab === tab
                ? "border-white text-white"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "ART Simulation" && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wider">
            ART Set Simulation Grid
          </h2>
          <ArtSimulation />
        </section>
      )}

      {activeTab === "Schedule" && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-yellow-400 mb-2 uppercase tracking-wider">
            Inbound Scheduling Manifest
          </h2>
          <InboundScheduleView schedule={schedule} />
        </section>
      )}
    </main>
  );
}
