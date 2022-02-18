const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function getAllUsers() {
  const allContacts = await hubspotClient.crm.contacts.getAll();
  console.log(allContacts);
}

getAllUsers();

//get all the users associated with the hubspot app and test account everything that is already there
