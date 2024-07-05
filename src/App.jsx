import './App.scss';
// Routes,Route,NavLink,
import { useRoutes,Outlet} from 'react-router-dom'

import routes from './routes'

function App() {
  const element = useRoutes(routes)

  return (
    <div className="App">
      <header className="bar"></header>
      <main>
        {element}
        {/* <Outlet/> */}
      </main>
      <footer className="bottom">
        <p className="copyright">
            版权信息：Copyright&copy;2021
            <br/>
            联系邮箱：1584968548@qq.com
        </p>
      </footer>
    </div>
  );
}

export default App;
