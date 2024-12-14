import { $$, idm, keyInMap, keyInMapArray, Mapper, obj, oItems } from "./@";
import { Elements } from "./attr";
import { CATT } from "./catt";
import { getElementById, Stateful, ElementIds } from "./stateful";

const listener = (E: Elements, type: string, fn: (...arg: any) => void) => {
  E.addEventListener(type, fn);
  return () => {
    E.removeEventListener(type, fn);
  };
};

type winState = obj<(e?: HTMLElement, t?: EventTarget | null) => void>;
type watchType = [(...args: any[]) => void, Stateful<any>[], boolean?];

export class OZ {
  private events: Mapper<string, Mapper<string, (...arg: any) => any>> =
    new Mapper();
  private states: Mapper<string, ((id: string) => () => void)[]> = new Mapper();
  private winStates: Mapper<string, winState> = new Mapper();
  private resetST: Mapper<string, (() => void)[]> = new Mapper();
  private resetEV: Mapper<string, (() => void)[]> = new Mapper();
  constructor() {}
  get keys() {
    return [...new Set([...this.states.keys(), ...this.events.keys()])];
  }
  set(catt: CATT) {
    const { id, events, states } = catt;
    if (id) {
      if (events.size) this.events.set(id, events);
      if (states.length) this.states.set(id, states);
    }
    return this;
  }
  push(_OZ: this) {
    _OZ.events.forEach((event, id) => {
      event.forEach((fn, type) => {
        keyInMap<Mapper<string, (...arg: any) => any>>(id, this.events).set(
          type,
          fn,
        );
      });
    });
    _OZ.states.forEach((states, id) => {
      keyInMapArray<((id: string) => () => void)[]>(id, this.states).push(
        ...states,
      );
    });

    return this;
  }
  get stage() {
    // state events;
    this.events.forEach((ev, id) => {
      this.events.delete(id);
      //
      const E = getElementById(id);
      if (!E) {
        this.events.delete(id);
        return;
      }
      ev.forEach((event, type) => {
        switch (type) {
          case "ready":
            event.apply(E);
            break;
          case "resize":
          case "unload":
          case "popstate":
            this.winStates.set(id, { [type]: event });
            break;
          case "watch":
            const [cb, statefuls, ini] = event.apply(E) as watchType;
            const smap = () => statefuls.map((st) => st.value);

            const handler = () => {
              cb(...smap());
            };

            if (ini) handler();
            statefuls.forEach((st) => {
              keyInMapArray<((id: string) => () => void)[]>(
                id,
                this.states,
              ).push(st.call(handler, id + "_watch"));
            });

            break;
          default:
            keyInMapArray<(() => void)[]>(id, this.resetEV).push(
              listener(E, type, event),
            );
        }
      });
    });

    // stage states

    this.states.forEach((fn, id) => {
      this.states.delete(id);
      fn.forEach((f) => {
        keyInMapArray<(() => void)[]>(id, this.resetST).push(f(id));
      });
    });

    // Reset the values

    return this;
  }
  // call once
  get start() {
    this.stage;
    const _W = window;
    const handleEvent = (
      event: UIEvent | BeforeUnloadEvent | PopStateEvent,
      eventType: "resize" | "unload" | "popstate",
    ) => {
      this.winStates.forEach((val, key) => {
        if (val[eventType]) {
          const D = getElementById(key);
          if (D) {
            val[eventType].call(D, event.target as any);
          } else {
            this.winStates.delete(key);
          }
        }
      });
    };
    _W.addEventListener("resize", (e) => handleEvent(e, "resize"));
    _W.addEventListener("beforeunload", (e) => handleEvent(e, "unload"));
    _W.addEventListener("popstate", (e) => handleEvent(e, "popstate"));

    return this;
  }
  reset(id: string[]) {
    id.forEach((st) => {
      this.winStates.delete(st);
      this.resetST.get(st)?.forEach((f) => {
        f();
      });
      this.resetEV.get(st)?.forEach((f) => {
        f();
      });

      // delete after reset
      this.resetST.delete(st);
      this.resetEV.delete(st);
    });

    // check the elements that are not connected??
    return this;
  }
  /*
  -------------------------
  reset - push - stage
  -------------------------
  */
  RPS(oz?: this) {
    if (oz) {
      const zk = oz.keys;
      if (zk.length) this.reset(zk).push(oz).stage;
      //
      const ids: string[] = [];
      ElementIds.forEach((e, id) => {
        if (!e.isConnected) {
          ids.push(id);
        }
      });
      this.reset(ids);
    }
    return this;
  }
}
