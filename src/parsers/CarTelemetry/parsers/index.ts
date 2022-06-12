import {Parser} from 'binary-parser';
import {F1Parser} from '../../f1.parser';

export class CarTelemetryDataParser extends F1Parser {
  constructor() {
    super();
    this.uint16le('m_speed')
      .floatle('m_throttle')
      .floatle('m_steer')
      .floatle('m_brake')
      .uint8('m_clutch')
      .int8('m_gear')
      .uint16le('m_engineRPM')
      .uint8('m_drs')
      .uint8('m_revLightsPercent')
      .uint16le('m_revLightsBitValue')
      .array('m_brakesTemperature', {
        length: 4,
        type: new Parser().uint16le(''),
      })
      .array('m_tyresSurfaceTemperature', {
        length: 4,
        type: new Parser().uint8(''),
      })
      .array('m_tyresInnerTemperature', {
        length: 4,
        type: new Parser().uint8(''),
      })
      .uint16le('m_engineTemperature')

      .array('m_tyresPressure', {
        length: 4,
        type: new Parser().floatle(''),
      })
      .array('m_surfaceType', {
        length: 4,
        type: new Parser().uint8(''),
      });
  }
}

import {PacketHeaderParser} from '../../PacketHeader/parser';
import {PacketCarTelemetryData} from '../types';

export class PacketCarTelemetryDataParser extends F1Parser {
  data: PacketCarTelemetryData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(bigintEnabled),
      })

      .array('m_carTelemetryData', {
        length: 22,
        type: new CarTelemetryDataParser(),
      })

      .uint8('m_mfdPanelIndex')
      .uint8('m_mfdPanelIndexSecondaryPlayer')
      .int8('m_suggestedGear');

    this.data = this.fromBuffer(buffer) as PacketCarTelemetryData;
  }
}
