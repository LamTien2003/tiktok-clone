import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from '@/components/Popper/Menu/Menu.module.scss';

const cx = classNames.bind(styles);
function MenuHeader({ children, onBack }) {
    return (
        <header className={cx('menu-header')}>
            <button onClick={onBack} className={cx('menu-header-icon')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <span className={cx('menu-header-title')}>{children}</span>
        </header>
    );
}
MenuHeader.propTypes = {
    children: PropTypes.node.isRequired,
    onBack: PropTypes.func,
};

export default MenuHeader;
