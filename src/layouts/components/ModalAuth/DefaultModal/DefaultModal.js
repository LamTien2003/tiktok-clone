import styles from './DefaultModal.module.scss';
import classNames from 'classnames/bind';

import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuItem from '@/components/Popper/Menu/MenuItem';

import { QRIcon, UserIcon, FacebookIcon, GoogleIcon, TwitterIcon } from '@/components/Icon';

const cx = classNames.bind(styles);

function DefaultModal() {
    const data = {
        title: 'Log in to TikTok',
        contents: [
            {
                icon: <QRIcon />,
                title: 'Use QR code',
                to: '/qr',
            },
            {
                icon: <UserIcon />,
                title: 'Usename / password',
                to: '/login',
            },
            {
                icon: <FacebookIcon />,
                title: 'Continue with Facebook',
                to: '/login',
            },
            {
                icon: <GoogleIcon />,
                title: 'Continue with Google',
                to: '/login',
            },
            {
                icon: <TwitterIcon />,
                title: 'Continue with Twitter',
                to: '/login',
            },
        ],
    };
    return (
        <Box className={cx('model-box')}>
            <Typography
                id="modal-modal-title"
                variant="h3"
                align="center"
                gutterBottom={true}
                className={cx('model-title')}
            >
                {data.title}
            </Typography>

            {data?.contents?.map((content, index) => {
                return <MenuItem data={content} key={index} className={cx('modal-item')} />;
            })}
            <div className={cx('signup-box')}>
                <p>Don't have an account ?</p>
                <Link to="signup" className={cx('signup')}>
                    Sign up
                </Link>
            </div>
        </Box>
    );
}

export default DefaultModal;
