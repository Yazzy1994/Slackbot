import {sendSlackMessage} from './sendMessage';


export const handleMessageFromUser = async (payload: any): Promise<any> => {
    if(payload.event.text.includes('Hello')) { 
        await sendSlackMessage(payload,`<@${payload.event.user}> Hello again!` )
    } 
        // we could add a rection here as well 
}