/**
 * The identity of some model that has been persisted to the database
 *
 * @export
 * @class Identity
 * @template ID The type used for the ID of the model
 */
export interface Identity<ID> {
    /** The actual ID */
    id: ID;

    /** The version */
    version: string;

    /** When the model was created */
    created: Date;

    /** When the model was last updated */
    updated: Date;
}
