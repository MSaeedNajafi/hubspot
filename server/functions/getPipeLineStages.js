const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

async function ReturnAllStagesOfApipeline() {
  const objectType = "Deals";
  const pipelineId = "14546628";
  const archived = false;

  try {
    const apiResponse =
      await hubspotClient.crm.pipelines.pipelineStagesApi.getAll(
        objectType,
        pipelineId,
        archived
      );
    console.log(apiResponse);
  } catch (e) {
    console.error(e);
  }
}

console.log(ReturnAllStagesOfApipeline());
