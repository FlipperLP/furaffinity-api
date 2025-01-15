"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMyWatchingList = exports.ParseWatchingList = exports.ParseAuthor = exports.ParseSubmission = exports.ParseSubmissionsPaging = exports.ParseBrowsePaging = exports.ParseSearchPaging = exports.ParseScrapsPaging = exports.ParseGalleryPaging = exports.ParseFigures = exports.ParseFigure = exports.FASystemError = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
const cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
const Enums_1 = require("./Enums");
const _1 = require(".");
const Request_1 = require("./Request");
class FASystemError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.FASystemError = FASystemError;
/**
 * Convert author name to author id
 * @param name author name
 */
function convertNameToId(name) {
    return name.trim().replace("_", "").toLowerCase();
}
/**
 * Get class names from element
 * @param element CheerioElement
 */
function classNames(element) {
    return element.attribs.class.split(" ");
}
function checkSystemMessage($) {
    var _a;
    // Check system message
    const noticeMessage = $("section.notice-message");
    if (noticeMessage.length !== 0) {
        const systemMessage = noticeMessage[0].childNodes[1].childNodes[3].childNodes[0].nodeValue;
        throw new FASystemError(systemMessage);
    }
    // Check system error
    const title = $("head title");
    if (title[0].firstChild.data === "System Error") {
        const sectionBody = $("section .section-body");
        throw new FASystemError(((_a = sectionBody[0].firstChild.data) === null || _a === void 0 ? void 0 : _a.trim()) || "Unknown error.");
    }
}
/**
 * Parse result from figure element
 * @param figure CheerioElement
 */
function ParseFigure(figure, selector) {
    var _a, _b, _c, _d;
    const id = (_a = figure.attribs.id.split("-").pop()) !== null && _a !== void 0 ? _a : "";
    const thumb = "http:" + figure.childNodes[1].childNodes[1].childNodes[1].childNodes[1].attribs.src;
    const authorName = selector.find("figcaption p:last-child a").first().attr().title;
    const authorId = convertNameToId(authorName);
    return {
        type: Enums_1.SubmissionType[classNames(figure)[1].split("-").pop()],
        id,
        title: (_c = (_b = figure.childNodes[3].childNodes[1].childNodes[1].childNodes[0]) === null || _b === void 0 ? void 0 : _b.nodeValue) !== null && _c !== void 0 ? _c : "",
        url: `${Request_1.ENDPOINT}/view/${id}`,
        rating: Enums_1.Rating[(_d = classNames(figure)[0]
            .split("-")
            .pop()) === null || _d === void 0 ? void 0 : _d.replace(/^[a-z]/, ($1) => $1.toUpperCase())],
        thumb: {
            icon: thumb.replace(/@\d+?-/g, "@75-"),
            tiny: thumb.replace(/@\d+?-/g, "@150-"),
            small: thumb.replace(/@\d+?-/g, "@300-"),
            medium: thumb.replace(/@\d+?-/g, "@800-"),
            large: thumb.replace(/@\d+?-/g, "@1600-")
        },
        author: {
            id: authorId,
            url: `${Request_1.ENDPOINT}/user/${authorId}`,
            name: authorName
        },
        getSubmission: () => __awaiter(this, void 0, void 0, function* () {
            return yield (0, _1.submission)(id);
        })
    };
}
exports.ParseFigure = ParseFigure;
/**
 * Parse all figure's info from HTML
 * @param body HTML document
 */
