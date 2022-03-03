const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function allUsers() {
  const allContacts = await hubspotClient.crm.contacts.getAll();
  console.log(allContacts.length);
  allContacts.map((contact) => console.log(contact.properties));
  return allContacts;
}

console.log(allUsers());
