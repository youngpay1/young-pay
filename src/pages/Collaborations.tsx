import { collaborations } from '@/data/collaborations';

const Collaborations = () => {

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-12">
      <div className="container max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-12 text-center">
          Portfolio
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {collaborations.map((collab) => {
            const img = collab.images?.[0];
            return (
              <div
                key={collab.id}
                className="group relative aspect-square overflow-hidden bg-black"
              >
                {img && (
                  <img
                    src={img}
                    alt={collab.name}
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                )}
                <div className="absolute inset-0 bg-background/40 transition-all duration-500 group-hover:bg-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end gap-1 px-2 pb-3 z-10">
                  <span className="nav-link-group text-xs md:text-sm uppercase tracking-widest text-center">
                    {collab.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Collaborations;
