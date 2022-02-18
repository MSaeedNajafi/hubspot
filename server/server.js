const PORT = 8000;
const express = require("express");
const cors = require("cors");

const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/updateAUser", async (req, res) => {
  res.send("Update a User");
  // res.send(allUsers());
  await updateAUser();
});

async function updateAUser() {
  const properties = {
    company: "myName",
    email: "iesteghlal@gmail.com",
    firstname: "Saeed",
    lastname: "Najafi",
    phone: "(877) 929-0687",
    website: "iamsaeed.com",
  };
  const SimplePublicObjectInput = { properties };
  const contactId = "101";

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.update(
      contactId,
      SimplePublicObjectInput
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

app.get("/getAUser", async (req, res) => {
  res.send("Get a User");
  // res.send(allUsers());
  await getOneUser();
});

async function getOneUser() {
  const contactId = "101";
  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(
      contactId
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

app.get("/getAllUsers", async (req, res) => {
  res.send("Get all Users");
  await allUsers();
  // res.send(allUsers());
});

async function allUsers() {
  const allContacts = await hubspotClient.crm.contacts.getAll();
  console.log(allContacts.length);
  allContacts.map((contact) => console.log(contact.properties));
  return allContacts;
}

app.get("/getAllDeals", async (req, res) => {
  res.send("Get Deals");
  // res.send(allUsers());
  await getDeals();
});

async function getDeals() {
  const allDeals = await hubspotClient.crm.deals.getAll();
  console.log(allDeals.length);
  allDeals.map((deal) => console.log(deal.properties));
  return allDeals;
}

app.get("/getAllTickets", async (req, res) => {
  res.send("Get Tickets");
  // res.send(allUsers());
  await getTickets();
});

async function getTickets() {
  const allTickets = await hubspotClient.crm.tickets.getAll();
  console.log(allTickets.length);
  allTickets.map((ticket) => console.log(ticket.properties));
  return allTickets;
}

app.get("/getAllCompanies", async (req, res) => {
  res.send("Get Companies");
  // res.send(allUsers());
  await getCompanies();
});

async function getCompanies() {
  const allCompanies = await hubspotClient.crm.companies.getAll();
  console.log(allCompanies.length);
  allCompanies.map((company) => console.log(company.properties));
  return allCompanies;
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
