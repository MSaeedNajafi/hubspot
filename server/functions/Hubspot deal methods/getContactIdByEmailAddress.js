const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});
//========================create a deal========================
async function createADeal() {
  const properties = {
    amount: "200.00",
    closedate: "2023-05-07T16:50:06.678Z",
    dealname: "Testing Deal stage 1",
    dealstage: "50548709",
    hubspot_owner_id: "254595320",
    pipeline: "14546628",
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(apiResponse.id);
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
//================get Deal id by email address================
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
//=============Associate Contact by Label ============================
async function associateContactByLabelHubspotContactIdAndDealId(
  hubspotClient,
  deal_id,
  contact_id,
  type
) {
  const dealId = deal_id;
  const toObjectId = contact_id;
  const toObjectType = "Contacts";
  const associationType = type;

  console.log("----------------");
  console.log(dealId);
  console.log(toObjectId);
  console.log(toObjectType);
  console.log(associationType);
  console.log("----------------");

  const apiResponse = await hubspotClient.crm.deals.associationsApi.create(
    dealId,
    toObjectType,
    toObjectId,
    associationType
  );

  return apiResponse;
}

async function asscociateADealWithContact(deal_id, contact_id, type) {
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
    console.log(apiResponse);
  } catch (e) {
    // console.error(e);
  }
}

//===================================================================

// console.log(
//   getDealIdByEmailAddress(hubspotClient, "germanfarsitranslation@gmail.com")
// );
async function asyncCall() {
  const contact_email = await getContactByContactId(hubspotClient, "351");
  const contactId = await getContactIdByEmailAddress(
    hubspotClient,
    contact_email
  );
  //   const dealId = await getDealIdByEmailAddress(hubspotClient, contact_email);
  //   console.log(contact_email, contactId, dealId);
  const label = "Cunsomer";

  try {
    const create_association = await asscociateADealWithContact(
      //   dealId,
      "4363443928",
      contactId,
      label
    );
    console.log(create_association);
  } catch (e) {
    console.error(e);
  }
  //   const contact_email = await getContactByContactId(hubspotClient, contactId);
  //   const deal_Id = await getDealIdByEmailAddress(hubspotClient, contact_email);

  //   const dogg = await associateContactByLabelHubspotContactIdAndDealId(
  //     hubspotClient,
  //     "Consumer",
  //     contactId,
  //     deal_id
  //   );
}

// console.log(asyncCall());

// console.log(
//   associateContactByLabelHubspotContactIdAndDealId(
//     hubspotClient,
//     "4363443928",
//     "151",
//     "Installer"
//   )
// );
