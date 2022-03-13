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

  //   console.log(result);
  return result.results[0].id;
}

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

    return apiResponse.results;
  } catch (e) {
    console.error(e);
    return e;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

console.log(
  getDealIdByEmailAddress(hubspotClient, "persianthehunter@gmail.com")
);
