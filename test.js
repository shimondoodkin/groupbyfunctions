require('./index')



var items=[
{id:1,kind:'type-b',value:997454},
{id:2,kind:'type-a',value:12132},
{id:3,kind:'type-a',value:451},
{id:4,kind:'type-c',value:7894}];



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



