'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { gsap } from 'gsap';

// ── Nav links ──────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// ── Magnetic button hook ───────────────────────────────────────────────────
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * strength);
      y.set((e.clientY - cy) * strength);
    },
    [x, y, strength],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [onMove, onLeave]);

  return { ref, sx, sy };
}

// ── Active section tracker ─────────────────────────────────────────────────
function useActiveSection(links: typeof NAV_LINKS) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const ids = links.map((l) => l.href.replace('#', ''));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [links]);

  return active;
}

// ── Logo component ─────────────────────────────────────────────────────────
function Logo() {
  const { ref, sx, sy } = useMagnetic(0.4);

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href="#"
      style={{
        x: sx,
        y: sy,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
      }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Logo mark */}
      <div
        style={{ position: 'relative', width: 34, height: 34, flexShrink: 0 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(59,130,246,0.4)',
            borderTopColor: '#60a5fa',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 4,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#1d4ed8,#3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/assets/image/logo.png"
            alt="Logo"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '4px',
            }}
          />
        </div>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid rgba(59,130,246,0.4)',
          }}
        />
      </div>

      {/* Wordmark */}
      <div className="logo-text">
        <span
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            color: '#e2e8f5',
            letterSpacing: '-0.03em',
          }}
        >
          The{' '}
          <span
            style={{
              background: 'linear-gradient(135deg,#3b82f6,#93c5fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Portfolio
          </span>
        </span>
        <div
          style={{
            fontSize: 8,
            color: '#7b8bab',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginTop: -1,
            fontWeight: 600,
          }}
        >
          Portfolio
        </div>
      </div>
    </motion.a>
  );
}

// ── Desktop NavLink ────────────────────────────────────────────────────────
function NavLink({
  link,
  isActive,
  onClick,
}: {
  link: (typeof NAV_LINKS)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const { ref, sx, sy } = useMagnetic(0.3);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={link.href}
      onClick={onClick}
      style={{
        x: sx,
        y: sy,
        position: 'relative',
        fontSize: 13,
        fontWeight: 600,
        color: isActive ? '#e2e8f5' : hovered ? '#c7d8f5' : '#7b8bab',
        textDecoration: 'none',
        padding: '7px 16px',
        borderRadius: 99,
        letterSpacing: '0.04em',
        transition: 'color 0.2s',
        display: 'inline-block',
        zIndex: 1,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Active / hover background pill */}
      {isActive && (
        <motion.div
          layoutId="active-pill"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(59,130,246,0.18)',
            border: '1px solid rgba(59,130,246,0.3)',
            borderRadius: 99,
            zIndex: -1,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {hovered && !isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(59,130,246,0.07)',
            borderRadius: 99,
            zIndex: -1,
          }}
        />
      )}

      {link.label}

      {/* Active dot */}
      {isActive && (
        <motion.div
          layoutId="active-dot"
          style={{
            position: 'absolute',
            bottom: 3,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: '#60a5fa',
            boxShadow: '0 0 6px #3b82f6',
          }}
        />
      )}
    </motion.a>
  );
}

// ── CTA button ─────────────────────────────────────────────────────────────
function CTAButton() {
  const { ref, sx, sy } = useMagnetic(0.45);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href="https://drive.google.com/file/d/14prq3M2W564-xWt8zKpyBUJwWhFCBtin/view?usp=drive_link"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        x: sx,
        y: sy,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#fff',
        background: hovered
          ? 'linear-gradient(135deg,#1d4ed8,#2563eb)'
          : 'linear-gradient(135deg,#2563eb,#3b82f6)',
        padding: '9px 20px',
        borderRadius: 99,
        textDecoration: 'none',
        boxShadow: hovered
          ? '0 6px 24px rgba(59,130,246,0.5)'
          : '0 2px 12px rgba(59,130,246,0.3)',
        transition: 'all 0.25s',
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      Résumé
    </motion.a>
  );
}

