import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Send, Info } from "lucide-react";
import { PROFILE } from "../../lib/data";
import SectionHeading from "../SectionHeading";
import { cn } from "../../lib/utils";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

const inputBase =
  "w-full rounded-xl border bg-white/4 px-4 py-3 font-body text-[14px] text-silver placeholder:text-mist/45 outline-none transition-colors duration-300 focus:border-electric/55";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!form.subject.trim()) next.subject = "Please enter a subject.";
    if (!form.message.trim()) next.message = "Please write a message.";
    else if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    return next;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    const subject = encodeURIComponent(form.subject);
    setStatus("opening");
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("idle"), 2500);
  };

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const contactLinks = [
    {
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      Icon: Mail,
    },
    {
      label: "LinkedIn",
      value: "shivam-pandey-b20088321",
      href: PROFILE.linkedin,
      Icon: Linkedin,
    },
    {
      label: "GitHub",
      value: "Shivampandit62",
      href: PROFILE.github,
      Icon: Github,
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Contact" title="Let's Connect" />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6 }}
          className="font-body -mt-6 mb-12 max-w-2xl text-[15px] leading-[1.85] text-mist"
        >
          I'm always interested in connecting with developers, exchanging ideas
          and exploring opportunities to work on interesting technology
          projects.
        </motion.p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {contactLinks.map(({ label, value, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300 hover:border-electric/30"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-azure">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block font-body text-[11px] tracking-[0.2em] text-mist/60 uppercase">
                    {label}
                  </span>
                  <span className="block truncate font-body text-[14px] text-silver transition-colors duration-300 group-hover:text-azure">
                    {value}
                  </span>
                </span>
              </a>
            ))}

            <p className="inline-flex items-center gap-2 px-1 pt-2 font-body text-[13px] text-mist/70">
              <MapPin size={14} className="text-azure/70" />
              {PROFILE.location}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <form onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block font-body text-[12px] tracking-wide text-mist"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    className={cn(
                      inputBase,
                      errors.name ? "border-red-400/60" : "border-white/10",
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 font-body text-[11.5px] text-red-400/90">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block font-body text-[12px] tracking-wide text-mist"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={cn(
                      inputBase,
                      errors.email ? "border-red-400/60" : "border-white/10",
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 font-body text-[11.5px] text-red-400/90">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="subject"
                  className="mb-1.5 block font-body text-[12px] tracking-wide text-mist"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={set("subject")}
                  placeholder="What's this about?"
                  aria-invalid={Boolean(errors.subject)}
                  className={cn(
                    inputBase,
                    errors.subject ? "border-red-400/60" : "border-white/10",
                  )}
                />
                {errors.subject && (
                  <p className="mt-1 font-body text-[11.5px] text-red-400/90">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-body text-[12px] tracking-wide text-mist"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Write your message..."
                  aria-invalid={Boolean(errors.message)}
                  className={cn(
                    inputBase,
                    "resize-none",
                    errors.message ? "border-red-400/60" : "border-white/10",
                  )}
                />
                {errors.message && (
                  <p className="mt-1 font-body text-[11.5px] text-red-400/90">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-electric to-indigo px-6 py-3.5 font-body text-[14px] font-medium text-white shadow-[0_10px_30px_-14px_rgba(59,130,246,0.9)] transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
              >
                <Send size={15} />
                {status === "opening" ? "Opening email app..." : "Send Message"}
              </button>

              <p className="mt-4 inline-flex items-start gap-2 font-body text-[12px] leading-relaxed text-mist/65">
                <Info size={14} className="mt-0.5 shrink-0 text-azure/60" />
                This form opens your default email app addressed to{" "}
                {PROFILE.email} — no message data is stored on a server.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
