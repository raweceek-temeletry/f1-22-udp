import { PacketHeader } from '../../PacketHeader/types/index.js';

export interface CarStatusData {
  /*uint8*/ m_tractionControl: number;
  /*uint8*/ m_antiLockBrakes: number;
  /*uint8*/ m_fuelMix: number;
  /*uint8*/ m_frontBrakeBias: number;
  /*uint8*/ m_pitLimiterStatus: number;
  /*float*/ m_fuelInTank: number;
  /*float*/ m_fuelCapacity: number;
  /*float*/ m_fuelRemainingLaps: number;
  /*uint16*/ m_maxRPM: number;
  /*uint16*/ m_idleRPM: number;
  /*uint8*/ m_maxGears: number;
  /*uint8*/ m_drsAllowed: number;
  /*uint16*/ m_drsActivationDistance: number;
  /*uint8*/ m_actualTyreCompound: number;
  /*uint8*/ m_visualTyreCompound: number;
  /*uint8*/ m_tyresAgeLaps: number;
  /*int8*/ m_vehicleFiaFlags: number;
  /*float*/ m_ersStoreEnergy: number;
  /*uint8*/ m_ersDeployMode: number;
  /*float*/ m_ersHarvestedThisLapMGUK: number;
  /*float*/ m_ersHarvestedThisLapMGUH: number;
  /*float*/ m_ersDeployedThisLap: number;
  /*uint8*/ m_networkPaused: number;
}

export interface PacketCarStatusData {
  m_header: PacketHeader;
  m_carStatusData: CarStatusData[];
}
