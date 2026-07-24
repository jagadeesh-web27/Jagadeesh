import React, { useState, useEffect, useRef, useCallback } from "react";
import "../Styles/accessibility.css";

/* ─── Default preferences ─────────────────────────────────────── */
const DEFAULTS = {
  theme: "dark",          // "dark" | "light"
  fontSize: 0,            // offset in px: -2 | 0 | +2 | +4
  highContrast: false,
  dyslexiaFont: false,
  reduceMotion: false,
  highlightLinks: false,
  textSpacing: false,
  largePointer: false,
};

const STORAGE_KEY = "jb_a11y_prefs";

/* ─── Helpers ──────────────────────────────────────────────────── */
function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch { /* quota exceeded — ignore */ }
}

function applyPrefs(prefs) {
  const root = document.documentElement;
  const body = document.body;

  /* ── Theme ── */
  root.setAttribute("data-theme", prefs.theme);

  /* ── Font size ── */
  const base = 16 + prefs.fontSize;
  root.style.fontSize = `${base}px`;

  /* ── High contrast ── */
  root.classList.toggle("a11y-high-contrast", prefs.highContrast);

  /* ── Dyslexia font ── */
  root.classList.toggle("a11y-dyslexia", prefs.dyslexiaFont);

  /* ── Reduce motion ── */
  root.classList.toggle("a11y-reduce-motion", prefs.reduceMotion);

  /* ── Highlight links ── */
  root.classList.toggle("a11y-highlight-links", prefs.highlightLinks);

  /* ── Text spacing ── */
  root.classList.toggle("a11y-text-spacing", prefs.textSpacing);

  /* ── Large pointer ── */
  body.classList.toggle("a11y-large-pointer", prefs.largePointer);
}

/* ─── Widget SVG Icons ─────────────────────────────────────────── */
const IconA11y = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="5" r="2" fill="currentColor"/>
    <path d="M12 8c-4 0-7 1.5-7 1.5l1 2s2.5-1 6-1 6 1 6 1l1-2S16 8 12 8z" fill="currentColor"/>
    <path d="M8.5 11.5l-2 7h2l1.5-4 2 2v5h2v-5l2-2 1.5 4h2l-2-7" fill="currentColor"/>
  </svg>
);

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const IconSun = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
  </svg>
);

const IconFontUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <text x="2" y="16" fontSize="13" fontWeight="700" fill="currentColor">A</text>
    <text x="12" y="20" fontSize="18" fontWeight="700" fill="currentColor">A</text>
    <path d="M19 4v7M15.5 7.5L19 4l3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconFontDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <text x="2" y="16" fontSize="13" fontWeight="700" fill="currentColor">A</text>
    <text x="12" y="20" fontSize="18" fontWeight="700" fill="currentColor">A</text>
    <path d="M19 11V4M15.5 7.5L19 11l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconReset = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 12a9 9 0 109-9H9M9 3L3 9m6-6L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── Toggle Row component ─────────────────────────────────────── */
function ToggleRow({ id, label, icon, checked, onChange, description }) {
  return (
    <div className="a11y-row">
      <span className="a11y-row__icon" aria-hidden="true">{icon}</span>
      <label htmlFor={id} className="a11y-row__label">
        {label}
        {description && <span className="a11y-row__desc">{description}</span>}
      </label>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        className={`a11y-switch ${checked ? "a11y-switch--on" : ""}`}
        onClick={() => onChange(!checked)}
        aria-label={`${label}: ${checked ? "on" : "off"}`}
      >
        <span className="a11y-switch__thumb" />
        <span className="sr-only">{checked ? "On" : "Off"}</span>
      </button>
    </div>
  );
}

