import fs from 'fs-extra';

export const Levels = {
    EVERYONE: 0,
    MODS: 1,
    STREAMER: 2
};

const ping = (chatClient, channel, user, message) => {
    chatClient.say(channel, `@${user} pong`);
};

const afterstream = async (chatClient, channel, user, message) => {
    try {
        await fs.appendFile('./todolist.txt', message.replace('!afterstream ', "") + " \n", 'UTF-8');
        chatClient.say(channel, `@${user} Added new task.`);
    } catch (e) {
        console.log(e);
        chatClient.say(channel, `@${user} Error has occured.`);
    }
};

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
