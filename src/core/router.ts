import {
  $$,
  isFN,
  isNumber,
  isStr,
  makeID,
  Mapper,
  oAss,
  obj,
  oItems,
} from "./@";
import { Elements } from "./attr";
import { dom, Dom } from "./dom";
import { $ } from "./elem";
import { State, Stateful } from "./stateful";

const parsePath = (url: string) => {
  const parsed: string[] = [];
  const wcard: string[] = [];
  let murl = url;
  let qurl = "";
  const splitd = url.match(/(?<=\?)[^/].*=?(?=\/|$)/g);

  if (splitd?.[0]) {
    qurl = splitd?.[0];
    murl = url.slice(0, url.indexOf(qurl) - 1);
  }
  const prsed = murl.match(/(?<=\/)[^/].*?(?=\/|$)/g) ?? ["/"];
  const query: any = {};

  prsed?.forEach((pr) => {
    if (pr.indexOf("<") >= 0) {
      const tgp = pr.match(/(?<=<)[^/].*?(?=>|$)/g);
      if (tgp?.length) {
        const tgz: string = tgp[0];
        if (tgz.indexOf(":") > -1) {
          const [_type, _wcard] = tgz.split(":");
          parsed.push(_type);
          wcard.push(_wcard);
        } else {
          parsed.push(tgz);
        }
      }
    } else {
      parsed.push(pr);
    }
  });

  if (url.slice(-1) == "/" && url.length > 1) {
    parsed.push("/");
  }

  if (qurl) {
    const _qq = decodeURIComponent(qurl);
    const _qstr = _qq.split("&");
    _qstr.forEach((qs) => {
      const [ak, av] = qs.split(/\=(.*)/, 2);
      query[ak] = av;
    });
  }

  return { parsed, wcard, query };
};

const getPAthType = (wrd: any, isFinal: boolean = false) => {
  let lit_type: [any, string] | [] = [];
  if (isNumber(wrd)) {
    const nm = Number(wrd);
    lit_type = [nm, "number"];
  } else {
    if (isFinal && wrd.includes(".")) {
      lit_type = [wrd, "file"];
    } else {
      let tps = "-";
      if (wrd.length == 36) {
        const dashy = wrd.match(/\-/g);
        if (dashy && dashy.length == 4) {
          tps = "uuid";
        } else {
          tps = "string";
        }
      } else if (wrd != "/") {
        tps = "string";
      }
      lit_type = [wrd, tps];
    }
  }
  return lit_type;
};

const matchPath = (url: string, WURL: string[]) => {
  const { parsed } = parsePath(url);
  let smatch = "";
  let wcmatchd = "";
  let upcount = 0;
  //
  let wcrdCnt = 0;
  parsed.forEach((mk, ind) => {
    for (let i = 0; i < WURL.length; i++) {
      const { parsed: pr, wcard } = parsePath(WURL[i]);
      if (pr.length == parsed.length && wcard.length) {
        if (mk == pr[ind]) {
          wcmatchd = WURL[i];
          upcount++;
          break;
        } else if (wcard[wcrdCnt]) {
          const wc = wcard[wcrdCnt];
          wcrdCnt++;
          //
          if (matchWC(wc, mk)) {
            wcmatchd = WURL[i];
            upcount++;
            break;
          }
        } else {
          const TP = getPAthType(mk);
          if (pr[ind] == TP[1]) {
            wcmatchd = WURL[i];
            upcount++;
            break;
          }
        }
      }
    }
  });

  if (!wcmatchd || upcount != parsed.length) {
    parsed.forEach((mk, ind) => {
      for (let i = 0; i < WURL.length; i++) {
        const { parsed: pr } = parsePath(WURL[i]);
        if (pr.length == parsed.length) {
          if (mk == pr[ind]) {
            smatch = WURL[i];
            break;
          } else {
            const [_, xpctd] = getPAthType(mk);
            if (pr[ind] == xpctd) {
              smatch = WURL[i];
              break;
            }
          }
        }
      }
    });
  }

  return upcount == parsed.length ? wcmatchd : smatch;
};

