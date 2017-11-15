exports.get = function () {
  return {
    'env' : {
      'API_URL': process.env.API_URL || 'http://os-navigate-nodejs-openshiftnavigatedev.e4ff.pro-eu-west-1.openshiftapps.com'
    }
  }
}