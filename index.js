global.__base = __dirname + '/';
var Customer =  require('./lib/customer.js');
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
			customerAccount.getCustomers().then(function (repos) {
		        console.log("[Customer - Get All Customers] : Sample Customer: " + repos.length);
		    })
		    
	    	customerAccount.addCustomers(newCustomer);
}

customerDemo(apikey);