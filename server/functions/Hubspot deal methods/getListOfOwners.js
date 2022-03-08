const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function getListOfOwners() {
  //   const email = undefined;
  const email = "najafisaeed@gmail.com";
  const after = undefined;
  const limit = 100;
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.owners.ownersApi.getPage(
      email,
      after,
      limit,
      archived
    );
    console.log(apiResponse.results[0]);
    return apiResponse.results[0].id;
  } catch (e) {
    console.error(e);
    return e;
  }
}

console.log(getListOfOwners());
