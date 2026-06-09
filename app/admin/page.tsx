"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { BusinessConfig, BusinessType, DesignVariant, Service, Room, Testimonial, FAQItem, Stat } from "@/config/business";

// ─── tiny helpers ─────────────────────────────────────────────────────────────

function cls(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

// ─── base form controls ───────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-1.5">{children}</p>;
}

function Help({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-white/25 mt-1">{children}</p>;
}

function Input({
  value, onChange, placeholder, type = "text",
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
    />
  );
}

function Textarea({
  value, onChange, rows = 3, placeholder,
}: {
  value: string; onChange: (v: string) => void; rows?: number; placeholder?: string;
}) {
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
    />
  );
}

function Select<T extends string>({
  value, onChange, options,
}: {
  value: T; onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-[#1a1a1a]">
          {o.label}
        </option>
      ))}
    </select>
  );
}

function ColorPicker({
  value, onChange,
}: {
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value || "#000000"}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
      />
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-white/30 transition-colors"
      />
      <div
        className="w-10 h-10 rounded-lg border border-white/20 shrink-0"
        style={{ backgroundColor: value }}
      />
    </div>
  );
}

function Field({
  label, children, help,
}: {
  label: string; children: React.ReactNode; help?: string;
}) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      {children}
      {help && <Help>{help}</Help>}
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-bold uppercase tracking-widest text-white/50">{title}</span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 text-white/25 hover:text-red-400 transition-colors text-lg leading-none"
      title="Remove"
    >
      ×
    </button>
  );
}

function AddBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 border border-dashed border-white/15 rounded-xl text-xs text-white/35 hover:text-white/60 hover:border-white/30 transition-colors"
    >
      + {label}
    </button>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border border-white/10 rounded-xl p-4 space-y-3 bg-white/3">
      {children}
    </div>
  );
}

// ─── tab sections ─────────────────────────────────────────────────────────────

function GeneralTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  return (
    <div className="space-y-5">
      <SectionHeader title="Basic Info" />
      <Field label="Business name"><Input value={c.name} onChange={(v) => u({ name: v })} placeholder="e.g. Panoramic Hill Jina" /></Field>
      <Field label="Tagline"><Input value={c.tagline} onChange={(v) => u({ tagline: v })} placeholder="Short catchy phrase" /></Field>
      <Field label="Description" help="2–3 sentences shown on the hero / about section">
        <Textarea value={c.description} onChange={(v) => u({ description: v })} rows={4} />
      </Field>
      <SectionHeader title="Contact" />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Phone"><Input value={c.phone} onChange={(v) => u({ phone: v })} placeholder="0741 000 000" /></Field>
        <Field label="Email"><Input value={c.email} onChange={(v) => u({ email: v })} placeholder="contact@..." /></Field>
      </div>
      <Field label="Address"><Input value={c.address} onChange={(v) => u({ address: v })} placeholder="Str. Exemplu 10" /></Field>
      <Field label="City"><Input value={c.city} onChange={(v) => u({ city: v })} placeholder="Cluj-Napoca" /></Field>
      <Field label="Hours / Schedule"><Input value={c.hours} onChange={(v) => u({ hours: v })} placeholder="Check-in: 14:00 | Check-out: 11:00" /></Field>
      <SectionHeader title="Type" />
      <Field label="Business type" help="Controls which sections appear (rooms, booking buttons, etc.)">
        <Select<BusinessType>
          value={(c.businessType ?? "generic") as BusinessType}
          onChange={(v) => u({ businessType: v })}
          options={[
            { value: "pension", label: "Pension / B&B" },
            { value: "hotel", label: "Hotel" },
            { value: "cottage", label: "Cottage / Cabin" },
            { value: "restaurant", label: "Restaurant" },
            { value: "salon", label: "Salon / Beauty" },
            { value: "mechanic", label: "Auto / Mechanic" },
            { value: "generic", label: "Generic Business" },
          ]}
        />
      </Field>
    </div>
  );
}

function DesignTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const variants: { value: DesignVariant; label: string; desc: string; preview: string }[] = [
    { value: "classic", label: "Classic", desc: "Warm & traditional", preview: "bg-amber-50 border-amber-200" },
    { value: "nature", label: "Nature", desc: "Earthy mountain feel", preview: "bg-green-900 border-green-700" },
    { value: "dark", label: "Dark", desc: "Upscale & elegant", preview: "bg-zinc-900 border-zinc-700" },
    { value: "bold", label: "Bold", desc: "Modern & high-contrast", preview: "bg-black border-white/20" },
  ];
  return (
    <div className="space-y-5">
      <SectionHeader title="Colors" />
      <Field label="Primary color" help="Used for buttons, accents, and highlights">
        <ColorPicker value={c.primaryColor} onChange={(v) => u({ primaryColor: v })} />
      </Field>
      <SectionHeader title="Design variant" />
      <div className="grid grid-cols-2 gap-2">
        {variants.map((v) => (
          <button
            key={v.value}
            onClick={() => u({ designVariant: v.value })}
            className={cls(
              "text-left p-3 rounded-xl border transition-all",
              c.designVariant === v.value
                ? "border-white/60 bg-white/10"
                : "border-white/10 hover:border-white/25 bg-white/3"
            )}
          >
            <div className={cls("w-full h-8 rounded-md mb-2 border", v.preview)} />
            <p className="text-xs font-semibold text-white">{v.label}</p>
            <p className="text-[10px] text-white/40">{v.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeroTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  return (
    <div className="space-y-5">
      <SectionHeader title="Hero Image" />
      <Field
        label="Image URL or /path"
        help="Use /images/foldername/photo.jpg for local files, or a full https:// URL for external images"
      >
        <Input value={c.heroImageUrl ?? ""} onChange={(v) => u({ heroImageUrl: v })} placeholder="/images/client/hero.jpg" />
      </Field>
      {c.heroImageUrl && (
        <div className="rounded-xl overflow-hidden border border-white/10 h-32 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.heroImageUrl} alt="hero preview" className="w-full h-full object-cover" />
        </div>
      )}
      <Field label="Image alt text (accessibility)">
        <Input value={c.heroImageAlt ?? ""} onChange={(v) => u({ heroImageAlt: v })} placeholder="Exterior view of the property" />
      </Field>
      <SectionHeader title="Booking Buttons" />
      <Help>Only shown for hotel / pension / cottage type</Help>
      <Field label="Booking.com URL">
        <Input value={c.bookingComUrl ?? ""} onChange={(v) => u({ bookingComUrl: v })} placeholder="https://www.booking.com/hotel/ro/..." />
      </Field>
      <Field label="Airbnb URL">
        <Input value={c.airbnbUrl ?? ""} onChange={(v) => u({ airbnbUrl: v })} placeholder="https://www.airbnb.com/rooms/..." />
      </Field>
    </div>
  );
}

function ServicesTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const services = c.services ?? [];
  const update = (i: number, patch: Partial<Service>) =>
    u({ services: services.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  const remove = (i: number) => u({ services: services.filter((_, idx) => idx !== i) });
  const add = () => u({ services: [...services, { title: "", description: "", price: "" }] });

  return (
    <div className="space-y-3">
      <SectionHeader title="Services / Amenities" />
      {services.map((s, i) => (
        <Card key={i}>
          <RemoveBtn onClick={() => remove(i)} />
          <Field label={`Service ${i + 1} — title`}><Input value={s.title} onChange={(v) => update(i, { title: v })} placeholder="Free WiFi" /></Field>
          <Field label="Description"><Textarea value={s.description} onChange={(v) => update(i, { description: v })} rows={2} /></Field>
          <Field label="Price (optional)"><Input value={s.price ?? ""} onChange={(v) => update(i, { price: v })} placeholder="e.g. 50 RON or Free" /></Field>
        </Card>
      ))}
      <AddBtn onClick={add} label="Add service" />
    </div>
  );
}

function RoomsTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const rooms = c.rooms ?? [];
  const update = (i: number, patch: Partial<Room>) =>
    u({ rooms: rooms.map((r, idx) => (idx === i ? { ...r, ...patch } : r)) });
  const remove = (i: number) => u({ rooms: rooms.filter((_, idx) => idx !== i) });
  const add = () => u({ rooms: [...rooms, { title: "", description: "", price: "", features: [], imageUrl: "", bookingUrl: "" }] });
  const updateFeatures = (i: number, raw: string) =>
    update(i, { features: raw.split("\n").map((f) => f.trim()).filter(Boolean) });

  return (
    <div className="space-y-3">
      <SectionHeader title="Rooms" />
      <Help>Only shown for hotel / pension / cottage type</Help>
      {rooms.map((r, i) => (
        <Card key={i}>
          <RemoveBtn onClick={() => remove(i)} />
          <Field label={`Room ${i + 1} — title`}><Input value={r.title} onChange={(v) => update(i, { title: v })} placeholder="Double Room" /></Field>
          <Field label="Description"><Textarea value={r.description} onChange={(v) => update(i, { description: v })} rows={2} /></Field>
          <Field label="Price"><Input value={r.price} onChange={(v) => update(i, { price: v })} placeholder="from 350 RON/night" /></Field>
          <Field label="Features (one per line)" help="16 m², Private bathroom, WiFi, etc.">
            <Textarea value={(r.features ?? []).join("\n")} onChange={(v) => updateFeatures(i, v)} rows={4} placeholder={"16 m²\nPrivate bathroom\nFree WiFi"} />
          </Field>
          <Field label="Room image URL"><Input value={r.imageUrl ?? ""} onChange={(v) => update(i, { imageUrl: v })} placeholder="https://..." /></Field>
          <Field label="Booking link (optional)"><Input value={r.bookingUrl ?? ""} onChange={(v) => update(i, { bookingUrl: v })} placeholder="https://www.airbnb.com/rooms/..." /></Field>
        </Card>
      ))}
      <AddBtn onClick={add} label="Add room" />
    </div>
  );
}

function AboutTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const bullets = c.bulletPoints ?? [];
  const stats = c.stats ?? [];

  const updateBullets = (raw: string) =>
    u({ bulletPoints: raw.split("\n").map((b) => b.trim()).filter(Boolean) });

  const updateStat = (i: number, patch: Partial<Stat>) =>
    u({ stats: stats.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  const removeStat = (i: number) => u({ stats: stats.filter((_, idx) => idx !== i) });
  const addStat = () => u({ stats: [...stats, { value: "", label: "" }] });

  return (
    <div className="space-y-5">
      <SectionHeader title="Bullet Points" />
      <Field label="Highlights (one per line)" help="Short selling points shown in the About section">
        <Textarea
          value={bullets.join("\n")}
          onChange={updateBullets}
          rows={5}
          placeholder={"Spectacular mountain views\nQuiet area, perfect for relaxation\nPet friendly"}
        />
      </Field>
      <SectionHeader title="Stats / Numbers" />
      {stats.map((s, i) => (
        <Card key={i}>
          <RemoveBtn onClick={() => removeStat(i)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Value"><Input value={s.value} onChange={(v) => updateStat(i, { value: v })} placeholder="8.0★" /></Field>
            <Field label="Label"><Input value={s.label} onChange={(v) => updateStat(i, { label: v })} placeholder="Rating" /></Field>
          </div>
        </Card>
      ))}
      <AddBtn onClick={addStat} label="Add stat" />
    </div>
  );
}

function GalleryTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const gallery = c.gallery ?? [];
  const update = (i: number, v: string) =>
    u({ gallery: gallery.map((url, idx) => (idx === i ? v : url)) });
  const remove = (i: number) => u({ gallery: gallery.filter((_, idx) => idx !== i) });
  const add = () => u({ gallery: [...gallery, ""] });

  return (
    <div className="space-y-3">
      <SectionHeader title="Gallery" />
      <Help>Use /images/foldername/file.jpg for local files, or full https:// URLs.</Help>
      {gallery.map((url, i) => (
        <div key={i} className="flex gap-2 items-center">
          <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0">
            {url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={url} alt="" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="flex-1">
            <Input value={url} onChange={(v) => update(i, v)} placeholder="https://... or /images/..." />
          </div>
          <button onClick={() => remove(i)} className="text-white/25 hover:text-red-400 transition-colors px-1">×</button>
        </div>
      ))}
      <AddBtn onClick={add} label="Add image" />
    </div>
  );
}

function TestimonialsTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const testimonials = c.testimonials ?? [];
  const update = (i: number, patch: Partial<Testimonial>) =>
    u({ testimonials: testimonials.map((t, idx) => (idx === i ? { ...t, ...patch } : t)) });
  const remove = (i: number) => u({ testimonials: testimonials.filter((_, idx) => idx !== i) });
  const add = () => u({ testimonials: [...testimonials, { name: "", role: "", stars: 5, text: "" }] });

  return (
    <div className="space-y-3">
      <SectionHeader title="Testimonials / Reviews" />
      {testimonials.map((t, i) => (
        <Card key={i}>
          <RemoveBtn onClick={() => remove(i)} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={t.name} onChange={(v) => update(i, { name: v })} placeholder="Ion Popescu" /></Field>
            <Field label="Source / Role"><Input value={t.role ?? ""} onChange={(v) => update(i, { role: v })} placeholder="Recenzie Booking.com" /></Field>
          </div>
          <Field label="Stars (1–5)">
            <Select
              value={String(t.stars ?? 5) as "1" | "2" | "3" | "4" | "5"}
              onChange={(v) => update(i, { stars: Number(v) })}
              options={["5", "4", "3", "2", "1"].map((n) => ({ value: n as "1" | "2" | "3" | "4" | "5", label: "★".repeat(Number(n)) }))}
            />
          </Field>
          <Field label="Review text"><Textarea value={t.text} onChange={(v) => update(i, { text: v })} rows={3} /></Field>
        </Card>
      ))}
      <AddBtn onClick={add} label="Add testimonial" />
    </div>
  );
}

function FAQTabContent({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const faq = c.faq ?? [];
  const update = (i: number, patch: Partial<FAQItem>) =>
    u({ faq: faq.map((f, idx) => (idx === i ? { ...f, ...patch } : f)) });
  const remove = (i: number) => u({ faq: faq.filter((_, idx) => idx !== i) });
  const add = () => u({ faq: [...faq, { question: "", answer: "" }] });

  return (
    <div className="space-y-3">
      <SectionHeader title="FAQ" />
      {faq.map((f, i) => (
        <Card key={i}>
          <RemoveBtn onClick={() => remove(i)} />
          <Field label={`Q${i + 1}`}><Input value={f.question} onChange={(v) => update(i, { question: v })} placeholder="What time is check-in?" /></Field>
          <Field label="Answer"><Textarea value={f.answer} onChange={(v) => update(i, { answer: v })} rows={2} /></Field>
        </Card>
      ))}
      <AddBtn onClick={add} label="Add FAQ" />
    </div>
  );
}

function SocialTab({ c, u }: { c: BusinessConfig; u: (p: Partial<BusinessConfig>) => void }) {
  const sl = c.socialLinks ?? {};
  return (
    <div className="space-y-5">
      <SectionHeader title="Social Media" />
      <Field label="Facebook URL"><Input value={sl.facebook ?? ""} onChange={(v) => u({ socialLinks: { ...sl, facebook: v } })} placeholder="https://www.facebook.com/..." /></Field>
      <Field label="Instagram URL"><Input value={sl.instagram ?? ""} onChange={(v) => u({ socialLinks: { ...sl, instagram: v } })} placeholder="https://www.instagram.com/..." /></Field>
      <Field label="TikTok URL"><Input value={sl.tiktok ?? ""} onChange={(v) => u({ socialLinks: { ...sl, tiktok: v } })} placeholder="https://www.tiktok.com/@..." /></Field>
      <SectionHeader title="WhatsApp" />
      <Field label="WhatsApp number" help='Romanian format: 40741000000 (country code + number, no + or spaces)'>
        <Input value={c.whatsapp ?? ""} onChange={(v) => u({ whatsapp: v })} placeholder="40741000000" />
      </Field>
      <SectionHeader title="Google Maps" />
      <Field label="Maps embed URL" help='Go to maps.google.com → Share → Embed a map → copy the URL from src="..."'>
        <Textarea value={c.googleMapsEmbedUrl ?? ""} onChange={(v) => u({ googleMapsEmbedUrl: v })} rows={3} placeholder="https://www.google.com/maps/embed?pb=..." />
      </Field>
      <SectionHeader title="Contact Form" />
      <Field label="Web3Forms key (optional)" help="Free at web3forms.com — form submissions go to the business email">
        <Input value={c.web3formsKey ?? ""} onChange={(v) => u({ web3formsKey: v })} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
      </Field>
    </div>
  );
}

function ExportTab({ c }: { c: BusinessConfig }) {
  const slug = c.name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const type = c.businessType ?? "generic";
  const defaultName = `website-${type}-${slug}`;

  const [repoName, setRepoName] = useState(defaultName);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<{ path?: string; error?: string }>({});

  const doExport = async () => {
    setStatus("loading");
    const res = await fetch("/api/export-repo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoName }),
    });
    const data = await res.json();
    if (data.ok) {
      setStatus("done");
      setResult({ path: data.path });
    } else {
      setStatus("error");
      setResult({ error: data.error });
    }
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Export to New Repo" />
      <p className="text-xs text-white/40 leading-relaxed">
        Creates a fresh copy of this template with the current config, ready to push to GitHub and deploy on Vercel. The current <code className="text-white/60">data/client.json</code> becomes the website config.
      </p>
      <Field label="New repo name" help="Lowercase, letters, numbers, hyphens only">
        <Input value={repoName} onChange={setRepoName} placeholder={defaultName} />
      </Field>
      <p className="text-[11px] text-white/30">
        Will be created at: <code className="text-white/50">~/Documents/Github/{repoName}</code>
      </p>

      {status !== "done" && (
        <button
          onClick={doExport}
          disabled={status === "loading"}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-semibold transition-colors"
        >
          {status === "loading" ? "Creating repo…" : "Export & Init Git Repo"}
        </button>
      )}

      {status === "done" && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 space-y-3">
          <p className="text-sm font-semibold text-green-400">Repo created!</p>
          <p className="text-xs text-white/50 font-mono break-all">{result.path}</p>
          <p className="text-xs text-white/40">Next steps:</p>
          <pre className="text-[11px] text-white/60 bg-white/5 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">{`cd ${result.path}

# Create repo on github.com first, then:
git remote add origin git@github.com:sufanaadrian/${repoName}.git
git push -u origin main

# Then import in vercel.com/new`}</pre>
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-red-400">Error</p>
          <p className="text-xs text-white/50 mt-1">{result.error}</p>
        </div>
      )}

      <div className="border-t border-white/10 pt-5">
        <SectionHeader title="Manual Deploy Steps" />
        <div className="space-y-2 text-xs text-white/40 leading-relaxed">
          <p>1. Make sure all changes are saved (watch for the &quot;Saved&quot; indicator above)</p>
          <p>2. Export the repo using the button above</p>
          <p>3. Create a new repo on github.com (same name, no README)</p>
          <p>4. Push using the commands shown after export</p>
          <p>5. Go to vercel.com/new → Import Git Repository → deploy</p>
          <p>6. Add a custom domain if the client has one</p>
        </div>
      </div>
    </div>
  );
}

// ─── save status indicator ────────────────────────────────────────────────────

function SaveStatus({ status }: { status: "idle" | "saving" | "saved" }) {
  if (status === "saving") return <span className="text-xs text-yellow-400 animate-pulse">Saving…</span>;
  if (status === "saved") return <span className="text-xs text-green-400">Saved ✓</span>;
  return null;
}

// ─── tabs config ──────────────────────────────────────────────────────────────

const TABS = [
  { id: "general",     label: "General" },
  { id: "design",      label: "Design" },
  { id: "hero",        label: "Hero & Booking" },
  { id: "services",    label: "Services" },
  { id: "rooms",       label: "Rooms" },
  { id: "about",       label: "About" },
  { id: "gallery",     label: "Gallery" },
  { id: "reviews",     label: "Reviews" },
  { id: "faq",         label: "FAQ" },
  { id: "social",      label: "Social & Contact" },
  { id: "export",      label: "Export" },
];

// ─── main page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [config, setConfig] = useState<BusinessConfig | null>(null);
  const [tab, setTab] = useState("general");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Load: try localStorage first (survives HMR refreshes), fall back to API
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("admin-draft") : null;
    if (stored) {
      try {
        setConfig(JSON.parse(stored));
        return;
      } catch {}
    }
    fetch("/api/get-config").then((r) => r.json()).then(setConfig);
  }, []);

  const update = useCallback((patch: Partial<BusinessConfig>) => {
    setConfig((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  // Persist to localStorage on every change (instant, survives page reload)
  useEffect(() => {
    if (config) localStorage.setItem("admin-draft", JSON.stringify(config));
  }, [config]);

  // Debounced save to disk (1.5 s after last change)
  useEffect(() => {
    if (!config) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaveStatus("saving");
      await fetch("/api/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSaveStatus("saved");
      // Refresh the preview iframe to show the updated site
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
      setTimeout(() => setSaveStatus("idle"), 3000);
    }, 1500);
    setSaveStatus("idle");
  }, [config]);

  const resetFromDisk = async () => {
    localStorage.removeItem("admin-draft");
    const data = await fetch("/api/get-config").then((r) => r.json());
    setConfig(data);
  };

  if (!config) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40 text-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#111] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-white/30 uppercase tracking-widest">Admin</span>
          <span className="text-white/20 mx-1">›</span>
          <span className="text-sm font-semibold text-white truncate max-w-[200px]">
            {config.name || "New Website"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <SaveStatus status={saveStatus} />
          <button
            onClick={resetFromDisk}
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors"
            title="Discard local draft and reload from saved config"
          >
            Reset draft
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener"
            className="text-[11px] text-white/40 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5"
          >
            Preview site ↗
          </a>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-[380px] flex flex-col border-r border-white/8 bg-[#111] shrink-0">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-white/8 scrollbar-none shrink-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cls(
                  "px-3 py-2.5 text-[11px] font-medium whitespace-nowrap transition-colors shrink-0",
                  tab === t.id
                    ? "text-white border-b-2 border-white"
                    : "text-white/35 hover:text-white/65"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto p-5">
            {tab === "general"  && <GeneralTab      c={config} u={update} />}
            {tab === "design"   && <DesignTab        c={config} u={update} />}
            {tab === "hero"     && <HeroTab           c={config} u={update} />}
            {tab === "services" && <ServicesTab       c={config} u={update} />}
            {tab === "rooms"    && <RoomsTab           c={config} u={update} />}
            {tab === "about"    && <AboutTab           c={config} u={update} />}
            {tab === "gallery"  && <GalleryTab         c={config} u={update} />}
            {tab === "reviews"  && <TestimonialsTab    c={config} u={update} />}
            {tab === "faq"      && <FAQTabContent      c={config} u={update} />}
            {tab === "social"   && <SocialTab          c={config} u={update} />}
            {tab === "export"   && <ExportTab          c={config} />}
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 flex flex-col bg-[#0d0d0d] min-w-0">
          {/* Fake browser bar */}
          <div className="flex items-center gap-3 px-4 py-2 border-b border-white/8 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-[11px] text-white/25 font-mono">localhost:3000</span>
            <button
              onClick={() => {
                if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
              }}
              className="ml-auto text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              ↺ Refresh
            </button>
          </div>
          <iframe
            ref={iframeRef}
            src="/"
            title="Website Preview"
            className="flex-1 w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
