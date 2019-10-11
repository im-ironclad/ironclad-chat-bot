function onJoinHandler(client) {
  return function(channel, username, self) {
    if (self) { 
      client.say(channel, `Have no fear, Ironclad Bot is here!`);
    } else {
      return
    }
  }
}

function onPartHandler(client) {
  return function(channel, username, self) {
    if (self) { return; }

    client.say(channel, `Later ${username}, see ya next time!`);
  }
}

module.exports = {
  onJoinHandler: onJoinHandler,
  onPartHandler: onPartHandler
}