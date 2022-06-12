export enum packetID {
  'Motion' = 0,
  'Session' = 1,
  'LapData' = 2,
  'Event' = 3,
  'Participants' = 4,
  'CarSetups' = 5,
  'CarTelemetry' = 6,
  'CarStatus' = 7,
  'FinalClassification' = 8,
  'LobbyInfo' = 9,
  'CarDamage' = 10,
  'SessionHistory' = 11,
  'Unknown' = 12,
}

export enum packetSize {
  Motion = 1464,
  Session = 632,
  LapData = 972, // 972 for 22
  Event = 36,
  Participants = 1257,
  CarSetups = 1102,
  CarTelemetry = 1347,
  CarStatus = 1058,
  LobbyInfo = 1191,
  CarDamage = 882,
  SessionHistory = 1155,
}
