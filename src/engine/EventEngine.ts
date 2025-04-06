export type BoxStatus =
  | "thrown"
  | "scanned"
  | "received"
  | "picked_up"
  | "delivered";

export interface BoxEvent {
  id: string;
  status: BoxStatus;
  timestamp: number;
}

export function createBoxEvent(id: string, status: BoxStatus): BoxEvent {
  return {
    id,
    status,
    timestamp: Date.now(),
  };
}

export function simulateBoxFlow(
  onUpdate: (event: BoxEvent) => void,
  intervalMs = 3000
): () => void {
  let active = true;

  const loop = () => {
    if (!active) return;

    const boxId = `C-${Math.floor(Math.random() * 10000)}`;
    const stages: BoxStatus[] = [
      "thrown",
      "scanned",
      "received",
      "picked_up",
      "delivered",
    ];

    stages.forEach((status, i) => {
      setTimeout(() => {
        if (active) onUpdate(createBoxEvent(boxId, status));
      }, i * intervalMs);
    });

    setTimeout(loop, stages.length * intervalMs + 1000);
  };

  loop();

  return () => {
    active = false;
  };
}
