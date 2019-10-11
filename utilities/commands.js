const axios = require('axios');

function createClip(client, channel) {
  axios({
    method: 'post',
    url: 'https://api.twitch.tv/helix/clips',
    data: {
      'broadcaster_id': '138391774'
    },
    headers: {
      Authorization: `Bearer ${process.env.APP_BEARER_TOKEN}`
    }
  })
  .then(res => {
    console.dir(res);
    // Finish following instructions here: https://dev.twitch.tv/docs/api/reference#create-clip
    // Hit the Get Clips endpoint to see if the clip was successfully created
    // If not created, test again in 15 seconds. If failed, optionally try making clip again
  })
  .catch(err => {
    const errMessage = err.response.data.message
    
    if (errMessage.includes('offline')) {
      client.say(channel, `Sorry, something went wrong: ${errMessage}`)
    }
  });
}

async function getClips() {
  const response = await axios.get(
    'https://api.twitch.tv/helix/clips'
  )
}

module.exports = {
  createClip: createClip,
  getClips: getClips
}