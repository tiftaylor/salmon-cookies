'use strict';

var seattle = {
  minCustomers : 23,
  maxCustomers : 65,
  avgCookiesPerCustomer : 6.3,
  
  customersPerHour : function () {
    var min = this.minCustomers;
    var max = this.maxCustomers;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    return random;
  }, 
  
  openHour : 6, 
  closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
  hoursList : [],  // refactors and stores operation hours with am or pm
  refactorHours : function() {
    for (var i = this.openHour; i < this.closeHour; i++) {
      if (i < 12) {
        this.hoursList.push(i + 'am');
      } else if (i === 12) {
        this.hoursList.push(i + 'pm');
      } else if (i > 12) {
        this.hoursList.push((i - 12) + 'pm')
      }
    }
    return this.hoursList;
  },
  
  cookiesPerHour : [],
  calculateCookiesPerHour : function () {
    for (var i = this.openHour; i < this.closeHour; i++) {
      var cookieNum = Math.round(this.avgCookiesPerCustomer * this.customersPerHour());
      this.cookiesPerHour.push(cookieNum);
      // console.log(cookieNum);
    };
    return this.cookiesPerHour;
  },

  totalCookiesPerDay : function() {
    var sumOfCookies = 0;
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      sumOfCookies = this.cookiesPerHour[i] + sumOfCookies;
    }
    return sumOfCookies;
  },

  displayLists : function() {
    // get times and cookies on html
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      var locationList = document.getElementById('seattleList');
      var locationListItem = document.createElement('li');
      locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      locationList.appendChild(locationListItem);
    }
    // get total on html
    var locationList = document.getElementById('seattleList');
    var locationListItem = document.createElement('li');
    locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
    locationList.appendChild(locationListItem);
  },
};
seattle.refactorHours();
seattle.calculateCookiesPerHour();
seattle.displayLists();


var tokyo = {
  minCustomers : 3,
  maxCustomers : 24,
  avgCookiesPerCustomer : 1.2,
  
  customersPerHour : function () {
    var min = this.minCustomers;
    var max = this.maxCustomers;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    return random;
  }, 
  
  openHour : 6, 
  closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
  hoursList : [],  // refactors and stores operation hours with am or pm
  refactorHours : function() {
    for (var i = this.openHour; i < this.closeHour; i++) {
      if (i < 12) {
        this.hoursList.push(i + 'am');
      } else if (i === 12) {
        this.hoursList.push(i + 'pm');
      } else if (i > 12) {
        this.hoursList.push((i - 12) + 'pm')
      }
    }
    return this.hoursList;
  },
  
  cookiesPerHour : [],
  calculateCookiesPerHour : function () {
    for (var i = this.openHour; i < this.closeHour; i++) {
      var cookieNum = Math.round(this.avgCookiesPerCustomer * this.customersPerHour());
      this.cookiesPerHour.push(cookieNum);
    };
    return this.cookiesPerHour;
  },

  totalCookiesPerDay : function() {
    var sumOfCookies = 0;
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      sumOfCookies = this.cookiesPerHour[i] + sumOfCookies;
    }
    return sumOfCookies;
  },

  displayLists : function() {
    // get times and cookies on html
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      var locationList = document.getElementById('tokyoList');
      var locationListItem = document.createElement('li');
      locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      locationList.appendChild(locationListItem);
    }
    // get total on html
    var locationList = document.getElementById('tokyoList');
    var locationListItem = document.createElement('li');
    locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
    locationList.appendChild(locationListItem);
  },
};
tokyo.refactorHours();
tokyo.calculateCookiesPerHour();
tokyo.displayLists();


var dubai = {
  minCustomers : 11,
  maxCustomers : 38,
  avgCookiesPerCustomer : 3.7,
 
  customersPerHour : function () {
    var min = this.minCustomers;
    var max = this.maxCustomers;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    return random;
  }, 
  
  openHour : 6, 
  closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
  hoursList : [],  // refactors and stores operation hours with am or pm
  refactorHours : function() {
    for (var i = this.openHour; i < this.closeHour; i++) {
      if (i < 12) {
        this.hoursList.push(i + 'am');
      } else if (i === 12) {
        this.hoursList.push(i + 'pm');
      } else if (i > 12) {
        this.hoursList.push((i - 12) + 'pm')
      }
    }
    return this.hoursList;
  },
  
  cookiesPerHour : [],
  calculateCookiesPerHour : function () {
    for (var i = this.openHour; i < this.closeHour; i++) {
      var cookieNum = Math.round(this.avgCookiesPerCustomer * this.customersPerHour());
      this.cookiesPerHour.push(cookieNum);
      // console.log(cookieNum);
    };
    return this.cookiesPerHour;
  },

  totalCookiesPerDay : function() {
    var sumOfCookies = 0;
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      sumOfCookies = this.cookiesPerHour[i] + sumOfCookies;
    }
    return sumOfCookies;
  },

  displayLists : function() {
    // get times and cookies on html
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      var locationList = document.getElementById('dubaiList');
      var locationListItem = document.createElement('li');
      locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      locationList.appendChild(locationListItem);
    }
    // get total on html
    var locationList = document.getElementById('dubaiList');
    var locationListItem = document.createElement('li');
    locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
    locationList.appendChild(locationListItem);
  },
};
dubai.refactorHours();
dubai.calculateCookiesPerHour();
dubai.displayLists();


