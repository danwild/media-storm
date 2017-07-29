
/**
 * Created by Brad on 29/7/17.
 *
 *  Twitter application access key allows for approx 450 queries every 15 minutes
 */


const accessToken = "icNZWaoOvwjGIknimKODwwn4j";
const accessTokenSecret = "ItbA7XFZJO9mNTuRVWGOF1iMbUgw2HAWhQNClv1MLcaNYxGp3c";
const OAuth = require('oauth').OAuth;


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


    getData: function(text, date=null, longitude=null, latitude=null, radius=null){

        console.log('Fetching tweats for ' + date + " within " + radius + " kilometres of " + longitude + " : " + latitude);

        //geocode params are now optional
        var geoParams = "";
        if(longitude != null && latitude != null && radius != null){
            geoParams = "&geocode="+ latitude+ "," + longitude + "," + radius + "km";
        }

        //Date param is now optional
        var dateParam ="";
        if(date != null){
            dateParam = "&until=" + date;
        }

        const params = "q=" + text + geoParams + dateParam;

        // return a promise while we do async stuff
        return new Promise((resolve, reject) => {

            // make an async call
            this.oauth.get(
                'https://api.twitter.com/1.1/search/tweets.json?' + params,
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


    //google api key AIzaSyA6XAlZwn2SuFh3vNTHeW1WhJpal9FC29U
    googleAPIkey : "AIzaSyA6XAlZwn2SuFh3vNTHeW1WhJpal9FC29U",
    //just incase we might use it i got a key. :P

};



