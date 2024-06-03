const input = require('sync-input');

const info = `WELCOME TO THE CARNIVAL GIFT SHOP!
Hello friend! Thank you for visiting the carnival!`

const menu = `What do you want to do?
1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop`;

const bye = `Have a nice day!`;

let tickets = 0;

function Gift (id, name, cost) {
  this.id = id;
  this.name = name;
  this.cost = cost;
};

const giftsList = [
  new Gift(1, "Teddy Bear", 10),
  new Gift(2, "Big Red Ball", 5),
  new Gift(3, "Huge Bear", 50),
  new Gift(4, "Candy", 8),
  new Gift(5, "Stuffed Tiger", 15),
  new Gift(6, "Stuffed Dragon", 30),
  new Gift(7, "Skateboard", 100),
  new Gift(8, "Toy Car", 25),
  new Gift(9, "Basketball", 20),
  new Gift(10, "Scary Mask", 75)
];

function giftsLoop() {
  console.log(`Here's the list of gifts:\n`)

  if (giftsList.length) {
    for (let gift of giftsList) {
      console.log(`${gift.id}- ${gift.name}, Cost: ${gift.cost} tickets`);
    }
  } else {
    console.log(`Wow! There are no gifts to buy.`);
  }
  
}

function mainLoop() {
  console.log(info);

  giftsLoop();

  let loopControl = 1

  while (loopControl) {
    console.log(menu);

    let menuChoice = input();

    if (isNaN(menuChoice) || (menuChoice < 1 || 5 < menuChoice)) {
      console.log(`Please enter a valid number!`);
      continue;
    }
  
    switch (menuChoice) {
      case "1":
        if (giftsList.length) {
          let giftChoice = input(`Enter the number of the gift you want to get: `);
          
          if (isNaN(giftChoice)) {
            console.log(`Please enter a valid number!`);
            break;
          }
          
          let giftChosen = giftsList.find(e => e.id == giftChoice);
          
          if (!giftChosen) {
            console.log(`There is no gift with that number!`);
            break;
          }

          if (tickets - giftChosen.cost < 0) {
            console.log(`You don't have enough tickets to buy this gift.`);
            break;
          }
          
          tickets -= giftChosen.cost;
          
          console.log(`Here you go, one ${giftChosen.name}!`);
          console.log(`Total tickets: ${tickets}`);
  
          giftsList.splice(giftsList.findIndex(e => e.id == giftChoice), 1);
          
        } else {
          console.log(`Wow! There are no gifts to buy.`)
        }
        break;
      case "2":
        let ticketAdd = input(`Enter the ticket amount: `);
        if (isNaN(ticketAdd) || (ticketAdd < 0 || 1000 < ticketAdd)) {
          console.log(`Please enter a valid number between 0 and 1000.`)
          break;
        }
        
        tickets += parseInt(ticketAdd);
        console.log(`Total tickets: ${tickets}`);
        break;
      case "3":
        console.log(`Total tickets: ${tickets}`);
        break;
      case "4":
        giftsLoop();
        break;
      default:
        loopControl = 0;
    }
  }
  console.log(bye);
  
}

mainLoop();
