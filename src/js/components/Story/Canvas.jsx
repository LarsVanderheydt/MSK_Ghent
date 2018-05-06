import React from 'react';
import {number} from 'prop-types';

const Canvas = ({screenNr}) => {
  return (
    <div className={screenNr >= 4 ? `hidden` : `canvas_div`}>
      <audio id='player'></audio>
      <canvas id='canvas' width='320' height='240'></canvas>
    </div>
  );
};

Canvas.propTypes = {screenNr: number.isRequired};

export default Canvas;
