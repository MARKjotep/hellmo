import { $ } from "./elem";
import { state, Watcher } from "./dom";

/*
-------------------------

-------------------------
*/
export class UI {
  static isDark(...classes: string[]): [() => boolean, (v: boolean) => void] {
    const [is_dark, $is_dark] = state<boolean>(false);

    const RT = $(document.documentElement);

    if (this.isMatchMediaSupported) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (event) => {
          const newColorScheme = event.matches ? "dark" : "light";
          const isDark = newColorScheme === "dark";
          $is_dark(isDark);
          if (isDark) {
            RT.add(...classes);
          } else {
            RT.remove(...classes);
          }
        });
    }

    return [is_dark, $is_dark];
  }
  static get isMatchMediaSupported() {
    return window.matchMedia && typeof window.matchMedia === "function";
  }
}
