import * as messaging from "messaging"
import * as definitions from "../common/definitions"

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