/* ─── Main Widget ──────────────────────────────────────────────── */
export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState(loadPrefs);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  /* Apply whenever prefs change */
  useEffect(() => {
    applyPrefs(prefs);
    savePrefs(prefs);
  }, [prefs]);

  /* Apply on first mount (from localStorage) */
  useEffect(() => {
    applyPrefs(prefs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) &&
          triggerRef.current && !triggerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  /* Focus first focusable element when panel opens */
  useEffect(() => {
    if (open && panelRef.current) {
      const firstFocusable = panelRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [open]);

  const update = useCallback((key, value) => {
    setPrefs((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setPrefs({ ...DEFAULTS });
  }, []);

  const fontLevel = prefs.fontSize; // -2 | 0 | +2 | +4
  const canDecrease = fontLevel > -2;
  const canIncrease = fontLevel < 4;

  return (
    <div className="a11y-widget">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        id="accessibility-toggle-btn"
        className={`a11y-trigger ${open ? "a11y-trigger--open" : ""}`}
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        title="Accessibility Options"
      >
        <IconA11y />
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id="accessibility-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Accessibility settings"
          className="a11y-panel"
        >
          {/* Panel Header */}
          <div className="a11y-panel__header">
            <div className="a11y-panel__title-group">
              <span className="a11y-panel__icon" aria-hidden="true">♿</span>
              <h2 className="a11y-panel__title">Accessibility</h2>
            </div>
            <button
              className="a11y-panel__close"
              aria-label="Close accessibility panel"
              onClick={() => { setOpen(false); triggerRef.current?.focus(); }}
            >
              <IconClose />
            </button>
          </div>

          <p className="a11y-panel__subtitle">WCAG 2.2 AA Compliant Settings</p>

          {/* ── Section: Colour & Theme ── */}
          <section className="a11y-section" aria-labelledby="a11y-color-heading">
            <h3 id="a11y-color-heading" className="a11y-section__heading">Colour &amp; Theme</h3>

            {/* Theme toggle as two buttons */}
            <div className="a11y-theme-row">
              <button
                id="theme-dark-btn"
                className={`a11y-theme-btn ${prefs.theme === "dark" ? "a11y-theme-btn--active" : ""}`}
                aria-pressed={prefs.theme === "dark"}
                onClick={() => update("theme", "dark")}
              >
                <IconMoon /> Dark Mode
              </button>
              <button
                id="theme-light-btn"
                className={`a11y-theme-btn ${prefs.theme === "light" ? "a11y-theme-btn--active" : ""}`}
                aria-pressed={prefs.theme === "light"}
                onClick={() => update("theme", "light")}
              >
                <IconSun /> Light Mode
              </button>
            </div>

            <ToggleRow
              id="high-contrast-switch"
              label="High Contrast"
              icon="◑"
              description="Increases contrast beyond AA to AAA"
              checked={prefs.highContrast}
              onChange={(v) => update("highContrast", v)}
            />
          </section>

          {/* ── Section: Text ── */}
          <section className="a11y-section" aria-labelledby="a11y-text-heading">
            <h3 id="a11y-text-heading" className="a11y-section__heading">Text</h3>

            {/* Font Size */}
            <div className="a11y-font-row">
              <span className="a11y-row__icon" aria-hidden="true">T</span>
              <span className="a11y-font-label">Font Size</span>
              <div className="a11y-font-controls">
                <button
                  id="font-decrease-btn"
                  className="a11y-font-btn"
                  aria-label={`Decrease font size${!canDecrease ? " (minimum reached)" : ""}`}
                  disabled={!canDecrease}
                  onClick={() => update("fontSize", fontLevel - 2)}
                >
                  <IconFontDown />
                </button>
                <span
                  className="a11y-font-level"
                  aria-live="polite"
                  aria-label={`Current font size adjustment: ${fontLevel >= 0 ? "+" : ""}${fontLevel} px`}
                >
                  {fontLevel >= 0 ? "+" : ""}{fontLevel}px
                </span>
                <button
                  id="font-increase-btn"
                  className="a11y-font-btn"
                  aria-label={`Increase font size${!canIncrease ? " (maximum reached)" : ""}`}
                  disabled={!canIncrease}
                  onClick={() => update("fontSize", fontLevel + 2)}
                >
                  <IconFontUp />
                </button>
              </div>
            </div>

            <ToggleRow
              id="dyslexia-switch"
              label="Dyslexia-Friendly Font"
              icon="Aa"
              description="Uses OpenDyslexic typeface"
              checked={prefs.dyslexiaFont}
              onChange={(v) => update("dyslexiaFont", v)}
            />

            <ToggleRow
              id="text-spacing-switch"
              label="Increase Text Spacing"
              icon="⇔"
              description="Extra letter & word spacing"
              checked={prefs.textSpacing}
              onChange={(v) => update("textSpacing", v)}
            />
          </section>

          {/* ── Section: Navigation & Motion ── */}
          <section className="a11y-section" aria-labelledby="a11y-nav-heading">
            <h3 id="a11y-nav-heading" className="a11y-section__heading">Navigation &amp; Motion</h3>

            <ToggleRow
              id="highlight-links-switch"
              label="Highlight Links"
              icon="🔗"
              description="Underline and box all interactive links"
              checked={prefs.highlightLinks}
              onChange={(v) => update("highlightLinks", v)}
            />

            <ToggleRow
              id="reduce-motion-switch"
              label="Reduce Animations"
              icon="⏸"
              description="Pauses all non-essential animations"
              checked={prefs.reduceMotion}
              onChange={(v) => update("reduceMotion", v)}
            />

            <ToggleRow
              id="large-pointer-switch"
              label="Large Cursor"
              icon="↖"
              description="Enlarges the mouse pointer"
              checked={prefs.largePointer}
              onChange={(v) => update("largePointer", v)}
            />
          </section>

          {/* Reset */}
          <button
            id="a11y-reset-btn"
            className="a11y-reset-btn"
            onClick={reset}
            aria-label="Reset all accessibility settings to defaults"
          >
            <IconReset /> Reset to Defaults
          </button>

          {/* WCAG badge */}
          <p className="a11y-wcag-note">
            This toolbar meets <strong>WCAG 2.2 AA</strong> standards.
            Settings are saved automatically.
          </p>
        </div>
      )}
    </div>
  );
}
