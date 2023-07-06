import { useState, useEffect } from "react";
import { makeCalls } from "../api/api";
import { filterApiResponse } from "../api/utils/helper";
import "./lens.css";

function LensFeed() {
  // State variables for storing data
  const [farcasterFeed, setFarcasterFeed] = useState([]);
  const [authorUrii, setAuthorURI] = useState("");
  const [authorData, setAuthorData] = useState({});

  // API URLs for fetching data
  const url =
    "https://api.rss3.io/v1/notes/0x50b6a381993834C623b2Bded6825824C936E48bB?limit=30&tag=social&type=post&include_poap=false&count_only=false&query_status=false";
  const url2 =
    "https://api.rss3.io/v1/profiles/0x50b6a381993834C623b2Bded6825824C936E48bB";

  // useEffect to fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      // Fetch Farcaster feed data
      const data = await makeCalls(url, "GET");
      // Fetch author profile data
      const authorUri = await makeCalls(url2, "GET");
      // Extract and set author data
      const img = filterApiResponse(authorUri);
      setAuthorData(img[0]);
      setAuthorURI(img[0].profile_uri[0]);
      // Set Farcaster feed data
      setFarcasterFeed(data);
    }
    fetchData();
  }, []);

  // JSX for rendering Farcaster feed
  return (
    <div className="farcasFeed">
      {/* Map through Farcaster feed items and render each */}
      {farcasterFeed &&
        farcasterFeed.map((singleFed, index) => (
          <div key={index} className="feeds">
            <div className="feedImg">
              <div>
                <img src={authorUrii} alt="person face" />
                <p>handle: {authorData.name}</p>
              </div>
            </div>
            <div className="network">
              <p>Network: {singleFed.network}</p>
            </div>
            <div className="engagement">
              <p>Platform: {singleFed.platform}</p>
            </div>
            <div className="engagement">
              <p>Engagement Type: {singleFed.type}</p>
            </div>
            <div className="from">
              <p>from: {singleFed.address_from}</p>
            </div>
            <div className="to">
              <p>to: {singleFed.address_to}</p>
            </div>
            <div className="to">
              <p>
                comment:{" "}
                {singleFed.actions && singleFed.actions[0].metadata.body}
              </p>
            </div>
            <div className="flink">
              <p>
                Full view:{" "}
                {singleFed.actions && singleFed.actions[0].related_urls[0]}
              </p>
            </div>
            <div className="time">
              <p>Time: {singleFed.created_at}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default LensFeed;
