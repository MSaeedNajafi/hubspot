const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({ apiKey: "YOUR_HUBSPOT_API_KEY" });

async function getDealIdByEmailAddress(hubspotClient, emailAddress) {
  const contactId = "contactId";
  const toObjectType = "toObjectType";
  const after = undefined;
  const limit = 500;

  try {
    const apiResponse = await hubspotClient.crm.contacts.associationsApi.getAll(
      contactId,
      toObjectType,
      after,
      limit
    );
    console.log(JSON.stringify(apiResponse.body, null, 2));
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
}

console.log(
  getDealIdByEmailAddress(hubspotClient, "persianthehunter@gmail.com")
);
