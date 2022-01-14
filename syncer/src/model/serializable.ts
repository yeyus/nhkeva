export interface Serializable {
    serialize() : string;
    deserialize(buffer: string) : void;
}