"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyWatchingList = exports.WatchingList = exports.Scraps = exports.Gallery = exports.Author = exports.User = exports.Submission = exports.Submissions = exports.Browse = exports.Search = exports.SetProxy = exports.Login = exports.toggleWatch = exports.unwatchAuthor = exports.watchAuthor = exports.removeFromInbox = exports.myWatchingList = exports.watchingList = exports.scraps = exports.gallery = exports.author = exports.user = exports.submission = exports.submissions = exports.browse = exports.search = exports.setProxy = exports.logout = exports.login = exports.FASystemError = void 0;
const Request_1 = require("./Request");
const Parser_1 = require("./Parser");
__exportStar(require("./Enums"), exports);
__exportStar(require("./interfaces"), exports);
var Parser_2 = require("./Parser");
Object.defineProperty(exports, "FASystemError", { enumerable: true, get: function () { return Parser_2.FASystemError; } });
var Request_2 = require("./Request");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return Request_2.login; } });
Object.defineProperty(exports, "logout", { enumerable: true, get: function () { return Request_2.logout; } });
Object.defineProperty(exports, "setProxy", { enumerable: true, get: function () { return Request_2.setProxy; } });
/**
 * Get results from search page
 * @param query search query
 * @param options search options
 */
function search(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield (0, Request_1.FetchSearch)(query, options);
        const results = (0, Parser_1.ParseFigures)(body);
        return (0, Parser_1.ParseSearchPaging)(body, results, query, options);
    });
}
exports.search = search;
/**
 * Get results from browse page
 * @param options browse options
 */
function browse(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield (0, Request_1.FetchBrowse)(options);
        const results = (0, Parser_1.ParseFigures)(body);
        return (0, Parser_1.ParseBrowsePaging)(body, results, options);
    });
}
exports.browse = browse;
/**
 * Get results from submissions timeline page
 * @param options submissions options
 */
function submissions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield (0, Request_1.FetchSubmissions)(options);
        const results = (0, Parser_1.ParseFigures)(body);
        return (0, Parser_1.ParseSubmissionsPaging)(body, results);
    });
}
exports.submissions = submissions;
/**
 * Get submission's info by pass submission id
 * @param id submission id
 */
function submission(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, Parser_1.ParseSubmission)(yield (0, Request_1.FetchSubmission)(id), id);
    });
}
exports.submission = submission;
/**
 * Get the current logged in user
 */
function user() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, Parser_1.ParseAuthor)(yield (0, Request_1.FetchHome)());
    });
}
exports.user = user;
/**
 * Get author's info by pass author id
 * @param id author id
 */
function author(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, Parser_1.ParseAuthor)(yield (0, Request_1.FetchAuthor)(id));
    });
}
exports.author = author;
/**
 * Get results of a gallery page
 * @param id author id
 * @param page page number
 */
function gallery(id, page, perpage = 72) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield (0, Request_1.FetchGallery)(id, page, perpage);
        const results = (0, Parser_1.ParseFigures)(body);
        return (0, Parser_1.ParseGalleryPaging)(body, results, perpage);
    });
}
exports.gallery = gallery;
/**
 * Get results of a scraps page
 * @param id author id
 * @param page page number
 */
function scraps(id, page, perpage = 72) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = yield (0, Request_1.FetchScraps)(id, page, perpage);
        const results = (0, Parser_1.ParseFigures)(body);
        return (0, Parser_1.ParseScrapsPaging)(body, results, perpage);
    });
}
exports.scraps = scraps;
/**
 * Get an author's watching list
 * result don't has avatar
 * @param id author id
 */
function watchingList(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        let page = 1;
        while (true) {
            const users = (0, Parser_1.ParseWatchingList)(yield (0, Request_1.FetchWatchingList)(id, page++));
            result = [...result, ...users];
            if (users.length === 0 || users.length < 200) {
                break;
            }
        }
        return result;
    });
}
exports.watchingList = watchingList;
/**
 * Get current login user's watching list
 * this can only use after login
 * result has avatar
 */
function myWatchingList() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = [];
        let page = 1;
        while (true) {
            const users = (0, Parser_1.ParseMyWatchingList)(yield (0, Request_1.FetchMyWatchingList)(page++));
            result = [...result, ...users];
            if (users.length === 0 || users.length < 64) {
                break;
            }
        }
        return result;
    });
}
exports.myWatchingList = myWatchingList;
/**
 * Remove submissions from submission inbox, only delete when it exists in inbox.
 * @param viewIds submission id list
 */
function removeFromInbox(viewIds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Request_1.RequestRemoveFromInbox)(viewIds);
    });
}
exports.removeFromInbox = removeFromInbox;
/**
 * Watch author if haven't watched, no effact when watch yourself
 * @param id author id
 */
function watchAuthor(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const author = yield (0, exports.Author)(id);
        yield ((_a = author.watchAuthor) === null || _a === void 0 ? void 0 : _a.call(author));
    });
}
exports.watchAuthor = watchAuthor;
/**
 * Unwatch author if already watched, no effact when unwatch yourself
 * @param id author id
 */
function unwatchAuthor(id) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const author = yield (0, exports.Author)(id);
        yield ((_a = author.unwatchAuthor) === null || _a === void 0 ? void 0 : _a.call(author));
    });
}
exports.unwatchAuthor = unwatchAuthor;
/**
 * Request the given url, toggle watching state
 * @param watchLink link for watch or unwatch, can be get from IAuthor
 */
exports.toggleWatch = Request_1.RequestToggleWatch;
// 兼容原来的命名
var Request_3 = require("./Request");
Object.defineProperty(exports, "Login", { enumerable: true, get: function () { return Request_3.login; } });
Object.defineProperty(exports, "SetProxy", { enumerable: true, get: function () { return Request_3.setProxy; } });
exports.Search = search;
exports.Browse = browse;
exports.Submissions = submissions;
exports.Submission = submission;
exports.User = user;
exports.Author = author;
exports.Gallery = gallery;
exports.Scraps = scraps;
exports.WatchingList = watchingList;
exports.MyWatchingList = myWatchingList;
