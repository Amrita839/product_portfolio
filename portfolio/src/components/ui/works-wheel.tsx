"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// This version LOOPS: past the last item the drum carries the first one back
// round to the front, forever. To keep the seam invisible with only a few
// items, the cards are rendered as repeated copies so there are always enough
// on the drum that the wrap happens out of sight (past CULL).
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Small line under the front title, e.g. "Product teardown". */
  caption?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children" | "onSelect"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. */
  action?: string;
  /** Called instead of following href, e.g. for client-side routing. */
  onSelect?: (item: WorksWheelItem, index: number) => void;
}

const CARD_H = 0.38;
const CARD_MAX_W = 0.34;
const CARD_RATIO = 16 / 9;
const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;
const TITLE = 0.124;
const INDEX = 0.06;
const CULL = 1.6;
/** Smallest number of cards on the drum that keeps the wrap out of view. */
const MIN_SLOTS = 6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mod = (n: number, m: number) => ((n % m) + m) % m;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "Works '26",
  action = "View",
  onSelect,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  // Repeat the items until the drum has enough slots to hide the seam.
  const copies = count ? Math.max(1, Math.ceil(MIN_SLOTS / count)) : 1;
  const slots = count * copies;

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W * (w < 640 ? 2.2 : 1));
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: Math.max(22, cardH * TITLE * (w < 640 ? 1.4 : 1)),
      index: Math.max(12, cardH * INDEX * 0.6),
    };
  }, [stage, count]);

  React.useEffect(() => {
    if (!stage.h || !count) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < slots; i++) {
        // Shortest way round the loop from the front to this card.
        let d = mod(i - pos, slots);
        if (d > slots / 2) d -= slots;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        const isCopy = i >= count;
        if (card) {
          card.style.transform = place(
            (i % count) * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          const culled = m > 0.5 && Math.abs(d) > CULL;
          // Copies only exist for the drum; the ring shows each piece once.
          const hiddenInRing = isCopy && m < 0.5;
          card.style.opacity = culled || hiddenInRing ? "0" : "1";
          card.style.pointerEvents = culled || hiddenInRing ? "none" : "auto";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = mod(Math.round(pos), count);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, slots, reduced]);

  // Only the lower bound is fixed: 0 is the ring. Upwards it runs forever.
  const to = React.useCallback((next: number) => {
    target.current = Math.max(0, next);
  }, []);

  /** Bring item i to the front by the shortest way round. */
  const bring = React.useCallback(
    (i: number) => {
      const base = Math.max(1, Math.round(target.current));
      const pos = base - 1;
      let delta = mod(i - pos, count);
      if (delta > count / 2) delta -= count;
      to(base + delta);
    },
    [count, to],
  );

  const settling = React.useRef(0);
  // How far this scroll gesture has carried the wheel. After a full loop the
  // page gets the scroll back, so the wheel never traps the reader.
  const travel = React.useRef(0);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const step = event.deltaY / WHEEL_UNITS;
      const next = target.current + step;
      if (next <= 0) {
        travel.current = 0;
        to(next);
        return; // at the ring, scrolling up hands back to the page
      }
      if (step > 0 && travel.current > count + 0.5) return; // looped once - let the page scroll on
      event.preventDefault();
      if (step > 0) travel.current += step;
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(() => {
        if (target.current > 0.5) to(Math.max(1, Math.round(target.current)));
      }, SETTLE);
    };
    const reset = () => {
      travel.current = 0;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerleave", reset);
      window.clearTimeout(settling.current);
    };
  }, [to, count]);

  const drag = React.useRef<{ y: number; start: number; moved: boolean } | null>(null);
  const suppressClick = React.useRef(false);

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-accent absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = { y: event.clientY, start: event.clientY, moved: false };
          suppressClick.current = false;
        }}
        onPointerMove={(event) => {
          const d = drag.current;
          if (!d) return;
          if (!d.moved && Math.abs(event.clientY - d.start) > 6) {
            d.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
          }
          if (!d.moved) return;
          to(target.current + (d.y - event.clientY) / DRAG_UNITS);
          d.y = event.clientY;
        }}
        onPointerUp={() => {
          if (drag.current?.moved) suppressClick.current = true;
          drag.current = null;
          if (target.current > 0.5) to(Math.max(1, Math.round(target.current)));
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowRight")
            to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
            to(Math.max(1, Math.round(target.current) - 1));
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {Array.from({ length: slots }, (_, i) => {
            const item = items[i % count];
            const real = i % count;
            return (
              <a
                key={i}
                id={i < count ? `works-wheel-${i}` : undefined}
                role="option"
                aria-selected={i < count && real === active}
                aria-hidden={i >= count || undefined}
                tabIndex={i >= count ? -1 : undefined}
                href={item.href}
                draggable={false}
                onClick={(event) => {
                  if (suppressClick.current) {
                    event.preventDefault();
                    suppressClick.current = false;
                    return;
                  }
                  // In the ring, a click opens the wheel at that piece.
                  if (target.current < 0.5) {
                    event.preventDefault();
                    to(real + 1);
                    return;
                  }
                  if (onSelect) {
                    event.preventDefault();
                    onSelect(item, real);
                  }
                }}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                className="group absolute [backface-visibility:hidden]"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                <span className="bg-muted relative block size-full overflow-hidden rounded-lg border border-white/10 shadow-[0_24px_60px_-20px_rgba(239,68,68,0.35)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {action && item.href ? (
                    <span className="bg-background/80 text-foreground pointer-events-none absolute right-3 bottom-3 flex translate-y-1 items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                        <path
                          d="M3 9 9 3M4 3h5v5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {action}
                    </span>
                  ) : null}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <div
        ref={labelRef}
        className="font-display pointer-events-none absolute inset-0 grid place-items-center text-center tracking-tight"
        style={{ fontSize: metrics.title }}
      >
        {label}
      </div>
      <div
        ref={titleRef}
        className="font-display pointer-events-none absolute top-[12%] left-[6%] max-w-[40%] tracking-tight opacity-0 sm:top-1/2 sm:max-w-[24%] sm:-translate-y-1/2"
        style={{ fontSize: metrics.title * 0.7 }}
      >
        <div className="leading-[1.05]">{items[active]?.title}</div>
        {items[active]?.caption ? (
          <div className="text-accent mt-2 text-xs tracking-[0.25em] uppercase">
            {items[active]?.caption}
          </div>
        ) : null}
      </div>

      <ol
        className="text-muted-foreground absolute top-[7.5%] right-[4%] text-right leading-[1.9]"
        style={{ fontSize: metrics.index }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => bring(i)}
              className={cn(
                "focus-visible:outline-accent cursor-pointer transition-colors outline-none hover:text-foreground focus-visible:outline-1",
                i === active && "text-foreground font-medium",
              )}
            >
              <span className="text-accent/70 mr-2 tabular-nums">0{i + 1}</span>
              {item.title}
            </button>
          </li>
        ))}
      </ol>

      <div className="text-muted-foreground pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.7rem] tracking-[0.3em] uppercase">
        Scroll or drag to turn
      </div>
    </section>
  );
}

export default WorksWheel;
