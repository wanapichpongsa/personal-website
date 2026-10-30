"use client";

import { useEffect, useRef, useState, type PointerEvent, type SelectHTMLAttributes } from "react";

/**
 * A scripted demo of parse's Create flow: drop a paper form's xlsx, watch the AI "build" it,
 * get a working form. Nothing is uploaded or parsed — the steps and fields are canned.
 */

type Field =
  | { kind: "date" | "text"; label: string }
  | { kind: "number"; label: string; unit?: string }
  | { kind: "select"; label: string; options: string[] }
  | { kind: "passFail"; label: string };

const DEPARTMENTS = ["QC", "QA", "Production"];

const SAMPLE_FILE = "FM-PD-041 Daily Production Log.xlsx";

const FIELDS: Field[] = [
  { kind: "date", label: "Production date" },
  { kind: "select", label: "Shift", options: ["Morning", "Afternoon", "Night"] },
  { kind: "select", label: "Line", options: ["Line 1", "Line 2", "Line 3"] },
  { kind: "text", label: "Product code" },
  { kind: "number", label: "Output", unit: "cartons" },
  { kind: "number", label: "Rejects", unit: "cartons" },
  { kind: "passFail", label: "Metal detector check" },
  { kind: "text", label: "Checked by" },
];

const STEPS = [
  "Reading the workbook…",
  "Finding the fields on the paper form…",
  "Matching fields to input types…",
  "Writing the form code…",
  "Drawing a preview…",
  "Opening a pull request for review…",
];

const STEP_MS = 1300;

type Phase = "upload" | "working" | "done";

export function CreateDemo() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [department, setDepartment] = useState(DEPARTMENTS[2]);
  const [file, setFile] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const [step, setStep] = useState(0);
  const dropZone = useRef<HTMLDivElement>(null);

  // Advance one step at a time while working; the preview fills in from step 2 onward.
  useEffect(() => {
    if (phase !== "working") return;
    const t = setTimeout(() => (step + 1 < STEPS.length ? setStep(step + 1) : setPhase("done")), STEP_MS);
    return () => clearTimeout(t);
  }, [phase, step]);

  const overDropZone = (x: number, y: number) => {
    const r = dropZone.current?.getBoundingClientRect();
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  };

  const start = () => {
    setStep(0);
    setPhase("working");
  };

  const reset = () => {
    setPhase("upload");
    setFile(null);
    setStep(0);
  };

  // Fields "discovered" so far: none while reading, then spread across the remaining steps.
  const shown = phase === "done" ? FIELDS.length : Math.max(0, Math.round(((step - 1) / (STEPS.length - 2)) * FIELDS.length));
  const title = (file ?? SAMPLE_FILE).replace(/\.xlsx?$/i, "");

  return (
    <div className="space-y-4">
      {phase === "upload" && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-muted">Department</span>
            <Select value={department} onChange={(e) => setDepartment(e.target.value)} className="bg-background">
              {DEPARTMENTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </Select>
          </label>

          {!file && (
            <div className="flex items-center gap-3">
              <FileToken
                name={SAMPLE_FILE}
                onMove={(x, y) => setOver(overDropZone(x, y))}
                onDrop={(x, y, tapped) => {
                  setOver(false);
                  if (tapped || overDropZone(x, y)) setFile(SAMPLE_FILE);
                }}
              />
              <p className="animate-glow text-sm">Drag this file into the box ↓</p>
            </div>
          )}

          <div
            ref={dropZone}
            className={[
              "grid place-items-center gap-1 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-colors",
              over ? "border-emerald-500/60 bg-emerald-500/5" : file ? "border-emerald-500/40" : "border-foreground/15",
            ].join(" ")}
          >
            {file ? (
              <>
                <XlsxIcon className="animate-rise h-12" />
                <p className="mt-2 font-medium break-all">{file}</p>
                <button onClick={() => setFile(null)} className="text-sm text-muted hover:text-foreground">
                  Remove
                </button>
              </>
            ) : (
              <>
                <SheetIcon />
                <p className="mt-2">{over ? "Let go to upload" : "Drop a paper form\u2019s .xlsx here"}</p>
                <p className="text-sm text-muted">The spreadsheet your team already prints</p>
              </>
            )}
          </div>

          <button
            onClick={start}
            disabled={!file}
            className="rounded-full bg-foreground px-5 py-2.5 text-background transition-opacity disabled:opacity-30"
          >
            Create form
          </button>
        </div>
      )}

      {phase === "working" && (
        <div className="flex items-start gap-3">
          <span className="mt-1 size-5 shrink-0 animate-spin rounded-full border-2 border-foreground/15 border-t-foreground" />
          <div className="min-w-0 flex-1">
            <p>AI is coding the form…</p>
            <p className="text-sm text-muted">{STEPS[step]}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-foreground/10">
              <div className="h-full rounded-full bg-foreground transition-[width] duration-700" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>
          <button onClick={reset} className="text-sm text-muted hover:text-foreground">
            Cancel
          </button>
        </div>
      )}

      {phase === "done" && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-500 text-white">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="flex-1">Form is ready — an engineer reviews it before it goes live.</p>
          <button onClick={reset} className="text-sm text-muted hover:text-foreground">
            Start over
          </button>
        </div>
      )}

      {phase !== "upload" && <Preview title={title} department={department} fields={FIELDS.slice(0, shown)} live={phase === "done"} />}
    </div>
  );
}

