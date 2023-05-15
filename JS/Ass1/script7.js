//Write a program to normalize a given input to get the expected output.

var input = 
{
    '1': {
      id: 1,
      name: 'John',
      children: 
      [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': 
    {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };
  
  var output = {};
  
  function normalize(person) 
  {
    var normalized = 
    {
      id: person.id,
      name: person.name,
      children: []
    };
  
    if (person.children) {
      for (var i = 0; i < person.children.length; i++) 
      {
        var child = person.children[i];
        normalized.children.push(child.id);
        normalize(child);
      }
    }
  
    output[normalized.id] = normalized;
  }
  
  for (var key in input) 
  {
    normalize(input[key]);
  }
  
  console.log(output);
  