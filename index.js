global.__base = __dirname + '/';
var Customer =  require('./lib/customer.js');
var apikey = 'e742fa65a65ce871eba63bd37b0c9908';
var Chance = require("chance");
var jsonfile = require('jsonfile')
var chance = new Chance();
var apikey = 'e742fa65a65ce871eba63bd37b0c9908';




function customerDemo (apikey) {
	var customerAccount = Customer.initWithKey(apikey);
	//var custID = '55e94a6af8d8770528e60e64';
	//var accID = '560072e0ce1cef140015e483';
	var newCustomer = {
  "first_name": "Chait",
  "last_name": "Tanya",
  "address": {
    "street_number": "5030",
    "street_name": "creek pkwy",
    "city": "Irving",
    "state": "tx",
    "zip": "75061"
  }
};
	generateCustomerData(apikey);
	customerAccount.getCustomers().then(function (repos) {
        console.log("[Customer - Get All Customers] : Sample Customer: " + repos.length);
				writeJsonToFile(repos);
    });
    
	//customerAccount.addCustomers(newCustomer);
	//console.log(chance.zip())
}

customerDemo(apikey);


function generateCustomerData (apikey) {
	var number = 1000;
	var customerJson = {};
	var customerAccount = Customer.initWithKey(apikey);
	while(number > 0){
		customerJson = {
		  "first_name": chance.first(),
		  "last_name": chance.last(),
		  "address": {
		    "street_number": chance.natural({min: 1, max: 2000}).toString(),
		    "street_name": chance.street(),
		    "city": chance.city(),
		    "state": chance.state(),
		    "zip": chance.zip()
	 		}
		}
	 	customerAccount.addCustomers(customerJson);
	 	number--;
	}
	
}

 
 function writeJsonToFile(data) {
	var file = __base + '/tmp/data.json';
	jsonfile.writeFile(file, data, function (err) {
		console.error(err)
	})
 }; 
