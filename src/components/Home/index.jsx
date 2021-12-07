import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../services/cryptoApi.js';
import Cryptocurrency from '../Cryptocurrency';
import News from '../News';
import './home.css'

function Home(props) {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return 'loading...';

  return (
    <>
      <Typography.Title level={2} className="heading">
        Global Crypto Stats
      </Typography.Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total cryptocurrencies" value={millify(globalStats.total)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total Market cap" value={millify(globalStats.totalMarketCap)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}></Statistic>
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}></Statistic>
        </Col>
      </Row>

      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/cryptocurrency">Show more</Link>
        </Typography.Title>
      </div>
      <Cryptocurrency simplified />

      <div className="home-heading-container">
        <Typography.Title level={2} className="home-title">
          Latest Crypto News
        </Typography.Title>
        <Typography.Title level={3} className="show-more">
          <Link to="/news">Show more</Link>
        </Typography.Title>
      </div>
      <News simplified />
    </>
  );
}

export default Home;
