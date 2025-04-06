import { emitEvent, onEvent } from '@/events/eventBus'

export type DriverStatus = 'idle' | 'dispatched' | 'moving' | 'staging' | 'returning'

export class DriverActor {
  id: string
  name: string
  assignedARTSet: number
  status: DriverStatus = 'idle'
  currentTask: string | null = null

  constructor(id: string, name: string, assignedARTSet: number) {
    this.id = id
    this.name = name
    this.assignedARTSet = assignedARTSet
    this.subscribeToEvents()
  }

  /** Subscribes to staged or ready-for-move boxes */
  private subscribeToEvents() {
    onEvent('box.placed', this.handleBoxReady.bind(this))
  }

  /** Handles boxes ready to be moved from staging */
  private handleBoxReady(payload: { boxId: string; zone: string }) {
    if (this.status !== 'idle') return

    this.status = 'dispatched'
    this.currentTask = payload.boxId

    console.log(`🚚 Driver ${this.name} dispatched to move box ${payload.boxId} from zone ${payload.zone}`)

    // Simulate time delay for travel, staging, and return
    setTimeout(() => {
      this.status = 'moving'
      emitEvent('driver.moving', { driverId: this.id, boxId: payload.boxId })

      setTimeout(() => {
        this.status = 'staging'
        emitEvent('driver.delivered', { driverId: this.id, boxId: payload.boxId })

        setTimeout(() => {
          this.status = 'returning'
 
          setTimeout(() => {
            this.status = 'idle'
            this.currentTask = null
            emitEvent('driver.available', { driverId: this.id })
          }, 1000)
        }, 1000)
      }, 1000)
    }, 1000)
  }
}
