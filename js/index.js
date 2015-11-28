var cfg_1 = require('./src/cfg');
var fs = require('fs');
var cfg = new cfg_1.Cfg(fs.readFileSync);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = cfg;