const matchWC = (str: string, fndr: string) => {
  const st = str[0];
  const wrd = str.slice(1);
  switch (st) {
    case "*":
      return fndr.includes(wrd);
    case "^":
      return fndr.startsWith(wrd);
    case "&":
      return fndr.endsWith(wrd);
    default:
      return false;
  }
};

const pushWildCard = (path: string, wildcard: string[]) => {
  const wc = ["string", "number", "uuid"];
  const { parsed, wcard } = parsePath(path);
  if (wcard.length) {
    wildcard.push(path);
  } else {
    for (let i = 0; i < parsed.length; i++) {
      if (wc.includes(parsed[i])) {
        wildcard.push(path);
        break;
      }
    }
  }
};

/*
-------------------------
-------------------------
*/

const linkLoader = (href: string, rel: string, type?: string, as?: string) => {
  return new Promise<() => void>((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    if (type) link.type = type;
    if (as) link.as = as;
    //
    link.onload = () =>
      resolve(() => {
        link.remove();
      });
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(link);
  });
};

export const listener = (
  e: HTMLElement,
  type: string,
  cb: (e: any) => void,
) => {
  e.addEventListener(type, cb);
  return () => {
    e.removeEventListener(type, cb);
  };
};

async function processImport(rtmap: routeMaps, e?: HTMLElement) {
  const { js, head, sT } = rtmap;
  if (isStr(js)) {
    try {
      const IMP = await import((location.pathname ? "" : ".") + js);
      if ("default" in IMP) {
        return IMP.default();
      }
    } catch (e) {
      return e;
    }
  }
  return "kk";
}

/*
-------------------------

-------------------------
*/
interface rPath {
  js?: routeJS;
  head: HtmlHead;
}
type routeJS = string | (() => Dom | Promise<Dom>);
type routeMaps = rPath & { sT?: number };
// -----
class routeMapper {
  maps: Mapper<string, routeMaps> = new Mapper();
  private wildcard: string[] = [];
  scrollingParent?: Elements;
  private pathname: string;
  constructor(private basePath: string) {
    this.pathname =
      "pathname" in location ? location?.pathname.slice(0, -1) : "";
  }
  private url(url: string): [string, boolean] {
    if (this.maps.has(url)) {
      return [url, false];
    }
    const wildcardMatch = matchPath(url, this.wildcard);
    if (wildcardMatch && this.maps.has(wildcardMatch)) {
      return [wildcardMatch, true];
    }

    return ["", false];
  }
  setScroll(path: string) {
    const route = this.getPath(path);
    if (route && this.scrollingParent) {
      route.sT = this.scrollingParent.scrollTop ?? 0;
    }
  }
  getPath(path: string): routeMaps | undefined {
    const [_url, isWildCard] = this.url(path);
    return this.maps.get(_url);
  }
  setPath(path: string, js: routeJS, head: HtmlHead) {
    const bp = this.basePath;
    pushWildCard(path, this.wildcard);
    head.init(bp);
    //
    if (isFN(js)) {
      this.maps.set(path, { js: js, head });
    } else {
      const ult = this.pathname + (bp ? `${bp}${js}` : js);
      this.maps.set(path, { js: ult.replaceAll("//", "/"), head });
    }
  }
}

function routePage(nav: Stateful<string>, route: Router) {
  let lastURL = "";
  const _e: events = {
    watch() {
      const _E = $(this);
      return [
        (nav: string) => {
          const _path = route.map.getPath(nav);
          if (_path) {
            //process the URL content here
            processImport(_path)
              .then((e) => {
                // Process the route heads and replace essentials -- then replace inner
                // get parent ID???
                _E.inner = e;

                lastURL = nav;
              })
              .catch((e) => {
                //
              });
          } else {
            _E.inner = dom("div", {}, `"${nav}" - not found...`);
          }
        },
        [nav],
        true,
      ];
    },
  };
  return dom("div", { on: { ..._e } });
}

function aHREF(
  a: attr & { href: string },
  D: Dom[],
  upnav: (href: string) => void,
) {
  const _e: events = {
    click(e) {
      e.preventDefault();
      const _path = $(this).path;
      upnav(_path);
    },
  };
  return dom("a", { ...a, on: { ..._e } }, D);
}
/*
-------------------------
todo:
- combine mapped and routed
- 
-------------------------
*/
interface routeCfg {
  title?: string;
  description?: string;
  css?: string;
}

