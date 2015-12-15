
// receives an array
// returns an object,
//  the keys of it are as value of specified field,
//  the values of it are arrays of elements.
groupby=function (objarr,field)
{
    var existingGroups=[];
    var grouped={};
    objarr.forEach(function(obj)
    {
        var groupname=obj[field];
        if(groupname in grouped)
         grouped[groupname].push(obj);
        else
         grouped[groupname]=[obj];
    });
    return grouped;
}

// for each on object keys
//objeach(obj, function(value,key,index){ } )
objeach=function (obj,func)
{
    return Object.keys(obj).forEach(function(k,i)
    {
        return func(obj[k],k,i);
    });
}

//var obj=objmap(obj, function(value,key,index){ return value.field ; } )
objmap=function (obj,func)
{
 var r={};
 objeach(obj,function(v,k,i){r[k]=func(v,k,i)})
 return r;
}


//var obj=objmap(obj, function(value,key,index){ return value.field ; } )
objfilter=function (obj,func)
{
 var r={};
 objeach(obj,function(v,k,i){ if(func(v,k,i)) r[k]=v})
 return r;
}

// sort object keys by theis values
// sortobj(obj);
//
// sortobj(obj,function compfunc(a,b,aname,bname){ return b.field - a.field; });
//
//  comparator function is optional:
//   a comparator function returns 0 if parameters eqals,
//   a larger than zero value if a larger than b, or 
//   a less than zero value if a is smaler than b
//
//  in my comparator there are also aname and bname arguments it is possible to use them optionally.
//
//  exampels for comparator functions
//
//  //objct's sub property
//  sortobj(obj,function compfunc(a,b,aname,bname) 
//  {
//    if(a.field>b.field) return 1;
//    if(a.field<b.field) return -1;
//    return 0
//  })
//
//  //multiple columns sort
//  sortobj(obj,function compfunc(a,b,aname,bname) 
//  {
//    if(a.field>b.field) return 1;   // first sort by this fileld
//    if(a.field<b.field) return -1;
//
//    if(a.fieldb>b.fieldb) return 1; // if fields above is eqals, then sort by this fileld
//    if(a.fieldb<b.fieldb) return -1;
//
//    return 0 // if everything eqals return equals
//  })
//
//  sort by integer, maybe desc (swap fields if needed)
//  sortobj(obj,function compfunc(a,b,aname,bname){return b.field - a.field;}
//
//  sort by string using unicode char order
//  sortobj(obj,function compfunc(a,b,aname,bname)
//  {
//    return a.localeCompare(b)
//  })
//
//  sort object  by keys
//  sortobj(obj,function compfunc(a,b,aname,bname)
//  {
//            if(aname>bbane) return 1;if(aname<bname) return -1;
//            return 0
//  })
//
//

//
sortobj=function (obj,compfunc)
{
    var comp;
    if(!compfunc)
      comp=function(a,b){
            if(a[1]>b[1]) return 1;if(a[1]<b[1]) return -1;
            return 0
          };
    else 
      comp=function(a,b){
            return compfunc(a[1],b[1],a[0],b[0])
          };
    
    var keys=Object.keys(obj);
    var kva= keys.map(function(k,i)
    {
        return [k,obj[k]];
    });
    kva.sort(comp);
    var o={}
    kva.forEach(function(a){ o[a[0]]=a[1]})
    return o;
}



// quickly sort an object's keys by value is desc order, like: to get top rows
sortobjkey=function (obj,key)
{
    var o={}
    Object.keys(obj).map(function(k,i) {
        return [k,obj[k]];
    }).
     sort(function(a,b){
      k=key;      if(a[1][k]>b[1][k]) return -1;if(a[1][k]<b[1][k]) return 1;
      return 0
     }).
      forEach(function(a){ o[a[0]]=a[1]})
    return o;
}

// quickly sort an object's keys by their name
sortkeys=function (obj,comp)
{
    var o={}
    Object.keys(obj).
     sort(comp).
      forEach(function(k){ o[k]=obj[k]});
    return o;
}

// convert object to array of objects of key and value
// obj={aa:123}
// var arr=objtokvarr(obj) // arr=[ {k:aa,v:123} ]
// var arr=objtokvarr(obj,"name","value") // arr=[ {name:aa,value:123} ]
objtokvarr=function (obj,k,v)
{
    if(!k) k="k";
    if(!v) v="v";
    var keys=Object.keys(obj);
    var r=[];
    keys.forEach(function(kk,i)
    {
        var o={};
        o[k]=kk;
        o[v]=obj[kk];
        r.push(o);
    });
    return r;
}

// converts array of objects to a text table
// columns seperated by tabs
// first row is key names.
//
// (its something you can paste in to excel, or save to tsv file)
// 
// var products=[{id:1,name:"aaa"},{id:2,name:"bbb"}]
// fs.writeFileSync('products.tsv',objtsv(products));
// result is like:
// id name
// 1  aaa
// 2  bbb
//
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
