import { PacketHeader } from '../../PacketHeader/types/index.js';

export interface CarDamageData {
  m_tyresWear: number[];
  m_tyresDamage: number[];
  m_brakesDamage: number[];
  m_frontLeftWingDamage: number;
  m_frontRightWingDamage: number;
  m_rearWingDamage: number;
  m_floorDamage: number;
  m_diffuserDamage: number;
  m_sidepodDamage: number;
  m_drsFault: number;
  m_ersFault: number;
  m_gearBoxDamage: number;
  m_engineDamage: number;
  m_engineMGUHWear: number;
  m_engineESWear: number;
  m_engineCEWear: number;
  m_engineICEWear: number;
  m_engineMGUKWear: number;
  m_engineTCWear: number;
  m_engineBlown: number;
  m_engineSeized: number;
}

export interface PacketCarDamageData {
  m_header: PacketHeader;
  m_carDamageData: CarDamageData[];
}
