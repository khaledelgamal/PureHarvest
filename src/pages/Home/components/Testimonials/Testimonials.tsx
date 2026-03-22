import { useTranslation } from 'react-i18next';
import type { Comment } from './components/CommentCard/types';
import CommentCard from './components/CommentCard/CommentCard';
import { sectionContainer } from '@/constants/global.styles';

const tRoute = 'pages.Home.components.Testimonials';

const Testimonials = () => {
  const comments: Comment[] = [
    {
      name: 'Jenny Wilson',
      role: 'Customer',
      image: '/images/Jenny.png',
      comment:
        'Aenean et nisl eget eros consectetur vestibulum vel id erat. Aliquam feugiat massa dui. Sed sagittis diam sit amet ante sodales semper. Aliquam commodo lorem laoreet ultricies ele. ',
    },
    {
      name: 'Guy Hawkins',
      role: 'Customer',
      image: '/images/Guy.png',
      comment:
        'Proin sed neque nec tellus malesuada ultrices eget a justo. Nullam a nibh faucibus, semper risus ac, ultricies est. Maecenas eget purus in enim imperdiet dapibus in ac mi. Fusce faucibus lacus felis',
    },
    {
      name: 'Kathryn Murphy',
      role: 'Customer',
      image: '/images/Kathryn.png',
      comment:
        'Nam sed odio diam. Mauris sagittis sapien sed convallis cursus. Proin mattis ultrices urna ac eleifend. Cras vel nisi nec lectus sagittis venenatis. Curabitur laoreet leo sed lorem pulvina',
    },
  ];
  const { t } = useTranslation();

  return (
    <section className="bg-green-gray-50  py-[100px] overflow-hidden relative">
      <div className={`${sectionContainer} flex flex-col gap-11 justify-center items-center`}>
        <h3 className="text-[40px] font-semibold">
          {t(`${tRoute}.title`, 'What our Clients Says')}
        </h3>
        <div className="flex gap-6">
          {comments.map(comment => {
            return <CommentCard comment={comment} />;
          })}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
