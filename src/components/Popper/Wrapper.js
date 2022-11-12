import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './PopperStyle.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className, ...props }) {
    return (
        <div className={cx('wrapper', className)} {...props}>
            {' '}
            {children}
        </div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
export default Wrapper;
