export default class GraphicService {

    static generateGraphicId = (graphicRequest, graphic, requestYear) => {
        requestYear = requestYear || new Date().getFullYear().toString().substr(-2);

        return (
            graphicRequest.store.brandCode +
            graphic.jobCategory +
            graphic.jobNumber +
            graphic.season +
            requestYear +
            graphic.artworkNumber
        );
    };
}
