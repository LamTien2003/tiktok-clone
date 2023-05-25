import { useFormik } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

import { Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { useDispatch } from 'react-redux';
import { handleLogin } from '@/redux/authSlice';
const cx = classNames.bind(styles);

function Login() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: yup.object({
            userName: yup.string().required('Không được để trống').max(30, 'Không được vượt quá 30 kí tự'),
            password: yup.string().min(6, 'Mật khẩu tối thiểu 6 kí tự').required('Không được để trống'),
        }),
        onSubmit: (values) => {
            dispatch(handleLogin(values));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={cx('model-box')}>
            <Typography
                id="modal-modal-title"
                variant="h3"
                align="center"
                gutterBottom={true}
                className={cx('model-title')}
            >
                Login
            </Typography>
            <TextField
                id="userName"
                name="userName"
                value={formik.values.userName}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
                onChange={formik.handleChange}
                label="Tên đăng nhập"
                variant="standard"
                className={cx('input')}
            />
            <TextField
                id="password"
                name="password"
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                label="Mật khẩu"
                variant="standard"
                className={cx('input')}
            />
            <Link to="/testlogin" className={cx('forgot-password')}>
                Forgot password ?
            </Link>
            <Button primary type="submit" className={cx('login-btn')}>
                Login
            </Button>
            <div className={cx('signup-box')}>
                <p>Don't have an account ?</p>
                <Link to="/signup" className={cx('signup')}>
                    Sign up
                </Link>
            </div>
        </form>
    );
}

export default Login;
