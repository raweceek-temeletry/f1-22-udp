import {Parser} from 'binary-parser';
import {PacketMotionData} from 'Motion/types';
import {PacketSessionData} from 'Session/types';
import {PacketLapData} from 'LapData/types';
import {PacketCarDamageData} from 'CarDamage/types';
import {PacketCarSetupData} from 'CarSetup/types';
import {PacketCarStatusData} from 'CarStatus/types';
import {PacketCarTelemetryData} from 'CarTelemetry/types';
import {PacketEventData} from 'Event/types';
import {PacketFinalClassificationData} from 'FinalClassification/types';
import {PacketLobbyInfoData} from 'lobby/types';
import {PacketParticipantsData} from 'Participants/types';
import {PacketSessionHistoryData} from 'SessionHistory/types';

export class F1Parser extends Parser {
  fromBuffer(
    buffer: Buffer
  ): PacketMotionData | PacketSessionData | PacketLapData | PacketCarDamageData | PacketCarSetupData | PacketCarStatusData | PacketCarTelemetryData | PacketEventData | PacketFinalClassificationData | PacketLobbyInfoData | PacketParticipantsData | PacketSessionHistoryData {
    return this.parse(buffer);
  }
}
