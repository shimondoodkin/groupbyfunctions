
groupby=function (p,field)
{
    var u=[];
    var uu={};
    p.forEach(function(a)
    {
        if(u.indexOf(a[field])==-1)
        {
            u.push(a[field]);
            uu[a[field]]=[a];
        }
        else uu[a[field]].push(a);
    });
    return uu;
}

objeach=function (obj,f)
{
    var keys=Object.keys(obj);
    return keys.forEach(function(k,i)
    {
        return f(obj[k],k,i);
    });
}

kvroarr=function (obj,k,v)
{
    if(!k) k="k";
    if(!v) v="v";
    var keys=Object.keys(obj);
    var r=[];
    keys.forEach(function(kk,i)
    {
        var o={};
        var o={};
        var o={};
        o[k]=kk;
        o[v]=obj[kk];
        r.push(o);
    });
    return r;
}

objmap=function (obj,f)
{
 var r={};
 objeach(obj,function(v,k,i){r[k]=f(v,k,i)})
 return r;
}

sortobj=function (obj)
{
    var keys=Object.keys(obj);
    var kva= keys.map(function(k,i)
    {
        return [k,obj[k]];
    });
    kva.sort(function(a,b){
        if(a[1]>b[1]) return -1;if(a[1]<b[1]) return 1;
        return 0
    });
    var o={}
    kva.forEach(function(a){ o[a[0]]=a[1]})
    return o;
}



sortobj=function (obj)
{
    var keys=Object.keys(obj);
    var kva= keys.map(function(k,i)
    {
        return [k,obj[k]];
    });
    kva.sort(function(a,b){
        if(a[1]>b[1]) return -1;if(a[1]<b[1]) return 1;
        return 0
    });
    var o={}
    kva.forEach(function(a){ o[a[0]]=a[1]})
    return o;
}
 
sortobjkey=function (obj,key)
{
    var keys=Object.keys(obj);
    var kva= keys.map(function(k,i)
    {
        return [k,obj[k]];
    });
    kva.sort(function(a,b){
        k=key;      if(a[1][k]>b[1][k]) return -1;if(a[1][k]<b[1][k]) return 1;
        return 0
    });
    var o={}
    kva.forEach(function(a){ o[a[0]]=a[1]})
    return o;
}


objtsv=function (arr_of_obj)
{
    if(arr_of_obj.length==0) return " no data ";
    if(! (arr_of_obj instanceof Array) ) return " not an array ";
    
    var keys=Object.keys(arr_of_obj[0]); //assume all keys same as first
    
    var table=arr_of_obj.map(function(obj)
    {
     return  keys.map(function(k) { return obj[k]; }).join('\t')
    })

    return [keys.join('\t')].concat(table).join('\r\n');
}
