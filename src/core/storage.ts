import { obj, oItems } from "./@";

const eventSources: obj<EventSource> = {};
const eventListener: obj<obj<((a: MessageEvent) => void)[]>> = {};
class eStream {
  stream: EventSource;
  url: string;
  constructor(eurl: string, withCredentials: boolean) {
    this.url = eurl;
    if (eurl in eventSources) {
      this.stream = eventSources[eurl];
    } else {
      this.stream = new EventSource(eurl, {
        withCredentials: withCredentials,
      });
      eventSources[eurl] = this.stream;
      eventListener[this.url] = {};
    }
  }
  on(event: obj<(a: MessageEvent) => void>) {
    const strm = this.stream;
    oItems(event).forEach(([kk, vv]) => {
      if (kk in eventListener[this.url]) {
        eventListener[this.url][kk].forEach((lt) => {
          this.stream.removeEventListener(kk, lt);
        });
        eventListener[this.url][kk] = [];
      }
      // Then
      strm.addEventListener(kk, vv);
      if (!(kk in eventListener[this.url])) {
        eventListener[this.url][kk] = [];
      }
      eventListener[this.url][kk].push(vv);
    });
    return this;
  }
}
function eventStream(url: string, withCredentials = true) {
  return new eStream(url, withCredentials);
}
function is_number(value: any) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}
class __I {
  constructor(public value: any) {}
  get str(): string | null {
    const stt = String(this.value).toString();
    return stt == "null" ? null : String(this.value).toString();
  }
  get int(): number | null {
    if (is_number(this.value)) {
      return parseInt(this.value);
    } else {
      return null;
    }
  }
  get float(): number | null {
    if (is_number(this.value)) {
      return parseFloat(this.value);
    } else {
      return null;
    }
  }
  get bool(): boolean | null {
    if (this.value === "true") {
      return true;
    } else if (this.value == "false") {
      return false;
    } else {
      return null;
    }
  }
  get json(): any | null {
    if (this.value) {
      return JSON.parse(this.value);
    }
    return null;
  }
}
class _loc {
  key: string;
  func: (() => any) | null;
  storage: Storage;
  constructor(
    item: obj<() => any> | string,
    _type: "local" | "session" = "local",
  ) {
    if (typeof item == "object") {
      const [k, v] = oItems(item)[0];
      this.key = k;
      this.func = v;
    } else {
      this.key = item;
      this.func = null;
    }
    this.storage = _type == "local" ? localStorage : sessionStorage;
  }
  get as() {
    return new __I(this.storage.getItem(this.key));
  }
  get value(): string | null {
    return this.storage.getItem(this.key);
  }
  get save() {
    if (this.func) {
      this.set = this.func();
    }

    return;
  }
  set set(val: any) {
    if (typeof val == "object") {
      this.storage.setItem(this.key, JSON.stringify(val));
    } else {
      this.storage.setItem(this.key, String(val));
    }
  }
  get remove() {
    this.storage.removeItem(this.key);
    return;
  }
}
/**
 * Local Storage
 */
const local = {
  get: (item: obj<() => any> | string) => new _loc(item),
};

/**
 * Session Storage
 */
const session = {
  get: (item: obj<() => any> | string) => new _loc(item, "session"),
};

/*
-------------------------

-------------------------
*/

export { eventStream, local, session };
