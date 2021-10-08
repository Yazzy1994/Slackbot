import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {handleMessageFromUser} from "../bot/handleMessage"


export const httpTrigger: AzureFunction = async (context: Context, data: HttpRequest) => { 

    const dataObject = JSON.parse(JSON.stringify(data.body));

    if(!('X-Slack-Retry-Num' in data.headers)) { 
        switch (dataObject.type) {
            case 'url_verification': 
            context.res = await verifyCall(dataObject);
            break;
            case 'event_callback': 
            context.res = await handleMessageFromUser(dataObject);
            break;
        }
    }
}

 const verifyCall = async (dataObject: any) => { 
    if(dataObject.token === "Mu9hcnRjzzocK0a6cElHTKAt") { 
        return {
            status: 200, 
            body: dataObject.challenge, 
            headers: { 
                "Content-Type": "application/json"
            }
        } 
    } else if (dataObject.token !== "Mu9hcnRjzzocK0a6cElHTKAt") {
        return {
            status: 400,
            headers: { 
                "Content-Type": "application/json"
            }
        }  
    }
}