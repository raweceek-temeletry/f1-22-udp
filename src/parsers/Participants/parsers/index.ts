import {F1Parser} from '../../f1.parser';
import {PacketHeaderParser} from '../../../parsers/PacketHeader/parser';
import {PacketParticipantsData} from '../types';
class ParticipantParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      //uint8
      .uint8('m_aiControlled')
      //uint8
      .uint8('m_driverId')
      //uint8
      .uint8('m_networkId')
      //uint8
      .uint8('m_teamId')
      //uint8
      .uint8('m_myTeam')
      //uint8
      .uint8('m_raceNumber')
      //uint8
      .uint8('m_nationality')
      // string
      .string('m_name', {length: 48, stripNull: true})
      // uint8
      .uint8('m_yourTelemetry');
  }
}

export class PacketParticipantsParser extends F1Parser {
  data: PacketParticipantsData;
  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
      //PacketHeader
      .nest('m_header', {type: new PacketHeaderParser()})
      //uint8
      .uint8('m_numActiveCars')
      .array('m_participants', {type: new ParticipantParser(), length: 22});

    this.data = this.fromBuffer(buffer);
  }
}
