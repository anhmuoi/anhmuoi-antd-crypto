import { Avatar, Card, Col, Row, Typography } from 'antd';
import { Select } from 'antd';
import moment from 'moment';

import React, { useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi.js';
import { useGetCryptoNewsQuery } from '../services/cryptoNewApi.js'

const demoImage = 'https://via.placeholder.com/100'
const { Option } = Select;
function News({ simplified }) {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    console.log(cryptoNews);

    const { data } = useGetCryptosQuery(100);

    if(!cryptoNews?.value) return 'loading';

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Select a Crypto"
                        optionFilterProp="children"
                        onChange={(value)=> setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value='Cryptocurrency'>Cryptocurrency</Option>
                        {data?.data?.coins.map((coin)=>(
                            <Option value={coin.name}>{coin.name}</Option>
                        ))}
                    </Select>
                </Col>
            )

            }

            {cryptoNews.value.map((news, i)=>(
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Typography.Title         
                                  className="news-title"
                                 level={4}
                                >
                                {news.name}
                                </Typography.Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news'></img>
                            </div>
                            <p>
                                {news.description > 100
                                    ? `${news.description.substring(0, 100)}...`
                                    : news.description  
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage }
                                    alt="news"
                                    ></Avatar>
                                    <Typography.Text className='provider-name'>
                                        {news.provider[0]?.name}
                                    </Typography.Text>
                                </div>
                                    <Typography.Text >
                                        {moment(news.datePublished).startOf('ss').fromNow()}
                                    </Typography.Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default News;