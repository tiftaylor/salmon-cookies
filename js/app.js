'use strict';

function StoreLocation (location, min, max, avgCookies, openHour, closeHour) {
  this.location = location;
  this.minCustomers = min;
  this.maxCustomers = max;
  this.avgCookiesPerCustomer = avgCookies;
  this.openHour = openHour; 
  this.closeHour = closeHour; 

  this.hoursList = []; 
  this.cookiesPerHourArray = [];

  this.calculateCookiesForOpenHours();
};

StoreLocation.prototype.generateCustomersPerHour = function () {
  var min = this.minCustomers;
  var max = this.maxCustomers;
  var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; // see README for resources
  return random;
};

StoreLocation.prototype.refactorHours = function () {
  for (var i = this.openHour; i < this.closeHour; i++) {
    if (i < 12) {
      this.hoursList.push(i + ':00am');
    } else if (i === 12) {
      this.hoursList.push(i + ':00pm');
    } else if (i > 12) {
      this.hoursList.push((i - 12) + ':00pm')
    }
  }
  return this.hoursList;
};

StoreLocation.prototype.calculateCookiesForOpenHours = function () {
  this.refactorHours();

  for (var i = this.openHour; i < this.closeHour; i++) {
    var cookiesEachHour = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
    this.cookiesPerHourArray.push(cookiesEachHour);
  };
  return this.cookiesPerHourArray;
};

StoreLocation.prototype.dailyLocationTotal = function() {
  var sumOfCookies = 0;
  for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
    sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
  }
  return sumOfCookies;
};

StoreLocation.prototype.renderTableHeaders = function () {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');
  var tableHeadCell = document.createElement('th');
  row.appendChild(tableHeadCell);

  // hour of the day headers
  for (var i = 0; i < this.hoursList.length; i++) {
    tableHeadCell = document.createElement('th');
    tableHeadCell.textContent = this.hoursList[i];
    row.appendChild(tableHeadCell);
  }
  // total header
  tableHeadCell = document.createElement('th');
  tableHeadCell.textContent = 'Daily Location Total';
  row.appendChild(tableHeadCell);

  table.appendChild(row);
};

StoreLocation.prototype.renderTableData = function () {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');

  // city name cell
  var cityNameCell = document.createElement('td');
  cityNameCell.textContent = this.location;
  row.appendChild(cityNameCell);

  // cookie data x 14
  for (var i = 0; i < this.hoursList.length; i++) {
    var tableDataCell = document.createElement('td');
    tableDataCell.textContent = this.cookiesPerHourArray[i];
    row.appendChild(tableDataCell);
  }

  tableDataCell = document.createElement('td');
  tableDataCell.textContent = this.dailyLocationTotal();
  row.appendChild(tableDataCell);

  table.appendChild(row);
};

StoreLocation.prototype.renderTableFooter = function (allLocations) {
  var table = document.getElementById('cookieData');
  var row = document.createElement('tr');
  var tableFootCell = document.createElement('th');
  tableFootCell.textContent = 'Totals';
  row.appendChild(tableFootCell);
  
  var cookieTotalArray = [];
  // to look at 14 hours of the day for 14 totals cells
  for (var i = 0; i < this.cookiesPerHourArray.length; i++) {
    var cookieTotal = 0;
    // add up each index from all 5 locations
    for (var j = 0; j < allLocations.length; j++) {
      cookieTotal = cookieTotal + allLocations[j].cookiesPerHourArray[i];
    }
    cookieTotalArray.push(cookieTotal);
    tableFootCell = document.createElement('td');
    tableFootCell.textContent = cookieTotalArray[i];
    row.appendChild(tableFootCell);
  }

  var superTotal = 0;
  for (var i = 0; i < allLocations.length; i++) {
    superTotal = superTotal + allLocations[i].dailyLocationTotal();
  }
  tableFootCell = document.createElement('td');
  tableFootCell.textContent = superTotal;
  row.appendChild(tableFootCell);

  table.appendChild(row);
};

var seattle = new StoreLocation('Seattle', 23, 65, 6.3, 6, 20);
seattle.renderTableHeaders(); // table headers function is called only once to keep just 1 row of times data
seattle.renderTableData();

