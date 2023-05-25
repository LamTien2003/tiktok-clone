import styles from './PreviewAccount.module.scss';
import classNames from 'classnames/bind';
import Image from '@/components/Image';
import Button from '@/components/Button';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function PreviewAccount({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Image src={data.avatar} alt={data.full_name} className={cx('image')} />
                <Button primary size="small" className={cx('button')}>
                    Follow
                </Button>
            </div>
            <div className={cx('body')}>
                <div className={cx('name')}>
                    <h4 className={cx('username')}> {`${data.first_name} ${data.last_name}`}</h4>
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                </div>
                <span className={cx('name-description')}>{data.nickname}</span>
            </div>
            <div className={cx('footer')}>
                <span className={cx('follow-count')}>{data.followers_count}</span>
                <span className={cx('follow')}>Follower</span>
                <span className={cx('like-count')}>{data.likes_count}</span>
                <span className={cx('like')}>Thích</span>
            </div>
        </div>
    );
}

export default PreviewAccount;
