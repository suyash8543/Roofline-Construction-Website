import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, CircleCheck,
  Clock3, HardHat, Home, Mail, Menu, Phone, ShieldCheck, Star, X,
  Ruler, Droplets, Building2, Hammer, Wrench, Layers3, Upload, MapPin
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { BrowserRouter, Link } from "react-router-dom";
import "./styles.css";

const IMG = {
  hero: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=88",
  worker: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85",
  team: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
  roof: "https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=1400&q=85",
  roofAfter: "/images/roof-after.png",
  construction: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
  materials: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=85",
  safety: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1400&q=85",
  home: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85"
};

const services = [
  ["Roof Installation", "Complete roofing systems designed for long-term performance.", Home, IMG.roof],
  ["Roof Replacement", "Professional replacement for aging or damaged roofs.", Hammer, IMG.home],
  ["Roof Repair", "Reliable solutions for leaks, damage and deterioration.", Wrench, IMG.worker],
  ["Roof Inspection", "Detailed inspections to identify problems early.", Ruler, IMG.construction],
  ["Waterproofing", "Protection against water intrusion and weather damage.", Droplets, IMG.materials],
  ["Rooftop Construction", "Custom rooftop structures, decks and construction solutions.", Building2, IMG.construction],
  ["Commercial Roofing", "Durable roofing solutions for commercial properties.", Building2, IMG.commercial],
  ["Storm Restoration", "Professional restoration after severe weather damage.", ShieldCheck, IMG.safety]
];

const projects = [
  ["Complete Roof Replacement", "Brooklyn, NY", "Roof replacement", IMG.roof],
  ["Commercial Roof Renewal", "Queens, NY", "Commercial roofing", IMG.commercial],
  ["Rooftop Deck Build", "Manhattan, NY", "Rooftop construction", IMG.construction],
  ["Waterproofing System", "Long Island, NY", "Waterproofing", IMG.materials],
  ["Storm Restoration", "Westchester, NY", "Restoration", IMG.home],
  ["New Construction Roof", "New York, NY", "New installation", IMG.worker]
];

