import fetch from 'isomorphic-fetch';

const Fetch = {
  fetchData(params) {
    let data = "";
    let success = params.success;
    let failed = params.error;
    for(let key in params.data){
      params.data[key] === undefined?'':params.data[key];
      data = data + key + "=" + encodeURIComponent(params.data[key]) + "&";
    }

    if (data.length > 0) {
      data = data.substring(0, data.length - 1);
    }

    data.length === 0 && ( data = undefined );

    let method = 'GET';
    undefined !== params.method ? method = (params.method.toUpperCase() === 'get' ? 'GET' : 'POST') : null;

    let url = params.url;

    if ('GET' === method) {
      if (url.indexOf('?') == -1 && data != undefined) {
        url = url + '?' + data;
      }else if (url.indexOf('?') >= 0 && data != undefined){
        url = url + '&' + data;
      }
      data = undefined;
    }

    let _fetch = (fetch_promise, timeout) => {
      let abort_fn = null;

      //这是一个可以被reject的promise
      let abort_promise = new Promise(function(resolve, reject) {
        abort_fn = function() {
          if (failed) {
            failed();
          }
          resolve('request timeout');
        };
      });

      let abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
      ]);

      setTimeout(function() {
        abort_fn();
      }, timeout);

      return abortable_promise;
    };

    _fetch(fetch(url, {
      method:method,
      type:'json',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      mode: "cors",
      credentials: 'include',
      body:data
    }).then(response => {
      if (response.status < 500) {
        return response.json();
      }else  {
        throw  new Error( 'net error');
      }
    }, () => {
      throw  new Error( 'net error');
    }).then(data => {
      if(success){
        success(data);
      }
    },  err => {
      if (failed) {
        failed();
      }
    }), 30000)
  }
};

export default Fetch;
