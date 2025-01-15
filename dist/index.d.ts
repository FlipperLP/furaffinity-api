import { SearchOptions, BrowseOptions, SubmissionsOptions, RequestToggleWatch } from "./Request";
import { IAuthor, IPagingResults, ISubmission } from "./interfaces";
export * from "./Enums";
export * from "./interfaces";
export { FASystemError } from "./Parser";
export { login, logout, setProxy } from "./Request";
/**
 * Get results from search page
 * @param query search query
 * @param options search options
 */
export declare function search(query: string, options?: SearchOptions): Promise<IPagingResults>;
/**
 * Get results from browse page
 * @param options browse options
 */
export declare function browse(options?: BrowseOptions): Promise<IPagingResults>;
/**
 * Get results from submissions timeline page
 * @param options submissions options
 */
export declare function submissions(options?: SubmissionsOptions): Promise<IPagingResults>;
/**
 * Get submission's info by pass submission id
 * @param id submission id
 */
export declare function submission(id: string): Promise<ISubmission>;
/**
 * Get the current logged in user
 */
export declare function user(): Promise<IAuthor>;
/**
 * Get author's info by pass author id
 * @param id author id
 */
export declare function author(id: string): Promise<IAuthor>;
/**
 * Get results of a gallery page
 * @param id author id
 * @param page page number
 */
export declare function gallery(id: string, page: number, perpage?: number): Promise<IPagingResults>;
/**
 * Get results of a scraps page
 * @param id author id
 * @param page page number
 */
export declare function scraps(id: string, page: number, perpage?: number): Promise<IPagingResults>;
/**
 * Get an author's watching list
 * result don't has avatar
 * @param id author id
 */
export declare function watchingList(id: string): Promise<IAuthor[]>;
/**
 * Get current login user's watching list
 * this can only use after login
 * result has avatar
 */
export declare function myWatchingList(): Promise<IAuthor[]>;
/**
 * Remove submissions from submission inbox, only delete when it exists in inbox.
 * @param viewIds submission id list
 */
export declare function removeFromInbox(viewIds: string[]): Promise<void>;
/**
 * Watch author if haven't watched, no effact when watch yourself
 * @param id author id
 */
export declare function watchAuthor(id: string): Promise<void>;
/**
 * Unwatch author if already watched, no effact when unwatch yourself
 * @param id author id
 */
export declare function unwatchAuthor(id: string): Promise<void>;
/**
 * Request the given url, toggle watching state
 * @param watchLink link for watch or unwatch, can be get from IAuthor
 */
export declare const toggleWatch: typeof RequestToggleWatch;
export { login as Login, setProxy as SetProxy } from "./Request";
export declare const Search: typeof search;
export declare const Browse: typeof browse;
export declare const Submissions: typeof submissions;
export declare const Submission: typeof submission;
export declare const User: typeof user;
export declare const Author: typeof author;
export declare const Gallery: typeof gallery;
export declare const Scraps: typeof scraps;
export declare const WatchingList: typeof watchingList;
export declare const MyWatchingList: typeof myWatchingList;
