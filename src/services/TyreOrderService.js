export default class TyreOrderService {

    static generateTyreOrderId = (tyreOrder, requestYear) => {
        requestYear = requestYear || new Date().getFullYear().toString().substr(-2);

        return (
            tyreOrder.vehicleMake + '*' +
            tyreOrder.tyreWidth + '*' +
            tyreOrder.tyreProfile + '*' +
            'R' + tyreOrder.tyreRimSize +
            tyreOrder.tyreSpeedRating + '*' +
            tyreOrder.season +
            requestYear
        );
    };
}
