function post(url,data,fn){
      data=data||{};
      var content=require('querystring').stringify(data);
      var parse_u=require('url').parse(url,true);
      var isHttp=parse_u.protocol=='http:';
      var options={
           host:parse_u.hostname,
           port:parse_u.port||(isHttp?80:443),
           path:parse_u.path,
           method:'POST',
           headers:{
                  'Content-Type':'application/x-www-form-urlencoded',
                  'Content-Length':content.length
            }
        };
        var req = require(isHttp?'http':'https').request(options,function(res){
          var _data='';
          res.on('data', function(chunk){
             _data += chunk;
          });
          res.on('end', function(){
                fn!=undefined && fn(_data);
           });
        });
        req.write(content);
        req.end();
}

post('http://127.0.0.1/post.php?b=2',{a:1},function(data){
  console.log(data);
});

post('https://127.0.0.1/post.php',{a:1},function(data){
  console.log(data);
});
