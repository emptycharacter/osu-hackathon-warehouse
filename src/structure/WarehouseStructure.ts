// Global warehouse structure model

export type WarehouseZone = 'Inbound' | 'Outbound' | 'Warehousing' | 'FulfillmentCenter'

export type InboundSubzone = 'ART' | 'ManualDock'

export type WarehouseRole =
  | 'WarehouseWorker'
  | 'WarehouseAssociate'
  | 'WarehouseWorkerLead'
  | 'OperationalManager'
  | 'Trainer'
  | 'ICQA'
  | 'ProblemSolver'
  | 'Clerical'
  | 'BackupICQA'
  | 'BackupProblemSolver'
  | 'BackupTrainer'
  | 'BackupClerical'
  | 'SafetyTeam'
  | 'ERTTeam'

export interface WarehouseActorProfile {
  id: string
  name: string
  role: WarehouseRole
  zone: WarehouseZone
  subzone?: InboundSubzone
  assignedSet?: number
  team?: 'SafetyTeam' | 'ERTTeam'
  supervisorId?: string
}

export const exampleActor: WarehouseActorProfile = {
  id: 'U01',
  name: 'Jess',
  role: 'WarehouseWorker',
  zone: 'Inbound',
  subzone: 'ART',
  assignedSet: 1
}
