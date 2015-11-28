import {Cfg} from './src/cfg';
import * as fs from 'fs';

let cfg = new Cfg(fs.readFileSync);

export = cfg;
