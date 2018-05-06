import React from 'react';
import {number} from 'prop-types';

const Start = ({screenNr}) => {
  return (
    <div className={screenNr === 1 ? `start` : `hidden`}>
      <p className='start_text'>Zeg <span className='start_span'>&quot;START&quot;</span> om te beginnen.</p>
      <img src='./assets/img/icons/button.png' width='100' height='100' />
    </div>
  );
};

Start.propTypes = {
  screenNr: number.isRequired
};

export default Start;
