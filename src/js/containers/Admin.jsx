import React from 'react';
import {object, string} from 'prop-types';
import {inject, observer} from 'mobx-react';
import AdminForm from '../components/AdminForm';
import AdminAcivePainting from '../components/AdminActivePainting';

const Admin = ({story, previewPainting, selectPainting}) => {

  return (
    <div className='admin_general_div'>
      <AdminForm />
      <div>
        <AdminAcivePainting />

        <h1 className='admin_title admin_title_keyword'>Kernwoorden:</h1>
        <div className='admin_keywords'>
          {
            story.map(grid => {
              if (previewPainting === grid.forPainting) {
                return (
                  <div key={grid._id} className='admin_keyword_count_div'>
                    <p className='admin_word_count'>{grid.count}x</p>
                    <p>{grid.gridName}</p>
                  </div>
                );
              } else if (selectPainting === grid.forPainting && previewPainting === ``) {
                return (
                  <div key={grid._id} className='admin_keyword_count_div'>
                    <p className='admin_word_count'>{grid.count}x</p>
                    <p>{grid.gridName}</p>
                  </div>
                );
              }
            })
          }
        </div>
      </div>
    </div>
  );
};

Admin.propTypes = {
  story: object.isRequired,
  previewPainting: string.isRequired,
  selectPainting: string.isRequired
};

export default inject(
  ({store}) => {
    return {
      story: store.story,
      previewPainting: store.previewPainting,
      selectPainting: store.selectPainting
    };
  }
 )(
   observer(Admin)
 );
