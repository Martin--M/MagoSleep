import * as messaging from "messaging"
import * as definitions from "../common/definitions"
import { me as companion } from "companion"

// Hardcoded to 45 minutes for now. This should come from the settings
var INTERVAL_MS = ( 45 * 60 * 1000 );

/* Companion had been closed before waking up */
if (companion.launchReasons.wokenUp) {
    intervalElapsed();
}
companion.addEventListener(definitions.EVT_WAKE_INTERVAL, intervalElapsed);

messaging.peerSocket.addEventListener(definitions.EVT_MESSAGE_RECEIVED, (evt) => {
    if (evt.data === definitions.MSG_START_MAIN_TIMER) {
        console.log("Starting main timer...");
        companion.wakeInterval = INTERVAL_MS;
    }
});

messaging.peerSocket.addEventListener(definitions.EVT_ERROR, (evt) => {
    console.error(`Connection error: ${err.code} - ${err.message}`)
});

function intervalElapsed() {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(definitions.MSG_INTERVAL_ELAPSED);
    }
}