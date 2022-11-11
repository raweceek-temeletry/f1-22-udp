import { PacketHeader } from '../../PacketHeader/types/index.js';

export interface FastestLap {
  vehicleIdx: number;
  lapTime: number;
}

export interface Retirement {
  vehicleIdx: number;
}

export interface TeamMateInPits {
  vehicleIdx: number;
}

export interface RaceWinner {
  vehicleIdx: number;
}

export interface Penalty {
  penaltyType: number;
  infringementType: number;
  vehicleIdx: number;
  otherVehicleIdx: number;
  time: number;
  lapNum: number;
  placesGained: number;
}

export interface SpeedTrap {
  vehicleIdx: number;
  speed: number;
  overallFastestInSession: number;
  driverFastestInSession: number;
}

export interface StartLIghts {
  numLights: number;
}

export interface StartLightsOutParser {
  numLights: number;
}

export interface DriveThroughPenaltyServed {
  vehicleIdx: number;
}

export interface StopGoPenaltyServed {
  vehicleIdx: number;
}

export interface Flashback {
  flashbackFrameIdentifier: number;
  flashbackSessionTime: number;
}

export interface Buttons {
  m_buttonStatus?: number;
  bit1?: number;
  bit2?: number;
  bit3?: number;
  bit4?: number;
  bit5?: number;
  bit6?: number;
  bit7?: number;
  bit8?: number;
  Right_Stick_Right?: number;
  Right_Stick_Up?: number;
  Right_Stick_Down?: number;
  Special?: number;
  bit13?: number;
  bit14?: number;
  bit15?: number;
  bit16?: number;
  Options_or_Menu?: number;
  L1_or_LB?: number;
  R1_or_RB?: number;
  L2_or_LT?: number;
  R2_or_RT?: number;
  Left_Stick_Click?: number;
  Right_Stick_Click?: number;
  Right_Stick_Left?: number;
  Cross_or_A?: number;
  Triangle_or_Y?: number;
  Circle_or_B?: number;
  Square_or_X?: number;
  D_Pad_Left?: number;
  D_Pad_Right?: number;
  D_Pad_Up?: number;
  D_Pad_Down?: number;
}

/*
  struct PacketEventData
  {
      PacketHeader    	m_header;               	// Header
      uint8           	m_eventStringCode[4];   	// Event string code, see below
      EventDataDetails	m_eventDetails;         	// Event details - should be interpreted differently
                                                   // for each type
  };
  */
export interface PacketEventData {
  m_header: PacketHeader;
  m_eventStringCode: string;
  FastestLap?: FastestLap;
  Retirement?: Retirement;
  TeamMateInPits?: TeamMateInPits;
  RaceWinner?: RaceWinner;
  Penalty?: Penalty;
  SpeedTrap?: SpeedTrap;
  StartLIghts?: StartLIghts;
  StartLightsOut?: StartLightsOutParser;
  DriveThroughPenaltyServed?: DriveThroughPenaltyServed;
  StopGoPenaltyServed?: StopGoPenaltyServed;
  Flashback?: Flashback;
  Buttons?: Buttons;
}

export interface ButtonFlags {
  bit1: number;
  bit2: number;
  bit3: number;
  bit4: number;
  bit5: number;
  bit6: number;
  bit7: number;
  bit8: number;
  Right_Stick_Right: number;
  Right_Stick_Up: number;
  Right_Stick_Down: number;
  Special: number;
  bit13: number;
  bit14: number;
  bit15: number;
  bit16: number;
  Options_or_Menu: number;
  L1_or_LB: number;
  R1_or_RB: number;
  L2_or_LT: number;
  R2_or_RT: number;
  Left_Stick_Click: number;
  Right_Stick_Click: number;
  Right_Stick_Left: number;
  Cross_or_A: number;
  Triangle_or_Y: number;
  Circle_or_B: number;
  Square_or_X: number;
  D_Pad_Left: number;
  D_Pad_Right: number;
  D_Pad_Up: number;
  D_Pad_Down: number;
}
