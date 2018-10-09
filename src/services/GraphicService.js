export default class GraphicService {

    static addGraphic = (graphicRequest, graphic) => {
        console.log(graphicRequest);
        console.log(graphic);

        const graphicId = GraphicService.generateGraphicId(graphicRequest, graphic);

        if (typeof graphicRequest.graphics === 'undefined') {
            graphicRequest.graphics = [];
        }

        graphicRequest.graphics[graphicId] = graphic;
        return graphicRequest;
    };

    static deleteGraphic = (graphicRequest, graphicRequestId) => {
        delete graphicRequest.graphics[graphicRequestId];
        return graphicRequest;
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
