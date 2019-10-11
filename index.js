require('dotenv').config();
const tmi = require('tmi.js')

// Require handlers
const onConnectHandler = require('./handlers/connect').onConnectHandler;
const onJoinHandler = require('./handlers/join').onJoinHandler;
const onMessageHandler = require('./handlers/message').onMessageHandler;
const onPartHandler = require('./handlers/join').onPartHandler;

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_AUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL
  ]
};

// Create the cient
const client = new tmi.client(opts);

// Add listeners
client.on('connected', onConnectHandler);
client.on('join', onJoinHandler(client));
client.on('part', onPartHandler(client));
client.on('message', onMessageHandler(client));

// Connect to the client
client.connect();