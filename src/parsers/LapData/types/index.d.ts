import {PacketHeader} from '../../PacketHeader/PacketHeader';
interface LapData {
  m_lastLapTimeInMS: number; // uint32le
  m_currentLapTimeInMS: number; // uint32le
  m_sector1TimeInMS: number; // uint16le
  m_sector2TimeInMS: number; // uint16le
  m_lapDistance: number; // floatle
  m_totalDistance: number; // floatle
  m_safetyCarDelta: number; // floatle
  m_carPosition: number; // uint8
  m_currentLapNum: number; // uint8
  m_pitStatus: number; // uint8
  m_numPitStops: number; // uint8
  m_sector: number; // uint8
  m_currentLapInvalid: number; // uint8
  m_penalties: number; // uint8
  m_warnings: number; // uint8
  m_numUnservedDriveThroughPens: number; // uint8
  m_numUnservedStopGoPens: number; // uint8
  m_gridPosition: number; // uint8
  m_driverStatus: number; // uint8
  m_resultStatus: number; // uint8
  m_pitLaneTimerActive: number; // uint8
  m_pitLaneTimeInLaneInMS: number; // uint16le
  m_pitStopTimerInMS: number; // uint16le
  m_pitStopShouldServePen: number; // uint8
}

export interface PacketLapData {
  m_header: PacketHeader; // PacketHeader
  m_lapData: LapData[]; // LapData[22]
  m_timeTrialPBCarIdx: number; // uint8
  m_timeTrialRivalCarIdx: number; // uint8
}
