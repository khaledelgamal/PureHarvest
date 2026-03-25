import { Link } from 'react-router-dom';
import type { FooterLink } from '../../types';

type FooterLinkColumnProps = {
  title: string;
  links: FooterLink[];
};

const FooterLinkColumn = ({ title, links }: FooterLinkColumnProps) => {
  return (
    <div>
      <h3 className="text-white text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-400">
        {links.map(({ label, to }) => (
          <li key={label}>
            <Link to={to} className="hover:text-green-400 transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkColumn;
