# chat-bob

Easy to use twitch chat bot.

## Requirements

Latest Nodejs
https://nodejs.org/en/

## Setup:

Clone or download the repository:
`git clone https://github.com/8o8inCodes/chat-bob.git`

Start a commandline inside that repository and run this command:
`npm i`

Once done, you need to create 2 files `secrets.json` and `tokens.json` in order to authenticate your bot.
The files should look like this:

`secrets.json`
```javascript
{
    "access_token": "<replace me>",
    "refresh_token": "<replace me>",
    "client_id": "<replace me>",
    "client_secret": "<replace me>"
}
```

`tokens.json`
```javascript
{
    "refreshToken": "<replace me>"
}
```

In order to get all of those tokens, follow this guide:
(Only the **first** and second **step**)

https://d-fischer.github.io/twitch-chat-client/docs/examples/basic-bot.html

Once done, edit the configuration file to your liking, replace `channel_name` with your twitch user name.

# Launch the bot:
`npm run dev`

# Add custom commands

Open `commands.mjs` file, there you can see the example commands. Hopefully it's not too hard to understand them since they cover most of the cases. This is the only file that you need to edit really in order to add commands.

# Good luck
Thanks for using.
