import { Routes, Route } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ModalAuth.module.scss';

import { Modal, Box } from '@mui/material';
import { Login, Register, DefaultModal } from '@/layouts/components/ModalAuth';

const cx = classNames.bind(styles);

function ModalAuth({ ...props }) {
    return (
        <Modal {...props}>
            <Box className={cx('model-box')}>
                <Routes>
                    <Route path="/*" element={<DefaultModal />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Register />} />
                </Routes>
            </Box>
        </Modal>
    );
}

export default ModalAuth;
