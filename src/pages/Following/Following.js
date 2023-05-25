import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Following.module.scss';

import Video from '@/components/Video/Video';
import videoApi from '@/api/videoApi';

const cx = classNames.bind(styles);

function Following() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const params = {
                    type: 'for-you',
                    page: 1,
                };
                const res = await videoApi.getVideoForYou(params);
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

export default Following;
