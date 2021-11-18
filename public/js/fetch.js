async function htmlGet($opt){
    var url, opt ,func;
     if(typeof($opt) === 'string'||"String" ){
        url = $opt;
        opt = {};
        func = (data)=>{return 0}
     }else{
         url = $opt.url;
         opt = $opt.opt;
         func = ($opt.func)? (data)=>{return 0}: $opt.func ;
     }
    fetch(url,opt).then((data)=>{func(data)}).catch()

}