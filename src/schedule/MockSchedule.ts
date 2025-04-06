import { createEmptySchedule, ScheduleRecord } from './ScheduleTypes'
import { WarehouseRole } from '@/structure/WarehouseStructure'

export function mockScheduleFor(date: string, createdBy: string): ScheduleRecord {
  const schedule = createEmptySchedule(date, createdBy)

  schedule.assignments = [
    // ART Set 1 - Line 1
    { userId: 'U001', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 1, notes: 'Thrower - Joshua F.' },
    { userId: 'U002', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 1, notes: 'Receiver - Kim B.' },
    { userId: 'U003', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 1, notes: 'Receiver - Paul G.' },
    { userId: 'U004', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 1, notes: 'Flex - Sara J.' },

    // ART Set 1 - Line 2
    { userId: 'U005', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 2, notes: 'Thrower - Malik T.' },
    { userId: 'U006', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 2, notes: 'Receiver - Dana K.' },
    { userId: 'U007', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 2, notes: 'Receiver - Vinh L.' },
    { userId: 'U008', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, line: 2, notes: 'Flex - Ramon W.' },

    // ART Set 1 - Driver
    { userId: 'U009', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 1, notes: 'Driver - Leo M.' },

    // ART Set 2 - Line 3
    { userId: 'U010', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 3, notes: 'Thrower - Cindy R.' },
    { userId: 'U011', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 3, notes: 'Receiver - Allen V.' },
    { userId: 'U012', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 3, notes: 'Receiver - Nina S.' },
    { userId: 'U013', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 3, notes: 'Flex - Ivan Y.' },

    // ART Set 2 - Line 4
    { userId: 'U014', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 4, notes: 'Thrower - Jorge P.' },
    { userId: 'U015', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 4, notes: 'Receiver - Becky Q.' },
    { userId: 'U016', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 4, notes: 'Receiver - Ahmed X.' },
    { userId: 'U017', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, line: 4, notes: 'Flex - Liana E.' },

    // ART Set 2 - Driver
    { userId: 'U018', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ART', set: 2, notes: 'Driver - Owen D.' },

    // Manual Dock - Doors 330 to 350 (10 people)
    { userId: 'U019', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 330 - Tina F.' },
    { userId: 'U020', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 332 - Greg Z.' },
    { userId: 'U021', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 334 - Sheryl W.' },
    { userId: 'U022', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 336 - Dennis B.' },
    { userId: 'U023', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 338 - Monica C.' },
    { userId: 'U024', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 340 - Henry K.' },
    { userId: 'U025', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 342 - Lauren V.' },
    { userId: 'U026', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 344 - Brad S.' },
    { userId: 'U027', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 346 - Myra H.' },
    { userId: 'U028', role: 'WarehouseWorker', zone: 'Inbound', subzone: 'ManualDock', notes: 'Door 348 - Ron Y.' },

    // Support Roles
    { userId: 'U029', role: 'ICQA', zone: 'Inbound', notes: 'Cycle Count - Nadia A.' },
    { userId: 'U030', role: 'ProblemSolver', zone: 'Inbound', notes: 'Problem Solver - Theo G.' },
    { userId: 'U031', role: 'Trainer', zone: 'Inbound', notes: 'Trainer - Clara T.' },

    // Leads and OM
    { userId: 'U032', role: 'WarehouseWorkerLead', zone: 'Inbound', notes: 'Lead - JR' },
    { userId: 'U033', role: 'WarehouseWorkerLead', zone: 'Inbound', notes: 'Lead - Alicia M.' },
    { userId: 'U034', role: 'OperationalManager', zone: 'Inbound', notes: 'OM - Andrew' }
  ]

  return schedule
}