Event Packet

This packet gives details of events that happen during the course of a session.

Frequency: When the event occurs
Size: 36 bytes
Version: 1

// The event details packet is different for each type of event.
// Make sure only the correct type is interpreted.
union EventDataDetails
{
    struct
    {
        uint8	vehicleIdx; // Vehicle index of car achieving fastest lap
        float	lapTime;    // Lap time is in seconds
    } FastestLap;

    struct
    {
        uint8   vehicleIdx; // Vehicle index of car retiring
    } Retirement;

    struct
    {
        uint8   vehicleIdx; // Vehicle index of team mate
    } TeamMateInPits;

    struct
    {
        uint8   vehicleIdx; // Vehicle index of the race winner
    } RaceWinner;

    struct
    {
    	uint8 penaltyType;		// Penalty type – see Appendices
        uint8 infringementType;		// Infringement type – see Appendices
        uint8 vehicleIdx;         	// Vehicle index of the car the penalty is applied to
        uint8 otherVehicleIdx;    	// Vehicle index of the other car involved
        uint8 time;               	// Time gained, or time spent doing action in seconds
        uint8 lapNum;             	// Lap the penalty occurred on
        uint8 placesGained;       	// Number of places gained by this
    } Penalty;

    struct
    {
        uint8 vehicleIdx;		// Vehicle index of the vehicle triggering speed trap
        float speed;      		// Top speed achieved in kilometres per hour
        uint8 isOverallFastestInSession; // Overall fastest speed in session = 1, otherwise 0
        uint8 isDriverFastestInSession;  // Fastest speed for driver in session = 1, otherwise 0
        uint8 fastestVehicleIdxInSession;// Vehicle index of the vehicle that is the fastest // in this session
        float fastestSpeedInSession;      // Speed of the vehicle that is the fastest
 // in this session
    } SpeedTrap;

    struct
    {
        uint8 numLights;			// Number of lights showing
    } StartLIghts;

    struct
    {
        uint8 vehicleIdx;                 // Vehicle index of the vehicle serving drive through
    } DriveThroughPenaltyServed;

    struct
    {
        uint8 vehicleIdx;                 // Vehicle index of the vehicle serving stop go
    } StopGoPenaltyServed;

    struct
    {
        uint32 flashbackFrameIdentifier;  // Frame identifier flashed back to
        float flashbackSessionTime;       // Session time flashed back to
    } Flashback;

    struct
    {
        uint32         m_buttonStatus;    // Bit flags specifying which buttons are being pressed
                                          // currently - see appendices
    } Buttons;
};

struct PacketEventData
{
    PacketHeader    	m_header;               	// Header
    
    uint8           	m_eventStringCode[4];   	// Event string code, see below
    EventDataDetails	m_eventDetails;         	// Event details - should be interpreted differently
                                                 // for each type
};
```


# Event String Codes
|Event|Code|Description
|---|---|---| 
|Session Started |“SSTA”| Sent when the session starts
|Session Ended|“SEND”|Sent when the session ends
|Fastest Lap|“FTLP”|When a driver achieves the fastest lap
|Retirement|“RTMT”|When a driver retires
|DRS enabled|“DRSE”|Race control have enabled DRS
|DRS disabled|“DRSD”|Race control have disabled DRS
|Team mate in pits|“TMPT”|Your team mate has entered the pits
|Chequered flag|“CHQF”|The chequered flag has been waved
|Race Winner|“RCWN”|The race winner is announced
|Penalty Issued|“PENA”|A penalty has been issued – details in event
|Speed Trap Triggered|“SPTP”|Speed trap has been triggered by fastest speed
|Start lights|“STLG”|Start lights – number shown
|Lights out|“LGOT”"Lights out
|Drive through served|“DTSV”|Drive through penalty served
|Stop go served|“SGSV”|Stop go penalty served
|Flashback|“FLBK”|Flashback activated
|Button status|“BUTN”|Button status changed
