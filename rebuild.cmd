@echo off
set npm_config_disturl=https://atom.io/download/atom-shell
set npm_config_target=1.1.0
set npm_config_arch=x64
set npm_config_runtime=electron
set HOME=~/.electron-gyp
@echo on
npm uninstall anitomy-js --save && npm install anitomy-js@latest --save
