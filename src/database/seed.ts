
/**
 * Interface representing some seed data to add to the database
 *
 * @export
 * @interface SeedData
 */
export interface SeedData {
    /** The SQL to use for inserting the data */
    readonly sql: string;

    /** The binds for the SQL */
    binds(): Promise<any[]>;
}
