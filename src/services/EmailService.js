import js2xmlparser from "js2xmlparser";
// import {msGraphConfig} from "./MsGraphConfig";
export default class EmailService {

    static FormatGraphicRequestXML = (graphicRequest) => {
        const graphics = Object.keys(graphicRequest.graphics).map((graphic) => {
            return {
                "@": {
                    quantity: graphicRequest.graphics[graphic].quantity,
                    reason: graphicRequest.graphics[graphic].reason
                },
                "#": graphic
            }
        });

        const store = {
            "@": {
                id: graphicRequest.store.brandCode,
                number: graphicRequest.store.number,
                contact_name: graphicRequest.contactName,
                contact_tel_number: graphicRequest.store.phone
            },
            "#": graphicRequest.store.name
        };

        const graphicRequestXml = {
            store: store,
            graphic: graphics
        };

        return (js2xmlparser.parse('graphic_request', graphicRequestXml));
    };

    static sendEmail = (emailBody) => {
        return new Promise((resolve) => {
            // const uri = msGraphConfig.graphApiUri + msGraphConfig.graphApiVersion + msGraphConfig.me + msGraphConfig.messages;
            // TODO - Using Azure 'Flow' to send email (is this the best method or should we use the MS Graph apI?)
            const uri = 'https://prod-56.westeurope.logic.azure.com/workflows/d9d350864302403297796e7e5a44eb2e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tD4Jzt5TWWWtmOPiSmSkVaSFQbFWJwlCl2bT2m4g1xs';
            // const body = {
            //     subject: 'New Graphic Request',
            //     body: {
            //         contentType: 'text',
            //         content: emailBody
            //     },
            //     toRecipients: [{
            //         emailAddress: {
            //             address: 'tony.ruddock@arcadiagroup.co.uk'
            //         }
            //     }]
            // };

            const config = {
                method: 'POST',
                // headers: {
                //     authorization: 'Bearer ' + token
                // },
                'Content-Type': 'application/json',
                body: JSON.stringify({
                    "xml" : emailBody
                })
            };
            console.log(config);

            fetch(uri, config)
                .then(response => {
                    console.log(response);
                    resolve(response);
                    // response.json();
                })
                // .then(data => {
                //     resolve(data);
                // });
        })
    };
}
