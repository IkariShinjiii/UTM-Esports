"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type Kind = 1 | 2 | 3 | 4 | 5 | 6;
const INFO: Record<Kind, { name: string; note: string }> = {
  6: { name: "Slash + ignite", note: "Slanted panels cut in, the dragon is wiped across them with a progress line, then the panels slash back out." },
  1: { name: "Curtain", note: "Logo and a red line that fills with a % counter, then the screen splits open." },
  2: { name: "Counter slam", note: "A huge 0-100 number with a red fill rising through it, then it slides away." },
  3: { name: "Dragon ignite", note: "The dragon is revealed by a sweep, settles in and flashes, then the screen lifts." },
  4: { name: "Slash", note: "Two slanted red panels cut across at the logo angle, the logo punches in, panels exit." },
  5: { name: "Letters", note: "UTM ESPORTS rises letter by letter, an underline draws, then it all drops out." },
};

// One preloader. It builds a GSAP timeline inside its own box and calls onDone when it has fully played out.
function Stage({ kind, runKey, onDone }: { kind: Kind; runKey: number; onDone?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const pct = q("[data-pct]");
      const setPct = () => pct.forEach((n) => (n.textContent = String(Math.round(counter.v))));
      const tl = gsap.timeline({ onComplete: () => done.current?.() });
      if (reduced) {
        // No motion: show the finished state briefly, then finish.
        counter.v = 100;
        setPct();
        gsap.set(q("[data-line],[data-bar],[data-ul]"), { scaleX: 1 });
        gsap.set(q("[data-p1],[data-p2],[data-dragon]"), { clearProps: "all" });
        gsap.set(q("[data-fill]"), { clipPath: "inset(0% 0 0 0)" });
        tl.to({}, { duration: 0.8 });
        return;
      }
      const load = (dur: number, at: number) => tl.to(counter, { v: 100, duration: dur, ease: "power2.inOut", onUpdate: setPct }, at);

      if (kind === 1) {
        tl.fromTo(q("[data-logo]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0)
          .fromTo(q("[data-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.2);
        load(1.8, 0.2);
        tl.to(q("[data-content]"), { autoAlpha: 0, duration: 0.25 }, ">0.15")
          .to(q("[data-top]"), { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, ">")
          .to(q("[data-bot]"), { yPercent: 100, duration: 0.8, ease: "power4.inOut" }, "<");
      }
      if (kind === 2) {
        tl.fromTo(q("[data-fill]"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 2.2, ease: "power2.inOut" }, 0)
          .fromTo(q("[data-num]"), { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" }, 0);
        load(2.2, 0);
        tl.to(q("[data-num]"), { scale: 1.06, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 }, ">0.05")
          .to(q("[data-screen]"), { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, ">0.2");
      }
      if (kind === 3) {
        tl.set(q("[data-dragon]"), { clipPath: "inset(0 100% 0 0)", scale: 1.08, filter: "brightness(1)" })
          .to(q("[data-dragon]"), { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power3.inOut" }, 0.1)
          .to(q("[data-dragon]"), { scale: 1, duration: 2.2, ease: "power2.out" }, 0.1)
          .fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.1)
          .to(q("[data-dragon]"), { filter: "brightness(0.4)", duration: 0.18, yoyo: true, repeat: 1 }, 1.7)
          .to(q("[data-screen]"), { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, ">0.3");
      }
      if (kind === 4) {
        tl.fromTo(q("[data-p1]"), { xPercent: -110 }, { xPercent: 0, duration: 0.55, ease: "power4.out" })
          .fromTo(q("[data-p2]"), { xPercent: 110 }, { xPercent: 0, duration: 0.55, ease: "power4.out" }, 0.12)
          .fromTo(q("[data-logo]"), { scale: 1.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "back.out(2)" }, 0.55)
          .to({}, { duration: 0.7 })
          .to(q("[data-p1]"), { xPercent: 110, duration: 0.6, ease: "power4.in" })
          .to(q("[data-p2]"), { xPercent: -110, duration: 0.6, ease: "power4.in" }, "<0.08")
          .to(q("[data-logo]"), { autoAlpha: 0, scale: 0.9, duration: 0.3 }, "<");
      }
      if (kind === 6) {
        tl.set(q("[data-dragon]"), { clipPath: "inset(0 100% 0 0)", scale: 1.06, transformOrigin: "50% 60%" })
          .fromTo(q("[data-p1]"), { xPercent: -110 }, { xPercent: 0, duration: 0.6, ease: "power4.out" }, 0)
          .fromTo(q("[data-p2]"), { xPercent: 110 }, { xPercent: 0, duration: 0.6, ease: "power4.out" }, 0.1)
          .to(q("[data-dragon]"), { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power3.inOut" }, 0.55)
          .to(q("[data-dragon]"), { scale: 1, duration: 2, ease: "power2.out" }, 0.55)
          .fromTo(q("[data-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.55)
          .to(q("[data-dragon]"), { scale: 1.035, duration: 0.22, ease: "power2.out", yoyo: true, repeat: 1 }, 1.95)
          .to(q("[data-dragon],[data-barwrap]"), { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, 2.45)
          .set(q("[data-base]"), { autoAlpha: 0 }, 2.65)
          .to(q("[data-p1]"), { xPercent: 110, duration: 0.7, ease: "power4.in" }, 2.65)
          .to(q("[data-p2]"), { xPercent: -110, duration: 0.7, ease: "power4.in" }, 2.72);
      }
      if (kind === 5) {
        tl.fromTo(q("[data-ch]"), { yPercent: 120, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 0.7, ease: "power4.out", stagger: 0.05 })
          .fromTo(q("[data-ul]"), { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power3.inOut" }, "-=0.2")
          .to({}, { duration: 0.6 })
          .to(q("[data-ch]"), { yPercent: -120, duration: 0.5, ease: "power3.in", stagger: 0.035 })
          .to(q("[data-ul]"), { scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power3.in" }, "<");
      }
    }, el);
    return () => ctx.revert();
  }, [kind, runKey]);

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden text-white [container-type:inline-size]">
      {kind === 1 && (
        <>
          <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-[#16090a]" />
          <div data-bot className="absolute inset-x-0 bottom-0 h-1/2 bg-[#16090a]" />
          <div data-content className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="w-[min(70%,22rem)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-logo src="/images/utm-logo-white.png" alt="UTM Esports" className="mx-auto w-[45%]" />
              <div className="mt-8 h-[3px] bg-white/15"><div data-line className="h-full origin-left bg-[#d4232b]" /></div>
              <p className="mt-3 text-right font-display text-sm italic tracking-widest text-white/70"><span data-pct>0</span>%</p>
            </div>
          </div>
        </>
      )}
      {kind === 2 && (
        <div data-screen className="absolute inset-0 grid place-items-center bg-[#16090a]">
          <div data-num className="relative font-display text-[34cqw] font-extrabold italic leading-none">
            <span className="text-white/15"><span data-pct>0</span></span>
            <span data-fill aria-hidden className="absolute inset-0 text-[#d4232b]"><span data-pct>0</span></span>
          </div>
        </div>
      )}
      {kind === 3 && (
        <div data-screen className="absolute inset-0 grid place-items-center bg-[#d4232b]">
          <div className="w-[min(60%,26rem)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-dragon src="/images/dragon-ink.webp" alt="" className="w-full" />
            <div className="mt-5 h-[3px] bg-black/25"><div data-bar className="h-full origin-left bg-[#16090a]" /></div>
          </div>
        </div>
      )}
      {kind === 4 && (
        <div className="absolute inset-0 bg-[#16090a]">
          <div data-p1 className="absolute inset-y-0 left-0 w-[70%] bg-[#d4232b] [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]" />
          <div data-p2 className="absolute inset-y-0 right-0 w-[70%] bg-[#8f1117] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-0 grid place-items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-logo src="/images/utm-logo-white.png" alt="UTM Esports" className="w-[34%] max-w-[16rem] opacity-0" />
          </div>
        </div>
      )}
      {kind === 6 && (
        <>
          <div data-base className="absolute inset-0 bg-[#16090a]" />
          <div data-p1 className="absolute inset-y-0 left-0 w-[72%] bg-[#d4232b] [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]" />
          <div data-p2 className="absolute inset-y-0 right-0 w-[72%] bg-[#b81d24] [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="w-[min(58%,26rem)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-dragon src="/images/dragon-ink.webp" alt="UTM Esports" className="w-full" />
              <div data-barwrap className="mt-5 h-[3px] bg-black/25"><div data-bar className="h-full origin-left bg-[#16090a]" /></div>
            </div>
          </div>
        </>
      )}
      {kind === 5 && (
        <div className="absolute inset-0 grid place-items-center bg-[#16090a]">
          <div>
            <div className="flex overflow-hidden pb-2 font-display text-[10.5cqw] font-extrabold italic uppercase leading-none" aria-label="UTM Esports">
              {"UTM ESPORTS".split("").map((c, i) => (
                <span key={i} aria-hidden data-ch className={`inline-block ${c === " " ? "w-[0.35em]" : ""}`}>{c}</span>
              ))}
            </div>
            <div data-ul className="mt-2 h-[4px] origin-left bg-[#d4232b]" />
          </div>
        </div>
      )}
    </div>
  );
}

export function PreloaderSamples() {
  const [keys, setKeys] = useState<Record<number, number>>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  const [full, setFull] = useState<Kind | null>(null);
  const [fullKey, setFullKey] = useState(0);
  const replay = (k: Kind) => setKeys((s) => ({ ...s, [k]: s[k] + 1 }));

  return (
    <main id="content" className="min-h-screen bg-[#16090a] px-4 py-10 text-white md:px-12">
      <h1 className="font-display text-3xl font-extrabold italic uppercase md:text-5xl">Preloader samples</h1>
      <p className="mt-3 max-w-[60ch] text-white/75">Six GSAP options, each about 3 seconds. Replay one, or open it full screen to see it lift off a page.</p>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <p className="mt-5"><a href="/?intro" onClick={(e) => { e.preventDefault(); window.location.href = "/?intro"; }} className="inline-flex min-h-11 items-center bg-[#d4232b] px-5 text-sm font-bold uppercase tracking-wide">Play the live site intro</a></p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {([6, 1, 2, 3, 4, 5] as Kind[]).map((k) => (
          <section key={k} aria-labelledby={`t${k}`}>
            <div className="relative aspect-video overflow-hidden border border-white/15 bg-[#2a1214]">
              <Stage kind={k} runKey={keys[k]} />
            </div>
            <h2 id={`t${k}`} className="mt-3 font-display text-xl font-extrabold italic uppercase">{k}. {INFO[k].name}</h2>
            <p className="mt-1 text-sm text-white/70">{INFO[k].note}</p>
            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => replay(k)} className="min-h-11 bg-[#d4232b] px-5 text-sm font-bold uppercase tracking-wide">Replay</button>
              <button type="button" onClick={() => { setFullKey((n) => n + 1); setFull(k); }} className="min-h-11 border border-white/40 px-5 text-sm font-bold uppercase tracking-wide">Full screen</button>
            </div>
          </section>
        ))}
      </div>
      {full && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-label={`Preloader ${full} full screen`}>
          <div className="absolute inset-0 grid place-items-center bg-[#2a1214] text-white/60"><p className="font-display italic">Page content</p></div>
          <Stage kind={full} runKey={fullKey} onDone={() => setFull(null)} />
          <button type="button" onClick={() => setFull(null)} className="absolute right-4 top-4 z-10 min-h-11 border border-white/40 bg-black/40 px-4 text-xs font-bold uppercase tracking-wide">Close</button>
        </div>
      )}
    </main>
  );
}
