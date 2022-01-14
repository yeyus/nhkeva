import { URL } from 'node:url';
import { AssetType, Comparator, SortDirection } from './api-common';

/**
 * @reference https://medialize.stream.co.jp/services/docs/functions_rest.php?name=WsAsset&apiv=5.0
 */
export class WSAssetRequest {
    
    private stride: number;

    /**
     * @name date_start
     * start date filter for getting asset list for a given account .Date must be in t/z format. Example 2013-05-07T06:17:55.827Z. All dates must be in UTC
     */
    dateStart?: string;

    /**
     * @name date_end
     * end date filter for getting asset list for a given account. Date must be in t/z format. Example 2013-05-07T06:17:55.827Z. All dates must be in UTC
     */
    dateEnd?: string;

    /**
     * @name date_add
     * date added filter for getting asset list for a given account. Date must be in t/z format. Example 2013-05-07T06:17:55.827Z. All dates must be in UTC
     */
    dateAdd?: string;

    /**
     * @name date_add_comp
     * Comparator for date_add. Possible values {>=,<=,==,>,<}. values must be url encoded. default is set to >=
     */
    dateAddComp?: Comparator;

    /**
     * @name date_mod_start
     * last modification start interval filter for getting asset list for a given account. Date must be in t/z format. Example 2013-05-07T06:17:55.827Z. All dates must be in UTC
     */
    dateModStart?: string;

    /**
     * @name date_mod_end
     * last modification end interval filter for getting asset list for a given account. Date must be in t/z format. Example 2013-05-07T06:17:55.827Z. All dates must be in UTC
     */
    dateModEnd?: string;

    /**
     * @name assetfiles
     * @type boolean
     * value true/false. Flag to include assetfiles details in the response.
     */
    assetfiles?: boolean;

    /**
     * @name title
     * filter the response based on asset title. use '%' to do partial matches for asset title. Example "%asset title%"
     */
    title?: string;

    /**
     * @name sortby
     * The column to sort by. Can be {title, date_start, date_end,datemod,dateadd,filesize}
     */
    sortby?: string;

    /**
     * @name sortdir
     * The sort direction. Can be {asc, desc}
     */
    sortdir?: SortDirection;

    /**
     * @name start
     * Will return a subset of available assets. Used primarily for pagination. Default is set to 0
     */
    start: number = 0;

    /**
     * @name end
     * Will return a subset of available assets. Used primarily for pagination. Default is set to start+20 Zero-based inclusive index: E.G. &start=0&send=4 will return five programs from the beginning.
     */
    end: number = 0;

    /**
     * @name assetType
     * filter for getting asset types. Possible values {audio,video,image,binary,presentation,all}
     */
    assetType?: AssetType;

    /**
     * @name isPublished
     * filter for getting assets based on whether they are published or not. Possible value {true/false}
     */
    isPublished?: boolean;

    constructor(start: number, stride: number) {
        this.start = start;
        this.stride = stride;
        this.end = start + stride;
    }
    
    next() {
        this.start = this.end + 1;
        this.end = this.end + this.stride;
    }

    appendToQueryString(url: URL) {
        if (this.dateStart) {
            url.searchParams.append('date_start', this.dateStart);
        }

        if (this.dateEnd) {
            url.searchParams.append('date_end', this.dateEnd);
        }
        
        if (this.dateAdd) {
            url.searchParams.append('date_add', this.dateAdd);
        }

        if (this.dateAddComp) {
            url.searchParams.append('date_add_comp', this.dateAddComp);
        }

        if (this.dateModStart) {
            url.searchParams.append('date_mod_start', this.dateModStart);
        }

        if (this.dateModEnd) {
            url.searchParams.append('date_mod_end', this.dateModEnd);
        }

        if (this.assetfiles !== undefined) {
            url.searchParams.append('assetfiles', this.assetfiles ? 'true' : 'false');
        }

        if (this.title) {
            url.searchParams.append('title', this.title);
        }

        if (this.sortby) {
            url.searchParams.append('sortby', this.sortby);
        }

        if (this.sortdir) {
            url.searchParams.append('sortdir', this.sortdir);
        }
        
        url.searchParams.append('start', this.start.toString());
        url.searchParams.append('end', this.end.toString());

        if (this.assetType) {
            url.searchParams.append('assetType', this.assetType);
        }

        if (this.isPublished !== undefined) {
            url.searchParams.append('isPublished', this.isPublished ? 'true' : 'false');
        }
    }
}

export class WSAssetResponse {
    asset: Array<Asset> = [];
    currentCount: number = 0;
    totalCount: number = 0;    
}

export interface Asset {
    assetid: string;
    title: string;
    dateadd: string;
    datemod?: string;
    defaultThumb?: string;
    description: string;
    tags: string;
    isActive: number;
    isHidden: number;
    posterThumb?: string;
    geoFilterId?: number;
    uuid: string;
    isPublished: number;
    date_start: string;
    date_end?: string;
    youtubePublishable?: number;
    referenceId?: string;
    clientuuid?: string;
    spriteVtt?: string;
    spriteThumbnail?: string;
    associatedLinks?: Array<string>;
    AssociatedFiles?: Array<string>;
    captions?: Array<string>;
    duration?: number;
    editable: boolean;
    thumbnailUrl?: string;
    thumbRel?: string;
    assetType: AssetType;
    assetSubTypeid?: number;
    assetSubType?: string;
    assetFiles?: Array<AssetFile>;
    metadatas?: any;
    folders?: any;
}

export interface AssetFile {
    class: string;
    assetfileid: number;
    datemod?: string;
    duration: number;
    videoBitrate?: number;
    audioBitrate?: number;
    videoWidth?: number;
    videoHeight?: number;
    filesize: number;
    assetFileTypeid?: number;
    isReferenceFile?: number;
    setAsAssociatedFile?: number;
    isDedicatedRendition?: boolean;
    full_cdn_path?: string;
    http_url?: string;
    rtmp_url?: string;
    rtmp?: RTMPAsset;
    aspectRatio?: number;
}

export interface RTMPAsset {
    protocol?: string;
    host?: string;
    application?: string;
    directory?: string;
    stream_name?: string;
    connection_string?: string;
    stream?: string;
    play_path?: string;
}