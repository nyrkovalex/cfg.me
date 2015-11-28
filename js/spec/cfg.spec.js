var cfg_1 = require('../src/cfg');
var SampleConfig = (function () {
    function SampleConfig() {
    }
    return SampleConfig;
})();
describe('Cfg class', function () {
    var fileReader;
    var cfg;
    var content = {
        numeric: 1,
        object: {
            foo: 'bar',
            biz: 'baz'
        },
        array: [{ a: 'a', b: 'b' }]
    };
    var contentStr = JSON.stringify(content);
    beforeEach(function () {
        fileReader = jasmine.createSpy('fileReader', function () { return contentStr; }).and.callThrough();
        cfg = new cfg_1.Cfg(fileReader);
    });
    it('should load a file with default encoding', function () {
        cfg.load('path');
        expect(fileReader).toHaveBeenCalledWith('path', 'utf8');
    });
    it('should load a file with provided encoding', function () {
        cfg.load('path', 'cp1251');
        expect(fileReader).toHaveBeenCalledWith('path', 'cp1251');
    });
    it('should return parsed config content', function () {
        var parsed = cfg.load('path');
        expect(parsed).toEqual(content);
    });
    it('should throw an error when accessing not loaded config', function () {
        expect(function () { return cfg.get(); }).toThrowError(cfg_1.CfgNotLoadedError, 'Configuration must be loaded with `load()` function prior to calling `get()`');
    });
    it('should get parsed config', function () {
        cfg.load('path');
        expect(cfg.get()).toEqual(content);
    });
    it('should not be able to modify primitive properties', function () {
        var loaded = cfg.load('path');
        loaded.numeric = 100;
        expect(loaded).toEqual(content);
    });
    it('should not be able to modify object properties', function () {
        var loaded = cfg.load('path');
        loaded.object['foo'] = 'changed!';
        expect(loaded).toEqual(content);
    });
    it('should not be able to modify array properties', function () {
        var loaded = cfg.load('path');
        loaded.array[0]['b'] = 'c';
        expect(loaded).toEqual(content);
    });
    it('should reload config object', function () {
        cfg.load('path');
        var newContent = { numeric: 1, object: null, array: null };
        contentStr = JSON.stringify(newContent);
        var loaded = cfg.load('path');
        expect(loaded).toEqual(newContent);
    });
});
