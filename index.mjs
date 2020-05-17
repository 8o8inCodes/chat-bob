import TwitchClientImp from 'twitch';
import ChatClientImp from 'twitch-chat-client';
const ChatClient = ChatClientImp.default;
const TwitchClient = TwitchClientImp.default;
// import config from './config.json';
// import secrets from './secrets.json';
import commands, { Levels } from './commands.mjs';


import fs from 'fs-extra';

const allowed = (userInfo, level, channelId) => {
    switch (level) {
        case Levels.EVERYONE:
            return true;
        case Levels.MODS:
            if (userInfo.isMod) {
                return true;
            }
        case Levels.STREAMER:
            if (userInfo.userId === channelId) {
                return true;
            }
        default: {
            return false;
        }
    }
};

(async () => {
    const secrets = JSON.parse(await fs.readFile('./secrets.json', 'UTF-8'));
    const config = JSON.parse(await fs.readFile('./config.json', 'UTF-8'));


    const clientId = secrets.client_id;
    const clientSecret = secrets.client_secret;
    const tokenData = JSON.parse(await fs.readFile('./tokens.json', 'UTF-8'));
    const twitchClient = TwitchClient.withCredentials(clientId, tokenData.accessToken, undefined, {
        clientSecret,
        refreshToken: tokenData.refreshToken,
        expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
        onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
            const newTokenData = {
                accessToken,
                refreshToken,
                expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
            };
            await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8');
        }
    });

    const chatClient = await ChatClient.forTwitchClient(twitchClient, { channels: config.channels });
    await chatClient.connect();

    chatClient.onPrivmsg((channel, user, message, tpm) => {
        if (message.startsWith(config.commandPrefix)) {
            const parsed = message.replace(config.commandPrefix, "");
            const splitted = parsed.split(" ");
            const command = commands[splitted[0]];

            if (command && allowed(tpm.userInfo, command.level, tpm.channelId)) {
                command.handle(chatClient, channel, user, message);
            }
        }
    });
})();