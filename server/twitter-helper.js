/**
 * Created by dandaman on 29/7/17.
 */

TwitterHelper = {

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

    getRequestId: function () {

        //GET /search/tweets.json
        this.oauth.get(
            'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi',
            this.accessToken,
            this.accessTokenSecret,
            function (e, data, res) {
                if (e) console.error(e);
                console.log(data);
            });

    },

};