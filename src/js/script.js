/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import {render} from 'react-dom';
import App from './containers/App';

import store from './store/';
import {Provider} from 'mobx-react';

const init = () => {

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`.react-mount`)
  );

  const canvas = document.getElementById(`canvas`);
  const handleSuccess = stream => {
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const ctx = canvas.getContext(`2d`);
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const source = context.createMediaStreamSource(stream);
    analyser.getByteTimeDomainData(dataArray);
    source.connect(analyser);
    analyser.fftSize = 256;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    const draw = function() {
      requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = `rgb(255, 255, 255)`;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.lineWidth = 6;

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0.0, `white`);
      grad.addColorStop(0.33, `#e20d37`);
      grad.addColorStop(0.66, `#41cce3`);
      grad.addColorStop(1, `white`);
      ctx.strokeStyle = grad;

      ctx.beginPath();

      const sliceWidth = WIDTH * 10 / bufferLength;
      let x = 0;

      for (let i = 0;i < bufferLength;i ++) {
        const v = dataArray[i] / 128.0;
        const y = v * HEIGHT / 2;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    draw();
  };

  if (canvas) {
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(handleSuccess);
  }
};

init();
