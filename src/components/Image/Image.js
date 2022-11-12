import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Image.module.scss';
import images from '@/assets/images';
const cx = classNames.bind(styles);

function Image({ src, alt, className, ...props }) {
    const [errorImage, setErrorImage] = useState('');
    const handleEroor = () => {
        setErrorImage(images.noImage);
    };
    return (
        <img src={errorImage || src} alt={alt} {...props} className={cx('wrapper', className)} onError={handleEroor} />
    );
}
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
};
export default Image;