function ParseFigures(body) {
    const $ = cheerio_1.default.load(body);
    const results = [];
    $("figure").each((index, figure) => {
        results.push(ParseFigure(figure, $(figure)));
    });
    return results;
}
exports.ParseFigures = ParseFigures;
function ParseGalleryPaging(body, results, perpage) {
    const $ = cheerio_1.default.load(body);
    const links = $(".submission-list .aligncenter:nth-child(1) div");
    if ($(links[0]).find("form").length > 0) {
        results.prevLink = Request_1.ENDPOINT + $(links[0]).find("form").attr()["action"];
        const matchs = results.prevLink.match(/\/gallery\/(.+?)\/(\d+?)\/$/);
        if (matchs) {
            const id = matchs[1];
            const page = Number.parseInt(matchs[2]);
            results.prev = () => (0, _1.gallery)(id, page, perpage);
        }
    }
    if ($(links[2]).find("form").length > 0) {
        results.nextLink = Request_1.ENDPOINT + $(links[2]).find("form").attr()["action"];
        const matchs = results.nextLink.match(/\/gallery\/(.+?)\/(\d+?)\/$/);
        if (matchs) {
            const id = matchs[1];
            const page = Number.parseInt(matchs[2]);
            results.next = () => (0, _1.gallery)(id, page, perpage);
        }
    }
    return results;
}
exports.ParseGalleryPaging = ParseGalleryPaging;
function ParseScrapsPaging(body, results, perpage) {
    const $ = cheerio_1.default.load(body);
    const links = $(".submission-list .aligncenter:nth-child(1) div");
    if ($(links[0]).find("form").length > 0) {
        results.prevLink = Request_1.ENDPOINT + $(links[0]).find("form").attr()["action"];
        const matchs = results.prevLink.match(/\/scraps\/(.+?)\/(\d+?)\/$/);
        if (matchs) {
            const id = matchs[1];
            const page = Number.parseInt(matchs[2]);
            results.prev = () => (0, _1.scraps)(id, page, perpage);
        }
    }
    if ($(links[2]).find("form").length > 0) {
        results.nextLink = Request_1.ENDPOINT + $(links[2]).find("form").attr()["action"];
        const matchs = results.nextLink.match(/\/scraps\/(.+?)\/(\d+?)\/$/);
        if (matchs) {
            const id = matchs[1];
            const page = Number.parseInt(matchs[2]);
            results.next = () => (0, _1.scraps)(id, page, perpage);
        }
    }
    return results;
}
exports.ParseScrapsPaging = ParseScrapsPaging;
function ParseSearchPaging(body, results, query, options) {
    const $ = cheerio_1.default.load(body);
    const links = $("#search-results .pagination button");
    if (!classNames(links[0]).includes("disabled")) {
        const newOptions = (0, cloneDeep_1.default)(options || {});
        newOptions.page = newOptions.page ? newOptions.page - 1 : 1;
        results.prev = () => (0, _1.search)(query, newOptions);
    }
    if (!classNames(links[1]).includes("disabled")) {
        const newOptions = (0, cloneDeep_1.default)(options || {});
        newOptions.page = newOptions.page ? newOptions.page + 1 : 2;
        results.next = () => (0, _1.search)(query, newOptions);
    }
    return results;
}
exports.ParseSearchPaging = ParseSearchPaging;
function ParseBrowsePaging(body, results, options) {
    const $ = cheerio_1.default.load(body);
    const links = $(".section-body .navigation:nth-child(1) div");
    if ($(links[0]).find("form").length > 0) {
        results.prevLink = Request_1.ENDPOINT + $(links[0]).find("form").attr()["action"];
        const matchs = results.prevLink.match(/\/browse\/(\d+?)$/);
        if (matchs) {
            const page = Number.parseInt(matchs[1]);
            options = options !== null && options !== void 0 ? options : {};
            options.page = page;
            results.prev = () => (0, _1.browse)(options);
        }
    }
    if ($(links[2]).find("form").length > 0) {
        results.nextLink = Request_1.ENDPOINT + $(links[2]).find("form").attr()["action"];
        const matchs = results.nextLink.match(/\/browse\/(\d+?)$/);
        if (matchs) {
            const page = Number.parseInt(matchs[1]);
            options = options !== null && options !== void 0 ? options : {};
            options.page = page;
            results.next = () => (0, _1.browse)(options);
        }
    }
    return results;
}
exports.ParseBrowsePaging = ParseBrowsePaging;
function ParseSubmissionsPaging(body, results) {
    const $ = cheerio_1.default.load(body);
    const links = $(".section-body .aligncenter:nth-child(1)");
    if ($(links).find("a.more-half").length === 2) {
        results.prevLink = Request_1.ENDPOINT + $(links).find("a.more-half").first().attr()["href"];
        results.nextLink = Request_1.ENDPOINT + $(links).find("a.more-half").last().attr()["href"];
    }
    else if ($(links).find("a.more.prev").length === 1) {
        results.prevLink = Request_1.ENDPOINT + $(links).find("a.more.prev").first().attr()["href"];
    }
    else if ($(links).find("a.more").length === 1) {
        results.nextLink = Request_1.ENDPOINT + $(links).find("a.more").first().attr()["href"];
    }
    if (results.prevLink) {
        const matchs = results.prevLink.match(/\/submissions\/(.+?)~(.+?)@(\d+)\/$/);
        if (matchs) {
            const sort = matchs[1];
            const startAt = matchs[2];
            const perpage = matchs[3];
            const options = {
                sort: sort,
                startAt: startAt,
                perpage: perpage
            };
            results.prev = () => (0, _1.submissions)(options);
        }
    }
    if (results.nextLink) {
        const matchs = results.nextLink.match(/\/submissions\/(.+?)~(.+?)@(\d+)\/$/);
        if (matchs) {
            const sort = matchs[1];
            const startAt = matchs[2];
            const perpage = matchs[3];
            const options = {
                sort: sort,
                startAt: startAt,
                perpage: perpage
            };
            results.next = () => (0, _1.submissions)(options);
        }
    }
    return results;
}
exports.ParseSubmissionsPaging = ParseSubmissionsPaging;
/**
 * Get submission's info
 * @param body HTML document
 * @param id Subumission id
 */
