import {F1Parser} from '../../f1.parser';

export class CarStatusDataParser extends F1Parser {
  constructor() {
    super();
    this

      /*uint8*/ .uint8('m_tractionControl')
      /*uint8*/ .uint8('m_antiLockBrakes')
      /*uint8*/ .uint8('m_fuelMix')
      /*uint8*/ .uint8('m_frontBrakeBias')
      /*uint8*/ .uint8('m_pitLimiterStatus')
      /*float*/ .floatle('m_fuelInTank')
      /*float*/ .floatle('m_fuelCapacity')
      /*float*/ .floatle('m_fuelRemainingLaps')
      /*uint16*/ .uint16le('m_maxRPM')
      /*uint16*/ .uint16le('m_idleRPM')
      /*uint8*/ .uint8('m_maxGears')
      /*uint8*/ .uint8('m_drsAllowed')
      /*uint16*/ .uint16le('m_drsActivationDistance')
      /*uint8*/ .uint8('m_actualTyreCompound')
      /*uint8*/ .uint8('m_visualTyreCompound')
      /*uint8*/ .uint8('m_tyresAgeLaps')
      /*int8*/ .int8('m_vehicleFiaFlags')
      /*float*/ .floatle('m_ersStoreEnergy')
      /*uint8*/ .uint8('m_ersDeployMode')
      /*float*/ .floatle('m_ersHarvestedThisLapMGUK')
      /*float*/ .floatle('m_ersHarvestedThisLapMGUH')
      /*float*/ .floatle('m_ersDeployedThisLap')
      /*uint8*/ .uint8('m_networkPaused');
  }
}

import {PacketHeaderParser} from '../../PacketHeader/parser';
import {PacketCarStatusData} from '../types';

export class PacketCarStatusDataParser extends F1Parser {
  data: PacketCarStatusData;

  constructor(buffer: Buffer, bigintEnabled: boolean) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(bigintEnabled),
      })
      .array('m_carStatusData', {
        length: 22,
        type: new CarStatusDataParser(),
      });

    this.data = this.fromBuffer(buffer) as PacketCarStatusData;
  }
}
