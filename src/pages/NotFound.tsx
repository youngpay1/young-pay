import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Page not found
        </p>
        <Link
          to="/"
          className="nav-link inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
        >
          Back Home
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
