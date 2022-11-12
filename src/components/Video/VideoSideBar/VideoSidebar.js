import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './VideoSidebar.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faHeart, faLink, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import Menu from '@/components/Popper/Menu';
import { useState } from 'react';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);
const menuData = [
    {
        icon: <FontAwesomeIcon icon={faLink} />,
        title: 'Embed',
    },
    {
        icon: <FontAwesomeIcon icon={faShareAlt} />,
        title: 'Send to friends',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faFacebook} />,
        title: 'Share to Facebook',
        href: 'https://fullstack.edu.vn/',
    },
];
const menuSeeMore = [
    ...menuData,
    {
        icon: <FontAwesomeIcon icon={faHeart} />,
        title: 'Yêu thích',
        to: '/feedback',
    },
];
function VideoSidebar({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar-video-item')}>
                <button className={cx('sidebar-button')}>
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={cx({
                            active: data.is_liked,
                        })}
                    />
                </button>
                <span className={cx('count')}>{data.likes_count}</span>
            </div>
            <div className={cx('sidebar-video-item')}>
                <button className={cx('sidebar-button')}>
                    <FontAwesomeIcon icon={faCommentDots} />
                </button>
                <span className={cx('count')}>{data.comments_count}</span>
            </div>
            <Menu items={menuData} seeMore={menuSeeMore} className={cx('menu-seemore')}>
                <div className={cx('sidebar-video-item')}>
                    <button className={cx('sidebar-button')}>
                        <FontAwesomeIcon icon={faShareAlt} />
                    </button>
                    <span className={cx('count')}>{data.shares_count}</span>
                </div>
            </Menu>
        </div>
    );
}

export default VideoSidebar;
