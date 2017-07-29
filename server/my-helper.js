MyHelper = {

	getData: function(id){

		// return a promise while we do async stuff
		return new Promise((resolve, reject) => {

			// make an async call
			HTTP.call("GET", "http://my-url.com", function(err, response){

				// oh no error, we'll reject the query
				if(err){
					console.log('error: '+err);
					reject(err);
				}

				// great we got data, lets resolve it
				else {
					resolve(response);
				}

			});

		});
	}

};