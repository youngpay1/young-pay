import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { collaborations } from '@/data/collaborations';
import HeroParticles from '@/components/HeroParticles';

const previewItems = collaborations.filter((c) => c.images?.[0]).slice(0, 6);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="/hero.png"
          alt="Young Pay"
          className="w-full h-full object-cover scale-125"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <HeroParticles />
      </section>

      {/* About */}
      <section className="py-20 md:py-[60px]">
        <div className="container max-w-4xl">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Some people make music. Young Pay connects the dots.
          </p>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
            Operating between Europe and America, he has spent over seven years building the
            infrastructure that carries rap culture across borders — booking American artists
            for European stages, routing Russian and CIS acts into untapped markets, and running
            events across 15+ countries.
          </p>
          <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
            Through multiple agencies and event companies, Young Pay connects artists, brands, merch,
            and their audiences — and bridges the gap between scenes.
          </p>
        </div>
      </section>

      {/* Collaborations preview grid */}
      <section className="py-16 md:py-[80px]">
        <div className="container max-w-4xl">
          <div className="flex items-center justify-between mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Portfolio
            </p>
            <Link
              to="/collaborations"
              className="nav-link text-xs uppercase tracking-widest flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {previewItems.map((collab) => (
              <Link
                key={collab.id}
                to="/collaborations"
                className="group relative aspect-square overflow-hidden bg-black"
              >
                <img
                  src={collab.images![0]}
                  alt={collab.name}
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-background/40 transition-all duration-500 group-hover:bg-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end gap-1 px-2 pb-3 z-10">
                  <span className="nav-link-group text-xs md:text-sm uppercase tracking-widest text-center">
                    {collab.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Index;
