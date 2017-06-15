import {observable} from 'mobx';

export default class Layout {
  _id = 0
  created = 0
  i = ``
  y = Math.random() * 0.65
  static = true
  gridName = ``
  move = true
  forPainting = ``

  @observable
  x = Math.random() * 50 + 19
  @observable
  w = 1

  @observable
  h = 1

  constructor({_id, gridName, forPainting}) {
    this._id = _id;
    this.created = Date.now();
    this.i = _id;
    this.gridName = gridName;
    this.forPainting = forPainting;
  }

}
