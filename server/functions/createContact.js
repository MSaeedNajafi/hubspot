const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function createAContact() {
  const properties = {
    company: "Tassan",
    email: "sam@tassam.net",
    firstname: "Sam",
    lastname: "Mo",
    phone: "(9876) 543-210",
    website: "tassan.co",
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

console.log(createAContact());
