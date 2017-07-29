
// API key for ABC news cbe0904559db467aa331ba36e9185a76

NewsFeedHelper = {
    getNews: function() {
        // Make a request to the ABC news api
        this.unblock(); // Allows out of order data processing

        try {
            const result = HTTP.get('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=cbe0904559db467aa331ba36e9185a76');
            return true;
        } catch (e) {
            console.log("There was a problem with the news API call");
            return false;
        }
    }
}
