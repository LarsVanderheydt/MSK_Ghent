import React from 'react';
import {string} from 'prop-types';

const Popover = ({word}) => {

  return (
    <div className='popover'>
      <p>Zei je dit woord?</p>
      <p className='word'>{word}</p>
      <p>Zeg <span className='red_span'>&quot;JA&quot;</span>of zeg je woord nogmaals</p>
      {/* <img src='./assets/img/icons/button.png' width='100' height='100' className='mic_icon' /> */}
    </div>
  );
};

Popover.propTypes = {
  word: string.isRequired
};

export default Popover;
