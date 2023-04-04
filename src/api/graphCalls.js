// Importing necessary modules from Axios
import axios, { AxiosError } from "axios";

// GraphQL query for finding a specific identity
const queryFindOneIdentity = `
  query findOneIdentity($platform: String!, $identity: String!) {
    identity(platform: $platform, identity: $identity) {
      status
      uuid
      displayName
      createdAt
      addedAt
      updatedAt
      neighborWithTraversal(depth: 3) {
        source # Which upstream provides this connection info.
        from {
          uuid
          platform
          identity
          displayName
        }
        to {
          uuid
          platform
          identity
          displayName
        }
      }
    }
  }
`;

// GraphQL endpoint URL
const endpoint = "https://relation-service.nextnext.id/";

// Headers for the GraphQL request
const headers = {
  "content-type": "application/json",
};

// Function to build a GraphQL query
const buildGraphqlQuery = (oprName, query, vars) => {
  return {
    operationName: oprName,
    query: query,
    variables: vars,
  };
};

// Function to filter and process the GraphQL response
const filterResponse = (responseObject) => {
  // Check if the responseObject is empty or null
  if (!responseObject || Object.keys(responseObject).length === 0) {
    return {
      status: false,
      msg: `Couldn't Fetch the Data Network Error. Try Again`,
    };
  }

  // Check if identity is null in the responseObject
  if (responseObject.identity === null) {
    return {
      status: false,
      msg: `Couldn't find resource on server. Check your identity`,
    };
  }

  // Extract and return neighborWithTraversal data
  return responseObject.identity.neighborWithTraversal;
};

// Function to make a GraphQL call using Axios
export const makeCallToGraph = async (oprName, vars) => {
  try {
    // Making a GraphQL request using Axios
    const response = await axios({
      url: endpoint,
      headers: headers,
      method: "post",
      data: buildGraphqlQuery(oprName, queryFindOneIdentity, vars),
    });

    // Log the raw GraphQL response data
    console.log(response.data.data);
    console.log("******************");

    // Filter and process the GraphQL response
    const finalData = filterResponse(response.data.data);
    console.log(finalData);
    return finalData;
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
};
