const hubspot = require("@hubspot/api-client");

async function setPropertyByKeyOnDealByDealId(hubspotClient, dealId, value) {
  const properties = {
    installer_job_url: value,
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.update(
      dealId,
      SimplePublicObjectInput
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
  setPropertyByKeyOnDealByDealId(
    hubspotClient,
    "4364421355",
    "www.exapmle-url2022.com"
  )
);
