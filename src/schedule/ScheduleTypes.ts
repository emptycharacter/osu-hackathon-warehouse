import { WarehouseRole, WarehouseZone, InboundSubzone } from '@/structure/WarehouseStructure'

export interface Assignment {
  userId: string
  role: WarehouseRole
  zone: WarehouseZone
  subzone?: InboundSubzone
  line?: number // for ART
  set?: number // for ART
  notes?: string
}

export interface ScheduleRecord {
  id: string
  date: string // e.g. '2025-04-06'
  shiftStart: string // e.g. '16:30'
  createdBy: string // userId of the lead/OM who made the schedule
  assignments: Assignment[]
  locked?: boolean // mark final after shift ends
  createdAt: string
  updatedAt: string
}

// Example generator for a fresh schedule
export function createEmptySchedule(date: string, createdBy: string): ScheduleRecord {
  return {
    id: `SCH_${date}`,
    date,
    shiftStart: '16:30',
    createdBy,
    assignments: [],
    locked: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}
