import PropTypes from 'prop-types';
import styles from './CategoryAccount.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '@/components/Image';
import { PopperWrapper } from '@/components/Popper';
import PreviewAccount from './PreviewAccount';
const cx = classNames.bind(styles);

function AccountItem({ data }) {
    const renderPopper = (attrs) => (
        <div tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('preview-account')}>
                <PreviewAccount data={data} />
            </PopperWrapper>
        </div>
    );
    return (
        <Tippy interactive delay={[300, 0]} offset={[-7, 0]} placement="bottom" render={renderPopper}>
            <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                <Image src={data.avatar} alt={data.full_name} className={cx('image')} />
                <div className={cx('info')}>
                    <div className={cx('name')}>
                        <h4 className={cx('username')}> {`${data.first_name} ${data.last_name}`}</h4>
                        {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
                    </div>
                    <span className={cx('name-description')}>{data.nickname}</span>
                </div>
            </Link>
        </Tippy>
    );
}
AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
