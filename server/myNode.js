const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function getAcontact() {
  const contactId = "151";

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(
      contactId
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

console.log(getAcontact());
