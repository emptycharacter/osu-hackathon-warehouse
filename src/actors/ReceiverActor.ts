import { emitEvent, onEvent } from '@/events/eventBus'

export type ReceiverMode = 'receiver' | 'flex'

export class ReceiverActor {
  id: string
  name: string
  mode: ReceiverMode

  constructor(id: string, name: string, mode: ReceiverMode = 'receiver') {
    this.id = id
    this.name = name
    this.mode = mode
    this.subscribeToEvents()
  }

  /** Subscribes to relevant system events */
  private subscribeToEvents() {
    onEvent('scan.error', this.handleScanError.bind(this))
  }

  /** Responds to boxes with unknown count or scan issues */
  private handleScanError(payload: { boxId: string; reason: string }) {
    console.log(`🛠️ Receiver ${this.name} handling scan error for box ${payload.boxId}`)

    // Choose a zone (basic logic for now — can upgrade later)
    const suggestedZone = this.chooseZone(payload.boxId)

    emitEvent('guidance.applied', {
      boxId: payload.boxId,
      receiverId: this.id,
      zone: suggestedZone,
      reason: payload.reason
    })
  }

  /** Determines a staging zone based on box info */
  private chooseZone(boxId: string): string {
    // Future: look up SKU, weight, belt, etc.
    // For now: simple static routing logic
    const zones = ['A1', 'B2', 'C3']
    return zones[Math.floor(Math.random() * zones.length)]
  }
}
