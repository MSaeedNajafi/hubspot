const hubspot = require("@hubspot/api-client");

async function getListOfOwners(hubspotClient) {
  const email = undefined;
  // const email = "najafisaeed@gmail.com";

  // const after = undefined;
  // const limit = 100;
  // const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.owners.ownersApi.getPage(
      email
      // after,
      // limit,
      // archived
    );
    return JSON.stringify(apiResponse.results);
  } catch (e) {
    console.error(e);
    return e;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

console.log(getListOfOwners(hubspotClient));
