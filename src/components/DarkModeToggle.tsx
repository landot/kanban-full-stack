import darkIcon from '../assets/images/icon-dark-theme.svg';
import lightIcon from '../assets/images/icon-light-theme.svg';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './DarkModeToggle.css';

export function DarkModeToggle(props: {toggleTheme: (theme: string) => void}) {
    const theme = useContext(ThemeContext);

    function toggleTheme() {
        if (theme === 'light') {
          props.toggleTheme('dark');
        } else {
          props.toggleTheme('light');
        }
    }

    return (
        <div className='dark-mode-toggle'>
            <img src={lightIcon} alt="light mode icon" />
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={theme === 'dark'}
                    onChange={() => null}
                />
                <span className="slider round" onClick={toggleTheme}></span>
            </label>
            <img src={darkIcon} alt="dark mode icon" />
        </div>
    )
}