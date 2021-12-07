import { Layout, Space, Typography } from 'antd';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import './App.css';
import Cryptocurrency from './components/Cryptocurrency';
import CryptoDetails from './components/CryptoDetails';
import Home from './components/Home';
import Navbar from './components/Navbar';
import News from './components/News';


function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar></Navbar>
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>

              <Route exact path="/news">
                <News></News>
              </Route>
              <Route exact path="/cryptocurrency">
                <Cryptocurrency></Cryptocurrency>
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails></CryptoDetails>
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className=" footer">
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br></br>
            All rights reserved
          </Typography.Title>

          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrency">Cryptocurrency</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
