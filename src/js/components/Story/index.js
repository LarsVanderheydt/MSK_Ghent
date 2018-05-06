/* eslint-disable react/jsx-filename-extension */
import { func, number, string, bool } from 'prop-types';
import React from 'react';
import { inject, observer } from 'mobx-react';
import uuid from 'uuid';

import Add from './Add';
import Start from './Start';
import Canvas from './Canvas';
import Postcard from './Postcard';
import Words from './Words';

const Story = ({
  selectPainting,
  transcript,
  resetTranscript,
  switchStarted,
  screenNr,
  word,
  addToStory,
  setWord,
  switchPopover,
  isActive,
}) => {
  let toStart = 1;

  const handleYes = () => {
    addToStory({ gridName: word, id: uuid.v4(), forPainting: selectPainting });
    resetTranscript();
    setWord(``);
    switchPopover(false);
    switchStarted(false);
  };

  const handleStart = () => {
    setWord(transcript);
    toStart = 0;
    switchPopover(true);
  };

  if (toStart) setWord(transcript);

  if (transcript.indexOf(`start`) >= 0) {
    resetTranscript();
    setTimeout(handleStart, 5000);
  }

  if (transcript.indexOf(`ja`) >= 0 && isActive) {
    resetTranscript();
    handleYes();
  }

  if (transcript.indexOf(`start`) >= 0) {
    resetTranscript();
    switchStarted(true);
  }

  return (
    <div>
      <button id="audioContextStart">Start the mic</button>
      <Add transcript={transcript} resetTranscript={resetTranscript} />
      {screenNr === 5 ? (
        <h1 className="postcard_title">JOUW STEM IS EEN VERHAAL WAARD</h1>
      ) : (
        ``
      )}
      <Words />

      <Start screenNr={screenNr} />

      <Canvas screenNr={screenNr} />
      <Postcard screenNr={screenNr} />
    </div>
  );
};

Story.propTypes = {
  selectPainting: string.isRequired,
  transcript: string.isRequired,
  resetTranscript: func.isRequired,
  switchStarted: func.isRequired,
  screenNr: number.isRequired,
  word: string.isRequired,
  addToStory: func.isRequired,
  setWord: func.isRequired,
  switchPopover: func.isRequired,
  isActive: bool.isRequired,
};

export default inject(({ store }) => {
  return {
    addToStory: store.addToStory,
    selectPainting: store.selectPainting,
    switchStarted: store.switchStarted,
    screenNr: store.screenNr,
    switchPopover: store.switchPopover,
    word: store.word,
    setWord: store.setWord,
    isActive: store.isActive,
  };
})(observer(Story));
