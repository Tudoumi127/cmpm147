// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    character: ["Katsuhiko", "Jamie", "Mingyou", "Victoria", "Daiyu", "Eun-ji", "Kaile", "Ana", "Ariel", "Lin", "Viva", "Chris"],
    pet: ["YaYa", "YueYue", "PomPom", "Paimon", "Morgana", "Diamond Dogs"],
    animal: ["diamond dogs", "League of Legends player", "Valorant player", "incel", "Genshin Impact player", "tiger", "cat", "dog", "pig"],
    location: ["The Divining Sanctum", "The Mall", "Katsuhiko's House", "The Pool", "Hell", "Heaven", "The Good Place", "The Bad Place", "Chris Evans' No-Longer-Existent twitter"],
    celebrity: ["Scarlett Johansson", "Chris Hemsworth", "Tom Holland", "Jojo Siwa", "Pewdiepie", "Zach Galifianakis", "Joseph Stalin", "Mao Zedong", "Kim Jong-un"],
    adj: ["gruesome", "funny", "hilarious", "crazy", "insane", "toe-tickling", "exciting", "hahaheehee"],
    verb: ["seducing", "slapping", "stealing", "kissing", "killing", "licking", "kicking", "choking", "snatching"],
    fictional: ["anime", "cartoon", "fictional", "fake", "isekai", "test"],
    item: ["knife", "gun", "teddy bear", "mace", "taser", "hammer", "bird", "bullet proof vest", "chain mail", "fist", "potato"],
    sendoff: ["make haste", "get out of here", "hurry off", "screw off", "off you go"],
    belonging: ["pants", "wig", "cat", "shears", "shoes", "nail clippers", "ear wax", "pain medication"]
    
  };
  
  const template = `$character help, $character needs you!
  
  They went to $location to meet $character and got mauled by a $animal that kind of looked like $pet mixed with $celebrity. It was kinda $adj to be honest. Its okay though because they'll heal fully since this is a $fictional world! But they need your help getting to $location.
  
  Hurry though because if $character gets to them before you they'll never let you hear the end of it. They're still mad at you for $verb and $verb their ex-partner $character.
  
  Here take this $item with you, might help you fight them off if that happens. Anyway, run now! $sendoff ! If you run into $character on the way there too, tell them I still have their $belonging.
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $('#box').text(story);
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  
  generate();
}

// let's get this party started - uncomment me
main();