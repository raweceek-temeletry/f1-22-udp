import {PacketLobbyInfoData} from 'lobby/types';
import {F1Parser} from '../../f1.parser';

export class LobbyInfoDataParser extends F1Parser {
  constructor() {
    super();
    this.uint8('m_aiControlled').uint8('m_teamId').uint8('m_nationality').string('m_name', {length: 48, stripNull: true}).uint8('m_carNumber').uint8('m_readyStatus');
  }
}

import {PacketHeaderParser} from '../../PacketHeader/parser';

export class PacketLobbyInfoDataParser extends F1Parser {
  data: PacketLobbyInfoData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(bigintEnabled),
      })
      .uint8('m_numPlayers')
      .array('m_lobbyPlayers', {length: 22, type: new LobbyInfoDataParser()});

    this.data = this.fromBuffer(buffer) as PacketLobbyInfoData;
  }
}
