import axios from "axios";

// Function to generate notes URL based on platform and address
const makeNotesUrl = (platform, address) => {
  return `https://api.rss3.io/v1/notes/${address}?limit=30&tag=social&platform=${platform}&include_poap=false&count_only=false&query_status=false`;
};

// Function to generate profile URL based on address
const makeProfileUrl = (address) => {
  return `https://api.rss3.io/v1/profiles/${address}`;
};

// Function to generate URL when platform is null
const nullPlatformUrl = (address) => {
  return `https://api.rss3.io/v1/notes/0x000000A52a03835517E9d193B3c27626e1Bc96b1?limit=100&include_poap=false&count_only=false&query_status=false`;
};

// Function to determine the appropriate URL based on platform and address
const sanitationFunction = (platform, address) => {
  if (platform.length > 0) {
    return makeNotesUrl(platform, address);
  } else {
    return nullPlatformUrl(address);
  }
};

// Function to get the appropriate URL based on type, platform, and address
export const getUrl = (urlType, platform, address) => {
  switch (parseInt(urlType)) {
    case 0:
      return sanitationFunction(platform, address);
    case 1:
      return makeProfileUrl(address);
    default:
      console.log("Please pass on params from 0 to 1");
  }
};

// Function to perform a GET request
const getReq = async (chooseUrl) => {
  const result = await axios.get(chooseUrl);
  return result;
};

// Function to handle HTTP operations (GET or POST)
const handleHttpOperation = async (chooseUrl, method) => {
  switch (method) {
    case "GET":
      return await getReq(chooseUrl);
    case "POST":
      // Placeholder for handling POST requests if needed in the future
      break;
    default:
      throw Error("Error: Only GET and POST methods are supported");
  }
};

// Function to make HTTP calls based on URL and method
export const makeCalls = async (chooseUrl, method) => {
  const apiResponse = await handleHttpOperation(chooseUrl, method);
  console.log(apiResponse.data.result);
  return apiResponse.data.result;
};
