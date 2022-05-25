const rimraf = require('rimraf');

/* eslint-disable no-console */
rimraf('.next/**/*.map', error => {
  if (error) {
    console.log('Could not remove source maps');
    console.error(error);
  }
});
/* eslint-enable no-console */
