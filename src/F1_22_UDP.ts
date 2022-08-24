import {PacketCarStatusDataParser} from './parsers/CarStatus/parsers';
import {createSocket, RemoteInfo, Socket} from 'node:dgram';
import {EventEmitter} from 'node:stream';
import {packetSize} from './constants';
import {PacketCarSetupDataParser} from './parsers/CarSetup/parsers';
import {PacketCarTelemetryDataParser} from './parsers/CarTelemetry/parsers';
import {PacketEventDataParser} from './parsers/Event/parsers';
import {PacketLapDataParser} from './parsers/LapData/parsers';
import {PacketMotionDataParser} from './parsers/Motion/parsers';
import {PacketParticipantsParser} from './parsers/Participants/parsers';
import {PacketSessionDataParser} from './parsers/Session/parsers';
import {PacketFinalClassificationDataParser} from './parsers/FinalClassification/parsers';
import {PacketLobbyInfoDataParser} from './parsers/lobby/parsers';
import {PacketCarDamageDataParser} from './parsers/CarDamage/parsers';
import {PacketSessionHistoryDataParser} from './parsers/SessionHistory/parsers';

// types
import {PacketMotionData} from './parsers/Motion/types';
import {PacketSessionData} from './parsers/Session/types';
import {PacketLapData} from './parsers/LapData/types';
import {PacketCarDamageData} from './parsers/CarDamage/types';
import {PacketCarSetupData} from './parsers/CarSetup/types';
import {PacketCarStatusData} from './parsers/CarStatus/types';
import {PacketCarTelemetryData} from './parsers/CarTelemetry/types';
import {PacketEventData} from './parsers/Event/types';
import {PacketFinalClassificationData} from './parsers/FinalClassification/types';
import {PacketLobbyInfoData} from './parsers/lobby/types';
import {PacketParticipantsData} from './parsers/Participants/types';
import {PacketSessionHistoryData} from './parsers/SessionHistory/types';

export {PacketMotionData, PacketSessionData, PacketLapData, PacketCarDamageData, PacketCarSetupData, PacketCarStatusData, PacketCarTelemetryData, PacketEventData, PacketFinalClassificationData, PacketLobbyInfoData, PacketParticipantsData, PacketSessionHistoryData};

const DEFAULT_PORT = 20777;
const ADDRESS = 'localhost';

interface Options {
  port?: number;
  address?: string;
}

export declare interface F122UDP {
  /**
  @event `"motion"`
  @description `Frequency: Rate as specified in menus Size: 1464 bytes`
   ```ts
    client.on('motion', data => {
    const motion:PacketMotionData = data
    })
    ```
  */
  on(event: 'motion', listener: (data: PacketMotionData) => void): this; //0

  /**
  @event "session"
  @description `Frequency: 2 per second; Size: 632 bytes;`
   ```ts
    client.on('session', data => {
    const session:PacketSessionData = data
    })
    ```
  */
  on(event: 'session', listener: (data: PacketSessionData) => void): this; //1

  /**
  @event "lapData"
  @description `Frequency: Rate as specified in menus Size: 972 bytes`
   ```ts
    client.on('lapData', data => {
    const LapData:PacketLapData = data
    })
    ```
  */
  on(event: 'lapData', listener: (data: PacketLapData) => void): this; //2

  /**
  @event "event"
  @description `Frequency: When the event occurs; Size: 40 bytes;`
   ```ts
    client.on('event', data => {
    const event:PacketEventData = data
    })
    ```
  */
  on(event: 'event', listener: (data: PacketEventData) => void): this; //3

  /**
  @event "participants"
  @description  `Frequency: Every 5 seconds Size: 1257 bytes`
   ```ts
    client.on('participants', data => {
    const participants:PacketParticipantsData = data
    })
    ```
  */
  on(event: 'participants', listener: (data: PacketParticipantsData) => void): this; //4

  /**
  @event "carSetups"
  @description `Frequency: 2 per second Size: 1102 bytes`
   ```ts
    client.on('carSetups', data => {
    const carSetups:PacketCarSetupData = data
    })
    ```
  */
  on(event: 'carSetups', listener: (data: PacketCarSetupData) => void): this; //5

  /**
  @event "carTelemetry"
  @description `Frequency: Rate as specified in menus Size: 1347 bytes`
   ```ts
    client.on('carTelemetry', data => {
    const carTelemetry:PacketCarTelemetryData = data
    })
    ```
  */
  on(event: 'carTelemetry', listener: (data: PacketCarTelemetryData) => void): this; //6

