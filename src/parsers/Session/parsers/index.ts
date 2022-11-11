import { F1Parser } from '../../f1.parser.js';
import { PacketHeaderParser } from '../../PacketHeader/parser/index.js';
import { PacketSessionData } from '../types/index.js';

class MarshalZoneParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').floatle('m_zoneStart').int8('m_zoneFlag');
  }
}

/*struct WeatherForecastSample{
    uint8     m_sessionType;              // 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P, 5 = Q1
    uint8     m_timeOffset;               // Time in minutes the forecast is for
    uint8     m_weather;                  // Weather - 0 = clear, 1 = light cloud, 2 = overcast
    int8      m_trackTemperature;         // Track temp. in degrees Celsius
    int8      m_trackTemperatureChange;   // Track temp. change – 0 = up, 1 = down, 2 = no change
    int8      m_airTemperature;           // Air temp. in degrees celsius
    int8      m_airTemperatureChange;     // Air temp. change – 0 = up, 1 = down, 2 = no change
    uint8     m_rainPercentage;           // Rain percentage (0-100)
};*/
class WeatherForecastSampleParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little')
      //uint8
      .uint8('m_sessionType')
      //uint8
      .uint8('m_timeOffset')
      //uint8
      .uint8('m_weather')
      //int8
      .int8('m_trackTemperature')
      //int8
      .int8('m_trackTemperatureChange')
      //int8
      .int8('m_airTemperature')
      //int8
      .int8('m_airTemperatureChange')
      //uint8
      .uint8('m_rainPercentage');
  }
}

/**
 * struct PacketSessionData
{
    PacketHeader    m_header;               	// Header
    uint8           m_weather;              	// Weather - 0 = clear, 1 = light cloud, 2 = overcast
    int8	            m_trackTemperature;    	// Track temp. in degrees celsius
    int8	            m_airTemperature;      	// Air temp. in degrees celsius
    uint8           m_totalLaps;           	// Total number of laps in this race
    uint16le          m_trackLength;           	// Track length in metres
    uint8           m_sessionType;         	// 0 = unknown, 1 = P1, 2 = P2, 3 = P3, 4 = Short P
    int8            m_trackId;         		// -1 for unknown, see appendix
    uint8           m_formula;                  	// Formula, 0 = F1 Modern, 1 = F1 Classic, 2 = F2,
    uint16le          m_sessionTimeLeft;    	// Time left in session in seconds
    uint16le          m_sessionDuration;     	// Session duration in seconds
    uint8           m_pitSpeedLimit;      	// Pit speed limit in kilometres per hour
    uint8           m_gamePaused;                // Whether the game is paused – network game only
    uint8           m_isSpectating;        	// Whether the player is spectating
    uint8           m_spectatorCarIndex;  	// Index of the car being spectated
    uint8           m_sliProNativeSupport;	// SLI Pro support, 0 = inactive, 1 = active
    uint8           m_numMarshalZones;         	// Number of marshal zones to follow
    MarshalZone     m_marshalZones[21];         	// List of marshal zones – max 21
    uint8           m_safetyCarStatus;           // 0 = no safety car, 1 = full
    uint8           m_networkGame;               // 0 = offline, 1 = online
    uint8           m_numWeatherForecastSamples; // Number of weather samples to follow
    WeatherForecastSample m_weatherForecastSamples[56];   // Array of weather forecast samples
    uint8           m_forecastAccuracy;          // 0 = Perfect, 1 = Approximate
    uint8           m_aiDifficulty;              // AI Difficulty rating – 0-110
    uint32le          m_seasonLinkIdentifier;      // Identifier for season - persists across saves
    uint32le          m_weekendLinkIdentifier;     // Identifier for weekend - persists across saves
    uint32le          m_sessionLinkIdentifier;     // Identifier for session - persists across saves
    uint8           m_pitStopWindowIdealLap;     // Ideal lap to pit on for current strategy (player)
    uint8           m_pitStopWindowLatestLap;    // Latest lap to pit on for current strategy (player)
    uint8           m_pitStopRejoinPosition;     // Predicted position to rejoin at (player)
    uint8           m_steeringAssist;            // 0 = off, 1 = on
    uint8           m_brakingAssist;             // 0 = off, 1 = low, 2 = medium, 3 = high
    uint8           m_gearboxAssist;             // 1 = manual, 2 = manual & suggested gear, 3 = auto
    uint8           m_pitAssist;                 // 0 = off, 1 = on
    uint8           m_pitReleaseAssist;          // 0 = off, 1 = on
    uint8           m_ERSAssist;                 // 0 = off, 1 = on
    uint8           m_DRSAssist;                 // 0 = off, 1 = on
    uint8           m_dynamicRacingLine;         // 0 = off, 1 = corners only, 2 = full
    uint8           m_dynamicRacingLineType;     // 0 = 2D, 1 = 3D
    uint8           m_gameMode;                  // Game mode id - see appendix
    uint8           m_ruleSet;                   // Ruleset - see appendix
    uint32le          m_timeOfDay;                 // Local time of day - minutes since midnight
    uint8           m_sessionLength;             // 0 = None, 2 = Very Short, 3 = Short, 4 = Medium
// 5 = Medium Long, 6 = Long, 7 = Full
};
*/

