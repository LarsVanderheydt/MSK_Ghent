import {observable, computed, action} from 'mobx';
export default class Grid {
  _id = ``
  id = ``
  created = 0
  gridName = ``
  forPainting = ``

  @observable
  color = `red`

  justAddedColor = `#41cce3`
  standardColor = `#cccdd2`

  @observable
  count = 1

  @observable
  totalCount = 1

  constructor({gridName, id, forPainting, _id}) {
    this._id = _id;
    this.id = id;
    this.created = Date.now();
    this.gridName = gridName;
    this.forPainting = forPainting;
  }

  @computed
  get getVisibility() {
    if (this.count <= 3) {
      return `visible`;
    } else {
      return `hidden`;
    }
  }

  @action
  reset = () => {
    if (this.count >= 3) {
      this.count = 1;
    }
  }
}
