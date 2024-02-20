import { type MetroStatsEntry } from './convertGraphToStats';
export type StatsMetadata = {
    name: string;
    version: string;
};
/** The default location of the metro stats file */
export declare function getStatsPath(projectRoot: string): string;
export declare function getStatsMetdata(): StatsMetadata;
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
//# sourceMappingURL=createStatsFile.d.ts.map