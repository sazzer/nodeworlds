import { Identity } from './identity';

/**
 * The actual representation of a model
 *
 * @export
 * @class Model
 * @template ID The type used for the ID of the model
 * @template DATA The type used for the Data of the model
 */
export interface Model<ID, DATA> {
    /** The Identity of the model */
    identity: Identity<ID>;

    /** The data that makes up the model */
    data: DATA;
}
