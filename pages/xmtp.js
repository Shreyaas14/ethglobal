import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

//replace with own wallet
const wallet = Wallet.createRandom();

//create client with own wallet, will auto connect to XMTP dev network
const xmtp = await Client.create(wallet, { env: "dev"});

//start a convo with XMTP
const conversation = await xmtp.conversations.newConversation(
    "0x3F11b27F323b62B159D2642964fa27C46C841897",
);

const messages = await conversation.messages();

await conversation.send("test msg");

for await (const message of await conversation.streamMessages()) {
    console.log(`[${message.senderAddress}]: ${message.content}`);
}


//function to send a message
void async function sendMessage(messageText = "") {
    const preppedMessage = await conversation.prepareMessage(messageText);
    try {
        preppedMessage.send();
    }
    catch (e) {
        console.log("Message could not be sent.");
    }
}




