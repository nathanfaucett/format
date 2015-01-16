var isString = require("is_string"),
    isObject = require("is_object"),
    isPrimitive = require("is_primitive"),
    isArrayLike = require("is_array_like"),
    isFunction = require("is_function"),
    indexOf = require("index_of"),
    fastSlice = require("fast_slice");


var reFormat = /%([a-z%])/g,
    toString = Object.prototype.toString;


module.exports = format;


function format(str) {
    return baseFormat(str, fastSlice(arguments, 1));
}

format.args = baseFormat;

function baseFormat(str, args) {
    var i = 0,
        length = args ? args.length : 0;

    return (isString(str) ? str + "" : "").replace(reFormat, function(match, s) {
        var value, formatter;

        if (match === "%%") {
            return "%";
        }
        if (i >= length) {
            return "";
        }

        formatter = format[s];
        value = args[i++];

        return value != null && isFunction(formatter) ? formatter(value) : "";
    });
}

format.s = function(obj) {
    return String(obj);
};

format.d = function(obj) {
    return Number(obj);
};

format.j = function(obj) {
    try {
        return JSON.stringify(obj);
    } catch (e) {
        return "[Circular]";
    }
};

function inspectObject(obj, inspected, depth, maxDepth) {
    var out, i, il, keys, key;

    if (indexOf(inspected, obj) !== -1) {
        return toString.call(obj);
    }

    inspected[inspected.length] = obj;

    if (isFunction(obj) || depth >= maxDepth) {
        return toString.call(obj);
    }

    if (isArrayLike(obj) && obj !== global) {
        depth++;
        out = [];

        i = -1;
        il = obj.length - 1;
        while (i++ < il) {
            out[i] = inspect(obj[i], inspected, depth, maxDepth);
        }

        return out;
    } else if (isObject(obj)) {
        depth++;
        out = {};
        keys = utils.keys(obj);

        i = -1;
        il = keys.length - 1;
        while (i++ < il) {
            key = keys[i];
            out[key] = inspect(obj[key], inspected, depth, maxDepth);
        }

        return out;
    }

    return isFunction(obj.toString) ? obj.toString() : obj + "";
}

function inspectPrimitive(obj) {
    return isNumber(obj) ? Number(obj) : String(obj);
}

function inspect(obj, inspected, depth, maxDepth) {
    return isPrimitive(obj) ? inspectPrimitive(obj) : inspectObject(obj, inspected, depth, maxDepth);
}

format.o = function(obj) {
    try {
        return JSON.stringify(inspect(obj, [], 0, 5), null, 2);
    } catch (e) {
        return "[Circular]";
    }
};
