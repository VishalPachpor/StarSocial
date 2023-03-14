import axios, { AxiosError } from "axios";

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

const endpoint = "https://relation-service.nextnext.id/";

const headers = {
    "content-type": "application/json",
};

const buildGraphqlQuery = (oprName, query, vars) => {
    return {
        operationName: oprName,
        query: query, // query in Q
        variables: vars,
    };
};

const filterResponse = (responseObject) => {
    // {identity:null}
    if (
        responseObject === null || responseObject === undefined || responseObject === {}
  ) {
    return {
        status: false,
        msg: `Couldn't Fetch the Data Network Error. Try Again`
    };
}

if (responseObject.identity === null) {
    return {
        status: false,
        msg: `Couldn't find resource on server. Check your identity`
    };
}
return responseObject.identity.neighborWithTraversal;
};

export const makeCallToGraph = async (oprName, vars) => {
    try {
        const response = await axios({
            url: endpoint,
            headers: headers,
            method: "post",
            data: buildGraphqlQuery(oprName, queryFindOneIdentity, vars),
        });
        console.log(response.data.data); // destructure the data.
        console.log("******************");
        const finalData = filterResponse(response.data.data);
        console.log(finalData);
        return finalData;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.message);
        } else {
            console.log(error);
        }
    }
};