var tokyo = new StoreLocation('Tokyo', 3, 24, 1.2, 6, 20);
tokyo.renderTableData();

var dubai = new StoreLocation('Dubai', 11, 32, 3.7, 6, 20);
dubai.renderTableData();

var paris = new StoreLocation('Paris', 20, 38, 2.3, 6, 20);
paris.renderTableData();

var lima = new StoreLocation('Lima', 2, 16, 4.6, 6, 20);
lima.renderTableData();

// 'totals' row just called once for adding up 6am for each location, and so on.
var allLocations = [seattle, tokyo, dubai, paris, lima];
seattle.renderTableFooter(allLocations); 


// OLD CODE FROM LAB 6 and Class NOTES
// var seattle = {
//   minCustomers : 23,
//   maxCustomers : 65,
//   avgCookiesPerCustomer : 6.3,

//   // FROM DEMO FOR HOW TO DO THIS
//   // // THIS FUNCTION was put OUTSIDE the object // // 
//   // getRandomNumber : fucntion (min, max) {
//   //   min = Math.ceil(min);
//   //   max = Math.floor(max);
//   //   return Math.floor(Math.random() * (max - min + 1)) + min;
//   // },

//   // generateCustomersPerHour : function () {
//   //   var randomPerHour = getRandomNumber(this.minCustomers, this.maxCustomers);
//   //   return randomPerHour;
//   // },
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min; // see README for resources
//     return random;
//   }, 

//   openHour : 6, 
//   closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },

//   cookiesPerHourArray : [],
//   calculateCookiesForOpenHours : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookiesEachHour = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookiesEachHour);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('seattleList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('seattleList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },

//   // StoreLocation.prototype.displayLists = function() {
// //   // get times and cookies on html
// //   for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
// //     var locationList = document.getElementById('seattleList');
// //     var locationListItem = document.createElement('li');
// //     locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
// //     locationList.appendChild(locationListItem);
// //   }
// //   // get total on html
// //   var locationList = document.getElementById('seattleList');
// //   var locationListItem = document.createElement('li');
// //   locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
// //   locationList.appendChild(locationListItem);
// // };
// };

// seattle.generateCustomersPerHour();

// seattle.refactorHours();
// seattle.calculateCookiesForOpenHours();
// seattle.displayLists();


