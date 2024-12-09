import { $ } from "./elem";
import { $$, local } from "..";
import { obj, Singleton } from "./@";
import { State, Stateful } from "./stateful";

/*
-------------------------

-------------------------
*/

@Singleton
export class ColorScheme {
  state: Stateful<boolean>;
  toggle: (isDark: boolean) => void;
  click: (e: Event) => void;
  constructor({
    toggle = [],
    initialState = false,
  }: {
    toggle?: string[];
    initialState?: boolean;
  } = {}) {
    this.state = State<boolean>(initialState);
    const RT = $(document.body);
    const LOCAL_SCHEME = local.get("LOCAL_SCHEME");
    const SYSTEM_COLOR_SCHEME = this.isDark;
    const SCHEME_BOOL = LOCAL_SCHEME.as.bool;
    const LOCAL_DARK = local.get({ IS_DARK: () => this.state.value });

    this.toggle = (isDark: boolean) => {
      isDark ? RT.add(...toggle) : RT.remove(...toggle);
    };

    const ST = this.state;
    const tog = this.toggle;
    //
    this.click = function () {
      const setST = ST.value;
      ST.value = setST;
      tog(setST);
      LOCAL_DARK.save;
    };

    if (SCHEME_BOOL != undefined && SCHEME_BOOL !== SYSTEM_COLOR_SCHEME) {
      this.state.value = !SCHEME_BOOL;
      LOCAL_DARK.save;
      LOCAL_SCHEME.set = SYSTEM_COLOR_SCHEME;
    }

    if (LOCAL_DARK.as.bool) this.state.value = LOCAL_DARK.as.bool;

    this.toggle(this.state.value);

    if (this.isMatchMediaSupported) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          const newColorScheme = event.matches ? "dark" : "light";
          const isDark = newColorScheme === "dark";
          this.state.value = isDark;
          LOCAL_SCHEME.set = isDark;
          this.toggle(isDark);
        });
    }
  }
  get isMatchMediaSupported() {
    return window.matchMedia && typeof window.matchMedia === "function";
  }
  get isDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export class UI {}

/*
-------------------------
What if, all functions will have listener..
-------------------------
*/
