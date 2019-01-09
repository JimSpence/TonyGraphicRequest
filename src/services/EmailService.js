import js2xmlparser from "js2xmlparser";
import {msGraphConfig} from "./MsGraphConfig";

export default class EmailService {

    static FormatDealerOrderXML = (dealerOrder) => {
        const tyreOrders = Object.keys(dealerOrder.tyreOrders).map((tyreOrder) => {
            return {
                "@": {
                    quantity: dealerOrder.tyreOrders[tyreOrder].quantity,
                    reason: dealerOrder.tyreOrders[tyreOrder].reason
                },
                "#": tyreOrder
            }
        });

        const store = {
            "@": {
                id: dealerOrder.dealer.brandCode,
                number: dealerOrder.dealer.number,
                contact_name: dealerOrder.contactName,
                contact_tel_number: dealerOrder.dealer.phone
            },
            "#": dealerOrder.dealer.name
        };

        const dealerOrderXml = {
            dealer: store,
            tyreOrder: tyreOrders
        };

        return (js2xmlparser.parse('dealer_order', dealerOrderXml));
    };

    static sendEmail = (emailBody) => {
        return new Promise((resolve) => {
            const uri = msGraphConfig.graphApiUri + msGraphConfig.graphApiVersion + msGraphConfig.me + msGraphConfig.messages;

            const config = {
                method: 'POST',
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
                })
        })
    };
}
