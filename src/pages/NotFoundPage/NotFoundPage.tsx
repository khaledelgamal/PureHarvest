import { ButtonLink } from '@/components/Buttons/ButtonLink/ButtonLink';
import { routePaths } from '@/router/routePaths';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="relative w-full max-w-2xl h-80 mb-10 flex items-center justify-center overflow-hidden">
        <img src="/images/not_found.svg" alt="404 Illustration" />
      </div>

      <h1 className="text-[40px] font-semibold text-[#1A1A1A] mb-4 text-center leading-tight font-poppins">
        Oops! page not found
      </h1>

      <p className="text-gray-500 text-base text-center max-w-xl mb-8 leading-relaxed font-poppins">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable. Please check the URL or return to the homepage.
      </p>

      <ButtonLink to={routePaths.HOME} size="lg">
        Back to Home
      </ButtonLink>
    </div>
  );
}