export class Router {
  map: routeMapper;
  nav = State("/");
  title = State("/");
  a: (a: attr & { href: string }, D: Dom[]) => Dom;
  page: Dom;
  constructor(
    r: {
      pushState?: boolean;
      basePath?: string;
      main?: boolean;
    } = {},
  ) {
    const { basePath } = r;

    // -------

    this.map = new routeMapper(basePath || "/");
    /*
    -------------------------
    -------------------------
    */

    this.page = routePage(this.nav, this);

    const updateNav = (href: string) => {
      this.nav.value = href;
    };
    //
    this.a = (a: attr & { href: string }, D: Dom[]) => {
      return aHREF(a, D, updateNav);
    };
  }

  /** --------------------
   * string | number | uuid
   * - /url/\<string>
   * - /url/\<string:*hell> - value contains the substring "hello"
   * - /url/\<string:^hell> - value begins with "hello"
   * - /url/\<string:$hell> - value ends with "hello"
   */
  route(path: string, js: routeJS, config?: routeCfg | HtmlHead) {
    const head =
      config instanceof HtmlHead ? config : new HtmlHead({ ...config });

    this.map.setPath(path, js, head);

    return this;
  }
  init(scrollingParent: Elements) {
    this.map.scrollingParent = scrollingParent;

    // -----------------------------
  }
  set load(route: string) {
    this.nav.value = route;
  }
}

/*
-------------------------
route.init
route.load
route.route

// 
route.page
route.nav
route.a
route.title
-------------------------
*/

/*
-------------------------

-------------------------
*/
interface htmlHEAD {
  title?: string;
  description?: string;
  icon?: string;
  css?: string;
  baseURL?: string;
  image?: string;
  basePath?: string;
}
interface OG {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}
interface twt {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  card?: "summary" | "summary_large_image" | "app" | "player";
}

/*
-------------------------
Implement SEO in the future - make this modular
-------------------------
*/

const metaProperty = (
  type: string,
  typeval: string,
  props: obj<string | undefined>,
  head: obj<any>,
) => {
  return oItems(props).map(
    ([key, val]) =>
      `<meta ${type}="${typeval}:${key}" content="${val ?? head[key]}">`,
  );
};

export class HtmlHead {
  private _head = {
    title: "",
    description: "",
    css: "",
    url: "",
    image: "",
    card: "summary_large_image",
    og: [] as string[],
    twt: [] as string[],
  };
  private _path: string = "";
  private og: OG = {};
  private twt: twt = { card: "summary_large_image" };
  constructor({
    title,
    description,
    css,
    image,
    baseURL,
    basePath,
  }: htmlHEAD = {}) {
    //
    oAss(this._head, {
      ...(title && { title }),
      ...(css && { css }),
      ...(image && { image }),
      ...(description && { description }),
      ...(baseURL && { url: baseURL }),
    });
  }
  /**
   * - Open Graph meta data
   * - Use a high-quality image (1200x630 px recommended)
   */
  openGraph(og?: OG) {
    if (og) this.og = og;
    return this;
  }
  /**
   * - Twitter Card meta data
   * - Use the summary_large_image type for better visual appeal.
   */
  twitterCard(twt?: twt) {
    if (twt) this.twt = twt;
    return this;
  }
  init(path: string, basePath?: string) {
    this._path = path;
    this._head.url = this._head.url + path;

    if (basePath && this._head.css) {
      this._head.css = basePath + this._head.css;
    }

    if (!this._path) {
      throw new Error(`path not set`);
    }
    if (this.og.image || this._head.image) {
      const { title, description, image, url } = this.og;
      this._head.og = metaProperty(
        "property",
        "og",
        { title, description, image, url },
        this._head,
      );
    }

    if (this.twt.image || this._head.image) {
      const { title, description, image, url, card } = this.twt;

      this._head.twt = metaProperty(
        "name",
        "twitter",
        { title, description, image, url, card },
        this._head,
      );
    }
  }

  get head() {
    return this._head;
  }
}
