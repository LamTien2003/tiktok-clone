import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import { Box, Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
const cx = classNames.bind(styles);

function Register() {
    return (
        <Box className={cx('model-box')}>
            <Typography
                id="modal-modal-title"
                variant="h3"
                align="center"
                gutterBottom="true"
                className={cx('model-title')}
            >
                Register
            </Typography>
            <TextField id="standard-helperText" label="Tên đăng nhập" variant="standard" className={cx('input')} />
            <TextField id="standard-helperText" label="Mật khẩu" variant="standard" className={cx('input')} />
            <TextField id="standard-helperText" label="Nhập lại mật khẩu" variant="standard" className={cx('input')} />
            <Link to="/testlogin" className={cx('forgot-password')}>
                Forgot password ?
            </Link>
            <Button primary disabled className={cx('login-btn')}>
                Register
            </Button>
            <div className={cx('signup-box')}>
                <p>Don't have an account ?</p>
                <Link to="/login" className={cx('signup')}>
                    Login
                </Link>
            </div>
        </Box>
    );
}

export default Register;
