/// <reference types="cheerio" />
import { IAuthor, IPagingResults, IResult, ISubmission } from "./interfaces";
import { BrowseOptions, SearchOptions } from "./Request";
export declare class FASystemError extends Error {
    constructor(message: string);
}
/**
 * Parse result from figure element
 * @param figure CheerioElement
 */
export declare function ParseFigure(figure: CheerioElement, selector: Cheerio): IResult;
/**
 * Parse all figure's info from HTML
 * @param body HTML document
 */
export declare function ParseFigures(body: string): IPagingResults;
export declare function ParseGalleryPaging(body: string, results: IPagingResults, perpage?: number): IPagingResults;
export declare function ParseScrapsPaging(body: string, results: IPagingResults, perpage?: number): IPagingResults;
export declare function ParseSearchPaging(body: string, results: IPagingResults, query: string, options?: SearchOptions): IPagingResults;
export declare function ParseBrowsePaging(body: string, results: IPagingResults, options?: BrowseOptions): IPagingResults;
export declare function ParseSubmissionsPaging(body: string, results: IPagingResults): IPagingResults;
/**
 * Get submission's info
 * @param body HTML document
 * @param id Subumission id
 */
export declare function ParseSubmission(body: string, id: string): ISubmission;
/**
 * Get author's info
 * @param body HTML document
 */
export declare function ParseAuthor(body: string): IAuthor;
/**
 * Get all Author's info from peer page of watching list
 * @param body HTML document
 */
export declare function ParseWatchingList(body: string): IAuthor[];
/**
 * Get all Author's info from peer page of watching list
 * @param body HTML document
 */
export declare function ParseMyWatchingList(body: string): IAuthor[];
