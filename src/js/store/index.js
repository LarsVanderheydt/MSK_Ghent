import {observable, action} from 'mobx';
import Painting from '../models/Painting';
import Grid from '../models/Grid';
import Layout from '../models/Layout';
import gridAPI from '../lib/api/grids';
import paintingsAPI from '../lib/api/paintings';

class Store {
  @observable
  word = ``

  @observable
  story = []

  @observable
  isActive = false;

  @observable
  started = false;

  @observable
  test = ``;

  @observable
  paintings = []

  @observable
  selectPainting = ``

  @observable
  previewPainting = ``

  @observable
  dateOfPainting = Date.now()

  @observable
  screenNr = 1

  @observable
  feedback = `Kies een bestand...`;

  // de layout voor het grid in de grids array!
  // in aparte array omdat het dan snel en eenvoudig is om de layouts prop
  // te zetten voor deze NPM module
  // (layout moet een array zijn met specifieke waarden)
  @observable
  layout = []

  @observable
  fontSize = 1

  // grid to count plus one to (because of already in the grid array)
  @observable
  plusOne = {}

  init = () => {
    paintingsAPI.read()
    .then(a => this._addPainting(...a.paintings));

    gridAPI.read()
    .then(a => this._addToStory(...a.grids));
  }

  constructor() {
    this.init();
  }

  @action
  setPreview = img => this.previewPainting = img;

  @action
  setFeedback = string => {
    const array = string.trim().split(`\\`);
    this.feedback = array[array.length - 1];
  }

  @action
  switchPopover = value => {
    this.screenNr ++;
    this.isActive = value;
  }

  @action
  switchStarted = value => {
    this.screenNr ++;
    this.started = value;
  }

  @action
  setWord = value => {
    const array = value.trim().split(` `);
    this.word = array[array.length - 1];
  }

  @action
  setTest = value => {
    const array = value.trim().split(` `);
    this.test = array[array.length - 1];
  }

  @action
  setSelected = ({selectedPainting, date}) => {
    this.selectPainting = selectedPainting;
    this.dateOfPainting = date;
    const updateTrue = this.paintings.find(p => selectedPainting === p.image);
    const updateFalse = this.paintings.filter(p => selectedPainting !== p.image);

    paintingsAPI.update({_id: updateTrue._id, isSet: true});
    updateFalse.forEach(p => {
      paintingsAPI.update({_id: p._id, isSet: false});
    });

    this.paintings = [];
    paintingsAPI.read()
    .then(a => this._addPainting(...a.paintings));
  }

  addPainting = content => {
    if (!this.paintings.find(p => p.image === content.image.name)) {
      paintingsAPI.create(content)
          .then(a => this._addPainting(a));
    }
  }

  @action
  _addPainting = (...paintings) => {
    paintings.forEach(painting => {
      if (!this.paintings.find(p => p.image === painting.image)) {
        this.paintings.push(
          new Painting(...painting)
        );
      }
    });

    this.paintings.forEach(painting => {
      if (painting.isSet === true) {
        this.selectPainting = painting.image;
      }
    });
  }

  addToStory = content => {
    gridAPI.create(content)
      .then(a => this._addToStory(a));
  }

  @action
  _addToStory = (...grids) => {
    grids.forEach(grid => {
      if (!this.story.find(g => g.gridName === grid.gridName)) {
        if (grid.forPainting === this.selectPainting) {
          this.story.push(new Grid(...grid));
          this.layout.push(new Layout(...grid));
        }
      } else {
        this.plusOne = this.story.find(g => g.gridName === grid.gridName);
        this.plusOne.totalCount += 1;

        if (this.plusOne.count < 3) {
          this.plusOne.count += 1;
        } else {
          this.plusOne.reset();
        }
      }
      const changeColor = this.story.find(g => grid.gridName === g.gridName);
      this.story.forEach(g => {
        if (changeColor.gridName === g.gridName) {
          g.color = g.justAddedColor;
        } else {
          g.color = g.standardColor;
        }
      });
    });
  }
}

const store = new Store();

if (process.env.NODE_ENV !== `production`) {
  window.store = store;
}

export default store;