  /**
  @event "carStatus"
  @description `Frequency: Rate as specified in menus Size: 1058 bytes`
   ```ts
    client.on('carStatus', data => {
    const carStatus:PacketCarStatusData = data
    })
    ```
  */
  on(event: 'carStatus', listener: (data: PacketCarStatusData) => void): this; //7

  /**
  @event "lobbyInfo"
  @description `Frequency: Two every second when in the lobby Size: 1191 bytes`
   ```ts
    client.on('lobbyInfo', data => {
    const lobbyInfo:PacketLobbyInfoData = data
    })
    ```
  */
  on(event: 'lobbyInfo', listener: (data: PacketLobbyInfoData) => void): this; //8

  /**
  @event "finalClassification"
  @description `Frequency: Once at the end of a race Size: 1015 bytes`
   ```ts
    client.on('finalClassification', data => {
    const finalClassification:PacketFinalClassificationData = data
    })
    ```
  */
  on(event: 'finalClassification', listener: (data: PacketFinalClassificationData) => void): this; //8

  /**
  @event "carDamage"
  @description `Frequency: 2 per second Size: 948 bytes`
   ```ts
    client.on('carDamage', data => {
    const carDamage:PacketCarDamageData = data
    })
    ```
  */
  on(event: 'carDamage', listener: (data: PacketCarDamageData) => void): this; //10

  /**
  @event "sessionHistory"
  @description `Frequency: 20 per second but cycling through cars Size: 1155 bytes`
   ```ts
    client.on('sessionHistory', data => {
    const sessionHistory:PacketSessionHistoryData = data
    })
    ```
  */
  on(event: 'sessionHistory', listener: (data: PacketSessionHistoryData) => void): this; //11
}
export class F122UDP extends EventEmitter {
  private socket: Socket;

  port: number;
  address: string;
  constructor(options: Options = {}) {
    super();

    const {port = DEFAULT_PORT, address = ADDRESS} = options;

    this.port = port;
    this.address = address;
    this.socket = createSocket('udp4');
  }

  // create socket
  start() {
    // if socket is not created, create it
    if (!this.socket) {
      this.socket = createSocket('udp4');
    }
    this.socket.bind({port: this.port, address: this.address});
    this.socket.on('listening', (): void => {
      this.socket.on('message', (msg: Buffer, rinfo: RemoteInfo): void => {
        switch (rinfo.size) {
          case packetSize.Motion: {
            const {data} = new PacketMotionDataParser(msg);
            this.emit('motion', data);

            break;
          }
          case packetSize.Session:
            {
              const {data} = new PacketSessionDataParser(msg);
              this.emit('session', data);
            }

            break;
          case packetSize.LapData: {
            const {data} = new PacketLapDataParser(msg);
            this.emit('lapData', data);

            break;
          }
          case packetSize.Event: {
            const {data} = new PacketEventDataParser(msg);

            this.emit('event', data);

            break;
          }
          case packetSize.Participants: {
            const {data} = new PacketParticipantsParser(msg);
            this.emit('participants', data);

            break;
          }
          case packetSize.CarSetups: {
            const {data} = new PacketCarSetupDataParser(msg);
            this.emit('carSetups', data);
            // log packet size

            break;
          }
          case packetSize.CarTelemetry: {
            const {data} = new PacketCarTelemetryDataParser(msg);
            this.emit('carTelemetry', data);

            break;
          }

          case packetSize.CarStatus: {
            const {data} = new PacketCarStatusDataParser(msg);
            this.emit('carStatus', data);
            break;
          }

          case packetSize.FinalClassification: {
            const {data} = new PacketFinalClassificationDataParser(msg);
            this.emit('finalClassification', data);
            break;
          }

          case packetSize.LobbyInfo:
            {
              const {data} = new PacketLobbyInfoDataParser(msg);
              this.emit('lobbyInfo', data);
            }
            break;
          case packetSize.CarDamage:
            {
              const {data} = new PacketCarDamageDataParser(msg);
              this.emit('carDamage', data);
              //12685950950652358499n
            }
            break;
          case packetSize.SessionHistory:
            {
              const {data} = new PacketSessionHistoryDataParser(msg);

              this.emit('sessionHistory', data);
            }
            break;
          default:
            break;
        }
      });
    });
  }

  stop() {
    this.socket.close();
    // process.exit(0);
  }
}
