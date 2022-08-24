import {PacketHeader} from '../../PacketHeader/types';

/*struct LapHistoryData
{
    uint32    m_lapTimeInMS;           // Lap time in milliseconds
    uint16    m_sector1TimeInMS;       // Sector 1 time in milliseconds
    uint16    m_sector2TimeInMS;       // Sector 2 time in milliseconds
    uint16    m_sector3TimeInMS;       // Sector 3 time in milliseconds
    uint8     m_lapValidBitFlags;      // 0x01 bit set-lap valid,      0x02 bit set-sector 1 valid
                                       // 0x04 bit set-sector 2 valid, 0x08 bit set-sector 3 valid
};*/
export interface LapHistoryData {
  m_lapTimeInMS: number;
  m_sector1TimeInMS: number;
  m_sector2TimeInMS: number;
  m_sector3TimeInMS: number;
  m_lapValidBitFlags: number;
}

/*struct TyreStintHistoryData
{
    uint8     m_endLap;                // Lap the tyre usage ends on (255 of current tyre)
    uint8     m_tyreActualCompound;    // Actual tyres used by this driver
    uint8     m_tyreVisualCompound;    // Visual tyres used by this driver
};*/
export interface TyreStintHistoryData {
  m_endLap: number;
  m_tyreActualCompound: number;
  m_tyreVisualCompound: number;
}

/*struct PacketSessionHistoryData
{
    PacketHeader  m_header;                   // Header
    uint8         m_carIdx;                   // Index of the car this lap data relates to
    uint8         m_numLaps;                  // Num laps in the data (including current partial lap)
    uint8         m_numTyreStints;            // Number of tyre stints in the data
    uint8         m_bestLapTimeLapNum;        // Lap the best lap time was achieved on
    uint8         m_bestSector1LapNum;        // Lap the best Sector 1 time was achieved on
    uint8         m_bestSector2LapNum;        // Lap the best Sector 2 time was achieved on
    uint8         m_bestSector3LapNum;        // Lap the best Sector 3 time was achieved on
    LapHistoryData          m_lapHistoryData[100];	// 100 laps of data max
    TyreStintHistoryData    m_tyreStintsHistoryData[8];
};*/
export interface PacketSessionHistoryData {
  m_header: PacketHeader;
  m_carIdx: number;
  m_numLaps: number;
  m_numTyreStints: number;
  m_bestLapTimeLapNum: number;
  m_bestSector1LapNum: number;
  m_bestSector2LapNum: number;
  m_bestSector3LapNum: number;
  m_lapHistoryData: LapHistoryData[];
  m_tyreStintsHistoryData: TyreStintHistoryData[];
}
