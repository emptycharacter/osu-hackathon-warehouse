type EventMap = {
    'box.labelPrinted': { boxId: string; count: number | 'Unknown' }
    'box.scanned': { boxId: string; scannedBy: string }
    'box.verified': { boxId: string }
    'box.placed': { boxId: string; zone: string }
    'scan.error': { boxId: string; reason: string }
    'guidance.applied': { boxId: string; receiverId: string; zone: string; reason: string }
  
    // 👇 Add these for DriverActor support:
    'driver.moving': { driverId: string; boxId: string }
    'driver.delivered': { driverId: string; boxId: string }
    'driver.available': { driverId: string }
  }
  
  
  export type EventType = keyof EventMap
  export type Listener<T> = (payload: T) => void
  
  const subscribers: Map<string, Function[]> = new Map()
  
  export function emitEvent<K extends EventType>(type: K, payload: EventMap[K]) {
    const subs = subscribers.get(type) || []
    for (const fn of subs) fn(payload)
  }
  
  export function onEvent<K extends EventType>(type: K, callback: Listener<EventMap[K]>) {
    if (!subscribers.has(type)) subscribers.set(type, [])
    subscribers.get(type)!.push(callback)
  }