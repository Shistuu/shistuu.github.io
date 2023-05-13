// Write a program to sort an array of object by a target key. The original array should remain unchanged.
// var arr = [{ id: 1,name: 'John',}, {id: 2, name: 'Mary',}, { id: 3, name: 'Andrew',}];

// function sortBy(array, key) {
//     ...
// }

// var sorted = sortBy(arr, 'name');

var arr = [    {id: 1, name: 'John'},    {id: 2, name: 'Mary'},    {id: 3, name: 'Andrew'}];
function sortBy(array, key){
return array.slice().sort((a,b) => {
    if(a[key] < b[key])
    return -1;
    if(a[key] > b[key])
    return 1;
    return 0;
});
}
var sorted=sortBy(arr, 'name');
console.log(sorted);



