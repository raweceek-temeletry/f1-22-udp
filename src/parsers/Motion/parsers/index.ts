import { F1Parser } from '../../f1.parser.js';
import { PacketHeaderParser } from '../../PacketHeader/parser/index.js';
import { PacketMotionData } from '../types/index.js';

class CarMotionDataParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      .floatle('m_worldPositionX')
      .floatle('m_worldPositionY')
      .floatle('m_worldPositionZ')
      .floatle('m_worldVelocityX')
      .floatle('m_worldVelocityY')
      .floatle('m_worldVelocityZ')
      .int16le('m_worldForwardDirX')
      .int16le('m_worldForwardDirY')
      .int16le('m_worldForwardDirZ')
      .int16le('m_worldRightDirX')
      .int16le('m_worldRightDirY')
      .int16le('m_worldRightDirZ')
      .floatle('m_gForceLateral')
      .floatle('m_gForceLongitudinal')
      .floatle('m_gForceVertical')
      .floatle('m_yaw')
      .floatle('m_pitch')
      .floatle('m_roll');
  }
}

export class PacketMotionDataParser extends F1Parser {
  data: PacketMotionData;
  constructor(msg: Buffer) {
    super();
    this.nest('m_header', { type: new PacketHeaderParser() })
      .array('m_carMotionData', { type: new CarMotionDataParser(), length: 20 })
      .array('m_suspensionPosition', { type: 'floatle', length: 4 })
      .array('m_suspensionVelocity', { type: 'floatle', length: 4 })
      .array('m_suspensionAcceleration', { type: 'floatle', length: 4 })
      .array('m_wheelSpeed', { type: 'floatle', length: 4 })
      .array('m_wheelSlip', { type: 'floatle', length: 4 })
      .floatle('m_localVelocityX')
      .floatle('m_localVelocityY')
      .floatle('m_localVelocityZ')
      .floatle('m_angularVelocityX')
      .floatle('m_angularVelocityY')
      .floatle('m_angularVelocityZ')
      .floatle('m_angularAccelerationX')
      .floatle('m_angularAccelerationY')
      .floatle('m_angularAccelerationZ')
      .floatle('m_frontWheelsAngle');

    this.data = this.fromBuffer(msg) as PacketMotionData;
    this.data.m_header.m_sessionUID =
      this.data.m_header.m_sessionUID.toString();
  }
}
