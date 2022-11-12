import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import * as request from '@/utils/request.js';

import Video from '@/components/Video/Video';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await request.get(`videos`, {
                    params: {
                        type: 'for-you',
                        page: 1,
                    },
                });
                setVideos(res.data);
            } catch {
                console.log('Lỗi call API VIDEO');
            }
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {videos.map((data, index) => {
                return <Video key={index} data={data} />;
            })}
        </div>
    );
}

export default Home;
