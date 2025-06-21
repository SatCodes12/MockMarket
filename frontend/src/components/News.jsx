import "./News.css";

function News({ newsList }) {
  return (
    <div className="news-wrapper">
      {newsList.map((item, index) => (
        <a
          className="news-card"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <img src={item.image_url} alt={item.title} className="news-image" />
          <div className="news-content">
            <h3 className="news-title">{item.title}</h3>
            <p className="news-summary">{item.summary}</p>
            <p className="news-meta">
              {item.source} | {new Date(item.pub_date).toLocaleDateString("en-GB")}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default News;