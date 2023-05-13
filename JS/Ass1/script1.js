function Pattern(n) {
    for (let i = n; i >= 1; i--) 
    {
      let asterisk  = '';
      for (let j = 1; j <= i; j++) {
        asterisk += '* ';
      }
      console.log(asterisk);
    }
  }
  Pattern(5);
