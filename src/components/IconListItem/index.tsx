import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import navigator from '../../navigator';

const IconListItem = ({ link, icon }) => {
  return (
    <li>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={classNames('icon', {
          iconHover: !navigator(),
        })}
        href={link}
        style={{ color: 'white' }}
      >
        <FontAwesomeIcon icon={icon} />
      </a>
    </li>
  );
};

export default IconListItem;
