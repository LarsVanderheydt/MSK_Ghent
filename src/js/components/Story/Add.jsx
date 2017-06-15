import React from 'react';
import {inject, observer} from 'mobx-react';
import {string, bool} from 'prop-types';
// import uuid from 'uuid';
import Popover from './Popover';

const Add = ({word, isActive, started}) => {
  return (
      <div style={{position: `absolute`, display: started ? `inline` : `none`}}>
        <div className={isActive ? `screen` : `hidden`}>
            <Popover word={word} />
        </div>

        <div className={isActive ? `hidden` : `start`}>
          <p className='shout_word'>Zeg in <span className='red_span'>&Eacute;&Eacute;N WOORD</span> waar jij aan denkt bij dit schilderij</p>
          <img src='./assets/img/icons/button.png' width='100' height='100' />
        </div>
      </div>
  );
};

Add.propTypes = {
  word: string.isRequired,
  isActive: bool.isRequired,
  started: bool.isRequired
};

export default inject(
  ({store}) => {
    return {
      word: store.word,
      isActive: store.isActive,
      started: store.started
    };
  }
)(
  observer(Add)
);
