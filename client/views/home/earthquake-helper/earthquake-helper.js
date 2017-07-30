import moment from  'moment';

Session.set("targetQuakeId", null);

const Ntimeout = 2500;

const sleep = (mS) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, mS);
    });
}

var flag = false;
var quakeID;

async function notifier(data, currentindex = 0) {
    await sleep(2500);
    while(flag) {
        await sleep(2500);
    }

    flag = true;
    console.log("Started Loop");
    stop = (quakeID != Session.get("targetQuakeId"));
    while(!stop) {
        if (currentindex >= _.size(data)) {
            currentindex = 0;
        }

	    var time = "<p><small> " +moment.utc(data[currentindex].created_at, 'ddd MMM DD HH:mm:ss [+0000] YYYY').format('dddd, MMMM Do YYYY, h:mm:ss a') + "</small></p>";

        Helpers.info({
	        message: '<i class="fa fa-twitter" aria-hidden="true"></i>    <strong>Tweet</strong>'
	        + time + '' + data[currentindex].text + quakeID,

	         options: {
		        position: 'bottom-left',
		        timeout: '5000'
	        }
        });
        //notifier(data, quakeID, currentindex+1);
        currentindex++;
        stop = (quakeID != Session.get("targetQuakeId"));
        await sleep(2500);
    }
    console.log("Ended loop");
    flag = false;
}

EarthquakeHelper = {
	/*
	 Function twitterNotifier

	 Recursive function for showing the twitter messages onto the fullScreen
	 @param data The JSON object containing data from the twitter API
	 @param quakeID The quakeID at the start of the program to see if it needs to stop
	 @param currentindex The index to be displayed
	 */
    setTarget: function(id){

	    console.log('setTarget');

	    Session.set("targetQuakeId", id);
	    Helpers.clearAlert();
	    EarthquakeMapLayers.animateQuake(id);
	    this.showQuakeInfo(id);

        // query server for twitter data
        // vis tweets on map, show some top tweets as notifications
        Meteor.call('getTwitter', id, function(err, data) {

	        if(err || data.length < 1) return;

        	const tweets = JSON.parse(data);
            quakeID = id;
            notifier(tweets.statuses);

	        console.log(tweets);
        });
    },

	showQuakeInfo: function(id){
		var quake = Helpers.getQuake(id);
		var time = moment.utc(
			quake['UTC Date'] +' '+ quake['UTC Time'],
			'YYYY-MM-DD HH:mm:ss'
		).format('dddd, MMMM Do YYYY, h:mm:ss a');

		Helpers.success({
			message: "<div class='text-center'><strong>Time: </strong>"+ time +", <strong>Magnitude: </strong>" + quake['Magnitude'] + "</div>"
		});
	}

};



























