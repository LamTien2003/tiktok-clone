import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '@/redux/authSlice';

import ModalAuth from '@/layouts/components/ModalAuth';

function App() {
    const isModal = useSelector((state) => state.auth.isModal);
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        // Neu layout = null ==> khong co layout
                        const Layout = route.layout === null ? Fragment : route.layout || DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
                <ModalAuth
                    open={isModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                />
            </div>
        </Router>
    );
}

export default App;
