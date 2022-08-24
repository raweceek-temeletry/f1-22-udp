import {PacketHeader} from '../../PacketHeader/types';

interface CarSetupData {
  /*uint8*/ m_frontWing: number;
  /*uint8*/ m_rearWing: number;
  /*uint8*/ m_onThrottle: number;
  /*uint8*/ m_offThrottle: number;
  /*float*/ m_frontCamber: number;
  /*float*/ m_rearCamber: number;
  /*float*/ m_frontToe: number;
  /*float*/ m_rearToe: number;
  /*uint8*/ m_frontSuspension: number;
  /*uint8*/ m_rearSuspension: number;
  /*uint8*/ m_frontAntiRollBar: number;
  /*uint8*/ m_rearAntiRollBar: number;
  /*uint8*/ m_frontSuspensionHeight: number;
  /*uint8*/ m_rearSuspensionHeight: number;
  /*uint8*/ m_brakePressure: number;
  /*uint8*/ m_brakeBias: number;
  /*float*/ m_rearLeftTyrePressure: number;
  /*float*/ m_rearRightTyrePressure: number;
  /*float*/ m_frontLeftTyrePressure: number;
  /*float*/ m_frontRightTyrePressure: number;
  /*uint8*/ m_ballast: number;
  /*float*/ m_fuelLoad: number;
}

export interface PacketCarSetupData {
  /*PacketHeader*/ m_header: PacketHeader;
  /*CarSetupData*/ m_carSetups: CarSetupData[];
}
