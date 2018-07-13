const Fetch = {
  fetchData(params, isClient = false){
    if (isClient){
      if (undefined === params.url) {
        if (params.error){
          params.error();
        }
        return ;
      }

      let data = {
        url:params.url,
        data:params.data
      };

      weex.requireModule('wpnet').fetchData(data, function(ret){
        if ('0' === ret.code){
          if (params.success){
            params.success(ret.resp);
          }
        }else {
          if(params.error){
            params.error();
          }
        }
      });
    }else {
      const stream = weex.requireModule('stream');
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

      stream.fetch({
        method:'POST',
        type:'json',
        url:params.url,
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body:data
      }, function(ret){
        if(!ret.ok){
          if(failed){
            failed();
          }
        }else {
          if(success){
            success(ret.data);
          }
        }
      })
    }
  }
};

export default Fetch;
