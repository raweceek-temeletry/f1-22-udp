import {F1Parser} from '../../f1.parser';

export class LapDataParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      /*uint32le */ .uint32le('m_lastLapTimeInMS')
      /*uint32le */ .uint32le('m_currentLapTimeInMS')
      /*uint16le */ .uint16le('m_sector1TimeInMS')
      /*uint16le */ .uint16le('m_sector2TimeInMS')
      /*floatle */ .floatle('m_lapDistance')
      /*floatle */ .floatle('m_totalDistance')
      /*floatle */ .floatle('m_safetyCarDelta')
      /*uint8 */ .uint8('m_carPosition')
      /*uint8 */ .uint8('m_currentLapNum')
      /*uint8 */ .uint8('m_pitStatus')
      /*uint8 */ .uint8('m_numPitStops')
      /*uint8 */ .uint8('m_sector')
      /*uint8 */ .uint8('m_currentLapInvalid')
      /*uint8 */ .uint8('m_penalties')
      /*uint8 */ .uint8('m_warnings')
      /*uint8 */ .uint8('m_numUnservedDriveThroughPens')
      /*uint8 */ .uint8('m_numUnservedStopGoPens')
      /*uint8 */ .uint8('m_gridPosition')
      /*uint8 */ .uint8('m_driverStatus')
      /*uint8 */ .uint8('m_resultStatus')
      /*uint8 */ .uint8('m_pitLaneTimerActive')
      /*uint16le */ .uint16le('m_pitLaneTimeInLaneInMS')
      /*uint16le */ .uint16le('m_pitStopTimerInMS')
      /*uint8 */ .uint8('m_pitStopShouldServePen');
  }
}

import {PacketHeaderParser} from '../../PacketHeader/parser';
import {PacketLapData} from '../types';

export class PacketLapDataParser extends F1Parser {
  data: PacketLapData;

  constructor(buffer: Buffer) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_lapData', {
        length: 22,
        type: new LapDataParser(),
      })
      /*uint8*/ .uint8('m_timeTrialPBCarIdx')
      /*uint8*/ .uint8('m_timeTrialRivalCarIdx');

    this.data = this.fromBuffer(buffer) as PacketLapData;
    this.data.m_header.m_sessionUID = this.data.m_header.m_sessionUID.toString();
  }
}
