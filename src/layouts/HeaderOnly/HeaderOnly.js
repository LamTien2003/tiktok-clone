import PropTypes from 'prop-types';
import Header from '@/layouts/components/Header';
import styles from './HeaderOnly.module.scss';
import classNames from 'classnames/bind';

import Sidebar from '@/layouts/components/Sidebar';
const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div>
            <Header fullScreen />
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}> {children}</div>
            </div>
        </div>
    );
}

HeaderOnly.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;
