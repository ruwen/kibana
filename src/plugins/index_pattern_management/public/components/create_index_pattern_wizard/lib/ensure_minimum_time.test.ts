/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ensureMinimumTime } from './ensure_minimum_time';

describe('ensureMinimumTime', () => {
  it('resolves single promise', async (done) => {
    const promiseA = new Promise((resolve) => resolve('a'));
    const a = await ensureMinimumTime(promiseA, 0);
    expect(a).toBe('a');
    done();
  });

  it('resolves multiple promises', async (done) => {
    const promiseA = new Promise((resolve) => resolve('a'));
    const promiseB = new Promise((resolve) => resolve('b'));
    const [a, b] = await ensureMinimumTime([promiseA, promiseB], 0);
    expect(a).toBe('a');
    expect(b).toBe('b');
    done();
  });

  it('resolves in the amount of time provided, at minimum', async (done) => {
    const startTime = new Date().getTime();
    const promise = new Promise<void>((resolve) => resolve());
    await ensureMinimumTime(promise, 100);
    const endTime = new Date().getTime();
    expect(endTime - startTime).toBeGreaterThanOrEqual(100);
    done();
  });
});
