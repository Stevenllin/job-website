import React from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Faq1 from '../../../assets/image/faq1.jpeg';
import Faq2 from '../../../assets/image/faq2.jpeg';
import Faq3 from '../../../assets/image/faq3.jpeg';


const Faqs: React.FC = () => {
  return (
    <div id="faq">
      <section id="banner">
        <h1>How can we Help?</h1>
        <div className="search-container">
          <div className="ms-3">Ask a Question</div>
          {/** Button */}
          <Button type="primary" shape="circle" size="large" icon={<SearchOutlined />}></Button>
        </div>
      </section>
      <section id="article">
        <h2>Featured support Articles</h2>
        {/** Expand? */}
      </section>
    </div>
  )
}

export default Faqs
