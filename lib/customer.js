var Config = require('./Config.js');
var rp = require('request-promise');
var Q = require("q");


var Customer = {
	initWithKey: function(apiKey) {
		Config.setApiKey(apiKey);
		return this;
	},
	urlWithEntity: function() {
		return Config.baseUrl+"/customers/";
	},
	urlWithAcctEntity: function() {
		return Config.baseUrl+"/accounts/";
	},
	apiKey: function() {
		return Config.apiKey;
	},
	/**
	  # @Method: getCustomers
	  # @Brief: Gets all customers the API key has acccess to.
	  # @Returns an array of JSON Objects.
	**/
	getCustomers: function() {
		var customers;
		var deferred = Q.defer();
		var options = {
    		uri: this.urlWithEntity(),
    		qs: {
        		key: this.apiKey() // -> uri + '?access_token=xxxxx%20xxxxx'
    		},
    		json: true // Automatically parses the JSON string in the response
		};

		rp(options).then(function (repos) {
			deferred.resolve(repos);
		        console.log("Customer is added", repos);
		    })
		    .catch(function (err) {
		    	 console.log("Err", err);
		        // API call failed...
			}).finally(function () {
	        // This is called after the request finishes either successful or not successful.
	    	});
	    	return deferred.promise;
	},

	addCustomers: function (customer) {
		var deferred = Q.defer();
		var options = {
		    method: 'POST',
		    uri: this.urlWithEntity(),
		    qs: {
        		key: this.apiKey() // -> uri + '?access_token=xxxxx%20xxxxx'
    		},
		    body: customer,
		    json: true // Automatically stringifies the body to JSON 
		};
		rp(options).then(function (repos) {
			deferred.resolve(repos);
		        console.log(repos.message, repos.code);
		    })
		    .catch(function (err) {
		    	 console.log("// API call failed...", err);
			})
	    	return deferred.promise;
	},
	/**
	  # @Method: getCustomerById
	  # @Brief: Gets the specified customer's information.
	  # @Parameters: CustomerId
	  # @Returns a object with the customer data
	**/
	getCustomerById: function(custId) {
		var customer;
		var request = $.ajax({ 
			url: this.urlWithEntity()+custId,
			data: 'key='+this.apiKey(),
			async: false,
			dataType: 'json'
		});

		request.done(function(results) {
			customer = results;
		});
		return customer;
	},
	/**
	  # @Method: Get the customer for the given account.
	  # @Parameters: AccountId
	  # @Returns a object with the specified customer data.
	**/
	getCustomerByAcountId: function(accId) {
		var customer;
		var request = $.ajax({ 
			url: this.urlWithAcctEntity()+accId+'/customer',
			data: 'key='+this.apiKey(),
			async: false,
			dataType: 'json'
		});
		
		request.done(function(results) {
			customer = results;
		});
		return customer;
	},
	/**
	  # @Method: updateCustomer
	  # @Brief: Updates a customer by id with given JSON data. 
	  # @Parameters: CustomerId, Customerobject.
	  # @Note: Json is as follows: 
	  #  {
	  #   "address": {
	  #     "street_number": "",
	  #     "street_name": "",
	  #     "city": "",
	  #     "state": "",
	  #     "zip": ""
	  #   }
	  # }
	  # @Returns http response code. 
	**/
	updateCustomer: function(custId, json) {
		var respCode;
		var request = $.ajax({
			url: this.urlWithEntity()+custId+'?key='+this.apiKey(),
			data: json,
			contentType: 'application/json',
			async: false,
			type: 'PUT'
		});

		request.complete(function(jqXHR, textStatus) {
			respCode = jqXHR.status;
		});
		return respCode;
	}
};

module.exports = Customer;