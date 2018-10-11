export default class Utils {

    static blurBackground = (id) => {
        id = id || 'root';
        document.getElementById(id).classList.add('blur5');
    };

    static unblurBackground = (id) => {
        id = id || 'root';
        document.getElementById(id).classList.remove('blur5');
    };

    static padWithZeros = (value, length) => {
        value = value.toString().trim();
        if (value.length > 0) {
            while (value.length < length) {
                value = '0' + value;
            }
        }
        return value;
    };

    static sortByKey = (object, sortKey, descending, dateSort) => {
        return (a, b) => {
            const from = descending ? b : a;
            const to = descending ? a : b;

            let comparatorA = object ? object[from][sortKey] : from;
            let comparatorB = object ? object[to][sortKey] : to;

            if (dateSort) {
                comparatorA = new Date(comparatorA).getTime();
                comparatorB = new Date(comparatorB).getTime();
            }

            if (comparatorA < comparatorB) {
                return -1;
            }

            if (comparatorA > comparatorB) {
                return 1;
            }

            return 0;
        }
    };
};
