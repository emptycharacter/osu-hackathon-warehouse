import { emitEvent } from '@/events/eventBus'

export type BoxState = 'created' | 'printed' | 'scanned' | 'verified' | 'error' | 'staged'

export interface BoxEvent {
  type: 'label.printed' | 'box.scanned' | 'box.verified' | 'guidance.applied' | 'box.error'
  payload?: any
}

export class BoxActor {
  id: string
  sku: string
  count: number | 'Unknown'
  state: BoxState = 'created'
  events: string[] = []

  constructor(id: string, sku: string, count: number | 'Unknown') {
    this.id = id
    this.sku = sku
    this.count = count
  }

  /** Receives and processes an event */
  receive(event: BoxEvent) {
    this.events.push(event.type)

    switch (event.type) {
      case 'label.printed':
        this.state = 'printed'
        emitEvent('box.labelPrinted', { boxId: this.id, count: this.count })
        break

      case 'box.scanned':
        if (this.count === 'Unknown') {
          this.state = 'error'
          emitEvent('scan.error', { boxId: this.id, reason: 'unknown_count' })
        } else {
          this.state = 'scanned'
          emitEvent('box.scanned', { boxId: this.id, scannedBy: event.payload?.scannerId })
        }
        break

      case 'box.verified':
        this.state = 'verified'
        emitEvent('box.verified', { boxId: this.id })
        break

      case 'guidance.applied':
        this.state = 'staged'
        emitEvent('box.placed', { boxId: this.id, zone: event.payload?.zone })
        break

      default:
        console.warn(`[BoxActor:${this.id}] Unknown event:`, event)
    }
  }
}
