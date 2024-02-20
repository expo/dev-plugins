import { type MetroStatsEntry } from './convertGraphToStats';
export declare function validateStatsFile(statsFile: string, metadata?: import("./createStatsFile").StatsMetadata): Promise<void>;
/**
 * List all stats entries without parsing the data.
 * This only reads the bundle name, and adds a line number as ID.
 */
export declare function listStatsEntries(statsFile: string): Promise<{
    id: number;
    name: string;
}[]>;
/**
 * Get the stats entry by id or line number, and parse the data.
 */
export declare function getStatsEntry(statsFile: string, id: number): Promise<MetroStatsEntry>;
//# sourceMappingURL=readStatsFile.d.ts.map