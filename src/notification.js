import './styles/notificaiton.scss';

require('velocity-animate');
require('velocity-animate/velocity.ui.js');

let fadeOutTimer;
ipcRenderer.on('scrobble', (event, data) => {
  setTimeout(() => {
    $('#notification').addClass('visible');
  }, 100);
  console.log('got some data');
  console.log(data);
  clearTimeout(fadeOutTimer);
  fadeOutTimer = setTimeout(() => {
    $('#notification').removeClass('visible');
  }, 8000);
});
