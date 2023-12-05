import React from "react";
import "./lens.css";

function SearchFeed({ singleSearchFeed, authorData, authorUrii }) {
  return (
    <div
      className="feeds"
      style={{ color: "white", marginTop: "200px", right: "200px" }}
    >
      {/* Author Information */}
      <div className="feedImg">
        <div>
          <img src={authorUrii} alt="person face" />
          <p>handle: {authorData.name}</p>
        </div>
      </div>

      {/* Network Information */}
      <div className="network">
        <p>Network: {singleSearchFeed.network}</p>
      </div>

      {/* Platform Information */}
      <div className="engagement">
        <p>Platform: {singleSearchFeed.platform}</p>
      </div>

      {/* Engagement Type Information */}
      <div className="engagement">
        <p>Engagement Type: {singleSearchFeed.type}</p>
      </div>

      {/* Sender Information */}
      <div className="from">
        <p>from: {singleSearchFeed.address_from}</p>
      </div>

      {/* Receiver Information */}
      <div className="to">
        <p>to: {singleSearchFeed.address_to}</p>
      </div>

      {/* Comment Information */}
      <div className="to">
        <p>
          comment:{" "}
          {singleSearchFeed.actions &&
            singleSearchFeed.actions[0].metadata.body}
        </p>
      </div>

      {/* Full View Information */}
      <div className="flink">
        <p>
          Full view:{" "}
          {singleSearchFeed.actions &&
            singleSearchFeed.actions[0].related_urls[0]}
        </p>
      </div>

      {/* Time Information */}
      <div className="time">
        <p>Time: {singleSearchFeed.created_at}</p>
      </div>
    </div>
  );
}

export default SearchFeed;
