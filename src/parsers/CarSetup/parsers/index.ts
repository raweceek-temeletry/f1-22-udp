import {F1Parser} from '../../f1.parser';
import {PacketHeaderParser} from '../../PacketHeader/parser';
import {PacketCarSetupData} from '../types';

class CarSetupDataParser extends F1Parser {
  constructor() {
    super();
    this
      /*uint8*/ .uint8('m_frontWing')
      /*uint8*/ .uint8('m_rearWing')
      /*uint8*/ .uint8('m_onThrottle')
      /*uint8*/ .uint8('m_offThrottle')
      /*float*/ .floatle('m_frontCamber')
      /*float*/ .floatle('m_rearCamber')
      /*float*/ .floatle('m_frontToe')
      /*float*/ .floatle('m_rearToe')
      /*uint8*/ .uint8('m_frontSuspension')
      /*uint8*/ .uint8('m_rearSuspension')
      /*uint8*/ .uint8('m_frontAntiRollBar')
      /*uint8*/ .uint8('m_rearAntiRollBar')
      /*uint8*/ .uint8('m_frontSuspensionHeight')
      /*uint8*/ .uint8('m_rearSuspensionHeight')
      /*uint8*/ .uint8('m_brakePressure')
      /*uint8*/ .uint8('m_brakeBias')
      /*float*/ .floatle('m_rearLeftTyrePressure')
      /*float*/ .floatle('m_rearRightTyrePressure')
      /*float*/ .floatle('m_frontLeftTyrePressure')
      /*float*/ .floatle('m_frontRightTyrePressure')
      /*uint8*/ .uint8('m_ballast')
      /*float*/ .floatle('m_fuelLoad');
  }
}

export class PacketCarSetupDataParser extends F1Parser {
  data: PacketCarSetupData;

  constructor(buffer: Buffer) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carSetups', {
        length: 22,
        type: new CarSetupDataParser(),
      });

    this.data = this.fromBuffer(buffer) as PacketCarSetupData;
    this.data.m_header.m_sessionUID = this.data.m_header.m_sessionUID.toString();
  }
}
