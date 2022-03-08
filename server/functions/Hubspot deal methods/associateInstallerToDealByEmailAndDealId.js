//=========Associate Installer To Deal By Email And DealId========
async function associateInstallerToDealByEmailAndDealId(
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
      "Installer"
    );
    return "succes";
  } catch (e) {
    return e;
  }
}
