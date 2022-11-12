import classNames from 'classnames/bind';
import styles from '@/components/Popper/Menu/Menu.module.scss';
import Button from '@/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick, className }) {
    const classes = cx('menu-item', {
        separate: data.separate,
        [className]: className,
    });
    return (
        <Button leftIcon={data.icon} to={data.to} href={data.href} onClick={onClick} className={classes}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
