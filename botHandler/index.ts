import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {handleMessageFromUser} from "../bot/handleMessage"


export const httpTrigger: AzureFunction = async (context: Context, data: HttpRequest) => { 

    console.log("Data:", data);
    context.log('HTTP trigger function processed a request.');

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
        let data = {
            status: 200,
            body: context.res, 
            headers: {
                'Content-Type': 'application/json'
            }
        } 

        console.log("ReturnData",data);

        return data;
    }

}

 const verifyCall = async (dataObject: any) => { 
    if(dataObject.token === "Mu9hcnRjzzocK0a6cElHTKAt") { 
        return dataObject.challenge; 
    } else if (dataObject.token !== "Mu9hcnRjzzocK0a6cElHTKAt") {
        return 'Invalid token'; 
    }
}

// export const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
//     context.log('HTTP trigger function processed a request.');
//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };

// };

// export default httpTrigger;