import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../Image';
import Button from '../Button';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function VideoHeader({ data }) {
    return (
        <div className={cx('header')}>
            <div className={cx('left')}>
                <Image src={data.user.avatar} className={cx('avatar')} />
            </div>
            <div className={cx('right')}>
                <Link to={`/@${data.user.nickname}`} className={cx('info')}>
                    <h3 className={cx('username')}>{`${data.user.first_name} ${data.user.last_name}`}</h3>
                    <h4 className={cx('subname')}>{data.user.nickname}</h4>
                </Link>
                <div className={cx('post')}>
                    <span className={cx('title')}>{data.description}</span>
                    <Link to="/" className={cx('tag')}>
                        #xh
                    </Link>
                    <Link to="/" className={cx('tag')}>
                        #fyp
                    </Link>
                    <Link to="/" className={cx('tag')}>
                        #xuhuong
                    </Link>
                </div>
                <Link to="/" className={cx('music')}>
                    <span>
                        <FontAwesomeIcon icon={faMusic} />
                    </span>
                    <span className={cx('song')}>{data.music}</span>
                </Link>
            </div>
            {!data.user.is_followed && (
                <Button outline size="small" className={cx('button-follow')}>
                    Follow
                </Button>
            )}
        </div>
    );
}

export default VideoHeader;
