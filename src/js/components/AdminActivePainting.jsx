import React from 'react';
import {string} from 'prop-types';
import {inject, observer} from 'mobx-react';

const AdminAcivePainting = ({selectPainting, previewPainting}) => {

  return (
    <div className='admin_active_painting'>
      <h1 className='admin_title'>
        {previewPainting !== `` && previewPainting !== selectPainting ? (
          `Preview schilderij:`
        ) : (
          `Actief schilderij:`
        ) }
      </h1>

      <div key='painting' className='painting_border'
        style={{
          backgroundImage: `url(./uploads/${previewPainting === `` ? selectPainting : previewPainting})`,
          width: `40rem`,
          height: `30rem`
        }} >
      </div>
    </div>
  );
};

AdminAcivePainting.propTypes = {
  previewPainting: string.isRequired,
  selectPainting: string.isRequired
};

export default inject(
  ({store}) => {
    return {
      previewPainting: store.previewPainting,
      selectPainting: store.selectPainting
    };
  }
 )(
   observer(AdminAcivePainting)
 );
