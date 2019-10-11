const { createClip, getClips } = require('../utilities/commands');

function onMessageHandler(client) {
  return function (channel, userstate, message, self) {
    if (self) { return; }

    const command = message.trim();

    if (command === 'Hey bot') {
      client.say(channel, `What's up dude?!?`);
    }

    if (command === '!clip') {
      // Only create clips if _I_ want to
      if (userstate.badges.broadcaster === 1) {
        createClip(client, channel);
      } else { // Beg for Authoritie
        client.say(channel,
          `Sorry, only Ironclad can create clips right now. Please beg him for authority`
        );
      }
    }

    if (command === '!getclips') {
      getClips();
    }
  }
}

module.exports = {
  onMessageHandler: onMessageHandler
}