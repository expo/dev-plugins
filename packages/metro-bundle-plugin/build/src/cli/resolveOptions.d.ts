import { type Input } from './bin';
export type Options = Awaited<ReturnType<typeof resolveOptions>>;
export declare function resolveOptions(input: Input): Promise<{
    statsFile: string;
    port: number;
}>;
//# sourceMappingURL=resolveOptions.d.ts.map