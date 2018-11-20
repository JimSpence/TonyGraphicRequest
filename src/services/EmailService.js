import js2xmlparser from "js2xmlparser";

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
    }
}
