import darkIcon from '../assets/images/icon-dark-theme.svg';
import lightIcon from '../assets/images/icon-light-theme.svg';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { DarkModeToggleStyles, SwitchStyles, SwitchInputStyles, SliderStyles } from './styles/DarkModeToggle.styles';


export function DarkModeToggle(props: {toggleTheme: (theme: string) => void}) {
    const theme = useContext(ThemeContext);
    console.log(theme);

    function toggleTheme() {
        if (theme === 'light') {
          props.toggleTheme('dark');
        } else {
          props.toggleTheme('light');
        }
    }

    return (
        <DarkModeToggleStyles>
            <img src={lightIcon} alt="light mode icon" />
            <SwitchStyles>
                <SwitchInputStyles 
                    type="checkbox" 
                    checked={theme === 'dark'}
                    onChange={() => null}
                />
                <SliderStyles data-testid='dark-mode-slider' onClick={toggleTheme}/>
            </SwitchStyles>
            <img src={darkIcon} alt="dark mode icon" />
        </DarkModeToggleStyles>
    )
}