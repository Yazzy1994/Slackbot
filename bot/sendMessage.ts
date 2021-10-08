import got from 'got'

const gotPost = async (slackMessage: any, url: string) => {
  let response = await got({
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization:
        'Bearer xoxb-895410574737-2566195113559-gMoZ7CwVunIzeQMkgp3ZJeDC',
    },
    url: url,
    body: JSON.stringify(slackMessage),
  }).json()
  return response
}

export const sendSlackMessage = async (payload: any, message: string) => {

  let threadTs: any;

  if (payload.event.thread_ts) {
    threadTs = payload.event.thread_ts
  } else {
    threadTs = payload.event.ts
  }


  // if(!payload.event.thread_ts && payload.event.subtype !== 'message_replied') {
  let params = {
    channel: payload.event.channel,
    text: message,
    thread_ts: threadTs,
  }

  return await gotPost(params, 'https://slack.com/api/chat.postMessage')
  // }
}
