import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faLanguage,
    faCoins,
    faGear,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion, faKeyboard, faMessage, faPaperPlane, faUser } from '@fortawesome/free-regular-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import config from '@/config';
import styles from './Header.module.scss';
import images from '@/assets/images';
import Button from '@/components/Button';
import Menu from '@/components/Popper/Menu';
import Search from './Search';
import Image from '@/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout, openModal } from '@/redux/authSlice';

const cx = classNames.bind(styles);

function Header({ fullScreen }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    let navigate = useNavigate();
    const handleOpenModal = () => dispatch(openModal());

    const menuData = [
        {
            icon: <FontAwesomeIcon icon={faLanguage} />,
            title: 'English',
            children: {
                title: 'Language',
                data: [
                    {
                        code: 'en',
                        title: 'English',
                    },
                    {
                        code: 'vi',
                        title: 'Việt Nam',
                    },
                ],
            },
        },
        {
            icon: <FontAwesomeIcon icon={faCircleQuestion} />,
            title: 'Feedback and help',
            to: '/feedback',
        },
        {
            icon: <FontAwesomeIcon icon={faKeyboard} />,
            title: 'Keyboard shortcuts',
            href: 'https://fullstack.edu.vn/',
        },
    ];

    const menuCurrentUser = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get Coins',
            to: '/coins',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...menuData,
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: 'Log out',
            onClick: () => {
                dispatch(handleLogout());
                navigate('/');
            },
            separate: true,
        },
    ];
    return (
        <>
            <header className={cx('wrapper')}>
                <div
                    className={cx('inner', {
                        fullScreen,
                    })}
                >
                    <Link to={config.routes.home} className={cx('logo')}>
                        <img src={images.logo} alt="TikTok" />
                    </Link>
                    <Search />
                    <div className={cx('action')}>
                        {currentUser ? (
                            <>
                                <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                                <Tippy content="Messages" placement="bottom">
                                    <Link to="/messages" className={cx('action-button')}>
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </Link>
                                </Tippy>
                                <Tippy content="Inbox" placement="bottom">
                                    <Link to="/inbox" className={cx('action-button')}>
                                        <FontAwesomeIcon icon={faMessage} />
                                    </Link>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button leftIcon={<FontAwesomeIcon icon={faPlus} />}>Upload</Button>
                                <Button onClick={handleOpenModal} primary>
                                    Log in
                                </Button>
                            </>
                        )}

                        <Menu items={currentUser ? menuCurrentUser : menuData} className={cx('menu-seemore')}>
                            {currentUser ? (
                                <Link to={`/@${currentUser.nickname}`} className={cx('action-avatar')}>
                                    <Image
                                        src={currentUser.avatar}
                                        alt={`${currentUser.first_name} ${currentUser.last_name}`}
                                    />
                                </Link>
                            ) : (
                                <button className={cx('seemore')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
