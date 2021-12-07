import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { useGetCryptosQuery } from '../../services/cryptoApi.js';
import { Card, Col, Input, Pagination, Row } from 'antd';
import { Link } from 'react-router-dom';
import './cryptocurrency.css';

function Cryptocurrency({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [cryptoPerPage, setCryptoPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filterData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filterData);
  }, [cryptosList, searchTerm]);

  const indexOfLastCrypto = currentPage * cryptoPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptoPerPage;
  const currentCryptos = cryptos?.slice(indexOfFirstCrypto, indexOfLastCrypto);

  if (isFetching) return 'Loading...';
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}></Input>
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {currentCryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency?.uuid}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt="#"></img>}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {!simplified && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            style={{ paddingTop: '1rem', display: 'inline-block' }}
            onChange={(page, pageSize) => setCurrentPage(page)}
            pageSize={cryptoPerPage}
            total={cryptosList?.data?.coins.length}
            current={currentPage}
            onShowSizeChange={(current, size) => setCryptoPerPage(size)}
            showSizeChanger
            showQuickJumper
            showLessItems
            itemRender={(current, type, originalElement) => {
              if (type === 'prev') {
                return <a>Previous</a>;
              }
              if (type === 'next') {
                return <a>Next</a>;
              }
              return originalElement;
            }}
          />
        </div>
      )}
    </>
  );
}

export default Cryptocurrency;
