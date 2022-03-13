const hubspot = require("@hubspot/api-client");

async function setPropertyByKeyOnDealByDealId(
  hubspotClient,
  consumer_email,
  value,
  key
) {
  const properties = {
    [key]: value,
  };
  const SimplePublicObjectInput = { properties };

  const dealId = await getDealIdByEmailAddress(hubspotClient, consumer_email);

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.update(
      dealId.id,
      SimplePublicObjectInput
    );
    // console.log(apiResponse);

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
    "",
    "www.blablabla.com",
    "installer_job_url"
  )
);
