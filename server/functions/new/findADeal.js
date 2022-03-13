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

//find a deal
async function getDealIdByEmailAddress(hubspotClient, emailAddress) {
  const contactId = await getContactIdByEmailAddress(
    hubspotClient,
    emailAddress
  );

  const toObjectType = "Deals";
  const after = undefined;
  const limit = 500;
  try {
    const apiResponse = await hubspotClient.crm.contacts.associationsApi.getAll(
      contactId.id,
      toObjectType,
      after,
      limit
    );

    // console.log(apiResponse.results[0].id);

    return apiResponse.results[0];
  } catch (error) {
    return error;
  }
}

//=========

async function associateInstallerToDealByConsumerEmail(
  hubspotClient,
  installer_email,
  consumer_email
) {
  try {
    const contact_id = await getContactIdByEmailAddress(
      hubspotClient,
      installer_email
    );

    const dealId = await getDealIdByEmailAddress(hubspotClient, consumer_email);

    const contact = await associateContactByLabelHubspotcontactIdAndDealId(
      hubspotClient,
      dealId.id,
      contact_id.id,
      "Installer"
    );

    return "succes";
  } catch (error) {
    return error;
  }
}

//=========
const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

console.log(
  associateInstallerToDealByConsumerEmail(
    hubspotClient,
    "germanfarsitranslation@gmail.com",
    "persianthehunter@gmail.com"
  )
);
