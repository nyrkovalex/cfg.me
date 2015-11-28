import {FileReader, Cfg, CfgNotLoadedError} from '../src/cfg';

class SampleConfig {
	numeric: number;
	object: { [key: string]: string };
	array: Array<{ [key: string]: string }>;
}

describe('Cfg class', () => {
	let fileReader: FileReader;
	let cfg: Cfg;

	let content: SampleConfig = {
		numeric: 1,
		object: {
			foo: 'bar',
			biz: 'baz'
		},
		array: [{ a: 'a', b: 'b' }]
	};
	let contentStr = JSON.stringify(content);

	beforeEach(() => {
		fileReader = jasmine.createSpy('fileReader', () => contentStr).and.callThrough();
		cfg = new Cfg(fileReader);
	});

	it('should load a file with default encoding', () => {
		cfg.load('path');
		expect(fileReader).toHaveBeenCalledWith('path', 'utf8');
	});

	it('should load a file with provided encoding', () => {
		cfg.load('path', 'cp1251');
		expect(fileReader).toHaveBeenCalledWith('path', 'cp1251');
	});

	it('should return parsed config content', () => {
		let parsed = cfg.load('path');
		expect(parsed).toEqual(content);
	});

	it('should throw an error when accessing not loaded config', () => {
		expect(() => cfg.get()).toThrowError(CfgNotLoadedError,
			'Configuration must be loaded with `load()` function prior to calling `get()`');
	});

	it('should get parsed config', () => {
		cfg.load('path');
		expect(cfg.get()).toEqual(content);
	});

	it('should not be able to modify primitive properties', () => {
		let loaded = cfg.load<SampleConfig>('path');
		loaded.numeric = 100;
		expect(loaded).toEqual(content);
	});

	it('should not be able to modify object properties', () => {
		let loaded = cfg.load<SampleConfig>('path');
		loaded.object['foo'] = 'changed!';
		expect(loaded).toEqual(content);
	});

	it('should not be able to modify array properties', () => {
		let loaded = cfg.load<SampleConfig>('path');
		loaded.array[0]['b'] = 'c';
		expect(loaded).toEqual(content);
	});

	it('should reload config object', () => {
		cfg.load('path');
		let newContent: SampleConfig = { numeric: 1, object: null, array: null };
		contentStr = JSON.stringify(newContent);
		let loaded = cfg.load('path');
		expect(loaded).toEqual(newContent);
	});
});