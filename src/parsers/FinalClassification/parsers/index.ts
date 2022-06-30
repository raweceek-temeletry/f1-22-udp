import {Parser} from 'binary-parser';
import {PacketFinalClassificationData} from 'FinalClassification/types';
import {PacketHeaderParser} from 'PacketHeader/parser';
import {F1Parser} from '../../f1.parser';

export class FinalClassificationDataParser extends F1Parser {
  constructor() {
    super();

    this.uint8('m_position')
      .uint8('m_numLaps')
      .uint8('m_gridPosition')
      .uint8('m_points')
      .uint8('m_numPitStops')
      .uint8('m_resultStatus')

      .uint32le('m_bestLapTimeInMS')
      .doublele('m_totalRaceTime')

      .uint8('m_penaltiesTime')
      .uint8('m_numPenalties')
      .uint8('m_numTyreStints')

      .array('m_tyreStintsActual', {
        length: 8,
        type: new Parser().uint8(''),
      })
      .array('m_tyreStintsVisual', {
        length: 8,
        type: new Parser().uint8(''),
      })
      .array('m_tyreStintsEndLaps', {
        length: 8,
        type: new Parser().uint8(''),
      });
  }
}

export class PacketFinalClassificationDataParser extends F1Parser {
  data: PacketFinalClassificationData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(bigintEnabled),
      })
      .uint8('m_numCars')
      .array('m_classificationData', {
        length: 22,
        type: new FinalClassificationDataParser(),
      });

    this.data = this.fromBuffer(buffer) as PacketFinalClassificationData;
  }
}