var paris = {
  minCustomers : 20,
  maxCustomers : 38,
  avgCookiesPerCustomer : 2.3,
  
  customersPerHour : function () {
    var min = this.minCustomers;
    var max = this.maxCustomers;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    return random;
  }, 
  
  openHour : 6, 
  closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
  hoursList : [],  // refactors and stores operation hours with am or pm
  refactorHours : function() {
    for (var i = this.openHour; i < this.closeHour; i++) {
      if (i < 12) {
        this.hoursList.push(i + 'am');
      } else if (i === 12) {
        this.hoursList.push(i + 'pm');
      } else if (i > 12) {
        this.hoursList.push((i - 12) + 'pm')
      }
    }
    return this.hoursList;
  },
  
  cookiesPerHour : [],
  calculateCookiesPerHour : function () {
    for (var i = this.openHour; i < this.closeHour; i++) {
      var cookieNum = Math.round(this.avgCookiesPerCustomer * this.customersPerHour());
      this.cookiesPerHour.push(cookieNum);
      // console.log(cookieNum);
    };
    return this.cookiesPerHour;
  },

  totalCookiesPerDay : function() {
    var sumOfCookies = 0;
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      sumOfCookies = this.cookiesPerHour[i] + sumOfCookies;
    }
    return sumOfCookies;
  },

  displayLists : function() {
    // get times and cookies on html
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      var locationList = document.getElementById('parisList');
      var locationListItem = document.createElement('li');
      locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      locationList.appendChild(locationListItem);
    }
    // get total on html
    var locationList = document.getElementById('parisList');
    var locationListItem = document.createElement('li');
    locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
    locationList.appendChild(locationListItem);
  },
};
paris.refactorHours();
paris.calculateCookiesPerHour();
paris.displayLists();


var lima = {
  minCustomers : 2,
  maxCustomers : 16,
  avgCookiesPerCustomer : 4.6,
 
  customersPerHour : function () {
    var min = this.minCustomers;
    var max = this.maxCustomers;
    var random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    return random;
  }, 
  
  openHour : 6, 
  closeHour : 20,  // suggestion help from classmate Jack Nelson for using 24 hour time 
  hoursList : [],  // refactors and stores operation hours with am or pm
  refactorHours : function() {
    for (var i = this.openHour; i < this.closeHour; i++) {
      if (i < 12) {
        this.hoursList.push(i + 'am');
      } else if (i === 12) {
        this.hoursList.push(i + 'pm');
      } else if (i > 12) {
        this.hoursList.push((i - 12) + 'pm')
      }
    }
    return this.hoursList;
  },
  
  cookiesPerHour : [],
  calculateCookiesPerHour : function () {
    for (var i = this.openHour; i < this.closeHour; i++) {
      var cookieNum = Math.round(this.avgCookiesPerCustomer * this.customersPerHour());
      this.cookiesPerHour.push(cookieNum);
      // console.log(cookieNum);
    };
    return this.cookiesPerHour;
  },

  totalCookiesPerDay : function() {
    var sumOfCookies = 0;
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      sumOfCookies = this.cookiesPerHour[i] + sumOfCookies;
    }
    return sumOfCookies;
  },

  displayLists : function() {
    // get times and cookies on html
    for (var i = 0; i < this.cookiesPerHour.length; i++) { 
      var locationList = document.getElementById('limaList');
      var locationListItem = document.createElement('li');
      locationListItem.textContent = this.hoursList[i] + ': ' + this.cookiesPerHour[i] + ' cookies';
      locationList.appendChild(locationListItem);
    }
    // get total on html
    var locationList = document.getElementById('limaList');
    var locationListItem = document.createElement('li');
    locationListItem.textContent =  'Total: ' + this.totalCookiesPerDay() + ' cookies';
    locationList.appendChild(locationListItem);
  },
};
lima.refactorHours();
lima.calculateCookiesPerHour();
lima.displayLists(); 
