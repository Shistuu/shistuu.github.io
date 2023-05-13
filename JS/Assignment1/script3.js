// Write a function that searches for an object by a specific key value in an array of objects:
// var fruits = [
//     {id: 1, name: 'Banana', color: 'Yellow'},
//     {id: 2, name: 'Apple', color: 'Red'}
// ]

// searchByName(fruits, 'apple');
// Should return: {id: 2, name: 'Apple', color: 'Red'}


function searchByName(arr, name) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name.toLowerCase() === name.toLowerCase()) {
        return arr[i];
      }
    }
    return null;
  }
  var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
  ];
  
  var ans = searchByName(fruits, 'Apple');
  console.log(ans); 
  

