export interface Mix {
  id: string;
  title: string;
  date: string;
  duration?: string;
  url?: string;
  coverImage?: string;
}

export const mixes: Mix[] = [
  // Add mixes here — each entry needs at minimum: id, title, date
  // Optional: url (SoundCloud / Mixcloud link), coverImage, duration
];

const Mixes = () => {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12">
      <div className="container max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Mixes
        </p>

        {mixes.length > 0 ? (
          <div className="space-y-0">
            {mixes.map((mix) => (
              <div key={mix.id} className="group border-b border-border/20">
                {mix.url ? (
                  <a
                    href={mix.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-5 flex items-baseline justify-between"
                  >
                    <div className="flex items-baseline gap-4 md:gap-12">
                      <span className="nav-link-group text-xs shrink-0">
                        {new Date(mix.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="nav-link-group text-sm md:text-base uppercase tracking-widest">
                        {mix.title}
                      </span>
                      {mix.duration && (
                        <span className="nav-link-group text-xs text-muted-foreground shrink-0">
                          {mix.duration}
                        </span>
                      )}
                    </div>
                    <span className="nav-link-group text-xs uppercase tracking-widest shrink-0">
                      Listen →
                    </span>
                  </a>
                ) : (
                  <div className="py-5 flex items-baseline gap-4 md:gap-12">
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(mix.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <span className="text-sm md:text-base uppercase tracking-widest text-foreground/70">
                      {mix.title}
                    </span>
                    {mix.duration && (
                      <span className="text-xs text-muted-foreground shrink-0">
                        {mix.duration}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Mixes coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mixes;
