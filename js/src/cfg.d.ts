export interface FileReader {
    (path: string, encoding: string): string;
}
export declare class Cfg {
    private _reader;
    private _parsed;
    constructor(_reader: FileReader);
    get<T>(): T;
    load<T>(path: string): T;
    load<T>(path: string, encoding: string): T;
}
export declare class CfgNotLoadedError extends Error {
    constructor();
}
