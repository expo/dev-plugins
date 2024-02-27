#!/usr/bin/env node
import arg from 'arg';
export type Input = typeof args;
declare const args: arg.Result<{
    '--help': BooleanConstructor;
    '--port': NumberConstructor;
    '--version': BooleanConstructor;
    '-h': string;
    '-p': string;
    '-v': string;
}>;
export {};
//# sourceMappingURL=bin.d.ts.map