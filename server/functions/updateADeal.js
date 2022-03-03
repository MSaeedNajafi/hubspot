const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});
async function updateADeal() {
  const properties = {
    amount: "5000.00",
    closedate: "2023-05-07T16:50:06.678Z",
    dealname: "New Deal Test",
    dealstage: "50548710",
    hubspot_owner_id: "254595320",
    pipeline: "14546628",
  };
  const SimplePublicObjectInput = { properties };
  const dealId = "4345444843";
  const idProperty = undefined;

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.update(
      dealId,
      SimplePublicObjectInput,
      idProperty
    );
    console.log(apiResponse);
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e);
  }
}

console.log(updateADeal());
