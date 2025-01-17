import { describe, it, expect } from '@gjsify/unit';

import { AbortSignal as GjsifyAbortSignal } from './abort-signal.js';

// Use build in AbortSignal on Node.js tests and the custom implementation on Gjs
export const AbortSignal = globalThis.AbortSignal || GjsifyAbortSignal;


export const AbortSignalTest = async () => {

	// Credits https://github.com/mysticatea/abort-controller/tree/master/test

	await describe("AbortSignal", async () => {
		await it("should not be callable", async () => {
			expect(() => {
				(AbortSignal as any)()
			}).toThrow(TypeError);
		});
	
		await it("should throw a TypeError when it's constructed directly", async () => {
			expect(() => {
				new AbortSignal()
			}).toThrow(TypeError);
		});
	})
}
