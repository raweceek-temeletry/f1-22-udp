import { Parser } from 'binary-parser';
import { PacketMotionData } from './Motion/types/index.js';
import { PacketSessionData } from './Session/types/index.js';
import { PacketLapData } from './LapData/types/index.js';
import { PacketCarDamageData } from './CarDamage/types/index.js';
import { PacketCarSetupData } from './CarSetup/types/index.js';
import { PacketCarStatusData } from './CarStatus/types/index.js';
import { PacketCarTelemetryData } from './CarTelemetry/types/index.js';
import { PacketEventData } from './Event/types/index.js';
import { PacketFinalClassificationData } from './FinalClassification/types/index.js';
import { PacketLobbyInfoData } from './lobby/types/index.js';
import { PacketParticipantsData } from './Participants/types/index.js';
import { PacketSessionHistoryData } from './SessionHistory/types/index.js';

export class F1Parser extends Parser {
  fromBuffer(
    buffer: Buffer
  ):
    | PacketMotionData
    | PacketSessionData
    | PacketLapData
    | PacketCarDamageData
    | PacketCarSetupData
    | PacketCarStatusData
    | PacketCarTelemetryData
    | PacketEventData
    | PacketFinalClassificationData
    | PacketLobbyInfoData
    | PacketParticipantsData
    | PacketSessionHistoryData {
    return this.parse(buffer);
  }
}
