import { useFormik } from 'formik';
import * as yup from 'yup';

import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useDispatch } from 'react-redux';
import { handleRegister } from '@/redux/authSlice';

import { Typography, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
const cx = classNames.bind(styles);

function Register() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: yup.object({
            userName: yup.string().required('Không được để trống').max(30, 'Không được vượt quá 30 kí tự'),
            password: yup.string().min(6, 'Mật khẩu tối thiểu 6 kí tự').required('Không được để trống'),
            confirmPassword: yup
                .string()
                .required('Không được để trống')
                .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: (values) => {
            dispatch(handleRegister(values));
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
                Register
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
            <TextField
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                onChange={formik.handleChange}
                label="Nhập lại mật khẩu"
                variant="standard"
                className={cx('input')}
            />
            <Link to="/testlogin" className={cx('forgot-password')}>
                Forgot password ?
            </Link>
            <Button primary type="submit" className={cx('login-btn')}>
                Register
            </Button>
            <div className={cx('signup-box')}>
                <p>Already have an account ?</p>
                <Link to="/login" className={cx('signup')}>
                    Login
                </Link>
            </div>
        </form>
    );
}

export default Register;
