export interface FileReader {
    (path: string, encoding: string): string;
}
export declare class Cfg<T> {
    private _reader;
    private _parsed;
    constructor(_reader: FileReader);
    get(): T;
    load(path: string): T;
    load(path: string, encoding: string): T;
}
export declare class CfgNotLoadedError extends Error {
    constructor();
}
