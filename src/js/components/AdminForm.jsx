import React from 'react';
import {object, func, string} from 'prop-types';
import {inject, observer} from 'mobx-react';

const AdminForm = ({
  paintings, addPainting, setSelected,
  feedback, setFeedback,
  setPreview,
}) => {
  let $file = ``;
  let $selected = ``;
  const dateOfPaintingSet = Date.now();

  const handleSubmit = e => {
    e.preventDefault();
    const file = $file.files[0];
    addPainting({image: file, date: dateOfPaintingSet, isSet: false});
  };

  const handleSelectPainting = e => {
    e.preventDefault();
    setSelected({selectedPainting: $selected.value, date: dateOfPaintingSet, isSet: true});
  };

  const handleChange = e => setFeedback(e.currentTarget.value);
  const handlePreview = e => setPreview(e.currentTarget.value);

  return (
    <div className='admin_form_div'>

      <form onSubmit={handleSubmit} className='admin_form_add'>
        <p className='admin_subtitle admin_p_tag'>Voeg andere schilderijen toe:</p>
        <label htmlFor='file-input' >
          <p className='input_text admin_p_tag'>{feedback}</p>
        </label>
        <input type='file' id='file-input' ref={$el => $file = $el} name='file' className='input_file' onChange={handleChange} />
        <input type='submit' value='Voeg toe' className='admin_button' />
      </form>

      <form onSubmit={handleSelectPainting} className='admin_form_add'>
        <p className='admin_subtitle admin_p_tag'>Kies het werk voor deze week:</p>
        <select ref={$el => $selected = $el} className='input_select' onChange={handlePreview}>
        {
          paintings.map(painting => {
            return (
              <option key={painting._id} value={painting.image}>{painting.image}</option>
            );
          })
        }
        </select>
        <input type='submit' className='admin_button' value='Bevestig' />
      </form>

    </div>
  );
};


AdminForm.propTypes = {
  paintings: object.isRequired,
  addPainting: func.isRequired,
  setSelected: func.isRequired,
  feedback: string.isRequired,
  setFeedback: func.isRequired,
  setPreview: func.isRequired,
};

export default inject(
  ({store}) => {
    return {
      paintings: store.paintings,
      addPainting: store.addPainting,
      setSelected: store.setSelected,
      story: store.story,
      feedback: store.feedback,
      setFeedback: store.setFeedback,
      previewPainting: store.previewPainting,
      setPreview: store.setPreview,
      selectPainting: store.selectPainting
    };
  }
 )(
   observer(AdminForm)
 );
