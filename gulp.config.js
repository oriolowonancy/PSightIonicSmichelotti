module.exports = function () {
  
  var www = './www/';
  var app = www + 'app/';
  
  var config = {
    www: www,
    app: app,
    index: www + 'index.html',
    js: [
        app + 'app.js',
        app + '**/*.js'
    ]
  };
  
  return config;
};
