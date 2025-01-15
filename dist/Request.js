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
exports.RequestToggleWatch = exports.RequestRemoveFromInbox = exports.FetchMyWatchingList = exports.FetchWatchingList = exports.FetchAuthor = exports.FaveSubmission = exports.FetchSubmissions = exports.FetchSubmission = exports.FetchScraps = exports.FetchGallery = exports.FetchBrowse = exports.FetchSearch = exports.FetchHome = exports.setProxy = exports.logout = exports.login = exports.ENDPOINT = void 0;
const Enums_1 = require("./Enums");
const hooman_1 = __importDefault(require("hooman"));
const tough_cookie_1 = require("tough-cookie");
const hpagent_1 = require("hpagent");
const socks_proxy_agent_1 = require("socks-proxy-agent");
const pickBy_1 = __importDefault(require("lodash/pickBy"));
const notUndefined = (value) => value !== undefined;
let agent = {};
const cookieJar = new tough_cookie_1.CookieJar();
const got = hooman_1.default.extend({
    cookieJar,
    headers: {
        Connection: "keep-alive"
    },
    maxRedirects: 3
});
exports.ENDPOINT = "https://www.furaffinity.net";
/**
 * Use cookies to login
 * @param cookieA cookie a from furaffinity.net
 * @param cookieB cookie b from furaffinity.net
 */
function login(cookieA, cookieB) {
    cookieJar.setCookieSync(`a=${cookieA};`, exports.ENDPOINT);
    cookieJar.setCookieSync(`b=${cookieB};`, exports.ENDPOINT);
}
exports.login = login;
/**
 * Remove all cookies to logout
 */
function logout() {
    cookieJar.removeAllCookiesSync();
}
exports.logout = logout;
/**
 * Set proxy for api request
 * @param url proxy url, support http, https and socks
 */
function setProxy(url) {
    if (!url) {
        agent = {};
        return;
    }
    if (url.startsWith("http")) {
        const proxy = new hpagent_1.HttpsProxyAgent({
            proxy: url
        });
        agent = { https: proxy };
    }
    else if (url.startsWith("socks")) {
        const proxy = new socks_proxy_agent_1.SocksProxyAgent(url);
        agent = { https: proxy };
    }
}
exports.setProxy = setProxy;
function FetchHome() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield got.get(`${exports.ENDPOINT}/me`, { agent });
        return res.body;
    });
}
exports.FetchHome = FetchHome;
function FetchSearch(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/search`;
        const { page = 1, perpage = 72, rating = Enums_1.Rating.Any, type = Enums_1.SearchType.All, orderBy = "relevancy", orderDirection = "desc", range = "all", rangeFrom, rangeTo, matchMode = "extended" } = options || {};
        const res = yield got.post(url, {
            agent,
            form: (0, pickBy_1.default)({
                "rating-general": rating & Enums_1.Rating.General ? 1 : undefined,
                "rating-mature": rating & Enums_1.Rating.Mature ? 1 : undefined,
                "rating-adult": rating & Enums_1.Rating.Adult ? 1 : undefined,
                "type-art": type & Enums_1.SearchType.Art ? 1 : undefined,
                "type-flash": type & Enums_1.SearchType.Flash ? 1 : undefined,
                "type-photo": type & Enums_1.SearchType.Photos ? 1 : undefined,
                "type-music": type & Enums_1.SearchType.Music ? 1 : undefined,
                "type-story": type & Enums_1.SearchType.Story ? 1 : undefined,
                "type-poetry": type & Enums_1.SearchType.Poetry ? 1 : undefined,
                page,
                perpage,
                mode: matchMode,
                "order-by": orderBy,
                "order-direction": orderDirection,
                range,
                range_from: rangeFrom === null || rangeFrom === void 0 ? void 0 : rangeFrom.toISOString(),
                range_to: rangeTo === null || rangeTo === void 0 ? void 0 : rangeTo.toISOString(),
                q: query
            }, notUndefined)
        });
        return res.body;
    });
}
exports.FetchSearch = FetchSearch;
function FetchBrowse(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/browse`;
        const res = yield got.post(url, {
            agent,
            form: (0, pickBy_1.default)({
                rating_general: ((options === null || options === void 0 ? void 0 : options.rating) || 0x7) & Enums_1.Rating.General ? "on" : undefined,
                rating_mature: ((options === null || options === void 0 ? void 0 : options.rating) || 0x7) & Enums_1.Rating.Mature ? "on" : undefined,
                rating_adult: ((options === null || options === void 0 ? void 0 : options.rating) || 0x7) & Enums_1.Rating.Adult ? "on" : undefined,
                cat: (options === null || options === void 0 ? void 0 : options.category) || 1,
                atype: (options === null || options === void 0 ? void 0 : options.tag) || 1,
                species: (options === null || options === void 0 ? void 0 : options.species) || 1,
                gender: (options === null || options === void 0 ? void 0 : options.gender) || 0,
                perpage: (options === null || options === void 0 ? void 0 : options.perpage) || 72,
                go: "Apply",
                page: (options === null || options === void 0 ? void 0 : options.page) || 1
            }, notUndefined)
        });
        return res.body;
    });
}
exports.FetchBrowse = FetchBrowse;
function FetchGallery(id, page = 1, perpage) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/gallery/${id}/${page}?perpage=${perpage}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchGallery = FetchGallery;
function FetchScraps(id, page = 1, perpage) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/scraps/${id}/${page}?perpage=${perpage}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchScraps = FetchScraps;
function FetchSubmission(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/view/${id}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchSubmission = FetchSubmission;
function FetchSubmissions(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const startAt = typeof (options === null || options === void 0 ? void 0 : options.startAt) === "string" ? "~" + options.startAt : "";
        const sort = (options === null || options === void 0 ? void 0 : options.sort) || "new";
        const perpage = (options === null || options === void 0 ? void 0 : options.perpage) || 72;
        const url = `${exports.ENDPOINT}/msg/submissions/${sort}${startAt}@${perpage}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchSubmissions = FetchSubmissions;
function FaveSubmission(favLink) {
    return __awaiter(this, void 0, void 0, function* () {
        yield got.get(favLink, { agent });
    });
}
exports.FaveSubmission = FaveSubmission;
function FetchAuthor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/user/${id}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchAuthor = FetchAuthor;
function FetchWatchingList(id, page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/watchlist/by/${id}/${page}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchWatchingList = FetchWatchingList;
function FetchMyWatchingList(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/controls/buddylist/${page}`;
        const res = yield got.get(url, { agent });
        return res.body;
    });
}
exports.FetchMyWatchingList = FetchMyWatchingList;
function RequestRemoveFromInbox(viewIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${exports.ENDPOINT}/msg/submissions/new`;
        yield got.post(url, {
            agent,
            form: [...viewIds.map((id) => ["submissions[]", id]), ["messagecenter-action", "remove_checked"]],
            followRedirect: false
        });
    });
}
exports.RequestRemoveFromInbox = RequestRemoveFromInbox;
/**
 * Request the given url, toggle watching state
 * @param watchLink link for watch or unwatch, can be get from IAuthor
 */
function RequestToggleWatch(watchLink) {
    return __awaiter(this, void 0, void 0, function* () {
        yield got.get(watchLink, { agent });
    });
}
exports.RequestToggleWatch = RequestToggleWatch;
