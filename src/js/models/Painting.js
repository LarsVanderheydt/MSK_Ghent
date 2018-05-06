export default class Painting {
  _id = ``
  created = 0
  image = ``
  isSet = false

  constructor({image, date, isSet, _id}) {
    this._id = _id;
    this.created = date;
    this.image = image;
    this.isSet = isSet;
  }
}
