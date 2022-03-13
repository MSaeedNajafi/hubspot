// import { associateConsumerToDealByEmailAndDealId } from "./associateConsumerToDealByEmailAndDealId.js";
// import { associateInstallerToDealByEmailAndDealId } from "./associateInstallerToDealByEmailAndDealId.js";
// import { associateAccountManagerToDealByEmailAndDealId } from "./associateAccountManagerToDealByEmailAndDealId.js";

const hubspot = require("@hubspot/api-client");

//========================create a deal========================
async function createADeal(
  hubspotClient,
  dealname,
  dealstage,
  hubspot_owner_id,
  pipeline,
  consumer_email,
  installer_email
) {
  const properties = {
    amount: "2000.00",
    closedate: "2023-05-07T16:50:06.678Z",
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

    const contact2 = await associateInstallerToDealByEmailAndDealId(
      hubspotClient,
      installer_email,
      apiResponse.id
    );

    // const contact3 = await associateAccountManagerToDealByEmailAndDealId(
    //   hubspotClient,
    //   "najafisaeed@gmail.com",
    //   apiResponse.id
    // );

    console.log(apiResponse.id);
    return "succes";
  } catch (e) {
    console.error(e);
  }
}

//================contact by Id==================================
async function getContactByContactId(hubspotClient, contact_Id) {
  const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(
    contact_Id
  );
  //   console.log(apiResponse.properties.email);
  return apiResponse.properties.email;
}

//================get contact id by email address================
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

  //   console.log(result);
  return result.results[0].id;
}

//================get Deal id by email address==================
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
      contactId,
      toObjectType,
      after,
      limit
    );
    return apiResponse.results[0].id;
  } catch (e) {
    console.error(e);
    return e;
  }
}

//=============Associate Contact by Label Hubspot ContactId And DealId=======================
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

  try {
    const apiResponse = await hubspotClient.crm.deals.associationsApi.create(
      dealId,
      toObjectType,
      toObjectId,
      associationType
    );
    // console.log(apiResponse);
  } catch (e) {
    // console.error(e);
  }
}

//=========Associate Installer To Deal By Email And DealId========
async function associateInstallerToDealByEmailAndDealId(
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
      contact_id,
      "Installer"
    );
    return "succes";
  } catch (e) {
    return e;
  }
}

//=========Associate Consumer To Deal By Email And DealId========
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
      contact_id,
      "Cunsomer"
    );
    return "succes";
  } catch (e) {
    return e;
  }
}

//=======Associate Account Manager To Deal By Email And DealId========
async function associateAccountManagerToDealByEmailAndDealId(
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
      contact_id,
      "account_manager"
    );
    return "succes";
  } catch (e) {
    return e;
  }
}

//===================================================================

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});
console.log(
  createADeal(
    hubspotClient,
    "Consumer Journey 22",
    "52692955",
    "254595320",
    "15399155",
    "persianthehunter@gmail.com",
    "germanfarsitranslation@gmail.com"
  )
);

//4375581638 for Consumer Journey 2
//4374970345 Consumer Journey 22

// dealname: "Consumer Journey",
// dealstage: "52692955",
// hubspot_owner_id: "254595320",
// pipeline: "15399155",

/**
 * 
 * 
deal stages:
50548709
50548710
50548711
50548712
50548713
50548714
50548715

dealId:
4364421355

hubspot_owner_id (user): 
254595320

pipeline: 
14546628

*/
