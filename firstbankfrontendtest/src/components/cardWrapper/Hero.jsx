import React, { useContext, useEffect, useState } from "react";
import { NewsContextAPI } from "../../context/NewsContextAPI";
import Pagination from "react-responsive-pagination";
import moment from "moment";
import "./Hero.css";
const Cardswrapper = () => {
  const [currentPage, setCurrentPage] = useState(4);
  const { state, getNews } = useContext(NewsContextAPI);
  const totalPages = 10
  console.log(state);
  useEffect(() => {
    getNews(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <div className="news-content">
      <div className="">
        <p className="sub-title">Latest news</p>
        <hr className="news-line" />
      </div>
      <div className="contain">
        {state.error ? <p className="error">{state.error}</p> : null}
        {state.loading ? <p className="loading">Loading...</p> : null}
        {state.data.articles && state.data.articles.length
          ? state.data.articles.map((article, i) => {
              return (
                <div key={i} className="card">
                  <div className="title">
                    <p>{article.title}</p>
                    <hr className="line" />
                  </div>
                  <div className="body">
                    <p>{article.description}</p>
                  </div>
                  <div className="footer">
                    <a href={article.url}>Read full story</a>
                    <span className="star-image">
                      <img src="./assets/Vector.png" alt="" /> Add to bookmarks
                    </span>
                    <small>{moment(article.publishedAt).fromNow()}</small>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <Pagination
        current={currentPage}
        total={totalPages}
        // total={Math.floor(state.data.totalResults / 6)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default Cardswrapper;
