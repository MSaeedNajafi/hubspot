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

app.get("/getADeal", async (req, res) => {
  res.send("Get A Deal");
  const dealId = "4292282349";
  // const properties = undefined;
  // const propertiesWithHistory = undefined;
  // const associations = undefined;
  // const archived = false;
  // const idProperty = undefined;
  console.log(getAdealWIthID(dealId));
});

async function getAdealWIthID(dealId) {
  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.getById(dealId);
    console.log(apiResponse);
    // console.log(JSON.stringify(apiResponse.body, null, 2));
    return apiResponse;
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);

    return e;
  }
}

app.get("/getAllDeals", async (req, res) => {
  res.send("Get Deals");
  // res.send(allUsers());
  await getDeals();
});

async function getDeals() {
  const allDeals = await hubspotClient.crm.deals.getAll();
  console.log(allDeals.length);
  allDeals.map(
    async (deal) =>
      // console.log(deal.properties)
      await getAdealWIthID(deal.properties.hs_object_id)
  );
  return allDeals;
}

// app.get("/getAllTickets", async (req, res) => {
//   res.send("Get Tickets");
//   // res.send(allUsers());
//   await getTickets();
// });

// async function getTickets() {
//   const allTickets = await hubspotClient.crm.tickets.getAll();
//   console.log(allTickets.length);
//   allTickets.map((ticket) => console.log(ticket.properties));
//   return allTickets;
// }

// app.get("/getAllCompanies", async (req, res) => {
//   res.send("Get Companies");
//   // res.send(allUsers());
//   await getCompanies();
// });

// async function getCompanies() {
//   const allCompanies = await hubspotClient.crm.companies.getAll();
//   console.log(allCompanies.length);
//   allCompanies.map((company) => console.log(company.properties));
//   return allCompanies;
// }

//========================

app.get("/createADeal", async (req, res) => {
  res.send("Create a Deal");
  await createADeal();
});

async function createADeal() {
  const properties = {
    amount: "1500.00",
    closedate: "2022-12-07T16:50:06.678Z",
    dealname: "New Deal Name From API",
    dealstage: "appointmentscheduled",
    hubspot_owner_id: "254595320",
    pipeline: "default",
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(JSON.stringify(apiResponse.body, null, 2));
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
}

app.get("/associations", async (req, res) => {
  res.send("Associations");
  await getAssociations();
});

async function getAssociations() {
  const fromObjectType = "Contacts";
  const toObjectType = "Deals";

  try {
    const apiResponse = await hubspotClient.crm.associations.typesApi.getAll(
      fromObjectType,
      toObjectType
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

app.get("/getAllPipelines", async (req, res) => {
  res.send("Retrieve all pipelines");
  await RetrieveAllPipelines();
  // res.send(allUsers());
});

async function RetrieveAllPipelines() {
  const objectType = "Deals";
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.pipelines.pipelinesApi.getAll(
      objectType,
      archived
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

app.get("/makeAdealWithAssiciation", async (req, res) => {
  res.send("make A deal With Assiciation");
  //1. make a deal
  //2. add contact
  //3. add assciations to deal throiugh the api

  //1. make deal with
  //consumer contact,
  //installer contact & company
  //associated to the deal.
  //https://developers.hubspot.com/docs/api/crm/associations
});

app.get("/DealAssociation", async (req, res) => {
  res.send("Associate a deal with another object");
  await asscociateDealWithObject();
  // res.send(allUsers());
});

async function asscociateDealWithObject() {
  const dealId = "4341698496";
  const toObjectType = "Contacts";
  const toObjectId = "151";
  const associationType = "Cunsomer";

  try {
    const apiResponse = await hubspotClient.crm.deals.associationsApi.create(
      dealId,
      toObjectType,
      toObjectId,
      associationType
    );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
