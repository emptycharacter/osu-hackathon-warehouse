import { emitEvent } from '@/events/eventBus'

export type ThrowStyle = 'light' | 'medium' | 'chaotic' | 'precise'

export class ThrowerActor {
  id: string
  name: string
  style: ThrowStyle
  cpmGoal: number
  totalThrown: number = 0

  constructor(id: string, name: string, style: ThrowStyle = 'medium', cpmGoal: number = 22) {
    this.id = id
    this.name = name
    this.style = style
    this.cpmGoal = cpmGoal
  }
  

  /** Throws a new box into the system */
  throwBox(boxId: string, sku: string): { count: number | 'Unknown' } {
    this.totalThrown++

    // Simulate potential printer count error (e.g. 10% chance)
    const badLabelChance = this.style === 'chaotic' ? 0.2 : 0.05
    const count = Math.random() < badLabelChance ? 'Unknown' : Math.floor(Math.random() * 4) + 1

    emitEvent('box.labelPrinted', {
      boxId,
      count
    })

    return { count }
  }
}