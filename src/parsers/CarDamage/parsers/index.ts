import {Parser} from 'binary-parser';
import {PacketCarDamageData} from 'CarDamage/types';
import {PacketHeaderParser} from '../../PacketHeader/parser';

import {F1Parser} from '../../f1.parser';

export class CarDamageDataParser extends F1Parser {
  constructor() {
    super();
    this.array('m_tyresWear', {length: 4, type: new Parser().floatle('')})
      .array('m_tyresDamage', {length: 4, type: new Parser().uint8('')})
      .array('m_brakesDamage', {length: 4, type: new Parser().uint8('')})
      .uint8('m_frontLeftWingDamage')
      .uint8('m_frontRightWingDamage')
      .uint8('m_rearWingDamage')
      .uint8('m_floorDamage')
      .uint8('m_diffuserDamage')
      .uint8('m_sidepodDamage')
      .uint8('m_drsFault')
      .uint8('m_ersFault')
      .uint8('m_gearBoxDamage')
      .uint8('m_engineDamage')
      .uint8('m_engineMGUHWear')
      .uint8('m_engineESWear')
      .uint8('m_engineCEWear')
      .uint8('m_engineICEWear')
      .uint8('m_engineMGUKWear')
      .uint8('m_engineTCWear')
      .uint8('m_engineBlown')
      .uint8('m_engineSeized');
  }
}

export class PacketCarDamageDataParser extends F1Parser {
  data: PacketCarDamageData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();
    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(bigintEnabled),
      })
      .array('m_carDamageData', {
        length: 22,
        type: new CarDamageDataParser(),
      });

    this.data = this.fromBuffer(buffer) as PacketCarDamageData;
  }
}
