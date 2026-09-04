import { sectionContainer, sectionPaddingX } from '@/constants/global.styles';
import { routePaths } from '@/router/routePaths';
import { ChevronRight, House } from 'lucide-react';
import { type ReactNode } from 'react';
import { Link, useLocation, useMatches } from 'react-router-dom';

interface BreadcrumbMatch {
  id: string;
  pathname: string;
  params: Record<string, string>;
  handle: {
    breadcrumb?: string | ((params: Record<string, string>) => ReactNode);
  };
}

const BreadCrumb = () => {
  const location = useLocation();
  const matches = useMatches() as BreadcrumbMatch[];

  if (location.pathname === routePaths.HOME) return null;

  const crumbs = matches.filter(m => m.handle?.breadcrumb && m.pathname !== routePaths.HOME);

  return (
    <section
      className="hidden lg:block w-full bg-no-repeat bg-cover"
      style={{ backgroundImage: `url("/images/breadcrumb-bg.png") ` }}
      aria-label="Bread crumb"
    >
      <div
        className={`${sectionContainer} ${sectionPaddingX} flex items-center gap-2 h-[120px]`}
        aria-label="Bread crumb navigation container"
      >
        {/* Home icon */}
        <Link to={routePaths.HOME} aria-label="Home">
          <House className="w-5 h-5 text-gray-500 hover:text-primary-soft transition-colors" />
        </Link>

        {crumbs.map((match, index) => {
          const isLast = index === crumbs.length - 1;
          const label =
            typeof match.handle.breadcrumb === 'function'
              ? match.handle.breadcrumb(match.params)
              : match.handle.breadcrumb;

          return (
            <span key={match.id} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
              {isLast ? (
                <span className="text-sm font-medium text-gray-400 flex items-center">{label}</span>
              ) : (
                <Link
                  to={match.pathname}
                  className="text-sm text-gray-500 hover:text-primary-soft transition-colors flex items-center"
                >
                  {label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </section>
  );
};
export default BreadCrumb;
