import { useState } from 'react';
import './App.css'
import { ThemeContext, ThemeContextType } from './context/ThemeContext';
import { HeadingL } from './styledComponents/header/HeadingL'
import { HeadingM } from './styledComponents/header/HeadingM'
import { HeadingS } from './styledComponents/header/HeadingS'
import { HeadingXL } from './styledComponents/header/HeadingXL'
import { BoldText } from './styledComponents/text/BoldText'
import { MediumText } from './styledComponents/text/MediumText'

function App() {
  const [theme, setTheme] = useState<ThemeContextType>(localStorage.getItem('theme') as ThemeContextType  || 'light');

  function toggleTheme() {
    if (theme === 'light') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app' id={theme}></div>
      <button onClick={toggleTheme}>click here</button>
      <p>{theme}</p>
      <HeadingXL>asdfasdfasdfasdf </HeadingXL>
      <HeadingL>asdfasdfasdfasdf </HeadingL>
      <HeadingM>asdfasdfasdfasdf </HeadingM>
      <HeadingS>asdfasdfasdfasdf </HeadingS>
      <MediumText>asdfasdfasdfasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdffasdfasdfasdfasdfasdfasdf</MediumText>
      <BoldText>asdfasdfasdfasdfasdfasasdfasdfasdfasdfasdfasdfasdfasdfdfasdfasdfasdfasdfasdfasdf</BoldText>
    </ThemeContext.Provider>
  )
}

export default App
