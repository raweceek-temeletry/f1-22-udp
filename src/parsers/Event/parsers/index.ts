import {Parser} from 'binary-parser';
import {F1Parser} from '../../f1.parser';

import {PacketHeaderParser} from '../../PacketHeader/parser';
import {PacketEventData} from '../types';
export type EventCode = string;

export const EVENT_CODES: {[index: string]: EventCode} = {
  SessionStarted: 'SSTA',
  SessionEnded: 'SEND',
  FastestLap: 'FTLP',
  Retirement: 'RTMT',
  DRSEnabled: 'DRSE',
  DRSDisabled: 'DRSD',
  TeammateInPits: 'TMPT',
  ChequeredFlag: 'CHQF',
  RaceWinner: 'RCWN',
  PenaltyIssued: 'PENA',
  SpeedTrapTriggered: 'SPTP',
  StartLights: 'STLG',
  LightsOut: 'LGOT',
  DriveThroughServed: 'DTSV',
  StopGoServed: 'SGSV',
  Flashback: 'FLBK',
  ButtonStatus: 'BUTN',
};

export class FastestLapParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx').floatle('lapTime');
  }
}

export class RetirementParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx');
  }
}

export class TeamMateInPitsParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx');
  }
}

export class RaceWinnerParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx');
  }
}

export class PenaltyParser extends F1Parser {
  constructor() {
    super();

    this.endianess('little').uint8('penaltyType').uint8('infringementType').uint8('vehicleIdx').uint8('otherVehicleIdx').uint8('time').uint8('lapNum').uint8('placesGained');
  }
}

export class SpeedTrapParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx').floatle('speed').uint8('isOverallFastestInSession').uint8('isDriverFastestInSession').uint8('fastestVehicleIdxInSession').floatle('fastestSpeedInSession');
  }
}

export class StartLightsParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('numLights');
  }
}

export class StartLightsOutParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('LightsOut');
  }
}

export class DriveThroughPenaltyServedParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx');
  }
}

export class StopGoPenaltyServedParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint8('vehicleIdx');
  }
}

export class FlashbackParser extends F1Parser {
  constructor() {
    super();
    this.endianess('little').uint32le('flashbackFrameIdentifier').floatle('flashbackSessionTime');
  }
}

export class ButtonsParser extends F1Parser {
  constructor() {
    super();

    // if(binaryButtonFlags) {
    //     this.endianess('little')
    //         .bit1('bit1')
    //         .bit1('bit2')
    //         .bit1('bit3')
    //         .bit1('bit4')
    //         .bit1('bit5')
    //         .bit1('bit6')
    //         .bit1('bit7')
    //         .bit1('bit8')

    //         .bit1('Right_Stick_Right')
    //         .bit1('Right_Stick_Up')
    //         .bit1('Right_Stick_Down')
    //         .bit1('Special')

    //         .bit1('bit13')
    //         .bit1('bit14')
    //         .bit1('bit15')
    //         .bit1('bit16')

    //         .bit1('Options_or_Menu')
    //         .bit1('L1_or_LB')
    //         .bit1('R1_or_RB')
    //         .bit1('L2_or_LT')
    //         .bit1('R2_or_RT')
    //         .bit1('Left_Stick_Click')
    //         .bit1('Right_Stick_Click')
    //         .bit1('Right_Stick_Left')
    //         .bit1('Cross_or_A')
    //         .bit1('Triangle_or_Y')
    //         .bit1('Circle_or_B')
    //         .bit1('Square_or_X')
    //         .bit1('D_Pad_Left')
    //         .bit1('D_Pad_Right')
    //         .bit1('D_Pad_Up')
    //         .bit1('D_Pad_Down');
    // } else {
    this.endianess('little').uint32le('m_buttonStatus');
    // }
  }
}

export class PacketEventDataParser extends F1Parser {
  data: PacketEventData;

  constructor(buffer: Buffer) {
    super();

    this.endianess('little').nest('m_header', {type: new PacketHeaderParser()}).string('m_eventStringCode', {length: 4}).unpack2021Format(buffer);

    this.data = this.fromBuffer(buffer) as PacketEventData;
  }

  unpack2021Format = (buffer: Buffer) => {
    const eventStringCode = this.getEventStringCode(buffer);

    if (eventStringCode === EVENT_CODES.FastestLap) {
      this.nest('FastestLap', {type: new FastestLapParser()});
    } else if (eventStringCode === EVENT_CODES.Retirement) {
      this.nest('Retirement', {type: new RetirementParser()});
    } else if (eventStringCode === EVENT_CODES.TeammateInPits) {
      this.nest('TeamMateInPits', {type: new TeamMateInPitsParser()});
    } else if (eventStringCode === EVENT_CODES.RaceWinner) {
      this.nest('RaceWinner', {type: new RaceWinnerParser()});
    } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
      this.nest('Penalty', {type: new PenaltyParser()});
    } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
      this.nest('SpeedTrap', {type: new SpeedTrapParser()});
    } else if (eventStringCode === EVENT_CODES.StartLights) {
      this.nest('StartLights', {type: new StartLightsParser()});
    } else if (eventStringCode === EVENT_CODES.LightsOut) {
      this.nest('StartLightsOut', {type: new StartLightsOutParser()});
    } else if (eventStringCode === EVENT_CODES.DriveThroughServed) {
      this.nest('DriveThroughPenaltyServed', {type: new DriveThroughPenaltyServedParser()});
    } else if (eventStringCode === EVENT_CODES.StopGoServed) {
      this.nest('StopGoPenaltyServed', {type: new StopGoPenaltyServedParser()});
    } else if (eventStringCode === EVENT_CODES.Flashback) {
      this.nest('Flashback', {type: new FlashbackParser()});
    } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
      this.nest('Buttons', {type: new ButtonsParser()});
    }
  };

  getEventStringCode = (buffer: Buffer) => {
    const headerParser = new Parser().endianess('little').nest('m_header', {type: new PacketHeaderParser()}).string('m_eventStringCode', {length: 4});
    const {m_eventStringCode} = headerParser.parse(buffer);
    return m_eventStringCode;
  };
}
