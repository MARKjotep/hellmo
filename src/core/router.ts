import { isFN, isNumber, isStr, obj } from "./@";
import { dom, Dom } from "./dom";
import { $, Elem } from "./elem";
import { State, Stateful } from "./stateful";

const SLC = (cf: Elem, xid: string, attr: string = "url") => {
  const curl = cf.attr.get(attr);
  if (curl == xid) {
    cf.attr.set({ slc: "" });
  } else {
    cf.attr.del("slc");
  }
};

class __ {
  static _parseURL(url: string) {
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
  }
  static _type(wrd: any, isFinal: boolean = false) {
    let lit_type: [any, string] | [] = [];
    if (isNumber(wrd)) {
      const nm = Number(wrd);
      lit_type = [nm, "number"];
    } else {
      if (isFinal && wrd.indexOf(".") >= 1) {
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
  }
}

function matchWC(str: string, fndr: string) {
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
}

interface view {
  js: string | (() => Dom | Promise<Dom>);
  title: string;
  css: string;
  sT?: number;
}

class rS4t {
  maps: obj<view> = {};
  wild: string[] = [];
  pathname: string;
  constructor(private basePath?: string) {
    this.pathname =
      "pathname" in location ? location?.pathname.slice(0, -1) : "";
  }
  private push(path: string) {
    const wc = ["string", "number", "uuid"];
    const { parsed, wcard } = __._parseURL(path);
    if (wcard.length) {
      this.wild.push(path);
    } else {
      for (let i = 0; i < parsed.length; i++) {
        if (wc.includes(parsed[i])) {
          this.wild.push(path);
          break;
        }
      }
    }
  }
  private match(url: string) {
    const WURL = this.wild;
    const { parsed } = __._parseURL(url);
    let smatch = "";
    let wcmatchd = "";
    let upcount = 0;
    //
    let wcrdCnt = 0;
    parsed.forEach((mk, ind) => {
      for (let i = 0; i < WURL.length; i++) {
        const { parsed: pr, wcard } = __._parseURL(WURL[i]);
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
            const TP = __._type(mk);
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
          const { parsed: pr } = __._parseURL(WURL[i]);
          if (pr.length == parsed.length) {
            if (mk == pr[ind]) {
              smatch = WURL[i];
              break;
            } else {
              const [_, xpctd] = __._type(mk);
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
  }
  url(url: string): [string, boolean] {
    if (url in this.maps) {
      return [url, false];
    } else {
      const wnv = this.match(url);
      if (wnv && wnv in this.maps) {
        return [wnv, true];
      }
    }
    return ["", false];
  }
  path(
    path: string,
    {
      file,
      title = "",
      css = "",
    }: {
      file: string | (() => Dom | Promise<Dom>);
      title?: string;
      css?: string;
    },
  ) {
    const bp = this.basePath;
    this.push(path);
    if (isFN(file)) {
      this.maps[path] = { js: file, title, css };
    } else {
      const ult = this.pathname + (bp ? bp + file : file);
      this.maps[path] = { js: ult.replaceAll("//", "/"), title, css };
    }
  }
}

/**
 *
 * string | number | uuid
 *
 * /url/\<string>
 *
 * /url/\<string:*hell> value contains the substring "hello"
 *
 * /url/\<string:^hell> value begins with "hello"
 *
 * /url/\<string:$hell> value ends with "hello"
 */

export class Router {
  private map: rS4t;
  private pushState: boolean;
  url: string = "";
  attr: string;
  isSheet: boolean;
  // states

  page: Stateful<Dom>;
  nav: Stateful<string>;
  title: Stateful<string>;
  private e?: HTMLElement;
  constructor(
    r: {
      pushState?: boolean;
      basePath?: string;
      isSheet?: boolean;
    } = {},
  ) {
    this.page = State(dom("div", {}, ""));
    this.nav = State("/");
    this.title = State("");

    this.pushState = r.pushState ?? true;
    this.isSheet = r.isSheet ?? false;
    this.attr = r.isSheet ? "surl" : "url";
    //
    this.map = new rS4t(r.basePath);
  }
  init(eh?: HTMLElement, ...dsmissed: ((a: any) => void)[]) {
    this.e = eh;
    const nav = this.nav;
    const attr = this.attr;
    const STR = (xid: string, last?: string) => {
      if (xid !== last) {
        this.get(xid, last);
        this.nav.value = xid;
      }
      dsmissed.forEach((df, indx) => {
        df(this.isSheet && indx == 0 ? true : false);
      });
    };

    $(`[${attr}]`)?.all.forEach((cf) => {
      const CG = cf.attr.has("nav");
      if (!CG) {
        cf.attr.set({ nav: null });
        cf.on("click", function (this: HTMLElement, e: MouseEvent) {
          e.preventDefault();
          const _E = $(this),
            xid = _E.attr.get(attr);
          if (xid) STR(xid, nav.value);
        });
      }
    });

    return this;
  }
  private afterImp(np: view, TTLE: string, nip: string, iswc = false) {
    this.title.value = TTLE;
    this.init(this.e);
    if (!this.isSheet) {
      const cURL = location.pathname;
      if (cURL !== nip) {
        this.pushState && history.pushState({}, TTLE, nip);
      }
      !iswc && this.e && this.e.scrollTo({ top: np.sT, behavior: "instant" });
    }
  }
  private async import(np: view, nip: string, iswc = false) {
    const IMP = async (njs: () => Dom | Promise<Dom>) => {
      this.page.value = await njs();
      this.afterImp(np, document.title, nip);
    };
    //
    if (isStr(np.js)) {
      const IMP = await import((location.pathname ? "" : ".") + np.js);
      if ("default" in IMP) {
        this.page.value = await IMP.default({
          ...(iswc && { url: nip }),
        });
        const TTLE = np.title ?? document.title;
        !this.isSheet && (document.title = TTLE);
        this.afterImp(np, TTLE, nip);
      } else {
        this.page.value = dom(
          "div",
          undefined,
          "error: js has no export defaults.",
        );
      }
    } else {
      IMP(np.js);
    }
  }
  sheet(url: string) {
    const [_url, iswc] = this.map.url(url);
    if (_url) {
      this.import(this.map.maps[_url], url, iswc);
    }
    return this;
  }
  reset() {
    this.page.value = dom("div", undefined, "");
  }
  async get(url: string, lastURL?: string) {
    if (lastURL) {
      const [_lasturl, _] = this.map.url(lastURL);
      if (_lasturl && this.e) {
        this.map.maps[_lasturl].sT = this.e.scrollTop ?? 0;
      }
    }
    const [_url, iswc] = this.map.url(url);
    if (_url) {
      this.url = url;
      this.nav.value = url;
      !this.isSheet && $(`[${this.attr}]`)?.all.forEach((cf) => SLC(cf, url));
      //
      await this.import(this.map.maps[_url], url, iswc);
    } else {
      this.page.value = dom("div", undefined, `"${url}" - not found...`);
    }
    return this;
  }
  path(
    path: string,
    {
      file,
      title = "",
      css = "",
    }: {
      file: string | (() => Dom | Promise<Dom>);
      title?: string;
      css?: string;
    },
  ) {
    this.map.path(path, { file, title, css });
    //
    return this;
  }
}
