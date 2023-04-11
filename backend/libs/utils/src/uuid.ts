import * as uuid from 'uuid';

export class Uuid {
  uuid: string;
  constructor(uuidString?: string) {
    if (!uuidString) {
      this.uuid = uuid.v4();
      return;
    }
    const isValidUuid = uuid.validate(uuidString);
    if (!isValidUuid) throw Error(`Uuid not valid`);
    this.uuid = uuidString;
  }
}
