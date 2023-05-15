//Also try searchByKey(fruits, 'name', 'apple');

function searchByKey(arr, key, value)
{
    for( var i=0;i<arr.length;i++)
    {
        if(arr[i][key].toLowerCase()===value.toLowerCase())
        return arr[i];
    }
    return null;
}

var fruits=[
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
  ];

  var ans=searchByKey(fruits, 'name', 'apple');
  console.log(ans);
