import styles from './CategoryAccount.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function CategoryAccount({ title, seemore, children }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{title}</p>
            {children}
            {seemore && <p className={cx('see-more')}>See more</p>}
        </div>
    );
}
CategoryAccount.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};
export default CategoryAccount;
