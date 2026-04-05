import { forwardRef, useEffect, useRef, useState } from "react";
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

const HEADER_DARK_SECTIONS = new Set(["services", "before-after"]);
const HEADER_THEME_MARKER = 72;

const services = [
  {
    title: "Custom Websites",
    description:
      "Premium websites and digital experiences designed to communicate clearly and convert with intent.",
    status: "Active",
    cta: "Know more",
    active: true,
  },
  {
    title: "AI Solutions",
    description:
      "Applied AI tools and product features built around practical workflows and real business value.",
    status: "Soon",
    cta: "Soon",
    active: false,
  },
  {
    title: "Automation & Integrations",
    description:
      "Connected systems that reduce manual work and create cleaner, more scalable operations.",
    status: "Soon",
    cta: "Soon",
    active: false,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We understand the business, the goal, and the problem worth solving first.",
  },
  {
    number: "02",
    title: "Design",
    description: "We define the experience, the structure, and the visual direction with precision.",
  },
  {
    number: "03",
    title: "Build",
    description: "We develop with performance, quality, and maintainability built into the system.",
  },
  {
    number: "04",
    title: "Launch & Iterate",
    description: "We launch, refine, and improve based on real use, not assumptions.",
  },
];

const workItems = [
  {
    title: "Platform Redesign",
    category: "Editorial website",
    description: "A curated showcase for a modern service business with a stronger premium signal.",
  },
  {
    title: "Internal Ops System",
    category: "Custom software",
    description: "A cleaner internal workflow experience that turns complexity into decision clarity.",
  },
  {
    title: "AI Workflow Layer",
    category: "Product concept",
    description: "A future-ready interface for speed, automation, and better team leverage.",
  },
];

