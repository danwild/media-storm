
// API key for ABC news cbe0904559db467aa331ba36e9185a76


var url ='https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=cbe0904559db467aa331ba36e9185a76';

NewsFeedHelper = {

    getNews: function() {
        // Make a request to the ABC news api

        // this.unblock(); // Allows out of order data processing,

        HTTP.call('GET', url, null, (error, result) => {
              //  param: { author : "Tristan Greene"}
            if (!error) {
                console.log(result.data);
                return result;
            }
            },
        );
    }
}

