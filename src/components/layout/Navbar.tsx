import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { useState } from 'react';

const iconColor = '#9b9b9b';

const MenuIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 484.86 438.78" fill="none">
    <path d="M457.79,54.62l-429.72.04C10.88,54.66.08,41.98,0,27.37-.08,13.22,10.98.05,28.04.05L456.43,0c16.06,0,27.19,11.33,28.33,24.85,1.15,13.57-8.32,29.77-26.98,29.77Z" fill={iconColor} />
    <path d="M454.92,191.88c18.91,0,29.92,12.76,29.94,27.54.02,14.51-11.43,27.44-28.53,27.44H28.02c-17.34-.02-27.94-13.18-28.01-27.59-.07-14.17,10.85-27.32,28.04-27.32l426.86-.07Z" fill={iconColor} />
    <path d="M454.91,384.1c18.94,0,29.85,12.36,29.89,27.22.03,14.74-11.28,27.46-28.44,27.46l-428.34-.04c-17.38,0-27.99-13.16-28-27.5,0-16.73,12.67-27.14,30.89-27.14h424Z" fill={iconColor} />
  </svg>
);

const navLinks = [
  { path: '/', label: 'HOME' },
  { path: '/portfolio', label: 'PORTFOLIO' },
  { path: '/contact', label: 'CONTACT' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between h-20 md:h-20 px-5 md:px-8 pt-4">
        {/* Mobile: Hamburger (left) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg width={20} height={20} viewBox="0 0 484.86 439.29" fill="none">
              <path d="M63.04,431.78c-11.03,10.85-26.65,9.15-35.83,0-7.24-7.22-11.43-24.05-1.32-34.02l180.49-177.96L27.18,44.65c-10.79-10.55-11.19-26.68-1.22-36.6,9.86-9.81,25.48-10.18,37.07,1.12l179.48,175.13L422.69,7.09c10.18-10.01,25.78-8.93,35.05.2,7.69,7.57,11.83,24.27,1.6,34.35l-180.61,178.05,179.22,175.04c10.62,10.37,11.11,27.09,1.21,36.55-9.36,8.95-24.54,11.17-35.62.36l-180.9-176.48L63.04,431.78Z" fill="#ffffff" />
            </svg>
          ) : <MenuIcon />}
        </button>

        {/* Desktop: Logo (left) */}
        <Link to="/" className="hidden md:flex items-center">
          <img
            src="/young-pay-logo.png"
            alt="Young Pay"
            className="h-10 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const sibling = target.nextElementSibling as HTMLElement;
              if (sibling) sibling.style.display = 'block';
            }}
          />
          <span
            className="font-display text-sm tracking-[0.25em] uppercase"
            style={{ display: 'none' }}
          >
            YOUNG PAY
          </span>
        </Link>

        {/* Mobile: Logo (right) */}
        <Link to="/" className="md:hidden flex items-center">
          <img
            src="/young-pay-logo.png"
            alt="Young Pay"
            className="h-8 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const sibling = target.nextElementSibling as HTMLElement;
              if (sibling) sibling.style.display = 'block';
            }}
          />
          <span
            className="font-display text-xs tracking-[0.25em] uppercase"
            style={{ display: 'none' }}
          >
            YOUNG PAY
          </span>
        </Link>

        {/* Desktop Navigation — centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link font-body text-sm tracking-wide ${
                location.pathname === link.path ? 'text-foreground' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right spacer (keeps logo centered on desktop) */}
        <div className="hidden md:block w-[72px]" />
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/70 animate-fade-in z-[-1]" />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[68px] left-0 right-0 bottom-0 animate-fade-in">
          <div className="container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-display text-lg tracking-wide transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-foreground [text-shadow:0_0_2px_hsl(142_71%_65%),0_0_5px_hsl(142_71%_60%),0_0_10px_hsl(142_71%_50%),0_0_20px_hsl(142_71%_50%),0_0_40px_hsl(142_71%_50%/0.8),0_0_60px_hsl(142_71%_50%/0.6),0_0_80px_hsl(142_71%_50%/0.4)]'
                    : 'text-foreground/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
