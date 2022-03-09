const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function getAllProperties() {
  const objectType = "Deals";
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getAll(
      objectType,
      archived
    );
    console.log(apiResponse.results.length);

    for (let i = 0; i < apiResponse.results.length; i++) {
      if (apiResponse.results[i].label == "Deal owner") {
        console.log(apiResponse.results[i]);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

console.log(getAllProperties());
