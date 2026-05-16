import { sectionContainer } from '@/constants/global.styles';

const IntroductorySection = () => {
  return (
    <div className={`${sectionContainer} flex gap-14 my-20 items-center justify-between `}>
      <div className="flex flex-col gap-8 w-0 flex-1">
        <h2 className="text-gray-900 text-6xl font-semibold">100% Trusted Organic Food Store</h2>
        <p className="text-gray-600 text-lg ">
          Morbi porttitor ligula in nunc varius sagittis. Proin dui nisi, laoreet ut tempor ac,
          cursus vitae eros. Cras quis ultricies elit. Proin ac lectus arcu. Maecenas aliquet vel
          tellus at accumsan. Donec a eros non massa vulputate ornare. Vivamus ornare commodo ante,
          at commodo felis congue vitae.
        </p>
      </div>
      <img
        src="/images/happy_man_carrying_organic_food.png"
        alt="Happy man carrying organic food"
        className="flex-1 w-0"
      />
    </div>
  );
};
export default IntroductorySection;
