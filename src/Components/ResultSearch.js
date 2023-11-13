import React from "react";
import "./lens.css"; // Uncomment this line if required

function SearchNextResult({ singleSearchFeed, authorData, authorUrii }) {
  return (
    <div className="feeds">
      {/* Feed Image */}
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

      {/* Engagement Platform */}
      <div className="engagement">
        <p>Platform: {singleSearchFeed.platform}</p>
      </div>

      {/* Engagement Type */}
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

      {/* Comment Section */}
      <div className="to">
        <p>
          comment:{" "}
          {singleSearchFeed.actions &&
            singleSearchFeed.actions[0].metadata.body}
        </p>
      </div>

      {/* Full View Link */}
      <div className="flink">
        <p>
          Full view:{" "}
          {singleSearchFeed.actions &&
            singleSearchFeed.actions[0].related_urls[0]}
        </p>
      </div>

      {/* Timestamp */}
      <div className="time">
        <p>Time: {singleSearchFeed.created_at}</p>
      </div>
    </div>
  );
}

export default SearchNextResult;
