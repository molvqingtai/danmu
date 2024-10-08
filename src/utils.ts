import { raf, once, execMathExpression } from 'aidly';

export const INTERNAL_FLAG = Symbol();

export const ids = {
  danmu: 1,
  bridge: 1,
  runtime: 1,
  container: 1,
};

export const nextFrame = (fn: FrameRequestCallback) => raf(() => raf(fn));

export const randomIdx = (founds: Set<number>, rows: number): number => {
  const n = Math.floor(Math.random() * rows);
  return founds.has(n) ? randomIdx(founds, rows) : n;
};

export const toNumber = (val: string, all: number) => {
  return execMathExpression(val, {
    verify: true,
    units: {
      px: (n) => n,
      '%': (n) => (Number(n) / 100) * all,
    },
    actuator(value) {
      return +value;
    },
  });
};

export const whenTransitionEnds = (node: HTMLElement) => {
  return new Promise<void>((resolve) => {
    const onEnd = once(() => {
      node.removeEventListener('transitionend', onEnd);
      resolve();
    });
    node.addEventListener('transitionend', onEnd);
  });
};
