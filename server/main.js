Meteor.startup(() => {

	// things to do on server startup..
	// e.g. start a polling process


	//console.log(NewsFeedHelper.getNews()); // this line should not work
	console.log("Hello you");
	//call(NewsFeedHelper.getNews());
    // Meteor.call();

    NewsFeedHelper.getNews()
});
