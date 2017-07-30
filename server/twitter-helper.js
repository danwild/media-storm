
/**
 * Created by dandaman on 29/7/17.
 */


// credentials for twitter api
const accessToken = "icNZWaoOvwjGIknimKODwwn4j";
const accessTokenSecret = "ItbA7XFZJO9mNTuRVWGOF1iMbUgw2HAWhQNClv1MLcaNYxGp3c";
const OAuth = require('oauth').OAuth;


/***
 * TwitterHelper provides a useful way to search for posts on twitter feeds using Oauth and application tokens.
 * This method is currently limited to 15 posts per request.
 *
 * @type {{oauth: *, getTest: TwitterHelper.getTest, getParamaters: TwitterHelper.getParamaters, getData: TwitterHelper.getData}}
 */
TwitterHelper = {

    /***
     * This is the oauth setup object used as part of the request to Twitter.
     */
    oauth: new OAuth (
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        accessToken,
        accessTokenSecret,
        '1.0A',
        null,
        'HMAC-SHA1'
    ),

    /**
     * This method is just a test method, and it is hard coded currently to retrieve tweets using the keyword 'govhack'.
     * @returns {Promise}
     */
    getTest: function() {

        // return a promise while we do async stuff
        return new Promise((resolve, reject) => {

            // make an async call
            this.oauth.get(
                'https://api.twitter.com/1.1/search/tweets.json?q=%40govhack',
                this.accessToken,
                this.accessTokenSecret,
                function (e, data, res) {
                    if (e){
                        reject(e);
                        return e;

                    } else {
                        resolve(data);
                        return data;
                    }
                });
        });
    },


    /**
     * This method is an over-loader method to provide the getData() method with any number of parameters for flexibility
     * in which arguments to provide it.
     *
     * @param text, keywords to search twitter feeds for. I.e. GovHack will yield results where that word is found.
     * @param date, the date parameter is the date we wish to collect up-to and including to allow data to be cherry picked.
     * @param longitude
     * @param latitude
     * @param radius
     * @returns {string}, the query string that will be sent to Twitter.
     */
    getParamaters: function (text, date, geolocation) {

        var paramaters = 'q=' + text;


        if (typeof longitude !== "undefined") {
            paramaters += '&geocode=' + geolocation.latitude + "," + geolocation.longitude + "," + geolocation.radius + "km";
        }
        if (typeof date !== "undefined") {
            paramaters += '&until=' + date;
        }

        return paramaters;
    },

    getData: function(text, date, longitude, latitude, radius) {
        //console.log('Fetching tweats for ' + date + " within " + radius + " kilometres of " + longitude + " : " + latitude);

        const params = this.getParamaters(text, date, longitude, latitude, radius);

        // return a promise while we do async stuff
        return new Promise((resolve, reject) => {

            // make an async call
            this.oauth.get(
                'https://api.twitter.com/1.1/search/tweets.json?' + params,
                this.accessToken,
                this.accessTokenSecret,
                function (e, data, res) {
                    if (e){
                        reject(e);
                        return e;

                    } else {
                        resolve(data);
                        return data;
                    }
                });
        });
    },
};



