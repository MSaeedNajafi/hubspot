//=============Associate Contact by Label ============================
async function asscociateADealWithContact(
  hubspotClient,
  deal_id,
  contact_id,
  type
) {
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
    console.log(apiResponse);
  } catch (e) {
    // console.error(e);
  }
}
