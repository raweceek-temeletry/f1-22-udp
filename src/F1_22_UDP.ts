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

const DEFAULT_PORT = 20777;
const ADDRESS = 'localhost';
const fs = require('fs');
fs.mkdirSync('carStatusMsg', {recursive: true});

interface Options {
  port?: number;
  address?: string;
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
    console.log('start');
    this.socket.on('listening', (): void => {
      console.log('listening');
      console.log('F122UDP listening on: ', this.socket.address().address, ':', this.socket.address().port);
      this.socket.on('message', (msg: Buffer, rinfo: RemoteInfo): void => {
        switch (rinfo.size) {
          case packetSize.Motion: {
            const {data} = new PacketMotionDataParser(msg);
            this.emit('motion', data);

            break;
          }
          case packetSize.Session:
            {
              // console.log('Session');
              const {data} = new PacketSessionDataParser(msg);
              this.emit('session', data);
            }

            break;
          case packetSize.LapData: {
            const {data} = new PacketLapDataParser(msg);
            this.emit('lap', data);
            // console.log("lap");

            break;
          }
          case packetSize.Event: {
            const {data} = new PacketEventDataParser(msg);
            // console.log("event");

            this.emit('event', data);

            break;
          }
          case packetSize.Participants: {
            const {data} = new PacketParticipantsParser(msg);
            this.emit('participants', data);
            // console.log("participants");
            // console.log(data);

            break;
          }
          case packetSize.CarSetups: {
            // console.log("CarSetups");
            const {data} = new PacketCarSetupDataParser(msg, false);
            this.emit('carSetups', data);
            // console.log("carSetups");
            // log packet size

            // console.log(data);

            break;
          }
          case packetSize.CarTelemetry: {
            // console.log("CarTelemetry");
            const {data} = new PacketCarTelemetryDataParser(msg, false);
            this.emit('carTelemetry', data);
            // console.log("carTelemetry");
            // console.log(data);

            break;
          }

          case packetSize.CarStatus: {
            // console.log("CarStatus");
            const {data} = new PacketCarStatusDataParser(msg, true);
            this.emit('carStatus', data);
            break;
          }

          case packetSize.Finallassification: {
            const {data} = new PacketFinalClassificationDataParser(msg, true);
            this.emit('finallassification', data);
            console.log('finallassification');
            console.log(data);
            break;
          }

          case packetSize.LobbyInfo:
            {
              // console.log('LobbyInfo');
              const {data} = new PacketLobbyInfoDataParser(msg, true);
              this.emit('lobbyInfo', data);
              // console.log(data);
            }
            break;
          case packetSize.CarDamage:
            {
              // console.log("CarDamage"); // ok
              const {data} = new PacketCarDamageDataParser(msg, true);
              this.emit('carDamage', data);
              // console.log(data);
            }
            break;
          case packetSize.SessionHistory:
            // console.log("SessionHistory");
            break;
          default:
            console.log('Unknown');
            break;
        }
      });
    });
  }

  stop() {
    console.log('stop');

    this.socket.close();
    // process.exit(0);
  }
}

// process exit on ctrl+c
process.on('SIGINT', () => {
  console.log('SIGINT');
  //   process.exit(1);
});
