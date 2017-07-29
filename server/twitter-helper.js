/**
 * Created by Dan n Brad on 29/7/17.
 */

TwitterHelper = {

    //I just have this here as a template....
    getDataExample: function(id){

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
    },

    accessToken : "icNZWaoOvwjGIknimKODwwn4j",
    accessTokenSecret : "ItbA7XFZJO9mNTuRVWGOF1iMbUgw2HAWhQNClv1MLcaNYxGp3c",

    oauth : new OAuth.OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        this.accessToken,
        this.accessTokenSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    ),

    getTest: function(){

        // return a promise while we do async stuff
        return new Promise((resolve, reject) => {

            // make an async call
            this.oauth.get(
                'https://api.twitter.com/1.1/search/tweets.json?q=%40govhack',
                this.accessToken,
                this.accessTokenSecret,
                function (e, data, res) {
                    if (e){
                        console.error(e);
                        reject(e);
                    }
                    else {
                        console.log(data);
                        resolve(data);
                    }
                });

        });
    },
};