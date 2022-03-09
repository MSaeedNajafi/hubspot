const hubspot = require("@hubspot/api-client");

async function setDealStageByDealId(hubspotClient, dealstage, dealId) {
  const properties = {
    amount: "5000.00",
    closedate: "2023-05-07T16:50:06.678Z",
    dealname: "New Deal Test",
    dealstage: dealstage,
    hubspot_owner_id: "254595320",
    pipeline: "14546628",
    installer_job_url: "www.ggggg.com",
  };
  const SimplePublicObjectInput = { properties };
  const idProperty = undefined;

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.update(
      dealId,
      SimplePublicObjectInput,
      idProperty
    );
    console.log(apiResponse);

    return "succes";
  } catch (e) {
    console.error(e);
    return e;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

console.log(setDealStageByDealId(hubspotClient, "50548710", "4364421355"));