function Preview({ title, department, fields, live }: { title: string; department: string; fields: Field[]; live: boolean }) {
  const [saved, setSaved] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(true);
      }}
      className="rounded-2xl bg-background p-4 ring-1 ring-foreground/10 sm:p-5"
    >
      <p className="text-xs uppercase tracking-wide text-muted">{department}</p>
      <p className="font-medium">{title}</p>
      {!live && <p className="text-sm text-muted">Preview — fields appear as the AI finds them</p>}

      <fieldset disabled={!live} className="mt-4 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <FieldInput key={f.label} field={f} />
        ))}
        {!live &&
          Array.from({ length: Math.max(0, 2 - fields.length) }, (_, i) => (
            <div key={i} className="h-[62px] animate-pulse rounded-xl bg-foreground/5" />
          ))}
      </fieldset>

      {live && (
        <div className="mt-5 flex items-center gap-3">
          <button className="rounded-full bg-foreground px-5 py-2.5 text-background">Save</button>
          {saved && <span className="text-sm text-muted">Saved (demo — nothing was sent)</span>}
        </div>
      )}
    </form>
  );
}

const control = "mt-1 block w-full rounded-xl bg-card px-3 py-2.5 ring-1 ring-foreground/10 disabled:opacity-60";

/** A select with its own chevron, inset like the text's padding (the native arrow hugs the edge). */
function Select({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className="relative mt-1 block">
      <select
        {...props}
        className={`block w-full appearance-none rounded-xl py-2.5 pr-10 pl-3 ring-1 ring-foreground/10 disabled:opacity-60 ${className}`}
      />
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FieldInput({ field }: { field: Field }) {
  const [result, setResult] = useState<"pass" | "fail" | null>(null);

  return (
    <label className="animate-rise block">
      <span className="text-sm text-muted">{field.label}</span>
      {field.kind === "select" ? (
        <Select defaultValue="" className="bg-card">
          <option value="" disabled>
            Choose…
          </option>
          {field.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </Select>
      ) : field.kind === "passFail" ? (
        <span className="mt-1 flex gap-2">
          {(["pass", "fail"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setResult(r)}
              className={[
                "flex-1 rounded-xl px-3 py-2.5 capitalize ring-1 transition-colors disabled:opacity-60",
                result === r
                  ? r === "pass"
                    ? "bg-emerald-500 text-white ring-emerald-500"
                    : "bg-red-500 text-white ring-red-500"
                  : "bg-card ring-foreground/10",
              ].join(" ")}
            >
              {r}
            </button>
          ))}
        </span>
      ) : field.kind === "number" ? (
        <span className="relative block">
          <input type="number" inputMode="numeric" min={0} className={`${control} pr-20 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none`} />
          {field.unit && <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 pt-1 text-sm text-muted">{field.unit}</span>}
        </span>
      ) : (
        <input type={field.kind} className={control} />
      )}
    </label>
  );
}

/**
 * A pretend file to drag with mouse or finger (pointer events, so it works on touch too).
 * A tap without dragging counts as a drop, for anyone who'd rather not drag.
 */
function FileToken({
  name,
  onMove,
  onDrop,
}: {
  name: string;
  onMove: (x: number, y: number) => void;
  onDrop: (x: number, y: number, tapped: boolean) => void;
}) {
  const [drag, setDrag] = useState<{ startX: number; startY: number; dx: number; dy: number } | null>(null);

  const down = (e: PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ startX: e.clientX, startY: e.clientY, dx: 0, dy: 0 });
  };
  const move = (e: PointerEvent) => {
    if (!drag) return;
    setDrag({ ...drag, dx: e.clientX - drag.startX, dy: e.clientY - drag.startY });
    onMove(e.clientX, e.clientY);
  };
  const up = (e: PointerEvent) => {
    if (!drag) return;
    setDrag(null);
    onDrop(e.clientX, e.clientY, Math.hypot(drag.dx, drag.dy) < 5);
  };

  return (
    <button
      type="button"
      aria-label={`Upload ${name}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={() => setDrag(null)}
      style={drag ? { transform: `translate(${drag.dx}px, ${drag.dy}px) rotate(-4deg) scale(1.05)` } : undefined}
      className={[
        "relative z-10 flex shrink-0 touch-none flex-col items-center gap-1 rounded-xl p-2 select-none",
        drag ? "cursor-grabbing shadow-xl" : "cursor-grab transition-transform hover:-translate-y-0.5",
      ].join(" ")}
    >
      <XlsxIcon className="h-14" />
      <span className="w-24 truncate text-xs text-muted">{name}</span>
    </button>
  );
}

function XlsxIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden>
      <path d="M4 2h22l10 10v32a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#d4d4d4" />
      <path d="M26 2v8a2 2 0 0 0 2 2h8" fill="#e5e5e5" stroke="#d4d4d4" />
      <rect x="0" y="24" width="30" height="14" rx="2" fill="#1d6f42" />
      <text x="15" y="34.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">
        XLSX
      </text>
    </svg>
  );
}

function SheetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-8 text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2.75h8l4.25 4.25V21.25H6z" strokeLinejoin="round" />
      <path d="M14 2.75V7h4.25M9 11.5h6M9 14.5h6M9 17.5h6M12 11.5v6" strokeLinecap="round" />
    </svg>
  );
}
