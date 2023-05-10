import { Link } from "@material-ui/core";
import { useState, useEffect } from "react";
import { makeCalls } from "../api/api";
import { filterApiResponse } from "../api/utils/helper";
import "./farcaster.css";

/**
 * FarcasterFeed component handles the display of Farcaster feed for a given user.
 * It retrieves the user's data, Farcaster feed, and renders the feed items.
 * It also provides a link to the full view of each feed item.
 */
function FarcasterFeed() {
  // State variables for component data
  const [authorUrii, setAuthorURI] = useState("");
  const [authorData, setAuthorData] = useState({});
  const [farcasterFeed, setFarcasterFeed] = useState([]);

  // API URLs for fetching data
  const url =
    "https://api.rss3.io/v1/notes/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045?limit=30&tag=social&platform=farcaster&include_poap=false&count_only=false&query_status=false";
  const url2 =
    "https://api.rss3.io/v1/profiles/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      // Fetch Farcaster feed data
      const feedData = await makeCalls(url, "GET");
      // Fetch user profile data
      const authorUri = await makeCalls(url2, "GET");
      // Extract and set user data
      const img = filterApiResponse(authorUri);
      setAuthorData(img[0]);
      setAuthorURI(img[0].profile_uri[0]);
      // Set Farcaster feed data
      setFarcasterFeed(feedData);
    }
    fetchData();
  }, []);

  // Function to handle displaying comment input
  function replyChange() {
    console.log("Going to the function");
    const change = document.getElementById("comment");
    change.style.display = "inline";
  }

  return (
    <div className="farcasFeed">
      {/* Map through Farcaster feed items and render each */}
      {farcasterFeed &&
        farcasterFeed.map((singleFed, index) => (
          <div key={index} className="feeds">
            <div className="feedImg">
              <div>
                <img src={authorUrii} alt="person pfp" />
                <p id="handle">Handle: {authorData.name}</p>
              </div>
            </div>

            <div className="network">
              <p>Network: {singleFed.network}</p>
            </div>
            <div className="engagement">
              <p>Engagement Type: {singleFed.type}</p>
            </div>
            <div className="from">
              <p>From: {singleFed.address_from}</p>
            </div>
            <div className="to">
              <p>To: {singleFed.address_to}</p>
            </div>
            <div className="to">
              <p>
                Comment:{" "}
                {singleFed.actions && singleFed.actions[0].metadata.body}
              </p>
            </div>

            <div className="flink">
              <p>Full View :</p>
              {/* Render a link to the full view of the feed item */}
              <a
                href={singleFed.actions && singleFed.actions[0].related_urls[0]}
                target="_blank"
                rel="noreferrer"
              >
                {singleFed.actions && singleFed.actions[0].related_urls[0]}
              </a>
            </div>

            <div className="time">
              <p>Time: {singleFed.created_at}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FarcasterFeed;
