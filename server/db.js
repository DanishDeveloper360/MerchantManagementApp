// import { fail } from 'assert';

var faker = require('faker');
var _ = require('lodash');

module.exports = function() {
  var data = {
    merchants:[],
    bids: []
  };

// Bids
  for (var i = 1; i <= 15; i++) {
    data.bids.push({
      id: i,
      carTitle: faker.company.companyName(),
      amount: faker.commerce.price(10000),
      created: faker.date.past()
    });
  }

// Create Merchants
for (var i = 1; i <=50; i++) {
  data.merchants.push({
    id: i,    
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    avatarUrl: faker.internet.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    hasPremium: faker.random.boolean(),
    bids: _.shuffle(data.bids)
  });
}

  return data;
}();
