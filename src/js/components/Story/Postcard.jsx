import React from 'react';
import {number} from 'prop-types';

const Postcard = ({screenNr}) => {

  if (screenNr === 5) {
    setTimeout(() => {
      window.location.reload();
    }, 6000);
  }

  return (
    <div className={screenNr === 5 ? `start` : `hidden`}
      style={{
        height: `30rem`,
        background: `linear-gradient(rgba(255, 255, 255, 0), white 35%)`
      }}>
      <p className='postcard_text'>Benieuwd wat we met je woord zullen doen? Ontdek het op <pan className='red_span'>jouw postkaartje</pan></p>
      <img src='./assets/img/vinkje.gif' width='100' height='252' className='postcard_check' />
    </div>
  );
};

Postcard.propTypes = {
  screenNr: number.isRequired
};

export default Postcard;
