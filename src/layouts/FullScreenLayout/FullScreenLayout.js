import PropTypes from 'prop-types';
import Header from '@/layouts/components/Header';
import styles from './FullScreenLayout.module.scss';
import classNames from 'classnames/bind';

import Sidebar from '@/layouts/components/Sidebar';
const cx = classNames.bind(styles);
function FullScreenLayout({ children }) {
    return (
        <div>
            <Header fullScreen />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar size="small" />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

FullScreenLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FullScreenLayout;
