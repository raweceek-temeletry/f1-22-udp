import {PacketHeader} from '../../PacketHeader/types';

interface FinalClassificationData {
  /*uint8*/ m_position: number;
  /*uint8*/ m_numLaps: number;
  /*uint8*/ m_gridPosition: number;
  /*uint8*/ m_points: number;
  /*uint8*/ m_numPitStops: number;
  /*uint8*/ m_resultStatus: number;
  /*uint32*/ m_bestLapTimeInMS: number;
  /*double*/ m_totalRaceTime: number;
  /*uint8*/ m_penaltiesTime: number;
  /*uint8*/ m_numPenalties: number;
  /*uint8*/ m_numTyreStints: number;
  /*uint8[8]*/ m_tyreStintsActual: number[];
  /*uint8[8]*/ m_tyreStintsVisual: number[];
  /*uint8[8]*/ m_tyreStintsEndLaps: number[];
}

export interface PacketFinalClassificationData {
  /*PacketHeader*/ m_header: PacketHeader;
  /*uint8*/ m_numCars: number;
  /*FinalClassificationData[22]*/ m_classificationData: FinalClassificationData[];
}
