const DEFAULT_ENCODING = 'utf8';

export interface FileReader {
	(path: string, encoding: string): string;
}

function freeze<T>(target: any): T {
	if (typeof target === 'object' && target !== null) {
		Object.keys(target).forEach(k => {
			let value = target[k];
			if (typeof value === 'object') {
				value = freeze(value);
			}
			target[k] = value;
		});
	}
	return Object.freeze(target);
}

export class Cfg {
	private _parsed: any = null;
	constructor(private _reader: FileReader) { }

	get<T>(): T {
		if (this._parsed === null) {
			throw new CfgNotLoadedError();
		}
		return this._parsed;
	}

	load<T>(path: string): T;
	load<T>(path: string, encoding: string): T;
	load<T>(path: string, encoding?: string): T {
		let content = this._reader(path, encoding || DEFAULT_ENCODING);
		this._parsed = freeze<T>(JSON.parse(content));
		return this.get<T>();
	}
}

export class CfgNotLoadedError extends Error {
	constructor() {
		super();
		this.message = 'Configuration must be loaded with `load()` function prior to calling `get()`';
		this.name = 'CfgNotLoadedError';
	}
}