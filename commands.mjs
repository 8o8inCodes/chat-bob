import fs from 'fs-extra';

/**
 * This is the current command accessibility levels.
 */
export const Levels = {
    EVERYONE: 0, // Everyone can use the command
    MODS: 1, // Only mods can use the command
    STREAMER: 2 // Only streamer can use the command
};

/**
 * Simple test command in order to see if the chatbot works
 */
const ping = (chatClient, channel, user, message) => {
    chatClient.say(channel, `@${user} pong`);
};

/**
 * Command that adds the specified text to a text file
 * Basically a check list to do after the stream
 */
const afterstream = async (chatClient, channel, user, message) => {
    try {
        await fs.appendFile('./todolist.txt', message.replace('!afterstream ', "") + " \n", 'UTF-8');
        chatClient.say(channel, `@${user} Added new task.`);
    } catch (e) {
        console.log(e);
        chatClient.say(channel, `@${user} Error has occured.`);
    }
};

/**
 * List of available commands
 * the name of the command equals the keys inside this object.
 * For example "!ping" will call "ping" item.
 */
export default {
    ping: {
        description: "Returns answer of Pong",
        level: Levels.STREAMER,
        handle: ping
    },
    afterstream: {
        description: "Add a task to a todo list after the stream",
        level: Levels.STREAMER,
        handle: afterstream
    }
};
