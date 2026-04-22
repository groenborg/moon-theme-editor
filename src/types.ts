export type TokenClass = 'c' | 'k' | 's' | 'n' | 'fn' | 't' | 'cn' | 'pr' | 'b' | 'p' | 'v';

export type Token = readonly [text: string, cls: TokenClass];
export type CodeLine = readonly Token[];

export interface Theme {
  name: string;
  background: string;
  foreground: string;
  cursor: string;
  selection: string;
  ansi: readonly string[];
}

export type PresetKey = 'dracula' | 'nord' | 'gruvbox';
export type Presets = Record<PresetKey, Theme>;

export type TokenAnsiValue = number | 'fg';
export type TokenAnsiMap = Record<TokenClass, TokenAnsiValue>;
