const hubspot = require("@hubspot/api-client");

async function ReturnAllStagesOfApipeline(hubspotClient, pipelineId) {
  const objectType = "Deals";

  try {
    const apiResponse =
      await hubspotClient.crm.pipelines.pipelineStagesApi.getAll(
        objectType,
        pipelineId
      );
    for (let i = 0; i < apiResponse.results.length; i++) {
      console.log(
        "[ " +
          apiResponse.results[i].id +
          " , " +
          apiResponse.results[i].label +
          " ]"
      );
    }
    return JSON.stringify(apiResponse.results);
  } catch (e) {
    console.error(e);
    return e;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

console.log(ReturnAllStagesOfApipeline(hubspotClient, "15399155"));
