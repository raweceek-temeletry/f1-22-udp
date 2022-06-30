
Lobby Info Packet

This packet details the players currently in a multiplayer lobby. It details each player’s selected car, any AI involved in the game and also the ready status of each of the participants.

Frequency: Two every second when in the lobby
Size: 1191 bytes
Version: 1

struct LobbyInfoData
{
    uint8     m_aiControlled;            // Whether the vehicle is AI (1) or Human (0) controlled
    uint8     m_teamId;                  // Team id - see appendix (255 if no team currently selected)
    uint8     m_nationality;             // Nationality of the driver
    char      m_name[48];		// Name of participant in UTF-8 format – null terminated
                                         // Will be truncated with ... (U+2026) if too long
    uint8     m_carNumber;               // Car number of the player
    uint8     m_readyStatus;             // 0 = not ready, 1 = ready, 2 = spectating
};

struct PacketLobbyInfoData
{
    PacketHeader    m_header;                       // Header

    // Packet specific data
    uint8               m_numPlayers;               // Number of players in the lobby data
    LobbyInfoData       m_lobbyPlayers[22];
};