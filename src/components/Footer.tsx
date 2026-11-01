import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../lib/data";
import { smoothScrollTo } from "../lib/utils";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/6 bg-void">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <button
              onClick={() => smoothScrollTo("home")}
              className="font-display text-xl font-bold tracking-[0.2em] text-gradient"
            >
              SP
            </button>
            <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-mist">
              {PROFILE.title}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 font-body text-[13px] text-mist/80">
              <MapPin size={14} className="text-azure/70" />
              {PROFILE.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => smoothScrollTo(link.id)}
                    className="font-body text-sm text-mist transition-colors duration-300 hover:text-azure"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {[
              { href: PROFILE.github, label: "GitHub", Icon: Github },
              { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer noopener"
                aria-label={label}
                className="glass inline-flex h-10 w-10 items-center justify-center rounded-full text-mist transition-all duration-300 hover:text-azure hover:glow-ring"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/6 pt-6 sm:flex-row">
          <p className="font-body text-[12px] text-mist/70">
            © {year} {PROFILE.name}. Built with React, TypeScript & Three.js.
          </p>
          <p className="font-body text-[12px] text-mist/50">
            Designed & developed by {PROFILE.name}.
          </p>
        </div>
      </div>
    </footer>
  );
}
