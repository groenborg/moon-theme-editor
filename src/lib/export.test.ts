import { describe, expect, it } from 'vitest';
import { PRESETS } from '../data/themes';
import type { PresetKey } from '../types';
import { toGhostty, toIterm } from './export';

const keys = Object.keys(PRESETS) as PresetKey[];

describe('toGhostty', () => {
  for (const key of keys) {
    it(`renders ${key}`, () => {
      expect(toGhostty(PRESETS[key])).toMatchSnapshot();
    });
  }
});

describe('toIterm', () => {
  for (const key of keys) {
    it(`renders ${key}`, () => {
      expect(toIterm(PRESETS[key])).toMatchSnapshot();
    });
  }
});
