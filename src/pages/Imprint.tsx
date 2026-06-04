const Imprint = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12">
      <div className="container max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Legal Notice
        </p>
        <div className="max-w-md mx-auto space-y-8 text-sm text-foreground/70 leading-relaxed">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Responsible
            </p>
            <p>Peimaan Nazary</p>
            <p>Frankfurt am Main, Germany</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Contact
            </p>
            <p>
              <a
                href="mailto:info@young-pay.com"
                className="nav-link"
              >
                info@young-pay.com
              </a>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Disclaimer
            </p>
            <p className="text-xs text-foreground/50">
              Despite careful control of the content, we assume no liability for the content of
              external links. The operators of linked pages are solely responsible for their content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Imprint;
