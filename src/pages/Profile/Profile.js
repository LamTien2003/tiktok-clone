import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';
import classNames from 'classnames/bind';

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from './Header';
import Video from './Video';
import userApi from '@/api/userApi';

const cx = classNames.bind(styles);
function Profile() {
    const [statusVideos, setStatusVideos] = useState('posts');
    const [user, setUser] = useState({});
    const [videos, setVideos] = useState([]);
    let { username } = useParams();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await userApi.getCurrentUser(username);
                setUser(res.data);
                setVideos(res.data.videos);
            } catch {
                console.log('Lỗi call APi');
            }
        };
        fetchApi();
    }, [username]);
    return (
        <div className={cx('wrapper')}>
            <Header data={user} />
            <div className={cx('container')}>
                <div className={cx('tab-list')}>
                    <div
                        className={cx('tab-item', {
                            active: statusVideos === 'posts',
                        })}
                        onClick={() => setStatusVideos('posts')}
                    >
                        Videos
                    </div>
                    <div
                        className={cx('tab-item', {
                            active: statusVideos === 'liked-posts',
                        })}
                        onClick={() => setStatusVideos('liked-posts')}
                    >
                        <FontAwesomeIcon icon={faLock} />
                        Liked
                    </div>
                </div>
                <div className={cx('video-list')}>
                    {statusVideos === 'posts'
                        ? videos.map((video, index) => {
                              return <Video key={index} data={video} />;
                          })
                        : ''}
                </div>
            </div>
        </div>
    );
}

export default Profile;
