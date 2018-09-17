export default class DataService {

    static addGraphic = (graphicRequest, graphic) => {
        const graphicId = DataService.generateGraphicId(graphicRequest, graphic);

        if (typeof graphicRequest.graphics === 'undefined') {
            graphicRequest.graphics = [];
        }

        graphicRequest.graphics[graphicId] = graphic;
        return graphicRequest;
    };

    static deleteGraphic = (graphicRequest, graphicRequestId) => {
        return delete graphicRequest.graphics[graphicRequestId];
    };


    static generateGraphicId = (graphicRequest, graphic) => {
        return (
            graphicRequest.store.brandCode +
            graphic.jobCategory +
            graphic.jobNumber +
            graphic.season +
            new Date().getFullYear().toString().substr(-2) +
            graphic.artworkNumber
        );
    };
}
