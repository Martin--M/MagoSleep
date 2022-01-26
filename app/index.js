import * as messaging from "messaging"
import * as definitions from "../common/definitions"
import * as haptics from "haptics"
import * as sleep from "sleep"
import { me as appbit } from "appbit"

// Start on load for now. Later this should be implemented by the
// click listener on a button
messaging.peerSocket.addEventListener(definitions.EVT_SOCKET_OPEN, (evt) => {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(definitions.MSG_START_MAIN_TIMER);
    }
});

messaging.peerSocket.addEventListener(definitions.EVT_ERROR, (evt) => {
    console.error(`Connection error: ${err.code} - ${err.message}`)
});

messaging.peerSocket.addEventListener(definitions.EVT_MESSAGE_RECEIVED, (evt) => {
    if (evt.data === definitions.MSG_INTERVAL_ELAPSED) {
        if (!isUserSleeping()) {
            console.log("Sending haptic feedback");
            haptics.vibration.start("nudge");

            /* Inform companion that the timer needs to be restarted if user
             * is still not sleeping
             */
            if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
                messaging.peerSocket.send(definitions.MSG_START_MAIN_TIMER);
            }
        }
    }
});

function isUserSleeping() {
    if (appbit.permissions.granted("access_sleep")) {
        return sleep.sleep;
    }
    /* Default to true to avoid possible unwanted nudges being sent */
    return true;
}