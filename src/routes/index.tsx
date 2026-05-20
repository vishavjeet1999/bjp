import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Moon,
  Shield,
  Sparkles,
  BookOpen,
  Leaf,
  Vote,
  Wallet,
  Brain,
  ArrowRight,
  Check,
  Loader2,
  Twitter,
  Instagram,
  Github,
  Heart,
  Bug,
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/site/Navbar";
import { CatMascot } from "@/components/site/CatMascot";
import { Counter } from "@/components/site/Counter";
import { addMember, getMemberCount, type Member } from "@/lib/members";

const LIVE_VISITOR_CONFIG = {
  min: 1000,
  max: 2000,
  start: 1600,
  anchor: Date.UTC(2026, 0, 1),
  delayBaseMs: 15000,
  delayVarianceMs: 10000,
  deltaMin: 5,
  deltaVariance: 6,
};

const BILLAS_JOINED_CONFIG = {
  min: 5000,
  max: 5000000,
  start: 5000,
  anchor: Date.UTC(2026, 0, 1),
  delayBaseMs: 15000,
  delayVarianceMs: 10000,
  deltaMin: 5,
  deltaVariance: 6,
};

function deterministicInt(seed: number, range: number) {
  let x = seed ^ (seed << 13);
  x = Math.imul(x, 0x5f356495) ^ (x >>> 17);
  x = Math.imul(x, 0x52dce729) ^ (x << 5);
  return Math.abs(x) % range;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getSharedLiveVisitorCount(now = Date.now()) {
  let elapsed = now - LIVE_VISITOR_CONFIG.anchor;
  let count = LIVE_VISITOR_CONFIG.start;
  let step = 0;

  while (elapsed >= 0) {
    const delay = LIVE_VISITOR_CONFIG.delayBaseMs + deterministicInt(step * 7 + 11, LIVE_VISITOR_CONFIG.delayVarianceMs);
    if (elapsed < delay) {
      return count;
    }

    const delta = LIVE_VISITOR_CONFIG.deltaMin + deterministicInt(step * 13 + 17, LIVE_VISITOR_CONFIG.deltaVariance);
    const sign = deterministicInt(step * 19 + 23, 2) === 0 ? 1 : -1;
    count = clamp(count + sign * delta, LIVE_VISITOR_CONFIG.min, LIVE_VISITOR_CONFIG.max);
    elapsed -= delay;
    step += 1;
  }

  return count;
}

function getSharedLiveVisitorDelay(now = Date.now()) {
  let elapsed = now - LIVE_VISITOR_CONFIG.anchor;
  let step = 0;

  while (true) {
    const delay = LIVE_VISITOR_CONFIG.delayBaseMs + deterministicInt(step * 7 + 11, LIVE_VISITOR_CONFIG.delayVarianceMs);
    if (elapsed < delay) {
      return delay - elapsed;
    }
    elapsed -= delay;
    step += 1;
  }
}

function getSharedBillasJoinedCount(now = Date.now()) {
  let elapsed = now - BILLAS_JOINED_CONFIG.anchor;
  let count = BILLAS_JOINED_CONFIG.start;
  let step = 0;

  while (elapsed >= 0) {
    const delay = BILLAS_JOINED_CONFIG.delayBaseMs + deterministicInt(step * 7 + 11, BILLAS_JOINED_CONFIG.delayVarianceMs);
    if (elapsed < delay) {
      return count;
    }

    const delta = BILLAS_JOINED_CONFIG.deltaMin + deterministicInt(step * 13 + 17, BILLAS_JOINED_CONFIG.deltaVariance);
    count = clamp(count + delta, BILLAS_JOINED_CONFIG.min, BILLAS_JOINED_CONFIG.max);
    elapsed -= delay;
    step += 1;
  }

  return count;
}

function getSharedBillasJoinedDelay(now = Date.now()) {
  let elapsed = now - BILLAS_JOINED_CONFIG.anchor;
  let step = 0;

  while (true) {
    const delay = BILLAS_JOINED_CONFIG.delayBaseMs + deterministicInt(step * 7 + 11, BILLAS_JOINED_CONFIG.delayVarianceMs);
    if (elapsed < delay) {
      return delay - elapsed;
    }
    elapsed -= delay;
    step += 1;
  }
}

export const Route = createFileRoute("/")({
  component: Index,
});

// ---------- HERO ----------
function Hero({ liveVisitors, billasJoined }: { liveVisitors: number; billasJoined: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full blur-3xl opacity-50"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.22 300 / 0.6), transparent 60%)" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-10 h-[300px] w-[300px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.16 85 / 0.55), transparent 60%)" }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto w-full max-w-7xl px-5 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {liveVisitors.toLocaleString()} Billas Online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight"
          >
            {/* Every kitchen deserves a <span className="text-gradient">Billa.</span> */}
            No more <span className="text-gradient">Pests </span> in the country.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl"
          >
            A Gen-Z party — opposition to a certain six-legged
           party. We stand for clean country, clear minds, and a smarter India.
          </motion.p>


          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button
              size="lg"
              onClick={() => document.querySelector("#join")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-gradient-to-r from-primary to-amber-300 text-primary-foreground font-semibold glow-gold hover:opacity-95"
            >
              Join The Party <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document.querySelector("#manifesto")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur"
            >
              Read Manifesto
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-xl"
          >
            {[
              { label: "Billas Joined", value: billasJoined, suffix: " " },
              { label: "Goals", value: 6, suffix: " " },
              { label: "Pest Tolerance", value: 0, suffix: "%" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-3">
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* Mascot */}
        <motion.div
          className="relative aspect-square w-full max-w-[520px] mx-auto"
          style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        >
          <div className="absolute inset-6 rounded-full glow-violet" />
          <div className="relative glass rounded-[2rem] p-6 sm:p-10 h-full flex items-center justify-center">
            <CatMascot className="w-full h-full" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute -left-4 top-10 glass rounded-xl px-3 py-2 text-xs flex items-center gap-2"
            >
              <Moon className="h-3.5 w-3.5 text-primary" /> {time || "00:00 AM"}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute -right-3 bottom-12 glass rounded-xl px-3 py-2 text-xs flex items-center gap-2"
            >
              <Shield className="h-3.5 w-3.5 text-accent" /> Pest-Free Zone

            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ---------- VISION ----------
const visionItems = [
  { icon: Shield, title: "Clean The System", body: "No corruption. No dynasty politics. No pests feeding on the country. A government that works fast, transparently, and for the people." },
  { icon: Brain, title: "Make Gen Z Powerful", body: "Turn India’s youth from “future voters” into present decision-makers. More jobs. More startups. More creators. More builders." },
  { icon: Leaf, title: "Build A Stronger India", body: "Safer streets, smarter cities, stronger digital infrastructure, and an economy that rewards ambition instead of connections." },
  { icon: Heart, title: "Replace Noise With Action", body: "Less drama. Less propaganda. Less fake promises. More execution. More accountability. More real change." },
];

function Vision() {
  return (
    <section id="vision" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="Our Vision" title="Built to protect the country from pests" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visionItems.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center">
                <it.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- MANIFESTO ----------
const manifestoItems = [
  { icon: Vote, title: "Zero Pest Politics", body: "No corruption. No dynasty culture. No leaders treating the country like personal property." },
  { icon: Vote, title: "Jobs Before Jugaad", body: "Real jobs, startup support, creator economy growth, and skill-first opportunities for Gen Z." },
  { icon: Vote, title: "Digital India, But Actually Useful", body: "Fast public services, AI-ready education, safer internet spaces, and government systems that work like modern apps." },
  { icon: Vote, title: "Safer Streets, Stronger Nation", body: "Stronger law enforcement, cleaner cities, and zero tolerance for crime, scams, and anti-national corruption." },
  { icon: Vote, title: "Stronger law enforcement, cleaner cities, and zero tolerance for crime, scams, and anti-national corruption.", body: "Support creators, founders, freelancers, and small businesses instead of rewarding connections and nepotism." },
  { icon: Vote, title: "Youth In Power, Not Just Posters", body: "More young leaders, more transparency, more accountability — because the future shouldn’t be controlled only by people stuck in the past." },
];



function Manifesto() {
  return (
    <section id="manifesto" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader eyebrow="Manifesto" title="The Anti-Pest Manifesto" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {manifestoItems.map((it, i) => (
            <motion.article
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden"
            >
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                style={{ background: "linear-gradient(135deg, oklch(0.85 0.16 85 / 0.25), oklch(0.65 0.22 300 / 0.25))", mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", WebkitMask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)", padding: "1px", WebkitMaskComposite: "xor", maskComposite: "exclude" }}
              />
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                  <it.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  Goal {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- ELIGIBILITY ----------
const questions = [
  "I reject corruption, excuses, and infestation politics",
  "I believe discipline is more powerful than chaos.",
  "I want to build the country, not just complaining.",
  "I stand with ambition and accountability.",
  "I am ready to protect the nation always.",
];

function Eligibility() {
  const [answers, setAnswers] = useState<boolean[]>(Array(questions.length).fill(false));
  const score = answers.filter(Boolean).length;
  const result = useMemo(() => {
    const states = [
      {
        title: "Every movement starts with one Billa.",
        tone: "muted",
      },
      {
        title: "Billa mindset detected.",
        tone: "muted",
      },
      {
        title: "The nation could use more people like you.",
        tone: "ok",
      },
      {
        title: "Strong anti-pest citizen energy.",
        tone: "good",
      },
      {
        title: "Certified Billa. Built for a stronger India.",
        tone: "elite",
      },
      {
        title: "Supreme Billa. Built to clean the system.",
        tone: "elite",
      },
    ];

    return states[Math.min(score, 5)] ?? states[0];
  }, [score]);

  return (
    <section id="eligibility" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeader eyebrow="Eligibility" title="Are you a Billa?" />
        <div className="mt-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <div className="glass rounded-2xl p-4 sm:p-6">
            <ul className="divide-y divide-white/5">
              {questions.map((q, i) => {
                const active = answers[i];
                return (
                  <li key={q}>
                    <button
                      type="button"
                      onClick={() =>
                        setAnswers((a) => a.map((v, j) => (j === i ? !v : v)))
                      }
                      aria-pressed={active}
                      className="w-full flex items-center gap-4 py-4 text-left group"
                    >
                      <span
                        className={`relative h-6 w-11 rounded-full transition ${active ? "bg-gradient-to-r from-primary to-amber-300" : "bg-white/10"
                          }`}
                      >
                        <motion.span
                          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-background shadow"
                          animate={{ x: active ? 20 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </span>
                      <span className="flex-1 text-sm sm:text-base text-foreground/90 group-hover:text-foreground">
                        {q}
                      </span>
                      {active && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="glass rounded-2xl p-6 flex flex-col">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Eligibility Score
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-6xl font-display font-bold text-gradient leading-none">
                {score}
              </span>
              <span className="text-muted-foreground mb-2">/ {questions.length}</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                animate={{ width: `${(score / questions.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
              />
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={result.title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 text-base sm:text-lg font-medium"
              >
                {result.title}
              </motion.p>
            </AnimatePresence>
            <Button
              onClick={() => document.querySelector("#join")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-auto rounded-xl bg-gradient-to-r from-primary to-amber-300 text-primary-foreground font-semibold"
            >
              Join The Party <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- JOIN ----------
const joinSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(60),
  age: z.coerce.number().int().min(13, "Must be 13+").max(120),
  address: z.string().trim().min(2, "Required").max(120),
  email: z.string().trim().email("Invalid email address").max(60),
  reason: z.string().trim().min(8, "Tell us a bit more").max(280),
});
type JoinValues = z.infer<typeof joinSchema>;

function Join({ onJoined }: { onJoined: () => void }) {
  const [submitted, setSubmitted] = useState<Member | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JoinValues>({ resolver: zodResolver(joinSchema) });

  const onSubmit = async (values: JoinValues) => {
    await new Promise((r) => setTimeout(r, 900));
    const m = addMember(values);
    setSubmitted(m);
    onJoined();
    toast.success("Welcome to the opposition.", {
      description: `Member ID ${m.id} issued.`,
    });
    reset();
  };

  return (
    <section id="join" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader eyebrow="Join" title="Join the Movement and Save the Nation from Pests" />
        <div className="mt-14 grid lg:grid-cols-[1fr_1fr] gap-6">
          <div className="glass rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid sm:grid-cols-2 gap-4"
                  noValidate
                >
                  <Field label="Name" error={errors.name?.message}>
                    <Input {...register("name")} placeholder="Enter Name" />
                  </Field>
                  <Field label="Age" error={errors.age?.message}>
                    <Input type="number" inputMode="numeric" {...register("age")} placeholder="Enter Age" />
                  </Field>
                  <Field label="Email" error={errors.email?.message} className="sm:col-span-2">
                    <Input {...register("email")} placeholder="Enter Email" />
                  </Field>
                  <Field label="Address" error={errors.address?.message} className="sm:col-span-2">
                    <Input {...register("address")} placeholder="Enter Address" />
                  </Field>
                  <Field label="Why do you want to join?" error={errors.reason?.message} className="sm:col-span-2">
                    <Textarea
                      rows={4}
                      {...register("reason")}
                      placeholder="I want to join because..."
                    />
                  </Field>

                  <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-gradient-to-r from-primary to-amber-300 text-primary-foreground font-semibold glow-gold disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Issuing card…
                        </>
                      ) : (
                        <>
                          Submit application <ArrowRight className="ml-1 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10"
                >
                  <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center glow-gold">
                    <Check className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-6 text-2xl font-display font-semibold">
                    Welcome, {submitted.name.split(" ")[0]}.
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    The movement recognizes you. Your card has been issued.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(null)}
                    className="mt-6 rounded-xl border-white/15 bg-white/5"
                  >
                    Enroll another citizen

                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Live preview card */}
          <div className="relative">
            <MembershipCard member={submitted} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function MembershipCard({ member }: { member: Member | null }) {
  const id = member?.id ?? "BJP-XXXXXX";
  const name = member?.name ?? "Your Name Here";
  const address = member?.address ?? "—";
  const issued = member ? new Date(member.joinedAt) : new Date();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: -2 }}
      viewport={{ once: true }}
      whileHover={{ rotate: 0, y: -4 }}
      transition={{ duration: 0.6 }}
      className="relative aspect-[1.6/1] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden border border-white/10 glow-violet"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.18 0.04 290) 0%, oklch(0.13 0.02 280) 60%), radial-gradient(circle at 80% 0%, oklch(0.85 0.16 85 / 0.35), transparent 60%)",
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative h-full p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold">
              B
            </span>
            <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Billa Janta Party
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Membership
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Holder</div>
          <div className="text-xl sm:text-2xl font-display font-semibold mt-1">{name}</div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Age</div>
            <div className="font-mono text-sm mt-1">{member?.age ?? "—"}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</div>
            <div className="font-mono text-sm mt-1 break-all">{member?.email ?? "—"}</div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Address
            </div>
            <div className="font-mono text-sm mt-1 break-all">{address}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Issued</div>
            <div className="font-mono text-sm mt-1">
              {issued.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ---------- SHARED ----------
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs uppercase tracking-[0.25em] text-primary/80"
      >
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-4xl sm:text-5xl font-display font-bold tracking-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
}

function Index() {
  const [memberCount, setMemberCount] = useState(10247);
  const [liveVisitors, setLiveVisitors] = useState(getSharedLiveVisitorCount());
  const [billasJoined, setBillasJoined] = useState(getSharedBillasJoinedCount());

  useEffect(() => {
    setMemberCount(getMemberCount());
    const onUpdate = () => setMemberCount(getMemberCount());
    window.addEventListener("bjp:members-updated", onUpdate);
    return () => window.removeEventListener("bjp:members-updated", onUpdate);
  }, []);

  // Shared simulated live count based on a deterministic timestamp formula.
  useEffect(() => {
    let timeoutId: number;
    const updateCount = () => {
      setLiveVisitors(getSharedLiveVisitorCount());
      timeoutId = window.setTimeout(updateCount, getSharedLiveVisitorDelay());
    };

    updateCount();
    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    const updateCount = () => {
      setBillasJoined(getSharedBillasJoinedCount());
      timeoutId = window.setTimeout(updateCount, getSharedBillasJoinedDelay());
    };

    updateCount();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero liveVisitors={liveVisitors} billasJoined={billasJoined} />
      <Vision />
      <Manifesto />
      <Eligibility />
      <Join onJoined={() => setMemberCount(getMemberCount())} />
    </main>
  );
}
