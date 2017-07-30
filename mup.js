module.exports = {

	/*
	 https://github.com/kadirahq/meteor-up
	 mup setup
	 mup deploy
	 TODO make sure mongo port is reachable (27017)
	 if auth issues try adding ssh key to ssh-agent
	 */

	servers: {

		// sydney
		one: {
			host: '13.210.54.191',
			username: 'ubuntu',
			pem: "/Users/danielwild/GoogleDrive/aws/keys/danwild-aws-sydney.pem",
			opts: {
				port: 22
			}
		}
	},

	meteor: {

		// unofficial fix for meteor 1.4
		// https://github.com/kadirahq/meteor-up/issues/172
		// https://github.com/arunoda/meteor-up/issues/1091
		dockerImage: 'abernix/meteord:base',

		name: 'mediastorm',
		path: '/Users/danielwild/git-local/media-storm',

		servers: {
			one: {}
		},
		buildOptions: {
			serverOnly: true,
			debug: true,
			cleanAfterBuild: true // default
		},
		env: {
			ROOT_URL: 'http://13.210.54.191',
			MONGO_URL: 'mongodb://localhost/mediastorm'
		},

		deployCheckWaitTime: 30 //default 10
	},

	mongo: {
		oplog: true,
		port: 27017,
		servers: {
			one: {}
		}
	}

};
