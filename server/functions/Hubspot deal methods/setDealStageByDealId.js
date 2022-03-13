const hubspot = require("@hubspot/api-client");

async function setDealStageByDealId(
  hubspotClient,
  dealstage,
  dealId,
  hubspot_owner_id,
  pipeline
) {
  const properties = {
    // amount: "5000.00",
    // closedate: "2023-05-07T16:50:06.678Z",
    // dealname: "New Deal Test",
    dealstage: dealstage,
    hubspot_owner_id: hubspot_owner_id,
    pipeline: pipeline,
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

console.log(
  setDealStageByDealId(
    hubspotClient,
    "52692956",
    "4375581638",
    "254595320",
    "15399155"
  )
);
