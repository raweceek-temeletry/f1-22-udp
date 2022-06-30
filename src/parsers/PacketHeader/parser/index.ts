import {F1Parser} from '../../f1.parser';

export class PacketHeaderParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      .uint16le('m_packetFormat')
      .uint8('m_gameMajorVersion')
      .uint8('m_gameMinorVersion')
      .uint8('m_packetVersion')
      .uint8('m_packetId')
      .uint64le('m_sessionUID')
      .floatle('m_sessionTime')
      .uint32le('m_frameIdentifier')
      .uint8('m_playerCarIndex')
      .uint8('m_secondaryPlayerCarIndex');
  }
}
