export interface JStreamAPISuccess {
    code: number;
    message: string;
    details: string;
}

export interface JStreamAPIFailure {
    code: number;
    reason: string;
    details: string;
    severity: string;
    dtstamp: string;
}

export enum AssetType {
    Audio = 'audio',
    Video = 'video',
    Image = 'image',
    Binary = 'binary',
    Presentation = 'presentation',
    All = 'all'
}

export enum SortDirection {
    Ascending = 'asc',
    Descending = 'desc'
}

export enum Comparator {
    // >=,<=,==,>,<
    GREATER_OR_EQUAL_THAN = '>=',
    LESS_OR_EQUAL_THAN = '<=',
    EQUAL_TO = '==',
    GREATER_THAN = '>',
    LESS_THAN = '<'
}