import './styles/notificaiton.scss';

require('velocity-animate');
require('velocity-animate/velocity.ui.js');

ipcRenderer.on('scrobble', (event, data) => {
  console.log('got some data');
  console.log(data);
});
