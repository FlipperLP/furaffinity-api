import { Rating, SearchType, OrderBy, OrderDirection, RangeType, MatchMode, Category, Tag, Species, Gender } from "./Enums";
export declare const ENDPOINT = "https://www.furaffinity.net";
/**
 * Use cookies to login
 * @param cookieA cookie a from furaffinity.net
 * @param cookieB cookie b from furaffinity.net
 */
export declare function login(cookieA: string, cookieB: string): void;
/**
 * Remove all cookies to logout
 */
export declare function logout(): void;
/**
 * Set proxy for api request
 * @param url proxy url, support http, https and socks
 */
export declare function setProxy(url?: string): void;
export interface SearchOptions {
    /** start at 1 */
    page?: number;
    /** default 72 */
    perpage?: 24 | 48 | 72;
    /** default Any */
    rating?: Rating;
    /** default Any */
    type?: SearchType;
    /** default 'relevancy' */
    orderBy?: OrderBy;
    /** default 'desc' */
    orderDirection?: OrderDirection;
    /** default 'all' */
    range?: RangeType;
    rangeFrom?: Date;
    rangeTo?: Date;
    /** default extended */
    matchMode?: MatchMode;
}
export interface BrowseOptions {
    /** start at 1 */
    page?: number;
    /** default 72 */
    perpage?: 24 | 48 | 72;
    /** default Any */
    rating?: Rating;
    /** default All */
    category?: Category;
    /** default All */
    tag?: Tag;
    /** default Unspecified / Any */
    species?: Species;
    /** default Any */
    gender?: Gender;
}
export interface SubmissionsOptions {
    /** last page's id */
    startAt?: string;
    sort?: "new" | "old";
    /** default 72 */
    perpage?: 24 | 48 | 72;
}
export declare function FetchHome(): Promise<string>;
export declare function FetchSearch(query: string, options?: SearchOptions): Promise<string>;
export declare function FetchBrowse(options?: BrowseOptions): Promise<string>;
export declare function FetchGallery(id: string, page?: number, perpage?: number): Promise<string>;
export declare function FetchScraps(id: string, page?: number, perpage?: number): Promise<string>;
export declare function FetchSubmission(id: string): Promise<string>;
export declare function FetchSubmissions(options?: SubmissionsOptions): Promise<string>;
export declare function FaveSubmission(favLink: string): Promise<void>;
export declare function FetchAuthor(id: string): Promise<string>;
export declare function FetchWatchingList(id: string, page?: number): Promise<string>;
export declare function FetchMyWatchingList(page?: number): Promise<string>;
export declare function RequestRemoveFromInbox(viewIds: string[]): Promise<void>;
/**
 * Request the given url, toggle watching state
 * @param watchLink link for watch or unwatch, can be get from IAuthor
 */
export declare function RequestToggleWatch(watchLink: string): Promise<void>;
