import * as messaging from "messaging"
import * as definitions from "../common/definitions"

messaging.peerSocket.addEventListener(definitions.EVT_MESSAGE_RECEIVED, (evt) => {
    if (evt.data === definitions.MSG_START_MAIN_TIMER) {
        console.log("Starting main timer...");
        //TODO, setup the wake interval
    }
});

messaging.peerSocket.addEventListener(definitions.EVT_ERROR, (evt) => {
    console.error(`Connection error: ${err.code} - ${err.message}`)
});