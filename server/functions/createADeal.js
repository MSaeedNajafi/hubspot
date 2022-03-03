const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function createADeal() {
  var idd = 0;
  const properties = {
    amount: "100.00",
    closedate: "2023-12-07T16:50:06.678Z",
    dealname: "New Deal Test",
    dealstage: "appointmentscheduled",
    hubspot_owner_id: "254595320",
    pipeline: "default",
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.create(
      SimplePublicObjectInput
    );
    console.log(apiResponse.id);
    return 1;
  } catch (e) {
    // console.error(e);
    return 2;
  }
}

console.log(createADeal());
