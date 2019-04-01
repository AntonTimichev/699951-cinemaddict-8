import {cloneDeep} from "lodash";

export class LocalModel {
  constructor(data) {
    this._data = data;
  }

  get getData() {
    return this._data;
  }

  set setData(data) {
    this._data = data;
  }

  updateData(data) {
    const index = this._data.findIndex((card) => card.id === data.id);
    if (index !== -1) {
      this._data[index] = cloneDeep(data);
    }
  }
}
