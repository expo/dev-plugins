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
export declare function convertGraphToStats({ projectRoot, entryPoint, preModules, graph, options }: ConvertOptions): {
    projectRoot: string;
    entryPoint: string;
    platform: string;
    preModules: {
        nodeModuleName: string;
        isNodeModule: boolean;
        relativePath: string;
        absolutePath: string;
        size: number;
        dependencies: string[];
        inverseDependencies: {
            relativePath: string;
            absolutePath: string;
        }[];
        source: string;
        output: {
            type: string;
            data: {
                code: string;
            };
        }[];
    }[];
    graph: {
        entryPoints: string[];
        dependencies: {
            nodeModuleName: string;
            isNodeModule: boolean;
            relativePath: string;
            absolutePath: string;
            size: number;
            dependencies: string[];
            inverseDependencies: {
                relativePath: string;
                absolutePath: string;
            }[];
            source: string;
            output: {
                type: string;
                data: {
                    code: string;
                };
            }[];
        }[];
        transformOptions: Readonly<import("metro").TransformInputOptions>;
    };
    options: {
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
    };
};
declare function convertModule(projectRoot: string, graph: ConvertOptions['graph'], module: ConvertOptions['preModules'][0]): {
    nodeModuleName: string;
    isNodeModule: boolean;
    relativePath: string;
    absolutePath: string;
    size: number;
    dependencies: string[];
    inverseDependencies: {
        relativePath: string;
        absolutePath: string;
    }[];
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