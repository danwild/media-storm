
/**
 * Created by dandaman on 29/7/17.
 */



var accessToken = "icNZWaoOvwjGIknimKODwwn4j";
var accessTokenSecret = "ItbA7XFZJO9mNTuRVWGOF1iMbUgw2HAWhQNClv1MLcaNYxGp3c";
var OAuth = require('oauth').OAuth;


TwitterHelper = {

        oauth: new OAuth (
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            accessToken,
            accessTokenSecret,
            '1.0A',
            null,
            'HMAC-SHA1'
        ),

    getTest: function(){

            console.log('we go rekt');

        // return a promise while we do async stuff
        return new Promise((resolve, reject) => {

            // make an async call
            this.oauth.get(
                'https://api.twitter.com/1.1/search/tweets.json?q=%40govhack',
                this.accessToken,
                this.accessTokenSecret,
                function (e, data, res) {
                    if (e){
                        console.log(e);
                        reject(e);
                        return e;

                    }
                    else {

                        console.log(data);
                        resolve(data);
                        return data;

                    }
                });

        });
    },


};



