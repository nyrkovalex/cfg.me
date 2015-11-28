var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DEFAULT_ENCODING = 'utf8';
function freeze(target) {
    if (typeof target === 'object' && target !== null) {
        Object.keys(target).forEach(function (k) {
            var value = target[k];
            if (typeof value === 'object') {
                value = freeze(value);
            }
            target[k] = value;
        });
    }
    return Object.freeze(target);
}
var Cfg = (function () {
    function Cfg(_reader) {
        this._reader = _reader;
        this._parsed = null;
    }
    Cfg.prototype.get = function () {
        if (this._parsed === null) {
            throw new CfgNotLoadedError();
        }
        return this._parsed;
    };
    Cfg.prototype.load = function (path, encoding) {
        var content = this._reader(path, encoding || DEFAULT_ENCODING);
        this._parsed = freeze(JSON.parse(content));
        return this.get();
    };
    return Cfg;
})();
exports.Cfg = Cfg;
var CfgNotLoadedError = (function (_super) {
    __extends(CfgNotLoadedError, _super);
    function CfgNotLoadedError() {
        _super.call(this);
        this.message = 'Configuration must be loaded with `load()` function prior to calling `get()`';
        this.name = 'CfgNotLoadedError';
    }
    return CfgNotLoadedError;
})(Error);
exports.CfgNotLoadedError = CfgNotLoadedError;
