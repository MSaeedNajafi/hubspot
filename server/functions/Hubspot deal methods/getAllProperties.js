const hubspot = require("@hubspot/api-client");

async function getAllPropertiesByFilter(hubspotClient, string) {
  const objectType = "Deals";
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getAll(
      objectType,
      archived
    );
    let content = [];

    for (let i = 0; i < apiResponse.results.length; i++) {
      if (apiResponse.results[i].label.includes(string)) {
        content.push(apiResponse.results[i]);
      }
    }
    console.log(content);
    return JSON.stringify(content);
  } catch (error) {
    return error;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

const get = async (hubspotClient) => {
  return await getAllPropertiesByFilter(hubspotClient, "url");
};

console.log(get(hubspotClient));
