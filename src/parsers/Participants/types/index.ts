import { PacketHeader } from '../../PacketHeader/types/index.js';

interface ParticipantData {
  /*uint8*/ m_aiControlled: number;
  /*uint8*/ m_driverId: number;
  /*uint8*/ m_networkId: number;
  /*uint8*/ m_teamId: number;
  /*uint8*/ m_myTeam: number;
  /*uint8*/ m_raceNumber: number;
  /*uint8*/ m_nationality: number;
  /*char[48]*/ m_name: String;
  /*uint8*/ m_yourTelemetry: number;
}

export interface PacketParticipantsData {
  /*PacketHeader*/ m_header: PacketHeader;
  /*uint8*/ m_numActiveCars: number;
  /*ParticipantData[20]*/ m_participants: ParticipantData[];
}
