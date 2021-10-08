import got from 'got'; 

const gotPost = async (slackMessage: any, url: string) => { 
    let response = await got({ 
        method: 'POST', 
        headers: { 
            'Content-type': 'application/json', 
             Authorization: `Bearer ${process.env.BOT_SLACK_TOKEN}`
        }, 
        url: url, 
        body:JSON.stringify(slackMessage),
    }).json();
    return response;
}


export const sendSlackMessage = async (payload:any, message: string) => { 
    if(!payload.event.thread_ts && payload.event.subtype !== 'message_replied') { 
        let params = { 
            channel: payload.event.channel, 
            text: message, 
            thread_ts: payload.event.ts
        }
        return await gotPost(params,process.env.botChatPostMessageUrl);
    }
}