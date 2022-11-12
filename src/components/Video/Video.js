import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

import VideoHeader from './VideoHeader';
import VideoSideBar from './VideoSideBar';
import InputRangeVolume from './InputRangeVolume';
import { Slider } from '@mui/material/';

const cx = classNames.bind(styles);

function Video({ data }) {
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(0);
    const [hoverVolume, setHoverVolume] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const video = useRef('');
    // Library de check scroll toi element, neu' scroll toi inView se~ = true
    // Doc. document react-intersection-observer
    const { ref: inViewRef, inView } = useInView({
        rootMargin: '-200px 0px -300px 0px',
    });
    // Dung` callback nay de tham chieu' ref o? ngoai` vao` ham` useInView, ref o? ngoai` o day la video
    const setRefs = useCallback(
        (node) => {
            video.current = node;
            inViewRef(node);
        },
        [inViewRef],
    );

    useEffect(() => {
        if (inView) {
            setPlay(true);
        } else {
            setPlay(false);
        }
    }, [inView]);

    useEffect(() => {
        if (play) {
            video.current.play();
        } else {
            video.current.pause();
        }
    }, [play]);

    useEffect(() => {
        video.current.volume = volume * 0.01;
    }, [volume]);

    useEffect(() => {
        const handleUpdateTime = () => {
            setCurrentTime(video.current.currentTime);
        };
        video.current.addEventListener('timeupdate', handleUpdateTime);
    }, []);
    useEffect(() => {
        video.current.addEventListener('durationchange', () => {
            setVideoDuration(video.current.duration);
        });
    }, []);

    const handlePause = () => {
        setPlay(false);
    };
    const handlePlay = () => {
        setPlay(true);
    };
    const hanldeChangeProgress = (value) => {
        video.current.currentTime = value;
        setCurrentTime(value);
    };

    return (
        <div className={cx('wrapper')}>
            <VideoHeader data={data}></VideoHeader>
            <div className={cx('body')}>
                <div className={cx('video')}>
                    <video
                        ref={setRefs}
                        src={data.file_url}
                        // autoPlay muted={volume <= 0}
                        loop
                    ></video>
                    <div className={cx('control-video')}>
                        <div className={cx('top')}>
                            {play ? (
                                <button className={cx('pause')} onClick={handlePause}>
                                    <FontAwesomeIcon icon={faPause} />
                                </button>
                            ) : (
                                <button className={cx('play')} onClick={handlePlay}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                            )}

                            {volume > 0 ? (
                                <div className={cx('volume-control')}>
                                    <button
                                        className={cx('volume-btn')}
                                        onClick={() => setVolume(0)}
                                        onMouseOver={() => setHoverVolume(true)}
                                        onMouseOut={() => setHoverVolume(false)}
                                    >
                                        <FontAwesomeIcon icon={faVolumeHigh} />
                                    </button>
                                    {hoverVolume && (
                                        <InputRangeVolume
                                            value={volume}
                                            onChange={(e) => setVolume(e.target.value)}
                                            onMouseOver={() => setHoverVolume(true)}
                                            onMouseOut={() => setHoverVolume(false)}
                                        />
                                    )}
                                </div>
                            ) : (
                                <div className={cx('volume-control')}>
                                    <button
                                        className={cx('volume')}
                                        onClick={() => setVolume(20)}
                                        onMouseOver={() => setHoverVolume(true)}
                                        onMouseOut={() => setHoverVolume(false)}
                                    >
                                        <FontAwesomeIcon icon={faVolumeMute} />
                                    </button>
                                    {hoverVolume && (
                                        <InputRangeVolume
                                            value={volume}
                                            onChange={(e) => setVolume(e.target.value)}
                                            onMouseOver={() => setHoverVolume(true)}
                                            onMouseOut={() => setHoverVolume(false)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={cx('progess')}>
                            <Slider
                                // vertical = input theo chieu` doc
                                aria-label="Progess"
                                value={currentTime}
                                max={videoDuration}
                                onChange={(e) => hanldeChangeProgress(e.target.value)}
                                sx={{
                                    border: '0px',
                                    height: '1px',
                                    color: 'rgba(255, 255, 255, 0.2)',
                                    '& .MuiSlider-rail': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: 'white',
                                    },
                                    '& .MuiSlider-thumb': {
                                        width: 0,
                                        height: 10,
                                        backgroundColor: 'white',
                                    },
                                    '& .MuiSlider-thumb:hover': {
                                        boxShadow: 'none',
                                    },
                                    '& .MuiSlider-thumb:active': {
                                        boxShadow: 'none',
                                    },
                                    '& .Mui-active': {
                                        boxShadow: 'none',
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                <VideoSideBar data={data} />
            </div>
        </div>
    );
}
Video.propTypes = {
    srcVideo: PropTypes.string,
    username: PropTypes.string,
    subname: PropTypes.string,
    avatar: PropTypes.string,
    title: PropTypes.string,
    music: PropTypes.string,
};

export default Video;
