import { Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12">
      <div className="container max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Contact
        </p>
        <div className="flex flex-col items-center justify-center gap-10 min-h-[60vh]">
          <a
            href="mailto:info@young-pay.com"
            className="nav-link text-sm uppercase tracking-[0.25em]"
          >
            info@young-pay.com
          </a>

          <a
            href="https://www.instagram.com/young.pay"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center gap-3 text-sm uppercase tracking-[0.25em]"
          >
            <Instagram className="w-4 h-4" />
            young.pay
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
