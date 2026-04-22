import { useEffect, useMemo, useRef, useState } from 'react';
import { ANSI_NAMES, PRESETS } from '../data/themes';
import { toGhostty, toIterm } from '../lib/export';
import type { PresetKey, Theme } from '../types';

interface SwatchProps {
  color: string;
  onChange: (next: string) => void;
  label: string;
  size?: number;
}

function Swatch({ color, onChange, label, size = 28 }: SwatchProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <label className="swatch-wrap" title={label}>
      <span
        className="swatch"
        style={{ background: color, width: size, height: size }}
        onClick={() => ref.current?.click()}
      />
      <input
        ref={ref}
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="swatch-input"
      />
    </label>
  );
}

interface HexFieldProps {
  color: string;
  onChange: (next: string) => void;
}

function HexField({ color, onChange }: HexFieldProps) {
  const [local, setLocal] = useState(color);
  useEffect(() => {
    setLocal(color);
  }, [color]);
  return (
    <input
      className="hex-field"
      value={local}
      onChange={(e) => {
        setLocal(e.target.value);
        if (/^#([0-9a-f]{6}|[0-9a-f]{3})$/i.test(e.target.value)) onChange(e.target.value);
      }}
      spellCheck={false}
    />
  );
}

interface ColorRowProps {
  label: string;
  color: string;
  onChange: (next: string) => void;
}

function ColorRow({ label, color, onChange }: ColorRowProps) {
  return (
    <div className="color-row">
      <Swatch color={color} onChange={onChange} label={label} />
      <div className="color-row-meta">
        <span className="color-row-label">{label}</span>
        <HexField color={color} onChange={onChange} />
      </div>
    </div>
  );
}

interface AnsiGridProps {
  ansi: readonly string[];
  onChange: (next: string[]) => void;
}

function AnsiGrid({ ansi, onChange }: AnsiGridProps) {
  return (
    <div className="ansi-grid">
      {ansi.map((c, i) => (
        <div key={i} className="ansi-cell">
          <Swatch
            color={c}
            size={36}
            onChange={(next) => {
              const copy = [...ansi];
              copy[i] = next;
              onChange(copy);
            }}
            label={ANSI_NAMES[i]}
          />
          <div className="ansi-meta">
            <div className="ansi-name">
              {i}. {ANSI_NAMES[i]}
            </div>
            <HexField
              color={c}
              onChange={(next) => {
                const copy = [...ansi];
                copy[i] = next;
                onChange(copy);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`section ${open ? 'open' : ''}`}>
      <button type="button" className="section-head" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <span className="chev">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
}

interface ExportModalProps {
  theme: Theme;
  onClose: () => void;
}

type ExportTab = 'json' | 'ghostty' | 'iterm';

function ExportModal({ theme, onClose }: ExportModalProps) {
  const [tab, setTab] = useState<ExportTab>('json');
  const text = useMemo(() => {
    if (tab === 'json') return JSON.stringify(theme, null, 2);
    if (tab === 'ghostty') return toGhostty(theme);
    if (tab === 'iterm') return toIterm(theme);
    return '';
  }, [tab, theme]);
  const [copied, setCopied] = useState(false);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-title">Export theme — {theme.name}</div>
          <button type="button" className="x-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-tabs">
          {(
            [
              ['json', 'theme.json'],
              ['ghostty', 'ghostty/config'],
              ['iterm', '.itermcolors'],
            ] as const
          ).map(([k, label]) => (
            <button
              type="button"
              key={k}
              className={`tab ${tab === k ? 'active' : ''}`}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </div>
        <pre className="export-pre">{text}</pre>
        <div className="modal-foot">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              navigator.clipboard?.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const ext = tab === 'iterm' ? 'itermcolors' : tab === 'ghostty' ? 'conf' : 'json';
              const blob = new Blob([text], { type: 'text/plain' });
              const a = document.createElement('a');
              a.href = URL.createObjectURL(blob);
              a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
              a.click();
            }}
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

interface DesignerPanelProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  fontFamily: string;
  setFontFamily: (f: string) => void;
  fontSize: number;
  setFontSize: (n: number) => void;
  presetKey: PresetKey;
  setPresetKey: (k: PresetKey) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

interface DragOffset {
  dx: number;
  dy: number;
}

export default function DesignerPanel({
  theme,
  setTheme,
  fontFamily,
  setFontFamily,
  fontSize,
  setFontSize,
  presetKey,
  setPresetKey,
  collapsed,
  setCollapsed,
}: DesignerPanelProps) {
  const [showExport, setShowExport] = useState(false);
  const [dragState, setDragState] = useState({ x: 32, y: 32 });
  const [dragging, setDragging] = useState<DragOffset | null>(null);

  useEffect(() => {
    setDragState({ x: window.innerWidth - 420 - 24, y: 80 });
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.panel-drag')) {
      setDragging({ dx: e.clientX - dragState.x, dy: e.clientY - dragState.y });
    }
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent) =>
      setDragState({
        x: Math.max(8, Math.min(window.innerWidth - 40, e.clientX - dragging.dx)),
        y: Math.max(8, Math.min(window.innerHeight - 40, e.clientY - dragging.dy)),
      });
    const up = () => setDragging(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, [dragging]);

  const update = (patch: Partial<Theme>) => setTheme({ ...theme, ...patch });

  if (collapsed) {
    return (
      <div
        className="panel-fab"
        style={{ left: dragState.x, top: dragState.y }}
        onClick={() => setCollapsed(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div
        className="panel"
        style={{ left: dragState.x, top: dragState.y }}
        onMouseDown={onMouseDown}
      >
        <div className="panel-head panel-drag">
          <div className="panel-title">
            <span className="dot" />
            Theme Designer
          </div>
          <div className="panel-head-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowExport(true)}
              title="Export"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
              </svg>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setCollapsed(true)}
              title="Collapse"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="panel-body">
          <Section title="Presets" defaultOpen>
            <div className="presets">
              {(Object.entries(PRESETS) as [PresetKey, Theme][]).map(([k, p]) => (
                <button
                  type="button"
                  key={k}
                  className={`preset ${presetKey === k ? 'active' : ''}`}
                  onClick={() => {
                    setPresetKey(k);
                    setTheme(p);
                  }}
                >
                  <div className="preset-swatches">
                    <span style={{ background: p.background }} />
                    <span style={{ background: p.ansi[1] }} />
                    <span style={{ background: p.ansi[2] }} />
                    <span style={{ background: p.ansi[3] }} />
                    <span style={{ background: p.ansi[4] }} />
                    <span style={{ background: p.ansi[5] }} />
                    <span style={{ background: p.ansi[6] }} />
                    <span style={{ background: p.foreground }} />
                  </div>
                  <span className="preset-name">{p.name}</span>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Interface">
            <ColorRow
              label="background"
              color={theme.background}
              onChange={(v) => update({ background: v })}
            />
            <ColorRow
              label="foreground"
              color={theme.foreground}
              onChange={(v) => update({ foreground: v })}
            />
            <ColorRow label="cursor" color={theme.cursor} onChange={(v) => update({ cursor: v })} />
            <ColorRow
              label="selection"
              color={theme.selection}
              onChange={(v) => update({ selection: v })}
            />
          </Section>

          <Section title="ANSI 16 palette">
            <AnsiGrid ansi={theme.ansi} onChange={(ansi) => update({ ansi })} />
          </Section>

          <Section title="Typography">
            <div className="type-row">
              <label className="field-label">Font family</label>
              <div className="segmented">
                {['JetBrains Mono', 'Fira Code'].map((f) => (
                  <button
                    type="button"
                    key={f}
                    className={`seg ${fontFamily === f ? 'active' : ''}`}
                    onClick={() => setFontFamily(f)}
                    style={{ fontFamily: `'${f}', monospace` }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="type-row">
              <label className="field-label">Size · {fontSize}px</label>
              <input
                type="range"
                min={11}
                max={20}
                step={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number.parseInt(e.target.value))}
              />
            </div>
          </Section>
        </div>
      </div>
      {showExport && <ExportModal theme={theme} onClose={() => setShowExport(false)} />}
    </>
  );
}
