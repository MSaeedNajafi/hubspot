const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function createADeal() {
  const properties = {
    amount: "5000.00",
    closedate: "2023-05-07T16:50:06.678Z",
    dealname: "New Deal Test",
    dealstage: "50548709",
    hubspot_owner_id: "254595320",
    pipeline: "14546628",
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.create(
      SimplePublicObjectInput
    );
    // console.log(apiResponse.id);

    const contact1 = await asscociateADealWithContact(
      apiResponse.id,
      "301",
      "Cunsomer"
    );

    const contact2 = await asscociateADealWithContact(
      apiResponse.id,
      "351",
      "Installer"
    );
  } catch (e) {
    console.error(e);
  }
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
    // console.log(apiResponse);
  } catch (e) {
    // console.error(e);
  }
}

console.log(createADeal());
