import React from 'react';
import {object, number, string} from 'prop-types';
import {inject, observer} from 'mobx-react';
import ReactGridLayout from 'react-grid-layout';

const Words = ({story, layout, fontSize, selectPainting, screenNr}) => {
  const limitWordSize = 10;
  const layouts = [{
    x: screenNr === 5 ? 45 : 38,
    y: screenNr === 5 ? 1.7 : 0.7,
    w: screenNr === 5 ? 30 : 45,
    h: screenNr === 5 ? 3.0 : 4.5,
    i: `painting`,
    static: true
  }];

  layout.map(l => {
    if (l.forPainting === selectPainting) layouts.push(l);
  });

  return (
    <ReactGridLayout className='layout bg' layout={layouts} cols={100} rowHeight={40} width={1200} maxH={10}
      autoSize={false} margin={[40, 40]}>
      {
          screenNr <= 3 ? (
            story.slice(0, limitWordSize).map(grid => {
              // can't use component ... :(
              if (grid.forPainting === selectPainting) {
                return (
                    <div key={grid._id} className='grid'
                      style={{
                        visibility: screenNr === 2 ? grid.getVisibility : `hidden`,
                        color: screenNr === 2 ? `rgb(195, 195, 195)` : `black`,
                        padding: `${2 * grid.count + 0.9}rem 3rem`
                      }}>
                      <p
                        className='grid_word'
                        style={{
                          border: `border: .5rem solid ${grid.color}`
                        }} >{grid.gridName}</p>
                    </div>
                );
              }
            })
          ) : (
            story.slice(0, limitWordSize).map(grid => {
              // can't use component ... :(
              if (grid.forPainting === selectPainting) {
                return (
                    <div key={grid._id} className='grid_colored'
                      style={{
                        visibility: screenNr >= 2 ? `visible` : `hidden`,
                        backgroundColor: grid.color,
                        padding: `${grid.count / 1.7}rem 3rem`
                      }}>
                      <p
                        style={{
                          fontSize: `${fontSize + (grid.count / 2)}rem`,
                          border: `border: .5rem solid ${grid.color}`
                        }} >{grid.gridName}</p>
                    </div>
                );
              }
            }))
      }

      <div key='painting' className={screenNr === 1 ? `painting` : `painting_border`}
        style={{backgroundImage: `url(./uploads/${selectPainting})`}} >
        {screenNr === 1 ? <img src='../assets/img/animated.gif' width='803' height='562' className='gif' /> : ``}
      </div>
    </ReactGridLayout>
  );
};

Words.propTypes = {
  story: object.isRequired,
  layout: object.isRequired,
  fontSize: number.isRequired,
  selectPainting: string.isRequired,
  screenNr: number.isRequired,
};

export default inject(
  ({store}) => {
    return {
      story: store.story,
      layout: store.layout,
      fontSize: store.fontSize,
      selectPainting: store.selectPainting,
      screenNr: store.screenNr,
    };
  }
)(
  observer(Words)
);
