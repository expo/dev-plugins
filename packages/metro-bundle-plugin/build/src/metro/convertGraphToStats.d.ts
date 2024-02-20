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
export type MetroStatsModule = ReturnType<typeof convertModule>;
export declare function convertGraphToStats({ projectRoot, entryPoint, preModules, graph, options }: ConvertOptions): readonly [string, {
    nodeModuleName: string;
    isNodeModule: boolean;
    dependencies: string[];
    relativePath: string;
    absolutePath: string;
    size: number;
    source: string;
    output: {
        type: string;
        data: {
            code: string;
        };
    }[];
}[], {
    entryPoints: string[];
    dependencies: {
        nodeModuleName: string;
        isNodeModule: boolean;
        dependencies: string[];
        relativePath: string;
        absolutePath: string;
        size: number;
        source: string;
        output: {
            type: string;
            data: {
                code: string;
            };
        }[];
    }[];
    transformOptions: Readonly<import("metro").TransformInputOptions>;
}, {
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
}];
declare function convertModule(projectRoot: string, module: ConvertOptions['preModules'][0]): {
    nodeModuleName: string;
    isNodeModule: boolean;
    dependencies: string[];
    relativePath: string;
    absolutePath: string;
    size: number;
    source: string;
    output: {
        type: string;
        data: {
            code: string;
        };
    }[];
};
export {};
//# sourceMappingURL=convertGraphToStats.d.ts.map