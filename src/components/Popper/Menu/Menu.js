import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import styles from './Menu.module.scss';
import { PopperWrapper } from '@/components/Popper';
import { useState } from 'react';

import MenuItem from './MenuItem';
import MenuHeader from './Header';
import Button from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Menu({ children, items = [], seeMore, hideOnClick = false, className }) {
    // {data: items cho giong' cau' truc' cua items duoc truyen` tu` header}
    const [menuList, setMenuList] = useState([{ data: items }]);
    // Menu moi nhat luon dung cuoi mang
    const currentMenuList = menuList[menuList.length - 1];

    const handleClickParent = (children) => {
        setMenuList((prev) => {
            return [...prev, children];
        });
    };
    const handleClickBack = () => {
        setMenuList((prev) => {
            return prev.slice(0, prev.length - 1);
        });
    };
    const handleResetToFirstPage = () => {
        setMenuList((prev) => prev.slice(0, 1));
    };

    const handleClickSeeMore = () => {
        setMenuList((prev) => {
            return [...prev, { data: seeMore }];
        });
    };

    const renderItems = () => {
        return currentMenuList.data.map((item, index) => {
            const isParent = !!item.children;
            const handleParentClick = () => {
                if (isParent) {
                    handleClickParent(item.children);
                }
            };
            return <MenuItem key={index} data={item} onClick={item.onClick || handleParentClick} />;
        });
    };

    return (
        <Tippy
            interactive
            hideOnClick={hideOnClick}
            placement="bottom-end"
            delay={[0, 500]}
            render={(attrs) => (
                <div className={cx('menu-list', className)} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {menuList.length > 1 && !seeMore && (
                            <MenuHeader onBack={handleClickBack}> {currentMenuList.title}</MenuHeader>
                        )}
                        <div className={cx('menu-body')}>{renderItems()}</div>

                        {seeMore && menuList.length <= 1 && (
                            <Button className={cx('btn-seemore')} onClick={handleClickSeeMore}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </Button>
                        )}
                    </PopperWrapper>
                </div>
            )}
            // Khi an? thi` tro ve menu dau
            onHide={handleResetToFirstPage}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array.isRequired,
    hideOnClick: PropTypes.bool,
    className: PropTypes.string,
    seeMore: PropTypes.array,
};
export default Menu;
