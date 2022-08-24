import {PacketHeader} from 'PacketHeader/types';

export interface LobbyInfoData {
  m_aiController: number;
  m_teamId: number;
  m_nationality: number;
  m_name: string;
  m_carNumber: number;
  m_readyStatus: number;
}

export interface PacketLobbyInfoData {
  m_header: PacketHeader;
  m_numPlayers: number;
  m_lobbyPlayers: LobbyInfoData[];
}