// ── Mobile menu overlay ────────────────────────────────────────────────────
function MobileMenu({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,8,16,0.85)',
              backdropFilter: 'blur(12px)',
              zIndex: 40,
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: 'rgba(9,13,26,0.97)',
              borderLeft: '1px solid rgba(59,130,246,0.12)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              padding: '80px 24px 48px',
              gap: 0,
            }}
          >
            {/* Decorative glow */}
            <div
              style={{
                position: 'absolute',
                top: -80,
                right: -80,
                width: 280,
                height: 280,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7b8bab',
                marginBottom: 36,
              }}
            >
              Navigation
            </div>

            {/* Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {NAV_LINKS.map((link, i) => {
                const id = link.href.replace('#', '');
                const isAct = active === id;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.07 + 0.1,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderRadius: 14,
                      background: isAct
                        ? 'rgba(59,130,246,0.12)'
                        : 'transparent',
                      border: `1px solid ${isAct ? 'rgba(59,130,246,0.25)' : 'transparent'}`,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                    >
                      <span
                        className="mobile-nav-label"
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontWeight: 800,
                          letterSpacing: '-0.03em',
                          color: isAct ? '#e2e8f5' : '#3d4d6b',
                          transition: 'color 0.2s',
                        }}
                      >
                        {link.label}
                      </span>
                    </div>
                    {isAct && (
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#60a5fa',
                          boxShadow: '0 0 8px #3b82f6',
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              style={{ marginTop: 'auto' }}
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 9,
                  width: '100%',
                  padding: '14px',
                  borderRadius: 14,
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg,#2563eb,#3b82f6)',
                  color: '#fff',
                  fontFamily: "'Space Grotesk',sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Résumé
              </a>

              <p
                style={{
                  fontSize: 10,
                  color: '#7b8bab',
                  textAlign: 'center',
                  marginTop: 20,
                  letterSpacing: '0.05em',
                }}
              >
                muhammadahmed@gmail.com
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Hamburger button ───────────────────────────────────────────────────────
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: open ? 'rgba(59,130,246,0.15)' : 'rgba(11,15,30,0.8)',
        border: `1px solid ${open ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.12)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.25s',
        flexDirection: 'column',
        gap: 5,
        padding: 0,
      }}
    >
      <motion.span
        animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'block',
          width: 16,
          height: 1.5,
          background: open ? '#60a5fa' : '#7b8bab',
          borderRadius: 2,
          transformOrigin: 'center',
        }}
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          display: 'block',
          width: 16,
          height: 1.5,
          background: '#7b8bab',
          borderRadius: 2,
        }}
      />
      <motion.span
        animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'block',
          width: 16,
          height: 1.5,
          background: open ? '#60a5fa' : '#7b8bab',
          borderRadius: 2,
          transformOrigin: 'center',
        }}
      />
    </button>
  );
}

// ── Main Navbar ────────────────────────────────────────────────────────────
export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobile] = useState(false);
  const active = useActiveSection(NAV_LINKS);

  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on('change', (y) => setScrolled(y > 60));
  }, [scrollY]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' },
    );
  }, []);

  const navBg = scrolled ? 'rgba(8,12,24,0.85)' : 'transparent';
  const navBorder = scrolled
    ? '1px solid rgba(59,130,246,0.12)'
    : '1px solid transparent';
  const navBlur = scrolled ? 'blur(20px)' : 'none';
  const navShadow = scrolled
    ? '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(59,130,246,0.06)'
    : 'none';
  const navRadius = scrolled ? 999 : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>

      <motion.nav
        ref={navRef as React.Ref<HTMLElement>}
        className={`main-nav ${scrolled ? 'scrolled' : ''}`}
        style={{
          position: 'fixed',
          background: navBg,
          border: navBorder,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          boxShadow: navShadow,
          borderRadius: navRadius,
          zIndex: 100,
          fontFamily: "'Space Grotesk', sans-serif",
          /* Change: overflow hidden add kiya taake scrolled state par inner layout content round caps se touch ya overlap na kare */
          overflow: scrolled ? 'hidden' : 'visible',
        }}
      >
        <div
          className="nav-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: scrolled ? 'rgba(11,15,30,0.6)' : 'transparent',
              border: scrolled
                ? '1px solid rgba(59,130,246,0.1)'
                : '1px solid transparent',
              borderRadius: 99,
              padding: scrolled ? '4px' : '0',
              transition: 'all 0.45s cubic-bezier(0.22,1,0.36,1)',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                link={link}
                isActive={active === link.href.replace('#', '')}
                onClick={() => {}}
              />
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="desktop-cta">
              <CTAButton />
            </div>
            <div className="mobile-toggle">
              <Hamburger
                open={mobileOpen}
                onClick={() => setMobile(!mobileOpen)}
              />
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            left: 0,
            height: 1,
            background: 'linear-gradient(90deg,#2563eb,#60a5fa)',
            transformOrigin: 'left',
            scaleX: useTransform(scrollY, [0, 3000], [0, 1]),
            borderRadius: '0 0 999px 999px',
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobile(false)}
        active={active}
      />

      {/* Responsive layout & font sizing updates */}
      <style>{`
        /* Desktop Base Styles */
        .main-nav {
          top: 0px; left: 0px; width: 100%;
          padding: 20px 40px;
          transition: top 0.45s, left 0.45s, width 0.45s, padding 0.45s, background 0.45s, border-radius 0.45s, box-shadow 0.45s;
          transition-timing-function: cubic-bezier(0.22,1,0.36,1);
        }
        .main-nav.scrolled {
          top: 16px; left: 40px; width: calc(100% - 80px);
          padding: 10px 24px;
        }
        .nav-container { padding: 0; transition: padding 0.45s cubic-bezier(0.22,1,0.36,1); }
        .logo-text span { font-size: 17px; }
        .desktop-nav  { display: flex !important; }
        .desktop-cta  { display: block !important; }
        .mobile-toggle{ display: none  !important; }
        .mobile-nav-label { font-size: 24px; }

        /* Responsive Breakpoint (Tablet/Mobile) */
        @media (max-width: 768px) {
          .main-nav {
            top: 0px !important; left: 0px !important; width: 100% !important;
            padding: 16px 20px !important;
          }
          .main-nav.scrolled {
            top: 12px !important; left: 16px !important; width: calc(100% - 32px) !important;
            padding: 10px 18px !important;
          }
          .logo-text span { font-size: 15px; } 
          .desktop-nav  { display: none  !important; }
          .desktop-cta  { display: none  !important; }
          .mobile-toggle{ display: block !important; }
          .mobile-nav-label { font-size: max(1.35rem, 4.5vw); } 
        }
      `}</style>
    </>
  );
}