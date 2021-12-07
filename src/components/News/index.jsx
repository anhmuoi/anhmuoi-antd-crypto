import { Avatar, Card, Col, Pagination, Row, Typography } from 'antd';
import { Select } from 'antd';
import moment from 'moment';

import React, { useState } from 'react';
import { useGetCryptosQuery } from '../../services/cryptoApi.js';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewApi.js';
import './news.css';

const demoImage = 'https://via.placeholder.com/100';
const { Option } = Select;
function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 30 });
  console.log(cryptoNews);

  const { data } = useGetCryptosQuery(100);

  const [newsPerPage, setNewsPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = cryptoNews?.value?.slice(indexOfFirstNews, indexOfLastNews);

  if (!cryptoNews?.value) return 'loading';

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {currentNews.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-top">
                  <div className="news-image-container">
                    <Typography.Title className="news-title" level={4}>
                      {news.name}
                    </Typography.Title>
                    <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news"></img>
                  </div>
                  <Typography.Text className="news-content">
                    {news.description.length > 120 ? `${news.description.substring(0, 120)}...` : news.description}
                  </Typography.Text>
                </div>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"></Avatar>
                    <Typography.Text className="provider-name">{news.provider[0]?.name}</Typography.Text>
                  </div>
                  <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
      {!simplified && (
        <Pagination
          style={{ paddingTop: '1rem', display: 'inline-block' }}
          onChange={(page, pageSize) => setCurrentPage(page)}
          pageSize={newsPerPage}
          total={cryptoNews.value.length}
          current={currentPage}
          onShowSizeChange={(current, size) => setNewsPerPage(size)}
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
      )}
    </>
  );
}

export default News;