function Section({ id, eyebrow, title, children, dark = false, className = "" }) {
  return (
    <section id={id} className={`${dark ? "bg-ink text-white" : "bg-paper text-ink"} scroll-mt-28 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {eyebrow && <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-copper"><span className="h-px w-8 bg-copper" />{eyebrow}</div>}
        <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[1.03] md:text-6xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Services", "#services"],
    ["Our Work", "#work"],
    ["Process", "#process"],
    ["Reviews", "#reviews"],
    ["Contact", "#contact"]
  ];
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-3 md:px-6">
        <nav aria-label="Primary navigation" className="nav-glass flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 text-white md:px-6">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-copper text-white"><Layers3 size={19} /></span>
            ROOFLINE<span className="text-copper">.</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => <a key={label} href={href} className="text-sm text-white/75 transition hover:text-white">{label}</a>)}
          </div>
          <a href="#contact" className="hidden rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-copper hover:text-white md:block">Get Free Estimate</a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </nav>
        {open && <div className="mt-2 rounded-2xl border border-white/10 bg-ink/95 p-4 md:hidden">{links.map(([label, href]) => <a onClick={() => setOpen(false)} key={label} href={href} className="block rounded-xl px-3 py-3 text-white/80 hover:bg-white/5">{label}</a>)}<a href="#contact" className="mt-2 block rounded-xl bg-copper px-3 py-3 text-center font-bold">Get Free Estimate</a></div>}
      </div>
    </header>
  );
}

function Hero() {
  return <section className="relative min-h-screen overflow-hidden bg-ink text-white">
    <img src={IMG.hero} alt="Roofing worker on a construction site" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
    <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-16 pt-36 md:px-8 md:pb-24">
      <div className="max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-white/75">
          <span className="h-px w-10 bg-copper" /> Roofing • Restoration • Rooftop Construction
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1 }} className="font-display text-6xl font-semibold leading-[.9] tracking-tight md:text-8xl">
          Built Above.<br /><span className="text-white/70">Built to Last.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }} className="mt-7 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
          Professional roofing, restoration, and rooftop construction built with precision, safety, and craftsmanship.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .3 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-xl bg-copper px-6 py-4 font-bold transition hover:-translate-y-0.5 hover:bg-white hover:text-ink">Get a Free Estimate <ArrowRight size={18} className="transition group-hover:translate-x-1" /></a>
          <a href="#work" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/25 bg-white/10 px-6 py-4 font-bold backdrop-blur-sm transition hover:bg-white hover:text-ink">View Our Work <ArrowUpRight size={18} /></a>
        </motion.div>
        <div className="mt-10 flex flex-wrap gap-5 text-sm font-semibold text-white/80"><span>✓ Licensed</span><span>✓ Insured</span><span>✓ Experienced</span></div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-paper to-transparent" />
  </section>;
}

function TrustStrip() {
  return <div className="bg-paper py-6"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-xs font-bold uppercase tracking-[.16em] text-ink/45 md:justify-between md:px-8"><span>Residential</span><span>Commercial</span><span>Restoration</span><span>Waterproofing</span><span>Rooftop Construction</span></div></div>
}

function About() {
  return <Section id="about" eyebrow="The people behind the roof" title="Craftsmanship you can see. People you can trust.">
    <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
      <div className="relative"><img src={IMG.worker} alt="Roofing professional at work" className="aspect-[4/5] w-full rounded-3xl object-cover" /><div className="absolute -bottom-6 -right-4 rounded-2xl bg-ink p-5 text-white shadow-2xl md:-right-6"><HardHat className="mb-3 text-copper" /><p className="font-display text-lg font-semibold">Built by people<br />who do the work.</p></div></div>
      <div>
        <p className="text-xl leading-8 text-ink/70 md:text-2xl">Every roof we build represents the people behind it — experienced professionals who take pride in their work, protect your property, and treat every project like it matters.</p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {["Clear communication", "Detailed inspections", "Professional cleanup", "Safety-focused crews"].map(x => <div key={x} className="rounded-2xl border border-ink/10 bg-white p-5"><CircleCheck className="mb-4 text-copper" /><div className="font-bold">{x}</div></div>)}
        </div>
      </div>
    </div>
  </Section>
}

function Services() {
  return <Section id="services" eyebrow="What we do" title="Roofing work with a higher standard.">
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(([name, desc, Icon, img], i) =>
      <motion.article key={name} whileHover={{ y: -5 }} className="group overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="relative h-52 overflow-hidden"><img src={img} alt={name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" /><div className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-xl bg-white text-ink"><Icon size={19} /></div></div>
        <div className="p-6"><h3 className="font-display text-xl font-semibold">{name}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{desc}</p><a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-copper">Discuss your project <ChevronRight size={16} /></a></div>
      </motion.article>
    )}</div>
  </Section>
}

function Projects() {
  return <Section id="work" dark eyebrow="Selected projects" title="Work that speaks for itself.">
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.map(([name, loc, type, img], i) =>
      <motion.article key={name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="group relative overflow-hidden rounded-3xl">
        <img src={img} alt={name} className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute bottom-0 p-6"><div className="mb-2 text-xs font-bold uppercase tracking-[.15em] text-copper">{type}</div><h3 className="font-display text-2xl font-semibold">{name}</h3><p className="mt-1 text-sm text-white/65">{loc}</p></div>
      </motion.article>
    )}</div>
  </Section>
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <Section eyebrow="Proof over promises" title="See the difference.">
      <div className="mt-12 overflow-hidden rounded-3xl bg-ink p-2 shadow-2xl">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl select-none">

          {/* AFTER IMAGE - Full background */}
          <img
            src={IMG.roofAfter}
            alt="After roofing project"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* BEFORE IMAGE - Clipped */}
          <img
            src={IMG.roof}
            alt="Before roofing project"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              clipPath: `inset(0 ${100 - Number(pos)}% 0 0)`
            }}
          />

          {/* Divider */}
          <div
            className="absolute inset-y-0"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute -left-px h-full w-0.5 bg-white shadow-xl" />

            {/* Slider Button */}
            <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl">
              <ChevronRight size={22} />
            </div>
          </div>

          {/* BEFORE LABEL */}
          <div className="absolute left-6 top-6 rounded-lg bg-black/60 px-4 py-3 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Before
          </div>

          {/* AFTER LABEL */}
          <div className="absolute right-6 top-6 rounded-lg bg-copper px-4 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg">
            After
          </div>

          {/* Invisible Slider */}
          <input
            aria-label="Before and after comparison"
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />

        </div>
      </div>
    </Section>
  );
}

function Process() {
  const steps = [["01", "Inspection", "We inspect your roof and identify the problem.", Ruler], ["02", "Estimate", "You receive a clear and transparent project estimate.", Mail], ["03", "Construction", "Our team completes the work using professional materials and proven techniques.", Hammer], ["04", "Final Walkthrough", "We inspect the finished project and make sure everything meets our standards.", CircleCheck]];
  return <Section id="process" dark eyebrow="How we work" title="From first inspection to final nail.">
    <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-4">{steps.map(([n, t, d, Icon]) => <div key={n} className="bg-ink p-7 md:p-8"><div className="flex items-center justify-between"><span className="font-display text-4xl font-bold text-white/15">{n}</span><Icon className="text-copper" /></div><h3 className="mt-12 font-display text-2xl font-semibold">{t}</h3><p className="mt-3 text-sm leading-6 text-white/55">{d}</p></div>)}</div>
  </Section>
}

function Story() {
  const stages = [["Inspection", IMG.worker], ["Preparation", IMG.construction], ["Material Delivery", IMG.materials], ["Installation", IMG.roof], ["Quality Check", IMG.safety], ["Completed Roof", IMG.home]];
  return <Section eyebrow="A project, step by step" title="Follow the work.">
    <div className="mt-12 flex gap-5 overflow-x-auto pb-5">{stages.map(([name, img], i) => <div key={name} className="min-w-[230px] flex-1"><div className="relative overflow-hidden rounded-2xl"><img src={img} alt={name} className="aspect-square w-full object-cover" /><span className="absolute left-3 top-3 rounded-lg bg-ink px-2.5 py-1 text-xs font-bold text-white">0{i + 1}</span></div><h3 className="mt-4 font-display font-semibold">{name}</h3>{i < stages.length - 1 && <div className="mt-2 hidden items-center gap-2 text-xs text-copper lg:flex">NEXT <ArrowRight size={13} /></div>}</div>)}</div>
  </Section>
}

function Materials() {
  const mats = [["Asphalt Shingles", "Reliable, versatile protection for residential roofs."], ["Metal Roofing", "Durable systems engineered for demanding conditions."], ["Flat Roofing", "Professional solutions for low-slope commercial roofs."], ["Waterproof Membranes", "Critical protection where water intrusion is a risk."], ["Insulation", "Helps support comfort and building performance."], ["Flashing & Gutters", "Details that move water away and protect weak points."]];
  return <Section dark eyebrow="Materials & details" title="The roof is only as good as what goes into it.">
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{mats.map(([n, d], i) => <div key={n} className="group rounded-3xl border border-white/10 bg-white/[.03] p-7 transition hover:bg-white/[.06]"><div className="mb-12 text-sm font-bold text-copper">0{i + 1}</div><h3 className="font-display text-2xl font-semibold">{n}</h3><p className="mt-2 text-sm leading-6 text-white/50">{d}</p></div>)}</div>
  </Section>
}

function Team() {
  const people = [["Michael", "Project Manager", IMG.team, "Coordinates every project from inspection to final walkthrough."], ["James", "Roofing Specialist", IMG.worker, "Focused on precision installation and long-lasting results."], ["Alex", "Site Foreman", IMG.safety, "Keeps crews organized, safe and focused on quality."], ["Jordan", "Restoration Lead", IMG.construction, "Leads repair and restoration work with care and detail."]];
  return <Section eyebrow="The people behind the roof" title="A team that takes the work personally.">
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{people.map(([n, p, img, d]) => <div key={n} className="group"><div className="overflow-hidden rounded-3xl"><img src={img} alt={`${n}, ${p}`} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" /></div><h3 className="mt-5 font-display text-xl font-semibold">{n} <span className="text-copper">—</span> {p}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{d}</p></div>)}</div>
  </Section>
}

function Safety() {
  return <section className="bg-paper pb-24 md:pb-32"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center"><img src={IMG.safety} alt="Roofing crew using safety equipment" className="aspect-[4/3] w-full rounded-3xl object-cover" /><div><div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-copper"><span className="h-px w-8 bg-copper" /> Safety & quality</div><h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Safety isn't optional. It's our standard.</h2><p className="mt-6 text-lg leading-8 text-ink/60">Professional crews, proper site preparation and disciplined workmanship are part of every project.</p><div className="mt-8 grid grid-cols-2 gap-3">{["Safety First", "Experienced Crews", "Quality Materials", "Professional Workmanship"].map(x => <div key={x} className="rounded-2xl bg-white p-5 font-bold shadow-sm"><ShieldCheck className="mb-3 text-copper" />{x}</div>)}</div></div></div></section>
}

function Reviews() {
  return <Section id="reviews" dark eyebrow="Client words" title="Trust is built one project at a time.">
    <div className="mt-12 grid gap-5 md:grid-cols-3">{[
      ["Sarah M.", "“From the first inspection to the final cleanup, the team was professional and transparent. Our roof looks incredible.”"],
      ["David R.", "“The crew explained every step, protected the property and left the site clean. The whole process felt organized.”"],
      ["Marcus T.", "“Great communication and careful workmanship. They treated our commercial property like it mattered.”"]
    ].map(([name, text]) => <div key={name} className="rounded-3xl border border-white/10 bg-white/[.04] p-7"><div className="mb-7 flex gap-1 text-copper">{[1, 2, 3, 4, 5].map(x => <Star key={x} size={15} fill="currentColor" />)}</div><p className="text-lg leading-8 text-white/80">{text}</p><div className="mt-8 font-bold">{name}</div><div className="text-sm text-white/40">Verified client testimonial</div></div>)}</div>
    <p className="mt-6 text-xs text-white/35"></p>
  </Section>
}

function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", service: "Roof Installation", message: "", website: "" });
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const handlePhotos = (e) => {
    const selected = Array.from(e.target.files || []);
    const valid = selected.filter((file) => file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024);
    setPhotos(valid.slice(0, 8));
    if (selected.length !== valid.length) {
      setStatus({ type: "error", message: "Please select up to 8 image files, each 10 MB or smaller." });
    } else {
      setStatus({ type: "", message: "" });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setSending(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      photos.forEach((file) => body.append("photos", file));

      const response = await fetch(`${API_BASE}/api/contact/estimate`, { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || "We couldn't send your request. Please try again.");

      setStatus({ type: "success", message: data.message || "Thanks! Your estimate request has been sent." });
      setForm({ name: "", phone: "", email: "", address: "", service: "Roof Installation", message: "", website: "" });
      setPhotos([]);
      e.target.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please call our team." });
    } finally {
      setSending(false);
    }
  };

  return <section id="contact" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
    <img src={IMG.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
    <div className="relative mx-auto max-w-7xl px-5 md:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[.22em] text-copper"><span className="h-px w-8 bg-copper" /> Request an estimate</div>
          <h2 className="font-display text-5xl font-semibold leading-[1] md:text-7xl">Your roof deserves more than a quick fix.</h2>
          <p className="mt-6 max-w-lg text-lg leading-8 text-white/55">Let's take a closer look at your roof and find the right solution for your property.</p>
          <div className="mt-9 space-y-4 text-sm text-white/70">
            <div className="flex gap-3"><Phone className="text-copper" /> (312) 555-0147</div>
            <div className="flex gap-3"><Mail className="text-copper" /> devnexora214@gmail.com</div>
            <div className="flex gap-3"><MapPin className="text-copper" /> 1250 W Madison Street, Chicago, IL 60607</div>
            <div className="flex gap-3"><Clock3 className="text-copper" /> Mon-Fri: 8AM-6PM, Sat: 9AM-1PM</div>
          </div>
        </div>
        <form onSubmit={submit} encType="multipart/form-data" className="rounded-3xl bg-white p-6 text-ink md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" placeholder="Your name" value={form.name} onChange={update("name")} required />
            <Field label="Phone" placeholder="(000) 000-0000" value={form.phone} onChange={update("phone")} required />
            <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} required />
            <Field label="Property Address" placeholder="Property address" value={form.address} onChange={update("address")} required />
          </div>
          <label className="mt-5 block text-sm font-bold">Service Needed<select name="service" value={form.service} onChange={update("service")} className="mt-2 w-full rounded-xl border border-ink/10 bg-paper p-3.5 outline-none"><option>Roof Installation</option><option>Roof Repair</option><option>Roof Replacement</option><option>Roof Inspection</option><option>Waterproofing</option><option>Rooftop Construction</option><option>Commercial Roofing</option><option>Storm Restoration</option></select></label>
          <label className="mt-5 block text-sm font-bold">Message<textarea name="message" required value={form.message} onChange={update("message")} rows="4" placeholder="Tell us what is happening with your roof..." className="mt-2 w-full rounded-xl border border-ink/10 bg-paper p-3.5 outline-none" /></label>
          <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-ink/20 bg-paper p-4 text-sm font-semibold"><Upload size={18} className="text-copper" /><span>{photos.length ? `${photos.length} photo${photos.length > 1 ? "s" : ""} selected` : "Upload photos of your roof"}</span><input name="photos" type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={handlePhotos} className="hidden" /></label>
          <div className="mt-3 text-xs text-ink/45">Optional: up to 8 JPG, PNG or WebP photos, 10 MB each.</div>
          {/* Honeypot: kept visually hidden to reduce simple bot submissions. */}
          <input tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={update("website")} className="hidden" name="website" />
          <button disabled={sending} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-copper px-5 py-4 font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60">{sending ? "Sending Request..." : "Request a Free Estimate"} <ArrowRight size={18} /></button>
          {status.message && <div role="status" className={`mt-4 rounded-xl p-3 text-sm font-semibold ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{status.message}</div>}
          <p className="mt-4 text-center text-xs text-ink/40">Your information is sent securely to our team for follow-up.</p>
        </form>
      </div>
    </div>
  </section>
}
function Field({ label, placeholder, type = "text", value, onChange, required = true }) { return <label className="block text-sm font-bold">{label}<input name={label.toLowerCase().replaceAll(" ", "_")} type={type} required={required} value={value} onChange={onChange} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-ink/10 bg-paper p-3.5 outline-none focus:border-copper" /></label> }

function Footer() {
  return <footer className="bg-black py-14 text-white"><div className="mx-auto max-w-7xl px-5 md:px-8"><div className="grid gap-10 md:grid-cols-4"><div className="md:col-span-2"><div className="flex items-center gap-2 font-display text-xl font-bold">ROOFLINE<span className="text-copper">.</span></div><p className="mt-5 max-w-md text-sm leading-6 text-white/45">Professional roofing, restoration and rooftop construction. Built around craftsmanship, safety and clear communication.</p></div><div><div className="mb-4 text-xs font-bold uppercase tracking-widest text-white/35">Services</div>{["Roofing", "Repair", "Replacement", "Waterproofing", "Commercial", "Restoration"].map(x => <a key={x} href="#services" className="block py-1.5 text-sm text-white/55 hover:text-white">{x}</a>)}</div><div><div className="mb-4 text-xs font-bold uppercase tracking-widest text-white/35">Contact</div><div className="space-y-3 text-sm text-white/55"><div>(312) 555-0147</div><div>devnexora214@gmail.com
  </div><div>1250 W Madison Street, Chicago, IL 60607</div></div></div></div><div className="mt-12 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 sm:flex-row"><span>© 2026 Roofline. All Rights Reserved.</span><span>Replace demo content with verified client information.</span></div></div></footer>
}

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: .001 });
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; return () => { document.documentElement.style.scrollBehavior = "auto" } }, []);
  return <><motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-copper" /><Navbar /><Hero /><TrustStrip /><About /><Services /><Projects /><BeforeAfter /><Process /><Story /><Materials /><Team /><Safety /><Reviews /><Contact /><Footer /><a href="#contact" className="fixed bottom-4 right-4 z-40 rounded-full bg-copper px-5 py-3 text-sm font-bold text-white shadow-2xl transition hover:-translate-y-1 md:bottom-6 md:right-6">Get Free Estimate</a></>
}

createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);