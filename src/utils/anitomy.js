// Cannot be imported from renderer process directly
/*
  A smart to maybe check for is if the filename
  doesn't contain any [] (or similar), we should just ignore it
  */
export default {
  parse: (childProcess, filename, callback) => {
    childProcess.execFile('./bin/anitomy', ['--name', filename], (err, stdout) => {
      if (err) {
        console.log(err);
      } else {
        callback(JSON.parse(stdout));
      }
    });
  }
};
