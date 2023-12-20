function shuffleOptions(obj) {
    const keys = Object.keys(obj);
    const shuffledKeys = shuffleArray(keys); // Shuffling the keys
  
    const shuffledObject = {};
    shuffledKeys.forEach((key, index) => {
      shuffledObject[key] = obj[keys[index]]; // Assigning shuffled keys with original values
    });
  
    return shuffledObject;
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Example usage:
  const originalOptions = {
    a: "Assassination of Archduke Franz Ferdinand",
    b: "Treaty of Versailles",
    c: "The sinking of the Lusitania",
    d: "The Battle of the Somme"
  };
  
  const randomlyMappedOptions = shuffleOptions(originalOptions);
  console.log(randomlyMappedOptions);