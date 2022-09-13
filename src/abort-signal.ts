import {
    EventTarget,
    getEventAttributeValue,
    setEventAttributeValue,
    Event,
} from "@gjsify/event-target"

// Known Limitation
//   Use `any` because the type of `AbortSignal` in `lib.dom.d.ts` is wrong and
//   to make assignable our `AbortSignal` into that.
//   https://github.com/Microsoft/TSJS-lib-generator/pull/623
type Events = {
    abort: Event<"abort">
}

/**
 * The signal class.
 * @see https://dom.spec.whatwg.org/#abortsignal
 */
// @ts-ignore
export default class GjsifyAbortSignal extends EventTarget<Events> implements AbortSignal {

    // TODO:
    readonly reason: any = undefined;
    // TODO:
    throwIfAborted(): void {
        console.warn('AbortSignal.throwIfAborted')
    }

    get onabort() {
        return getEventAttributeValue(this, "abort");
    }

    set onabort(callback: EventTarget.CallbackFunction<any, any> | null) {
        setEventAttributeValue(this, "abort", callback);
    }

    /**
     * AbortSignal cannot be constructed directly.
     */
    protected constructor(internal: boolean) {
        super();
        if(!internal) {
            throw new TypeError("AbortSignal cannot be constructed directly");
        }
    }

    public static _create() {
        return new this(true);
    }

    /**
     * Returns `true` if this `AbortSignal`'s `AbortController` has signaled to abort, and `false` otherwise.
     */
    public get aborted(): boolean {
        const aborted = abortedFlags.get(this)
        if (typeof aborted !== "boolean") {
            throw new TypeError(
                `Expected 'this' to be an 'AbortSignal' object, but got ${
                    this === null ? "null" : typeof this
                }`,
            )
        }
        return aborted
    }
}

/**
 * Create an AbortSignal object.
 */
export function createAbortSignal(): GjsifyAbortSignal {
    const signal = GjsifyAbortSignal._create();
    // const signal = Object.create(GjsifyAbortSignal.prototype);
    // TODO? EventTarget.call(signal)
    abortedFlags.set(signal, false)
    return signal
}

/**
 * Abort a given signal.
 */
export function abortSignal(signal: GjsifyAbortSignal): void {
    if (abortedFlags.get(signal) !== false) {
        return
    }

    abortedFlags.set(signal, true)
    signal.dispatchEvent<"abort">(new Event("abort") as never) // TODO: Fix type
}

/**
 * Aborted flag for each instances.
 */
const abortedFlags = new WeakMap<GjsifyAbortSignal, boolean>()

// Properties should be enumerable.
Object.defineProperties(GjsifyAbortSignal.prototype, {
    aborted: { enumerable: true },
})

// `toString()` should return `"[object AbortSignal]"`
if (typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol") {
    Object.defineProperty(GjsifyAbortSignal.prototype, Symbol.toStringTag, {
        configurable: true,
        value: "AbortSignal",
    })
}

export { GjsifyAbortSignal as AbortSignal }