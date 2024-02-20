import { type SerializerConfigT } from 'metro-config';
type CustomSerializerParameters = Parameters<NonNullable<SerializerConfigT['customSerializer']>>;
type ConvertOptions = {
    projectRoot: string;
    entryPoint: CustomSerializerParameters[0];
    preModules: CustomSerializerParameters[1];
    graph: CustomSerializerParameters[2];
    options: CustomSerializerParameters[3];
};
export type MetroStatsEntry = ReturnType<typeof convertGraphToStats>;
export declare function convertGraphToStats({ projectRoot, entryPoint, preModules, graph, options }: ConvertOptions): (string | {
    nodeModuleName: string | null;
    dependencies: string[];
    size: number;
    path: string;
}[] | {
    entryPoints: string[];
    dependencies: {
        nodeModuleName: string | null;
        dependencies: string[];
        size: number;
        path: string;
    }[];
    transformOptions: Readonly<import("metro").TransformInputOptions>;
} | {
    processModuleFilter: undefined;
    createModuleId: undefined;
    getRunModuleStatement: undefined;
    shouldAddToIgnoreList: undefined;
    asyncRequireModulePath: string;
    dev: boolean;
    includeAsyncPaths: boolean;
    inlineSourceMap?: boolean | undefined;
    modulesOnly: boolean;
    projectRoot: string;
    runBeforeMainModule: readonly string[];
    runModule: boolean;
    serverRoot: string;
    sourceMapUrl?: string | undefined;
    sourceUrl?: string | undefined;
})[];
export {};
//# sourceMappingURL=convertGraphToStats.d.ts.map