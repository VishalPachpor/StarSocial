import { useState } from "react";
import { makeCallToGraph } from "../api/graphCalls";
import SearchNextResult from "./ResultSearch";
import { makeCalls } from "../api/api";
import { filterApiResponse } from "../api/utils/helper";
import "./Search.css"
const Search = () => {
  const [authorUrii, setAuthorURI] = useState("");
  const [authorData, setAuthorData] = useState({});
  const [searchedData, setSearchedData] = useState([]);
  const operationName = "findOneIdentity";
  const [searchInput, setSearchInput] = useState({
    platform: "",
    identity: "",
  });
  const filterResponse = (item) => {
    if (item.from.platform === "ethereum" || item.to.platform === "ethereum") {
      if (item.from.identity.length === 42) {
        return item;
      }
    }
  };
  const makeRss3Calls = async (address) => {
    const url = `https://api.rss3.io/v1/notes/${address}?limit=30&tag=social&include_poap=false&count_only=false&query_status=false`;
    const url2 = `https://api.rss3.io/v1/profiles/${address}`;
    const data = await makeCalls(url, "GET");
    const authorUri = await makeCalls(url2, "GET");
    const img = filterApiResponse(authorUri);
    setAuthorData(img[0]);
    setAuthorURI(img[0].profile_uri[0]);
    setSearchedData(data);
    setSearchedData(data);
  };
  function handleResponseAndState(respData) {
    const filteredData = respData.filter(filterResponse);
    console.log(filteredData);
    const ethPubAddress = filteredData[0].from.identity;
    return ethPubAddress;
  }
  async function handleSearchClick() {
    console.log(searchInput);
    const resp = await makeCallToGraph(operationName, searchInput);
    const address = handleResponseAndState(resp);
    await makeRss3Calls(address);
    setSearchInput({
      platform: "",
      identity: "",
    });
  }
  return (
    <div className="bigDiv">
      <h3 className="serText">Now You can Search Next ID Binded Identity Easily</h3>
      <input
        type="text"
        className="inputSer"
        placeholder="Enter Platform"
        value={searchInput.platform}
        onChange={(e) =>
          setSearchInput({ ...searchInput, platform: e.target.value })

        }
      />
      <input
        type="text"
        className="inputSer"
        placeholder="Enter Identity"
        value={searchInput.identity}
        onChange={(e) =>
          setSearchInput({ ...searchInput, identity: e.target.value })
        }
      />
      <div className="serBtn">
      <button  onClick={handleSearchClick}>Search</button>
      </div>
      <div className="searchData">
        {searchedData &&
          searchedData.map((singleFeed, index) => {
            return (
              <SearchNextResult
                key={index}
                singleSearchFeed={singleFeed}
                authorData={authorData}
                authorUrii={authorUrii}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Search;