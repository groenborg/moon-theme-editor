import { useMemo } from 'react';
import { CODE_LINES, TOKEN_ANSI } from '../data/codeContent';
import type { Theme, TokenClass } from '../types';

interface TerminalProps {
  theme: Theme;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  showCursor: boolean;
}

export default function Terminal({
  theme,
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing,
  showCursor,
}: TerminalProps) {
  const colors = useMemo(() => {
    return {
      bg: theme.background,
      fg: theme.foreground,
      cursor: theme.cursor,
      sel: theme.selection,
      ansi: theme.ansi,
    };
  }, [theme]);

  const tokenColor = (cls: TokenClass): string => {
    const idx = TOKEN_ANSI[cls];
    if (idx === 'fg' || idx == null) return colors.fg;
    return colors.ansi[idx];
  };

  const totalRows = 28;
  const lines = CODE_LINES;
  const cursorRow = 13;
  const cursorCol = 2;

  const padRows: number[] = [];
  for (let i = lines.length; i < totalRows; i++) padRows.push(i);

  const isSelected = (row: number, tokenIdx: number) => row === 19 && tokenIdx === 1;

  return (
    <div
      className="terminal-body"
      style={{
        background: colors.bg,
        color: colors.fg,
        fontFamily,
        fontSize: `${fontSize}px`,
        lineHeight,
        letterSpacing: `${letterSpacing}px`,
      }}
    >
      <div className="terminal-inner">
        <div className="vim-buffer">
          {lines.map((tokens, row) => (
            <div key={row} className="vim-row">
              <span
                className="gutter"
                style={{
                  color: row === cursorRow ? colors.fg : colors.ansi[8],
                  background: row === cursorRow ? `${colors.sel}55` : 'transparent',
                }}
              >
                {String(row + 1).padStart(3, ' ')}
              </span>
              <span
                className="line-content"
                style={{
                  background: row === cursorRow ? `${colors.sel}22` : 'transparent',
                }}
              >
                {tokens.length === 0
                  ? '\u00A0'
                  : tokens.map(([text, cls], ti) => {
                      const sel = isSelected(row, ti);
                      return (
                        <span
                          key={ti}
                          style={{
                            color: tokenColor(cls),
                            background: sel ? colors.sel : 'transparent',
                            fontStyle: cls === 'c' ? 'italic' : 'normal',
                            fontWeight: cls === 'k' || cls === 'cn' ? 600 : 400,
                          }}
                        >
                          {text}
                          {row === cursorRow && ti === cursorCol && showCursor && (
                            <span
                              className="cursor-block"
                              style={{
                                background: colors.cursor,
                                color: colors.bg,
                              }}
                            >
                              {'f'}
                            </span>
                          )}
                        </span>
                      );
                    })}
              </span>
            </div>
          ))}
          {padRows.map((i) => (
            <div key={`pad-${i}`} className="vim-row">
              <span className="gutter" style={{ color: colors.ansi[8] }}>
                ~
              </span>
              <span className="line-content">&nbsp;</span>
            </div>
          ))}
        </div>

        <div
          className="vim-status"
          style={{
            background: colors.ansi[5],
            color: colors.bg,
          }}
        >
          <span className="status-mode">NORMAL</span>
          <span className="status-file">parser.ts</span>
          <span className="status-flex" />
          <span className="status-meta">utf-8</span>
          <span className="status-meta">typescript</span>
          <span className="status-meta">
            {cursorRow + 1}:{cursorCol + 3}
          </span>
          <span className="status-pct" style={{ background: colors.ansi[4], color: colors.bg }}>
            {Math.round(((cursorRow + 1) / totalRows) * 100)}%
          </span>
        </div>

        <div className="vim-cmdline" style={{ color: colors.ansi[8] }}>
          <span>"parser.ts" {lines.length}L, 812B</span>
        </div>
      </div>
    </div>
  );
}
