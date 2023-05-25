import { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './Video.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Video({ data }) {
    const [hover, setHover] = useState(false);
    const video = useRef();
    useEffect(() => {
        if (hover) {
            video.current.play();
        } else {
            video.current.currentTime = 0;
            video.current.pause();
        }
    }, [hover]);
    return (
        <div
            className={cx('video')}
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseOut={() => {
                setHover(false);
            }}
        >
            <video ref={video} src={data.file_url} autoPlay muted loop></video>
            <p className={cx('title')}>{data.description}</p>
            <div className={cx('view')}>
                <FontAwesomeIcon icon={faPlay} />
                <span>{data.views_count}</span>
            </div>
        </div>
    );
}

export default Video;
