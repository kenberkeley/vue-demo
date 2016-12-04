var fs = require('fs'),
  PATHS = require('./config/PATHS'),
  webpack = require('webpack'),
  config = require('./webpack.prod.conf');

webpack(config, function(err, stats) {
  // show build info to console
  console.log( stats.toString({ chunks: false, color: true }) );

  // save build info to file
  fs.writeFile(
    PATHS.DIST.join('__build_info__'),
    stats.toString({ color: false })
  );
});
