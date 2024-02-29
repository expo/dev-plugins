import { type MetroStatsEntry } from './convertGraphToStats';
export type StatsMetadata = {
    name: string;
    version: string;
};
/** The default location of the metro stats file */
export declare function getStatsPath(projectRoot: string): string;
/** The information to validate if a stats file is compatible with this library version */
export declare function getStatsMetdata(): StatsMetadata;
/** Validate if the stats file is compatible with this library version */
export declare function validateStatsFile(statsFile: string, metadata?: StatsMetadata): Promise<void>;
/**
 * Create or overwrite the stats file with basic metadata.
 * This metdata is used by the API to determine version compatibility.
 */
export declare function createStatsFile(projectRoot: string): Promise<void>;
/**
 * Add a new stats entry to the stats file.
 * This is appended on a new line, so we can load the stats selectively.
 */
export declare function addStatsEntry(projectRoot: string, stats: MetroStatsEntry): Promise<void>;
/**
 * List all stats entries without parsing the data.
 * This only reads the bundle name, and adds a line number as ID.
 */
export declare function listStatsEntries(statsFile: string): Promise<{
    id: number;
    absolutePath: string;
    relativePath: string;
    projectRoot: string;
    platform: 'android' | 'ios' | 'web';
}[]>;
/**
 * Get the stats entry by id or line number, and parse the data.
 */
export declare function getStatsEntry(statsFile: string, id: number): Promise<MetroStatsEntry>;
//# sourceMappingURL=serializeStatsFile.d.ts.map