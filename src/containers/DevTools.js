import React from 'react';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { createDevTools } from 'redux-devtools';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}
    defaultPosition="bottom"
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);

export default DevTools;
