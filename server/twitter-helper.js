/**
 * Created by dandaman on 29/7/17.
 */

TwitterHelper = {



    constructor () {


        var accessToken = "icNZWaoOvwjGIknimKODwwn4j";
        var accessTokenSecret = "ItbA7XFZJO9mNTuRVWGOF1iMbUgw2HAWhQNClv1MLcaNYxGp3c";


        var OAuth= require('oauth').OAuth;

        // var oa = new OAuth(
        //     "https://api.twitter.com/oauth/request_token",
        //     "https://api.twitter.com/oauth/access_token",
        //     "icNZWaoOvwjGIknimKODwwn4j",
        //     "ItbA7XFZJO9mNTuRVWGOF1iMbUgw2HAWhQNClv1MLcaNYxGp3c",
        //     "1.0",
        //     "http://media-storm.tech",
        //     "HMAC-SHA1"
        // );


        var oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            accessToken,
            accessTokenSecret,
            '1.0A',
            null,
            'HMAC-SHA1'
        );

        //GET /search/tweets.json
        oauth.get(
            'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi',
            accessToken,
            accessTokenSecret,
            function (e, data, res){
                if (e) console.error(e);
                console.log(data);
            });
    }




};