const Section = forwardRef(function Section(
  { id, className = "", children, fullBleed = false, innerClassName = "" },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`relative min-h-screen px-5 pb-24 pt-28 md:px-8 md:pb-28 lg:px-12 ${className}`}
    >
      <div className={fullBleed ? innerClassName : `mx-auto w-full max-w-[1320px] ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
});

function Reveal({ className = "", children, delay = 0 }) {
  return (
    <div
      className={`reveal ${className}`}
      data-reveal="true"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function LanguageFlag({ country }) {
  if (country === "es") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 16"
        className="language-flag"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="1.2" y="1.2" width="21.6" height="13.6" rx="3.2" />
        <path d="M3.4 5.2h17.2" />
        <path d="M3.4 10.8h17.2" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 16"
      className="language-flag"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <rect x="1.2" y="1.2" width="21.6" height="13.6" rx="3.2" />
      <path d="M1.8 5.1h20.4" />
      <path d="M1.8 8h20.4" />
      <path d="M1.8 10.9h20.4" />
      <path d="M8.4 1.8v5.8" />
      <path d="M5.6 1.8v5.8" />
      <path d="M2.8 1.8v5.8" />
      <path d="M2 3.9h7.2" />
    </svg>
  );
}

function FloatingHeader({ inverted, language, onLanguageChange }) {
  return (
    <header className={`floating-header ${inverted ? "floating-header--inverted" : ""}`}>
      <a href="#hero" className="floating-header__logo" aria-label="Blueprint home">
        blueprint
      </a>

      <div
        className="floating-header__languages"
        role="group"
        aria-label="Language switcher"
      >
        {[
          { code: "ES", country: "es" },
          { code: "EN", country: "us" },
        ].map((option) => {
          const isActive = language === option.code;

          return (
            <button
              key={option.code}
              type="button"
              onClick={() => onLanguageChange(option.code)}
              className={`language-toggle ${isActive ? "language-toggle--active" : ""}`}
              aria-pressed={isActive}
            >
              <LanguageFlag country={option.country} />
              <span>{option.code}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [heroScrollProgress, setHeroScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [activeLanguage, setActiveLanguage] = useState("EN");

  const heroSectionRef = useRef(null);
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 1700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal='true']")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stagedSection = document.querySelector(".services-stage");
    if (!stagedSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("stage-visible");
          }
        });
      },
      {
        threshold: 0.8,
      },
    );

    observer.observe(stagedSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const next = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, next)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const syncVideoToScroll = () => {
      const section = videoSectionRef.current;
      const video = videoRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxTravel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const traveled = Math.min(Math.max(-rect.top, 0), maxTravel);
      const nextProgress = traveled / maxTravel;

      setVideoProgress(nextProgress);

      if (!video || !videoReady || !Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      const targetTime = video.duration * nextProgress;
      if (Math.abs(video.currentTime - targetTime) > 0.033) {
        video.currentTime = targetTime;
      }
    };

    syncVideoToScroll();
    window.addEventListener("scroll", syncVideoToScroll, { passive: true });
    window.addEventListener("resize", syncVideoToScroll);

    return () => {
      window.removeEventListener("scroll", syncVideoToScroll);
      window.removeEventListener("resize", syncVideoToScroll);
    };
  }, [videoReady]);

  useEffect(() => {
    const updateHeroScrollProgress = () => {
      const heroSection = heroSectionRef.current;
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, window.innerHeight * 0.42, 1);
      const nextProgress = Math.min(Math.max(-rect.top / travel, 0), 1);

      setHeroScrollProgress(nextProgress);
    };

    updateHeroScrollProgress();
    window.addEventListener("scroll", updateHeroScrollProgress, { passive: true });
    window.addEventListener("resize", updateHeroScrollProgress);

    return () => {
      window.removeEventListener("scroll", updateHeroScrollProgress);
      window.removeEventListener("resize", updateHeroScrollProgress);
    };
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    if (sections.length === 0) return;

    const updateActiveSection = () => {
      const viewportMarker = Math.min(HEADER_THEME_MARKER, window.innerHeight * 0.18);
      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportMarker && rect.bottom > viewportMarker;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      } else if (window.scrollY < window.innerHeight * 0.2) {
        setActiveSection(sections[0].id);
      } else {
        const lastSection = sections.at(-1);
        if (lastSection) {
          setActiveSection(lastSection.id);
        }
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const headerInverted = HEADER_DARK_SECTIONS.has(activeSection);

  return (
    <div className="min-h-screen overflow-x-clip bg-transparent text-blueprint-ink">
      <div className={`intro-screen ${introDone ? "intro-screen--done" : ""}`}>
        <div className="flex animate-intro-rise flex-col items-center gap-3 text-center">
          <p className="eyebrow">software studio</p>
          <h1 className="font-display text-[clamp(4.6rem,16vw,11rem)] font-semibold italic leading-[0.8] tracking-[-0.06em] text-blueprint-blue">
            Blueprint
          </h1>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(47,109,246,0.09),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f7f9fc_100%)]" />
      <div className="grid-mask pointer-events-none fixed inset-0 z-0 opacity-40" />

      <FloatingHeader
        inverted={headerInverted}
        language={activeLanguage}
        onLanguageChange={setActiveLanguage}
      />

      <main className="relative z-10">
        <Section
          id="hero"
          ref={heroSectionRef}
          fullBleed
          className="hero-section flex items-center px-0 pb-0 pt-0 md:px-0 md:pb-0 md:pt-0 lg:px-0"
          innerClassName="w-full"
        >
          <div
            className="hero-stage relative left-1/2 flex min-h-screen w-screen max-w-none -translate-x-1/2 items-center justify-center overflow-hidden bg-transparent"
            style={{ "--hero-transition-progress": heroScrollProgress }}
          >
            <div className="hero-shader-shell">
              <ShaderGradientCanvas
                className="hero-shader-canvas"
                style={{ position: "absolute", inset: 0 }}
                pixelDensity={1}
                fov={45}
              >
                <ShaderGradient
                  animate="on"
                  axesHelper="off"
                  brightness={1.2}
                  cAzimuthAngle={180}
                  cDistance={3.6}
                  cPolarAngle={90}
                  cameraZoom={1}
                  color1="#fcfdff"
                  color2="#838edb"
                  color3="#cdd0e1"
                  destination="onCanvas"
                  embedMode="off"
                  envPreset="city"
                  fov={45}
                  frameRate={10}
                  gizmoHelper="hide"
                  grain="on"
                  lightType="3d"
                  pixelDensity={1}
                  positionX={-1.4}
                  positionY={0}
                  positionZ={0}
                  range="disabled"
                  rangeEnd={40}
                  rangeStart={0}
                  reflection={0.1}
                  rotationX={0}
                  rotationY={10}
                  rotationZ={50}
                  shader="defaults"
                  type="plane"
                  uAmplitude={1}
                  uDensity={1.3}
                  uFrequency={5.5}
                  uSpeed={0.4}
                  uStrength={4}
                  uTime={0}
                  wireframe={false}
                />
              </ShaderGradientCanvas>
            </div>

            <div className="hero-background-tint" />

            <div className="hero-copy-shell relative z-10">
              <Reveal className="hero-copy grid max-w-[860px] justify-items-center gap-7 px-6 text-center md:px-10">
                <div className="inline-flex w-fit items-center gap-3 rounded-full border border-black/10 bg-white/86 px-4 py-2 text-sm text-black/56 shadow-soft">
                  <span className="h-2 w-2 rounded-full bg-blueprint-blue" />
                  Now booking projects
                </div>
                <div className="grid justify-items-center gap-5">
                  <p className="eyebrow">clarity, design, engineering</p>
                  <h2 className="max-w-[12ch] text-[clamp(3.8rem,8vw,7.4rem)] font-extrabold leading-[0.92] tracking-[-0.075em] text-blueprint-ink">
                     build better
                  </h2>
                  <p className="max-w-2xl text-lg leading-8 text-black/62 md:text-xl">
                    Custom web platforms, AI-powered tools, and digital products crafted with
                    clarity.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <a
                    href="#contact"
                    className="rounded-full bg-blueprint-ink px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blueprint-blue"
                  >
                    Book a call
                  </a>
                  <a
                    href="#services"
                    className="rounded-full border border-black/10 bg-white/90 px-6 py-4 text-sm font-semibold text-blueprint-ink transition duration-300 hover:-translate-y-0.5 hover:border-blueprint-blue/30"
                  >
                    See our services
                  </a>
                </div>
              </Reveal>
            </div>

            <div aria-hidden="true" className="hero-scroll-shroud" />
            <div aria-hidden="true" className="hero-scroll-shroud-glow" />
          </div>
        </Section>

        <Section
          id="services"
          className="services-section -mt-24 flex items-center overflow-hidden bg-[#050505] pt-32 text-white md:-mt-28 md:pt-36"
          innerClassName="services-stage"
        >
          <div aria-hidden="true" className="services-transition">
            <div className="services-transition__edge" />
            <div className="services-transition__glow" />
          </div>

          <div className="grid gap-10">
            <Reveal className="grid gap-4 services-stage-item">
              <h2 className="mx-auto max-w-none text-center text-[clamp(3rem,7vw,5.9rem)] font-extrabold leading-[0.94] tracking-[-0.065em] md:whitespace-nowrap">
                Our Services
              </h2>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.title} delay={index * 90} className="services-stage-item">
                  <article
                    aria-disabled={!service.active}
                    className={`service-card group relative flex h-full flex-col rounded-[2rem] border p-7 transition duration-500 ${
                      service.active
                        ? "service-card--active hover:-translate-y-1"
                        : "service-card--inactive cursor-default hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${
                          service.active
                            ? "bg-blueprint-soft text-blueprint-blue"
                            : "border border-white/10 text-white/45"
                        }`}
                      >
                        {service.status}
                      </span>
                      <span className="text-sm text-white/34">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-12 grid flex-1 gap-4">
                      <h3 className="max-w-[11ch] text-[clamp(1.85rem,2.8vw,2.55rem)] font-semibold leading-tight tracking-[-0.05em] text-white">
                        {service.title}
                      </h3>
                      <p className="max-w-sm text-base leading-7 text-white/58">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-10 pt-8">
                      {service.active ? (
                        <a
                          href="#before-after"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blueprint-blue transition duration-300 hover:gap-3 hover:text-white"
                        >
                          <span>{service.cta}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/34">
                          <span>{service.cta}</span>
                        </span>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <section
          id="before-after"
          ref={videoSectionRef}
          className="relative min-h-[240vh] bg-[#050505] px-5 text-white md:px-8 lg:px-12"
        >
          <div className="sticky top-0 flex min-h-screen items-center py-12 md:py-16">
            <div className="mx-auto grid w-full max-w-[1380px] justify-items-center gap-10">
              <Reveal className="relative z-10 grid max-w-[980px] justify-items-center gap-5 text-center">
                <p className="eyebrow text-white/45">Custom Websites</p>
                <h2 className="max-w-[13ch] text-[clamp(3.15rem,7vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.072em]">
                  Visual Upgrade.
                </h2>
              </Reveal>

              <Reveal delay={120} className="relative w-full">
                <div className="before-after-card relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.03] shadow-[0_28px_120px_rgba(0,0,0,0.42)]">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4 text-xs uppercase tracking-[0.24em] text-white/72 md:px-7 md:py-5">
                    <span>Blueprint transformation</span>
                    <span>Scroll-synced</span>
                  </div>

                  {videoAvailable ? (
                    <video
                      ref={videoRef}
                      className="before-after-video w-full bg-[#dfe8ff] object-cover"
                      src="/blueprint-transformation.mp4"
                      muted
                      playsInline
                      preload="auto"
                      onLoadedMetadata={() => setVideoReady(true)}
                      onError={() => {
                        setVideoAvailable(false);
                        setVideoReady(false);
                      }}
                    />
                  ) : (
                    <div className="before-after-video flex w-full items-end bg-[linear-gradient(135deg,#eef3ff_0%,#ffffff_58%,#e8eefb_100%)] p-8">
                      <div className="max-w-md">
                        <p className="eyebrow mb-4">video placeholder</p>
                        <p className="text-3xl font-semibold tracking-[-0.05em] text-blueprint-ink">
                          Drop your video into <code>public/blueprint-transformation.mp4</code>
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,28,0.22),transparent_24%,transparent_72%,rgba(10,15,28,0.12))]" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <Section id="process" className="flex items-center">
          <div className="grid gap-10">
            <Reveal className="grid gap-4">
              <p className="eyebrow">process</p>
              <h2 className="max-w-[10ch] text-[clamp(3rem,7vw,5.6rem)] font-extrabold leading-[0.94] tracking-[-0.065em]">
                A simple structure clients can trust.
              </h2>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={index * 70}
                  className="rounded-[2rem] border border-black/8 bg-white p-7 shadow-panel"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-black/38">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-3xl font-semibold tracking-[-0.05em]">{step.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-black/58">{step.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <Section id="work" className="flex items-center">
          <div className="grid gap-10">
            <Reveal className="grid gap-4">
              <p className="eyebrow">selected work</p>
              <h2 className="max-w-[10ch] text-[clamp(3rem,7vw,5.8rem)] font-extrabold leading-[0.94] tracking-[-0.065em]">
                A curated section ready for future case studies.
              </h2>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-3">
              {workItems.map((item, index) => (
                <Reveal key={item.title} delay={index * 90}>
                  <article className="group h-full rounded-[2rem] border border-black/8 bg-white p-7 shadow-panel transition duration-500 hover:-translate-y-1 hover:border-blueprint-blue/20 hover:shadow-soft">
                    <p className="text-sm uppercase tracking-[0.22em] text-black/42">{item.category}</p>
                    <h3 className="mt-10 text-[clamp(1.7rem,2.4vw,2.25rem)] font-semibold tracking-[-0.05em]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-base leading-7 text-black/58">{item.description}</p>
                    <div className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-blueprint-ink">
                      <span>View Project</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">+</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        <Section id="contact" className="flex items-center pt-20">
          <Reveal className="rounded-[2.4rem] border border-black/8 bg-white px-6 py-12 shadow-panel md:px-10 md:py-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="grid gap-5">
                <p className="eyebrow">final call</p>
                <h2 className="max-w-[12ch] text-[clamp(3.1rem,7vw,6.2rem)] font-extrabold leading-[0.94] tracking-[-0.065em]">
                  Let&apos;s build something clear, useful, and ambitious.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-black/60">
                  If you want a site or software product with stronger taste, better structure, and
                  a more refined experience, Blueprint is ready to help.
                </p>
              </div>

              <div className="grid gap-4">
                <a
                  href="mailto:hola@blueprint.studio"
                  className="rounded-full bg-blueprint-ink px-6 py-4 text-center text-sm font-semibold text-white transition duration-300 hover:bg-blueprint-blue"
                >
                  Start your project
                </a>
                <a
                  href="mailto:hola@blueprint.studio"
                  className="text-right text-sm text-black/56 transition hover:text-blueprint-ink"
                >
                  hola@blueprint.studio
                </a>
                <a
                  href="https://calendly.com"
                  className="text-right text-sm text-black/56 transition hover:text-blueprint-ink"
                >
                  Calendly
                </a>
              </div>
            </div>
          </Reveal>
        </Section>
      </main>

    </div>
  );
}

export default App;
