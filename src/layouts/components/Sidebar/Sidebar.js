import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '@/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCropSimple, faHouse, faMusic, faUserGroup, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import Menu, { MenuItem } from './Menu';
import CategoryAccount, { AccountItem } from './CategoryAccount';
import Button from '@/components/Button';
import userApi from '@/api/userApi';
const cx = classNames.bind(styles);

function Sidebar({ size }) {
    const [suggestAccount, setSuggestAccount] = useState([]);
    // Hover vao` sidebar moi hien scroll
    const [hover, setHover] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const params = {
                    page: 1,
                    per_page: 5,
                };

                const res = await userApi.getSuggestUser(params);
                setSuggestAccount(res.data);
            } catch {
                console.log('Lỗi call API');
            }
        };
        fetchApi();
    }, []);
    return (
        <aside
            className={cx('wrapper', {
                scroll: hover,
                [size]: size,
            })}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
        >
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<FontAwesomeIcon icon={faHouse} />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<FontAwesomeIcon icon={faUserGroup} />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<FontAwesomeIcon icon={faVideo} />} />
            </Menu>
            <CategoryAccount title="Suggested accounts" seemore>
                {suggestAccount.map((data, index) => (
                    <AccountItem data={data} key={index} />
                ))}
            </CategoryAccount>
            <CategoryAccount title="Following accounts" seemore>
                {suggestAccount.map((data, index) => (
                    <AccountItem data={data} key={index} />
                ))}
            </CategoryAccount>
            <CategoryAccount title="Discover">
                <Button to="/" rounded className={cx('href-btn')} leftIcon={<FontAwesomeIcon icon={faCropSimple} />}>
                    suthatla
                </Button>
                <Button to="/" rounded className={cx('href-btn')} leftIcon={<FontAwesomeIcon icon={faCropSimple} />}>
                    mackedoi
                </Button>
                <Button to="/" rounded className={cx('href-btn')} leftIcon={<FontAwesomeIcon icon={faMusic} />}>
                    Waiting for you (Offical) - Mono
                </Button>
                <Button to="/" rounded className={cx('href-btn')} leftIcon={<FontAwesomeIcon icon={faCropSimple} />}>
                    7749hieuung
                </Button>
                <Button to="/" rounded className={cx('href-btn')} leftIcon={<FontAwesomeIcon icon={faCropSimple} />}>
                    Genzlife
                </Button>
            </CategoryAccount>
        </aside>
    );
}

export default Sidebar;
