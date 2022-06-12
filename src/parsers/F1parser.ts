import {Parser} from 'binary-parser';

export class F1Parser extends Parser {
  fromBuffer(buffer: Buffer) {
    return this.parse(buffer);
  }
}
