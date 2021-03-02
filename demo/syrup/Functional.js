/*!
 * Functional Programming Compatibility (for IE8) v0.1a
 *
 * Public Domain
 *
 * Date: Tue May 3 22:30:00 2011 -0800
 */

if (!Array.prototype.reduce) {
    Array.prototype.reduce = function (fun) {
        "use strict";

        if (this === void 0 || this === null)
            throw new TypeError();

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function")
            throw new TypeError();

        // no value to return if no initial value and an empty array
        if (len == 0 && arguments.length == 1)
            throw new TypeError();

        var k = 0;
        var accumulator;
        if (arguments.length >= 2) {
            accumulator = arguments[1];
        }
        else {
            do {
                if (k in t) {
                    accumulator = t[k++];
                    break;
                }

                // if array contains no values, no initial value to return
                if (++k >= len)
                    throw new TypeError();
            }
            while (true);
        }

        while (k < len) {
            if (k in t)
                accumulator = fun.call(undefined, accumulator, t[k], k, t);
            k++;
        }

        return accumulator;
    };
}

var Functional = {
    bimap: function (fun, array1, array2) {
        "use strict";

        if (array1 === void 0 || array1 === null)
            throw new TypeError();
        if (array2 === void 0 || array2 === null)
            throw new TypeError();

        var len = array1.length >>> 0;
        var newarray = new Array(len);

        if (typeof fun !== "function")
            throw new TypeError();
        for (var index = 0; index < len; index++) {
            if (index in array1 && index in array2)
                newarray[index] = fun.call(undefined, array1[index], array2[index]);
        }

        return newarray;
    }
};