export class PacketSessionDataParser extends F1Parser {
  data: PacketSessionData;
  constructor(buffer: Buffer) {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      //uint8
      .uint8('m_weather')
      //int8
      .int8('m_trackTemperature')
      //int8
      .int8('m_airTemperature')
      //uint8
      .uint8('m_totalLaps')
      //uint16le
      .uint16le('m_trackLength')
      //uint8
      .uint8('m_sessionType')
      //int8
      .int8('m_trackId')
      //uint8
      .uint8('m_formula')
      //uint16le
      .uint16le('m_sessionTimeLeft')
      //uint16le
      .uint16le('m_sessionDuration')
      //uint8
      .uint8('m_pitSpeedLimit')
      //uint8
      .uint8('m_gamePaused')
      //uint8
      .uint8('m_isSpectating')
      //uint8
      .uint8('m_spectatorCarIndex')
      //uint8
      .uint8('m_sliProNativeSupport')
      //uint8
      .uint8('m_numMarshalZones')
      //MarshalZone
      .array('m_marshalZones', { type: new MarshalZoneParser(), length: 21 })
      //uint8
      .uint8('m_safetyCarStatus')
      //uint8
      .uint8('m_networkGame')
      //uint8
      .uint8('m_numWeatherForecastSamples')
      //WeatherForecastSample
      .array('m_weatherForecastSamples', {
        type: new WeatherForecastSampleParser(),
        length: 56,
      })
      //uint8
      .uint8('m_forecastAccuracy')
      //uint8
      .uint8('m_aiDifficulty')
      //uint32le
      .uint32le('m_seasonLinkIdentifier')
      //uint32le
      .uint32le('m_weekendLinkIdentifier')
      //uint32le
      .uint32le('m_sessionLinkIdentifier')
      //uint8
      .uint8('m_pitStopWindowIdealLap')
      //uint8
      .uint8('m_pitStopWindowLatestLap')
      //uint8
      .uint8('m_pitStopRejoinPosition')
      //uint8
      .uint8('m_steeringAssist')
      //uint8
      .uint8('m_brakingAssist')
      //uint8
      .uint8('m_gearboxAssist')
      //uint8
      .uint8('m_pitAssist')
      //uint8
      .uint8('m_pitReleaseAssist')
      //uint8
      .uint8('m_ERSAssist')
      //uint8
      .uint8('m_DRSAssist')
      //uint8
      .uint8('m_dynamicRacingLine')
      //uint8
      .uint8('m_dynamicRacingLineType')
      //uint8
      .uint8('m_gameMode')
      //uint8
      .uint8('m_ruleSet')
      //uint32le
      .uint32le('m_timeOfDay')
      //uint8
      .uint8('m_sessionLength');

    this.data = this.fromBuffer(buffer) as PacketSessionData;
    this.data.m_header.m_sessionUID =
      this.data.m_header.m_sessionUID.toString();
  }
}