function ParseSubmission(body, id) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const $ = cheerio_1.default.load(body);
    checkSystemMessage($);
    // Get main nodes
    const main = $("#columnpage");
    const sidebar = main.find(".submission-sidebar");
    const content = main.find(".submission-content");
    const stats = sidebar.find(".stats-container");
    const info = sidebar.find(".info");
    const tags = sidebar.find(".tags-row .tags a");
    // buttons
    let downloadUrl = `http:${sidebar.find(".buttons .download a")[0].attribs.href}`;
    const favLinkNode = sidebar.find(".buttons .fav a")[0];
    const favLink = favLinkNode ? `http://furaffinity.net${favLinkNode.attribs.href}` : undefined;
    // header
    const title = (_b = (_a = content.find(".submission-id-sub-container .submission-title p")[0].childNodes[0].data) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
    const authorName = (_d = (_c = content.find(".submission-id-sub-container a strong")[0].childNodes[0].data) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
    const authorId = convertNameToId(authorName);
    const posted = content.find(".submission-id-sub-container strong span")[0].attribs.title;
    const authorAvatar = `http:${content.find(".submission-id-avatar img")[0].attribs.src}`;
    const authorShinies = !!$(".shinies-promo");
    const description = (_f = (_e = content.find(".submission-description").html()) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : "";
    // stats
    const rating = Enums_1.Rating[(_g = stats.find(".rating span")[0].childNodes[0].data) === null || _g === void 0 ? void 0 : _g.trim()];
    const favorites = Number.parseInt((_j = (_h = stats.find(".favorites span")[0].childNodes[0].data) === null || _h === void 0 ? void 0 : _h.trim()) !== null && _j !== void 0 ? _j : "");
    const comments = Number.parseInt((_l = (_k = stats.find(".comments span")[0].childNodes[0].data) === null || _k === void 0 ? void 0 : _k.trim()) !== null && _l !== void 0 ? _l : "");
    const views = Number.parseInt((_o = (_m = stats.find(".views span")[0].childNodes[0].data) === null || _m === void 0 ? void 0 : _m.trim()) !== null && _o !== void 0 ? _o : "");
    // info
    const category = Enums_1.Category[(_p = info.find(".category-name")[0].childNodes[0].data) === null || _p === void 0 ? void 0 : _p.trim()];
    const species = Enums_1.Species[(_q = info[0].childNodes[3].childNodes[2].childNodes[0].data) === null || _q === void 0 ? void 0 : _q.trim()];
    const gender = Enums_1.Gender[(_r = info[0].childNodes[5].childNodes[2].childNodes[0].data) === null || _r === void 0 ? void 0 : _r.trim()];
    // fix url when category is story or poetry
    if (category === Enums_1.Category.Story || category === Enums_1.Category.Poetry) {
        downloadUrl = downloadUrl.replace("d.facdn.net/download/", "d.facdn.net/");
    }
    const previewUrl = content.find(".submission-area img").length > 0 ? `http:${content.find(".submission-area img")[0].attribs["data-preview-src"]}` : undefined;
    return {
        id,
        url: `http://www.furaffinity.net/view/${id}`,
        title: title,
        posted: Date.parse(posted),
        favLink,
        rating: rating,
        author: {
            id: authorId,
            name: authorName,
            url: `http://www.furaffinity.net/user/${authorId}`,
            avatar: authorAvatar,
            shinies: authorShinies
        },
        description,
        content: {
            category,
            species,
            gender
        },
        stats: {
            favorites,
            comments,
            views
        },
        downloadUrl,
        previewUrl,
        keywords: tags
            .filter((index, tag) => tag.attribs.href !== "javascript:void(0);")
            .map((index, tag) => {
            var _a, _b;
            return (_b = (_a = tag.childNodes[0].data) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
        })
            .get(),
        fave: favLink
            ? () => __awaiter(this, void 0, void 0, function* () {
                yield (0, Request_1.FaveSubmission)(favLink);
            })
            : undefined
    };
}
exports.ParseSubmission = ParseSubmission;
/**
 * Get author's info
 * @param body HTML document
 */
function ParseAuthor(body) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    const $ = cheerio_1.default.load(body);
    checkSystemMessage($);
    const name = (_b = (_a = $("userpage-nav-user-details username")[0].childNodes[0].data) === null || _a === void 0 ? void 0 : _a.trim().slice(1)) !== null && _b !== void 0 ? _b : "";
    const id = convertNameToId(name);
    const url = `https://www.furaffinity.net/user/${id}`;
    const shinies = !!$(".userpage-layout-left-col-content > a:nth-child(4)");
    const avatar = `https:${$("userpage-nav-avatar img")[0].attribs.src}`;
    const statsCells = $(".userpage-section-right .cell");
    const views = (_d = (_c = statsCells[0].childNodes[2].data) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "0";
    const submissions = (_f = (_e = statsCells[0].childNodes[6].data) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : "0";
    const favs = (_h = (_g = statsCells[0].childNodes[10].data) === null || _g === void 0 ? void 0 : _g.trim()) !== null && _h !== void 0 ? _h : "0";
    const commentsEarned = (_k = (_j = statsCells[1].childNodes[2].data) === null || _j === void 0 ? void 0 : _j.trim()) !== null && _k !== void 0 ? _k : "0";
    const commentsMade = (_m = (_l = statsCells[1].childNodes[6].data) === null || _l === void 0 ? void 0 : _l.trim()) !== null && _m !== void 0 ? _m : "0";
    const journals = (_p = (_o = statsCells[1].childNodes[10].data) === null || _o === void 0 ? void 0 : _o.trim()) !== null && _p !== void 0 ? _p : "0";
    // TODO: add exception if author is user, if not already done
    const watchButton = $("userpage-nav-interface-buttons a")[0];
    const watchLink = watchButton ? `${Request_1.ENDPOINT}${watchButton.attribs.href}` : undefined;
    const watching = watchButton ? watchButton.attribs.class.includes('stop') : false;
    return {
        id,
        name,
        url,
        avatar,
        shinies,
        watchLink,
        stats: {
            views: Number.parseInt(views),
            submissions: Number.parseInt(submissions),
            favs: Number.parseInt(favs),
            commentsEarned: Number.parseInt(commentsEarned),
            commentsMade: Number.parseInt(commentsMade),
            journals: Number.parseInt(journals),
            watching
        },
        watchAuthor: !watching && watchLink
            ? () => __awaiter(this, void 0, void 0, function* () { return yield (0, Request_1.RequestToggleWatch)(watchLink); }) : undefined,
        unwatchAuthor: watching && watchLink
            ? () => __awaiter(this, void 0, void 0, function* () { return yield (0, Request_1.RequestToggleWatch)(watchLink); }) : undefined
    };
}
exports.ParseAuthor = ParseAuthor;
/**
 * Get all Author's info from peer page of watching list
 * @param body HTML document
 */
function ParseWatchingList(body) {
    const $ = cheerio_1.default.load(body);
    checkSystemMessage($);
    return $(".watch-list-items a")
        .map((index, a) => {
        var _a, _b;
        const name = (_b = (_a = a.childNodes[0].data) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
        const id = convertNameToId(name);
        const url = `${Request_1.ENDPOINT}/user/${id}`;
        return {
            id,
            name,
            url
        };
    })
        .get();
}
exports.ParseWatchingList = ParseWatchingList;
/**
 * Get all Author's info from peer page of watching list
 * @param body HTML document
 */
function ParseMyWatchingList(body) {
    const $ = cheerio_1.default.load(body);
    checkSystemMessage($);
    return $(".flex-item-watchlist")
        .map((index, div) => {
        var _a, _b;
        const avatar = `https:${$(div).find("img.avatar")[0].attribs.src}`;
        const name = (_b = (_a = $(div).find(".flex-item-watchlist-controls a strong")[0].childNodes[0].data) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
        const id = convertNameToId(name);
        const url = `${Request_1.ENDPOINT}/user/${id}`;
        return {
            id,
            name,
            url,
            avatar
        };
    })
        .get();
}
exports.ParseMyWatchingList = ParseMyWatchingList;
