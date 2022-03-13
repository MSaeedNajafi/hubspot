const hubspot = require("@hubspot/api-client");

async function getContactIdByEmailAddress(hubspotClient, email_address) {
  const emailFilter = {
    propertyName: "email",
    operator: "EQ",
    value: email_address,
  };
  const filterGroup = { filters: [emailFilter] };
  const properties = ["email", "firstname", "lastname", "cliente_id"];
  const limit = 1;

  const publicObjectSearchRequest = {
    filterGroups: [filterGroup],
    properties,
    limit,
  };
  const result = await hubspotClient.crm.contacts.searchApi.doSearch(
    publicObjectSearchRequest
  );

  return result.results[0];
}

async function associateContactByLabelHubspotcontactIdAndDealId(
  hubspotClient,
  deal_id,
  contact_id,
  type
) {
  const dealId = deal_id;
  const toObjectId = contact_id;
  const toObjectType = "Contacts";
  const associationType = type;

  // console.log("dealID ", dealId, " toObjectId ", toObjectId);

  try {
    const apiResponse = await hubspotClient.crm.deals.associationsApi.create(
      dealId,
      toObjectType,
      toObjectId,
      associationType
    );
    // console.log("apiResponse");

    return "succes";
  } catch (error) {
    return error;
  }
}

async function associateConsumerToDealByEmailAndDealId(
  hubspotClient,
  email,
  dealId
) {
  try {
    //search for contact using email
    const contact_id = await getContactIdByEmailAddress(hubspotClient, email);

    //associate Deals with Contats using label
    const contact = await associateContactByLabelHubspotcontactIdAndDealId(
      hubspotClient,
      dealId,
      contact_id.id,
      "Cunsomer"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

async function createADealWithConsumer(
  hubspotClient,
  dealname,
  dealstage,
  hubspot_owner_id,
  pipeline,
  consumer_email
) {
  const properties = {
    dealname: dealname,
    dealstage: dealstage,
    hubspot_owner_id: hubspot_owner_id,
    pipeline: pipeline,
  };
  const SimplePublicObjectInput = { properties };

  try {
    //create deal
    const apiResponse = await hubspotClient.crm.deals.basicApi.create(
      SimplePublicObjectInput
    );

    const contact1 = await associateConsumerToDealByEmailAndDealId(
      hubspotClient,
      consumer_email,
      apiResponse.id
    );

    console.log(apiResponse.id);
    return apiResponse.id;
  } catch (error) {
    return error;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

console.log(
  createADealWithConsumer(
    hubspotClient,
    "test deal #2",
    "52692955",
    "254595320",
    "15399155",
    "persianthehunter@gmail.com"
  )
);
//pipeline: "15399155"
// { id: 4388501753, name: new Deal #2 }
