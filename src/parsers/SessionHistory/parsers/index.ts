import {F1Parser} from '../../f1.parser';

import {PacketHeaderParser} from '../../PacketHeader/parser';
import {PacketSessionHistoryData} from '../../SessionHistory/types';

class LapHistoryDataParser extends F1Parser {
  constructor() {
    super();
    this.uint32le('m_lapTimeInMS').uint16le('m_sector1TimeInMS').uint16le('m_sector2TimeInMS').uint16le('m_sector3TimeInMS').uint8('m_lapValidBitFlags');
  }
}

export class PacketSessionHistoryDataParser extends F1Parser {
  data: PacketSessionHistoryData;

  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .uint8('m_carIdx')
      .uint8('m_numLaps')
      .uint8('m_numTyreStints')
      .uint8('m_bestLapTimeLapNum')
      .uint8('m_bestSector1LapNum')
      .uint8('m_bestSector2LapNum')
      .uint8('m_bestSector3LapNum')
      .array('m_lapHistoryData', {
        length: 100,
        type: new LapHistoryDataParser(),
      })

      .array('m_tyreStintsHistoryData', {
        length: 8,
        type: new TyreStintHistoryDataParser(),
      });

    this.data = this.fromBuffer(buffer) as PacketSessionHistoryData;
    this.data.m_header.m_sessionUID = this.data.m_header.m_sessionUID.toString();
  }
}

class TyreStintHistoryDataParser extends F1Parser {
  constructor() {
    super();
    this.uint8('m_endLap').uint8('m_tyreActualCompound').uint8('m_tyreVisualCompound');
  }
}
