//=========Associate Consumer To Deal By Email And DealId========
async function associateConsumerToDealByEmailAndDealId(
  hubspotClient,
  email,
  dealId
) {
  try {
    //search for contact using email
    const contact_id = await getContactIdByEmailAddress(hubspotClient, email);

    //associate Deals with Contats using label
    const contact = await asscociateADealWithContact(
      hubspotClient,
      dealId,
      contact_id,
      "Cunsomer"
    );
    return "succes";
  } catch (e) {
    return e;
  }
}
