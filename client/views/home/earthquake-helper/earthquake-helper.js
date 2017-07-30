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
        Helpers.info({ message: '<i class="fa fa-twitter" aria-hidden="true"></i>    <strong>Tweet</strong><BR>' + data[currentindex].text + quakeID, options: { position: 'bottom-right', timeout: '5000'} });
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


        Helpers.success({ message: "targetQuakeId updated: " + id });
        Session.set("targetQuakeId", id);

	    EarthquakeMapLayers.animateQuake(id);

        // query server for twitter data
        // vis tweets on map, show some top tweets as notifications
        Meteor.call('getTwitter', id, function(err, data) {

        	const tweets = JSON.parse(data);
            quakeID = id;
            notifier(tweets.statuses);
        });
    }

};



























