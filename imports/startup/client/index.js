/*
 Here we explicitly load client specific dependencies, and any startup config.
 Note that various flavours of import/require syntax required to cater for how various modules have been defined.

 Also note pkg css is also imported here, which is not the 'preferred' css import approach, however @import via less
 has issues, plus it kinda makes more sense to group dependencies by function rather than split up by file type
 */

console.log('imports importing ;)');


// SPATIAL STUFF
import leaflet from 'leaflet';
import '/node_modules/leaflet/dist/leaflet.css';
require('/node_modules/leaflet-loading/src/Control.Loading.js');
import '/node_modules/leaflet-loading/src/Control.Loading.css';
require('/node_modules/leaflet-mouse-position/src/L.Control.MousePosition.js');
import '/node_modules/leaflet-mouse-position/src/L.Control.MousePosition.css';

// MISC / UTIL
import '/node_modules/foundation-sites/dist/foundation.js';
import moment from 'moment';
import _ from 'underscore';

// ANY CONFIG
import '/imports/startup/client/leaflet-config.js';

