<p align="center">
  <img src="http://i.imgur.com/xfqCh9P.png" style="width: 100%" />
  <br />
  <br />
  <a href="https://travis-ci.org/tofuness/Toshocat">
    <img src="https://travis-ci.org/tofuness/Toshocat.svg?branch=master" alt="Build Status" />
  </a>
  <a href="https://codeclimate.com/github/tofuness/Toshocat">
    <img src="https://codeclimate.com/github/tofuness/Toshocat/badges/gpa.svg" alt="Code climate" />
  </a>
  <a href="https://coveralls.io/github/tofuness/Toshocat?branch=master">
    <img src="https://coveralls.io/repos/github/tofuness/Toshocat/badge.svg?branch=master" alt="Coverage Status" />
  </a>
  <a href="https://david-dm.org/tofuness/Toshocat">
    <img src="https://david-dm.org/tofuness/Toshocat.svg" alt="Coverage Status" />
  </a>
</p>

---

### Installation
* You need Node.js on your machine
* You need MSVC to build some native modules
* You need a local global installation of `electron-builder`
Apart from that, just run `npm install` in the project directory.

### Developing
```
$ npm run test:watch
$ npm run webpack:dev
$ npm run start:dev
```
Starts up the application in development mode. The Squirrel updater won't work in the
development environment so you can safely ignore Squirrel errors.

### Building
```
$ npm run test
$ npm run webpack:build
$ npm run dist
```
Make sure tests pass before running `npm webpack:build`. `npm run dist` builds
the delta files and artifacts for 64-bit Windows.

### License
GNU GPL V3
