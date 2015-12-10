# groupbyfunctions
global, easy to use, group by functions on objects. like linq - but much more simple and functional javascript

there are few function i used to copy paste to do  simplke jobs
so i jecided to make them global functions and make a module from them

``` npm install groupbyfunctions ```

examples use:

```javascript

var items=[
{id:1,kind:'type-b',value:997454},
{id:2,kind:'type-a',value:12132},
{id:3,kind:'type-a',value:451},
{id:4,kind:'type-c',value:7894}];


require('groupbyfunctions')





groupby(items,'kind') 
//result:
{ 'type-b': [ { id: 1, kind: 'type-b', value: 997454 } ],
  'type-a':
   [ { id: 2, kind: 'type-a', value: 12132 },
     { id: 3, kind: 'type-a', value: 451 } ],
  'type-c': [ { id: 4, kind: 'type-c', value: 7894 } ] }



sortobj(groupby(items,'kind'),function(a,b){return b.length-a.length})
//result:
{ 'type-a':
   [ { id: 2, kind: 'type-a', value: 12132 },
     { id: 3, kind: 'type-a', value: 451 } ],
  'type-b': [ { id: 1, kind: 'type-b', value: 997454 } ],
  'type-c': [ { id: 4, kind: 'type-c', value: 7894 } ] }

objmap(   groupby(items,'kind')  ,  function(items){ return items.length}  )
//result:
{ 'type-b': 1, 'type-a': 2, 'type-c': 1 }


objfilter(groupby(items,'kind'),function(v,k,i){ return v.length>1})
//result:
{ 'type-a':
   [ { id: 2, kind: 'type-a', value: 12132 },
     { id: 3, kind: 'type-a', value: 451 } ] }



     
var menu=objtokvarr(groupby(items,'kind'),'name','children')
// result:
[ { name: 'type-b',
    children: [ { id: 1, kind: 'type-b', value: 997454 } ] },
  { name: 'type-a',
    children:
     [ { id: 2, kind: 'type-a', value: 12132 },
       { id: 3, kind: 'type-a', value: 451 } ] },
  { name: 'type-c',
    children: [ { id: 4, kind: 'type-c', value: 7894 } ] } ]




//write single level object to string file (tab-seperated-values)
fs.writeFileSync('items.tsv',objtsv(items));


```


the functions:

```javascript

// returns an object, 
// keys are as value of specified field,
// the values are arrays of elements.
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

// for each on object keys
//objeach(obj, function(value,key,index){ } )
objeach=function (obj,func)
{
    var keys=Object.keys(obj);
    return keys.forEach(function(k,i)
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
//
//  exampels for comparator functions
//  function compfunc(a,b,aname,bname) 
//  {
//    if(a.field>b.field) return 1;
//    if(a.field<b.field) return -1;
//    return 0
//  }
//
//  function compfunc(a,b,aname,bname)
//  {
//    return b.field - a.field;
//  }
//
//  function compfunc(a,b,aname,bname)
//  {
//    return a.localeCompare(b)
//  }
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



// quickly sort an object by key's value desc, like then slice 10 to get top rows
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
        var o={};
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

```
