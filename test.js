
// for tests need to install mocha:
//     npm install -g mocha
//
// then to run a test
//
//    mocha test.js
//


var assert = require("assert");
require('./index')

// the values are arrays of elements.
groupby=function (p,field)
describe('groupby',function(){
 it("should sort items into buckets. return an object - put each item of an array into an object property, according to value of a specified field",function(){
  var arr=[
   {n:1,v:'a'},
   {n:2,v:'b'},
   {n:3,v:'b'}
  ];
  var result={
    a:[ {n:1,v:'a'} ],
    b:[ {n:2,v:'b'}, {n:3,v:'b'} ] 
  };
  assert.deepEqual(arr,result);
 })
})


describe('objeach',function(){
 it("should be iterate for each on object's properties",function(){
   
   var obj={aa:2,bb:1,cc:3};

   var gotvalues=[],gotkeys=[],gotindexes=[]
   
   var indexes=[0,1,2]
   var keys=["aa","bb","cc"]
   var values=[2,1,3]
   
   objeach(obj,function(v,k,i){gotvalues.push(v);gotkeys.push(k);gotindexes.push(i)})
   assert.deepEqual(gotvalues,values);
   assert.deepEqual(gotkeys,keys);
   assert.deepEqual(gotindexes,indexes);
 })
})


describe('objmap',function(){
 it("should be return a new object with same names and values updated by map function",function(){
   
   var obj={aa:2,bb:1,cc:3};
   var mapped={aa:3,bb:2,cc:4};

   var gotvalues=[],gotkeys=[],gotindexes=[]
   
   var indexes=[0,1,2]
   var keys=["aa","bb","cc"]
   var values=[2,1,3]
   
   assert.deepEqual(objmap(obj,function(v,k,i){gotvalues.push(v);gotkeys.push(k);gotindexes.push(i);return v+1}),mapped);
   assert.deepEqual(gotvalues,values);
   assert.deepEqual(gotkeys,keys);
   assert.deepEqual(gotindexes,indexes);
 })
})

//var obj=objmap(obj, function(value,key,index){ return value.field ; } )
describe('objfilter',function(){
 it("should be return a new object with properties filtered by their value",function(){
   
   var obj={aa:2,bb:1,cc:3};
   var filtered={aa:2};
   
   var gotvalues=[],gotkeys=[],gotindexes=[]
   
   var indexes=[0,1,2]
   var keys=["aa","bb","cc"]
   var values=[2,1,3]
   
   assert.deepEqual(objfilter(obj,function(v,k,i){gotvalues.push(v);gotkeys.push(k);gotindexes.push(i);return v==2}),filtered);
   assert.deepEqual(gotvalues,values);
   assert.deepEqual(gotkeys,keys);
   assert.deepEqual(gotindexes,indexes);
 })
})




describe('sortobj',function(){
 it("should sort object's keys by their names",function(){
   var obj={aa:2,bb:1,cc:3};
   var sorted={cc:3,aa:2,bb:1};
   assert.deepEqual(sortobj(obj),sorted);
 })
 it("should be able to use optional comparator",function(){
   var obj={aa:2,bb:1,cc:3};
   var sorted_asc={cc:3,aa:2,bb:1};
   
   function comparator_asc(a,b) {return a==b?0:(a>b?1:-1)};
   
   assert.deepEqual(sortobj(obj,comparator_asc),sorted_asc);
 })
})



describe('sortobjkey',function(){
 it("should sort object's keys by value is desc order",function(){
   var obj={aa:{f:2},bb:{f:1},cc:{f:3}};
   var sorted={cc:{f:3},aa:{f:2},bb:{f:1}};
   assert.deepEqual(sortobjkey(obj,'f'),sorted);
 })
})


describe('sortkeys',function(){
 it("should sort object's keys by their names",function(){
   var obj={bb:1,aa:1};
   var sorted={aa:1,bb:1};
   assert.deepEqual(sortkeys(obj),sorted);
 })
 it("should be able to use optional comparator",function(){
   var obj={bb:1,aa:1,cc:1};
   var sorteddesc={cc:1,bb:1,aa:1};
   
   function comparator_desc(a,b) {return a==b?0:(a>b?-1:1)};
   
   assert.deepEqual(sortkeys(obj,comparator_desc),sorteddesc);
 })
})


describe('objtokvarr',function(){
 it("should convert object to array of objects of key and value",function(){
   var obj={aa:123};
   var kva=[ {k:'aa',v:123} ];
   assert.deepEqual(objtokvarr(obj),kva);
 })
 it("should be able to use defined names",function(){
   var obj={aa:123};
   var kva=[ {name:'aa',value:123} ];
   assert.deepEqual(objtokvarr(obj,"name","value"),kva);
 })
})
  
describe('objtsv',function(){
 it("should convert array of objects to tab seperated values string",function(){
  var tsv='id  name\r\n'+
          '1  aaa\r\n'+
          '2  bbb';
  var objarr=[ {id:1,name:"aaa"}, {id:2,name:"bbb"} ]

   assert.deepEqual(objtsv(objarr),tsv);
 })
})
