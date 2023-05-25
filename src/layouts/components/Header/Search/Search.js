import { useEffect, useRef, useState } from 'react';
import { useDebounce } from '@/hooks';

import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { PopperWrapper } from '@/components/Popper';
import AccountItem from '@/components/AccountItem';
import userApi from '@/api/userApi';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [focusInput, setFocusInput] = useState(false);
    const [loading, setLoading] = useState(false);
    // debounced se chi duoc set thanh` searchValue khi dung` typing 500ms
    const debouncedValue = useDebounce(searchValue, 500).trim();

    const searchInput = useRef();

    const handleClearSearchValue = () => {
        setSearchValue('');
        setSearchResult([]);
        searchInput.current.focus();
    };
    const handleInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    useEffect(() => {
        if (!debouncedValue) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        const fetchApi = async () => {
            try {
                const params = {
                    q: debouncedValue,
                    type: 'less',
                };
                const res = await userApi.getSearchUser(params);
                setSearchResult(res.data);
                setLoading(false);
            } catch {
                setLoading(false);
            }
        };
        fetchApi();
    }, [debouncedValue]);

    return (
        <div className={cx('search')}>
            <TippyHeadless
                interactive
                visible={focusInput && searchResult.length > 0}
                onClickOutside={() => {
                    setFocusInput(false);
                }}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result}></AccountItem>;
                            })}
                        </PopperWrapper>
                    </div>
                )}
            >
                <form>
                    <input
                        type="text"
                        placeholder="Search accounts and videos"
                        spellCheck={false}
                        ref={searchInput}
                        value={searchValue}
                        onChange={handleInput}
                        onFocus={() => {
                            setFocusInput(true);
                        }}
                    />
                    {searchValue && !loading && (
                        <button className={cx('clear-btn')} onClick={handleClearSearchValue}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading-btn')} icon={faSpinner} />}

                    <button
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                        }}
                        className={cx('search-btn')}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
            </TippyHeadless>
        </div>
    );
}

export default Search;
