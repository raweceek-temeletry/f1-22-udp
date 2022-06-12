import {createSocket,BindOptions,Socket,SocketType,SocketOptions,RemoteInfo} from 'node:dgram';
import {EventEmitter} from 'node:stream';
import {PacketMotionDataParser} from './parsers/Motion/parsers/MotionParser';
import {packetSize} from './constants'


export class F122UDP extends EventEmitter {
    private socket: Socket;
    constructor() {
        super();
        this.socket = createSocket("udp4");
    }

    // create socket
    start() {
        // if socket is not created, create it
        if(!this.socket) {
            this.socket = createSocket("udp4");
        }
        this.socket.bind({port: 20777,address: "192.168.88.200"});
        console.log("start");
        this.socket.on("listening",(): void => {
            console.log("F122UDP listening on: " + this.socket.address().address,this.socket.address().port);
            this.socket.on("message",(msg: Buffer,rinfo: RemoteInfo): void => {
                switch(rinfo.size) {
                    case packetSize.Motion:
                        const {data} = new PacketMotionDataParser(msg)
                        this.emit("motion",data);
                        break;
                    case packetSize.Session:
                        // console.log("Session");

                        break;
                    case packetSize.LapData:
                        // console.log("LapData");
                        break;
                    case packetSize.Event:
                        // console.log("Event");
                        break;
                    case packetSize.Participants:
                        // console.log("Participants");
                        break;
                    case packetSize.CarSetups:
                        // console.log("CarSetups");
                        break;
                    case packetSize.CarTelemetry:
                        // console.log("CarTelemetry");
                        break;
                    case packetSize.CarStatus:
                        // console.log("CarStatus");
                        break;
                    case packetSize.LobbyInfo:
                        // console.log("LobbyInfo");
                        break;
                    case packetSize.CarDamage:
                        // console.log("CarDamage");
                        break;
                    case packetSize.SessionHistory:
                        // console.log("SessionHistory");
                        break;
                    default:
                        // console.log("Unknown");
                        break;
                }


            });

        })

    }

    stop() {
        console.log("stop");


        this.socket.close();
        process.exit(0);
    }

}


// process exit on ctrl+c
process.on('SIGINT',() => {
    console.log('SIGINT');
    process.exit(1);
}
);
