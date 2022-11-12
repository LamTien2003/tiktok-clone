import styles from './Header.module.scss';
import classNames from 'classnames/bind';

import { faCheckCircle, faEllipsis, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '@/components/Image';
import Button from '@/components/Button';
const cx = classNames.bind(styles);

function Header({ data }) {
    return (
        <div className={cx('header')}>
            <div className={cx('main-info')}>
                <div className={cx('user-avatar')}>
                    <Image className={cx('image')} src={data.avatar} />
                </div>
                <div className={cx('user-info')}>
                    <h3 className={cx('username')}>
                        {data.nickname}
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </h3>
                    <h4 className={cx('subname')}>{`${data.first_name} ${data.last_name}`}</h4>
                    {data.is_followed ? (
                        <Button outline className={cx('message-btn')}>
                            Message
                        </Button>
                    ) : (
                        <Button primary className={cx('follow-btn')}>
                            Follow
                        </Button>
                    )}
                </div>
                <div className={cx('user-action')}>
                    <FontAwesomeIcon className={cx('user-action-icon')} icon={faShare} />
                    <FontAwesomeIcon className={cx('user-action-icon')} icon={faEllipsis} />
                </div>
            </div>
            <div className={cx('sub-info')}>
                <div className={cx('sub-info-child')}>
                    <strong>{data.followings_count}</strong>
                    <span>Following</span>
                </div>
                <div className={cx('sub-info-child')}>
                    <strong>{data.followers_count}</strong>
                    <span>Followers</span>
                </div>
                <div className={cx('sub-info-child')}>
                    <strong>{data.likes_count}</strong>
                    <span>Likes</span>
                </div>
            </div>
            <div className={cx('description')}>{data.bio}</div>
        </div>
    );
}

export default Header;