// var tokyo = {
//   minCustomers : 3,
//   maxCustomers : 24,
//   avgCookiesPerCustomer : 1.2,
  
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('tokyoList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('tokyoList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// tokyo.refactorHours();
// tokyo.calculatecookiesPerHourArray();
// tokyo.displayLists();


// var dubai = {
//   minCustomers : 11,
//   maxCustomers : 38,
//   avgCookiesPerCustomer : 3.7,
 
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//       // console.log(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('dubaiList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('dubaiList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// dubai.refactorHours();
// dubai.calculatecookiesPerHourArray();
// dubai.displayLists();


// var paris = {
//   minCustomers : 20,
//   maxCustomers : 38,
//   avgCookiesPerCustomer : 2.3,
  
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//       // console.log(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('parisList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('parisList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// paris.refactorHours();
// paris.calculatecookiesPerHourArray();
// paris.displayLists();


// var lima = {
//   minCustomers : 2,
//   maxCustomers : 16,
//   avgCookiesPerCustomer : 4.6,
 
//   generateCustomersPerHour : function () {
//     var min = this.minCustomers;
//     var max = this.maxCustomers;
//     var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     return random;
//   }, 
  
//   openHour : 6, 
//   closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
//   hoursList : [],  // refactors and stores operation hours with am or pm
//   refactorHours : function() {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       if (i < 12) {
//         this.hoursList.push(i + 'am');
//       } else if (i === 12) {
//         this.hoursList.push(i + 'pm');
//       } else if (i > 12) {
//         this.hoursList.push((i - 12) + 'pm')
//       }
//     }
//     return this.hoursList;
//   },
  
//   cookiesPerHourArray : [],
//   calculatecookiesPerHourArray : function () {
//     for (var i = this.openHour; i < this.closeHour; i++) {
//       var cookieNum = Math.round(this.avgCookiesPerCustomer * this.generateCustomersPerHour());
//       this.cookiesPerHourArray.push(cookieNum);
//       // console.log(cookieNum);
//     };
//     return this.cookiesPerHourArray;
//   },

//   totalCookiesPerDay : function() {
//     var sumOfCookies = 0;
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       sumOfCookies = this.cookiesPerHourArray[i] + sumOfCookies;
//     }
//     return sumOfCookies;
//   },

//   displayLists : function() {
//     // get times and cookies on html
//     for (var i = 0; i < this.cookiesPerHourArray.length; i++) { 
//       var locationList = document.getElementById('limaList');
//       var locationListItem = document.createElement('li');
//       locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHourArray[i] + ' cookies';
//       locationList.appendChild(locationListItem);
//     }
//     // get total on html
//     var locationList = document.getElementById('limaList');
//     var locationListItem = document.createElement('li');
//     locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
//     locationList.appendChild(locationListItem);
//   },
// };
// lima.refactorHours();
// lima.calculatecookiesPerHourArray();
// lima.displayLists(); 



// ========== Constructor Notes from Class ===========

// var paul = {
//   faveFood: 'brat',
//   faveColor: 'green',
//   faveCar: 'outback',
//   whereFrom: 'Saint Louis',
//   faveHobby: 'backpacking',
//   cool: true,
//   student: true,
//   class: '201d65',
//   teacher: 'nicholas',
//   greeting : function () {
//     console.log('sup');
//   },
// };

// var mike = {
//   faveFood: 'salmon',
//   faveColor: 'blue',
//   faveCar: 'volvo',
//   whereFrom: 'Chicago',
//   faveHobby: 'photography',
//   cool: true,
//   student: true,
//   class: '201d65',
//   teacher: 'nicholas'
// };

// // ==== next step is to make the above into this ======
// function makeStudent(food, color, car, from, hobby) {
//   var student = {
//     faveFood: food,
//     faveColor: color,
//     faveCar: car,
//     whereFrom: from,
//     faveHobby: hobby,
//     cool: true,
//     student: true,
//     class: '201d65',
//     teacher: 'nicholas',
//     greeting : function () {
//       console.log('sup');
//     },
//   };
//   return student;
// }
// var mike = makeStudent('salmon', 'blue', 'volvo', 'Chicago', 'photography');
// console.log(mike); // returns an object list but there is NO name in front of it 

// // ONLY thing that gives NAME to objects is the syntax around them == Constructor Function (should be nouns of what they're constructing makeStudent > student )
// // NOTE - whether your METHODS are IN or OUT of the constructor, they still need to be CALLED SOMEWHERE to work 
//   // Try nesting calls of functions inside other functions to minimize amount of calls (3 calls to get all 5 METHODS for todays rework)
// function Student(food, color, car, from, hobby) {
//   this.faveFood = food;
//   this.faveColor = color;
//   this.faveCar = car;
//   this.whereFrom = from;
//   this.faveHobby = hobby;
//   this.cool = true;
//   this.student = true;
//   this.class = '201d65';
//   this.teacher = 'nicholas';
//   this.greeting = function () {
//     console.log('sup');
//   };
//   // auto gets the prototypes now if they exist on the page
// }

// // called with 'new' keyword
// var marchael = new Student('sinigang', 'subaru', 'green', 'seattle', 'video games');
// console.log(marchael);

// // syntax for adding a method to the objects made by students
// // prototype means 'list of funcitons to add later'
// Student.prototype.goToSchool = function () {
//   console.log('I am going to ' + this.class + ' in my ' + this.faveCar);
// }

// Student.prototype.sayHobby = function () {
//   console.log(this.faveHobby);
// }

// marchael.goToSchool();
// marchael.sayHobby();

// write function xxxx(para, para, etc) {
    // copy / paste properitres
    // change , to ;
    // add this. infront of all properities
    // replace : with =
// }
// var city = new xxxx (asdf, asdf, adsf);
// dog.play();