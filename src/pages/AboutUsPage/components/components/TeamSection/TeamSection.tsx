import FacebookIcon from '@/icons/FacebookIcon';
import InstagramIcon from '@/icons/InstagramIcon';
import PinterestIcon from '@/icons/PinterestIcon';
import TwitterIcon from '@/icons/TwitterIcon';
import { classNames } from '@/utils';
import { baseStyles, iconStyles } from '@/components/Buttons/SocialButton/styles';
import { sectionContainer } from '@/constants/global.styles';

const TeamSection = () => {
  const teamMembers = [
    {
      name: 'Jenny Wilson',
      role: 'CEO & Founder',
      image: '/images/Jenny Wilson.png',
    },
    {
      name: 'Jane Cooper',
      role: 'Worker',
      image: '/images/Jane Cooper.png',
    },
    {
      name: 'Cody Fisher',
      role: 'Security Guard',
      image: '/images/Cody Fisher.png',
    },
    {
      name: 'Robert Fox',
      role: 'Senior Farmer Manager',
      image: '/images/Robert Fox.png',
    },
  ];

  return (
    <section className="bg-gray-50/50 py-16 sm:py-20">
      <div className={sectionContainer}>
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900">
            Our Awesome Team
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-gray-600">
            Pellentesque a ante vulputate leo porttitor luctus sed eget eros. Nulla et rhoncus
            neque. Duis non diam eget est luctus tincidunt a a mi.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map(member => (
            <article
              key={member.name}
              className="group rounded-[10px] overflow-hidden border border-gray-100 bg-white"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      baseStyles,
                      'bg-white text-gray-900 hover:bg-green-600 hover:text-white',
                    )}
                  >
                    <FacebookIcon className={iconStyles} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      baseStyles,
                      'bg-white text-gray-900 hover:bg-green-600 hover:text-white',
                    )}
                  >
                    <TwitterIcon className={iconStyles} />
                  </a>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      baseStyles,
                      'bg-white text-gray-900 hover:bg-green-600 hover:text-white',
                    )}
                  >
                    <PinterestIcon className={iconStyles} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className={classNames(
                      baseStyles,
                      'bg-white text-gray-900 hover:bg-green-600 hover:text-white',
                    )}
                  >
                    <InstagramIcon className={iconStyles} />
                  </a>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-[18px] font-medium text-gray-900">{member.name}</h3>
                <p className="text-[14px] text-gray-500">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
