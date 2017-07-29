Meteor.methods({

	getNews: NewsFeedHelper.getNews,
	/**
	 *
	 * Client code should call this server method to avoid CORS restrictions
	 */
	crossDomainProxy: function(url, options, method) {

		/*
		 // how to use this from client code
		 Meteor.call('crossDomainProxy', url, null, "GET", function(err, response) {

			 if(err || !responses) {
				 console.log(err);
			 }
			 else {
				// do something ith response
			 });
		*/

		this.unblock();

		var params = {
			headers: {
				Accept: "text/javascript, application/xml, text/xml, text/html, */*"
			}
		};

		if(options) _.extend(params, options);

		try {
			return HTTP.call(method, url, params);
		}
		catch (e) {
			throw new Meteor.Error(500, 'Error 500: Get request failed', e);
		}
	}
});
