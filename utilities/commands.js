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
  .then(async res => {
    const clipId = res.data.data[0].id;

    if (clipId) {
      let newClip

      const getNewClip = () => {
        return axios({
          method: 'get',
          url: `https://api.twitch.tv/helix/clips?id=${clipId}`,
          headers: {
            Authorization: `Bearer ${process.env.APP_BEARER_TOKEN}`
          }
        })
        .then(res => res.data)
        .catch(err => err);
      }

      newClip = await getNewClip();

      if (newClip.data[0] === undefined) {
        setTimeout(async () => {
          newClip = await getNewClip();

          if (newClip.data[0] === undefined) {
            return client.say(
              channel,
              `Sorry something went wrong and the clip wasn't created.`
            );
          } else if (newClip.data[0] !== undefined) {
            return client.say(
              channel,
              `The clip was created! Here's the link: ${newClip.data[0].url}`
            )
          }
        }, 15000);
      }
    }
  })
  .catch(err => {
    const errMessage = err.response.data.message
    
    if (errMessage.includes('offline')) {
      client.say(
        channel,
        `Sorry, can't clip an offline channel.`
      );
    } else {
      client.say(
        channel,
        `Sorry, something went wrong with making the clip.`
      );
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