// When no or invalid authentication details are provided
module.exports = function unauthorized(response) {

    let message = 'Unauthorized';
  
    if (typeof response === 'string') {
      message = response;
      response = false;
    }
  
    let data = !response ? [] : (Array.isArray(response) ? response : [response]);
  
    this.res.status(401).json({ data, message });
  };