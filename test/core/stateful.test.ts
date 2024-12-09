import { describe, expect, it } from "bun:test";
import { State } from "../../src/core/stateful";

/*
-------------------------
State types and getter
-------------------------
*/
describe("State function", () => {
  it("should create a new Stateful instance with primitive value", () => {
    const state = State(42);
    expect(state.value).toBe(42);
  });

  it("should create a new Stateful instance with object value", () => {
    const obj = { foo: "bar" };
    const state = State(obj);
    expect(state.value).toBe(obj);
  });

  it("should create a new Stateful instance with array value", () => {
    const arr = [1, 2, 3];
    const state = State(arr);
    expect(state.value).toBe(arr);
  });

  it("should create a new Stateful instance with null value", () => {
    const state = State(null);
    expect(state.value).toBeNull();
  });

  it("should create a new Stateful instance with undefined value", () => {
    const state = State(undefined);
    expect(state.value).toBeUndefined();
  });

  it("should create a new Stateful instance with boolean value", () => {
    const state = State(true);
    expect(state.value).toBe(true);
  });

  it("should maintain value type after creation", () => {
    const str = "test";
    const state = State(str);
    expect(typeof state.value).toBe("string");
  });
});
describe("State value setter", () => {
  it("should update primitive value and dispatch event", () => {
    const state = State(1);
    let eventFired = false;
    let eventValue;

    state.addEventListener("updated", (e: Event) => {
      eventFired = true;
      eventValue = (e as CustomEvent).detail;
    });

    state.value = 2;

    expect(state.value).toBe(2);
    expect(eventFired).toBe(true);
    expect(eventValue).toBe(2);
  });

  it("should not dispatch event when setting same primitive value", () => {
    const state = State(1);
    let eventFired = false;

    state.addEventListener("updated", () => {
      eventFired = true;
    });

    state.value = 1;

    expect(eventFired).toBe(false);
  });

  it("should update object value and dispatch event when properties change", () => {
    const state = State({ name: "John", age: 30 });
    let eventFired = false;
    let eventValue;

    state.addEventListener("updated", (e: Event) => {
      eventFired = true;
      eventValue = (e as CustomEvent).detail;
    });

    state.value = { name: "John", age: 31 };

    expect(state.value).toEqual({ name: "John", age: 31 });
    expect(eventFired).toBe(true);
    expect(eventValue).toEqual({ name: "John", age: 31 });
  });

  it("should not dispatch event when setting identical object value", () => {
    const initialObj = { name: "John", age: 30 };
    const state = State(initialObj);
    let eventFired = false;

    state.addEventListener("updated", () => {
      eventFired = true;
    });

    state.value = { name: "John", age: 30 };

    expect(eventFired).toBe(false);
  });

  it("should handle nested object updates", () => {
    const state = State({
      user: { name: "John", settings: { theme: "dark" } },
    });
    let eventFired = false;
    let eventValue;

    state.addEventListener("updated", (e: Event) => {
      eventFired = true;
      eventValue = (e as CustomEvent).detail;
    });

    state.value = { user: { name: "John", settings: { theme: "light" } } };

    expect(state.value.user.settings.theme).toBe("light");
    expect(eventFired).toBe(true);
    expect(eventValue.user.settings.theme).toBe("light");
  });
});
