import { useState } from 'react';
import './App.css'
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ThemeContext, ThemeContextType } from './context/ThemeContext';

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
      <div className='app' id={theme}>
        <Sidebar boards={['Test1', 'Test2']} selectedBoardIndex={0} handleToggleTheme={toggleTheme}/>
        <Header boardName={'Test1'} />
        <div className='content'>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
