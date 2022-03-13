import { getContactIdByEmailAddress } from "./getContactIdByEmailAddress";
import { associateContactByLabelHubspotcontactIdAndDealId } from "./associateContactByLabelHubspotcontactIdAndDealId";

//=======Associate Account Manager To Deal By Email And DealId========
async function associateAccountManagerToDealByEmailAndDealId(
  hubspotClient,
  email,
  dealId
) {
  try {
    //search for contact using email
    const contact_id = await getContactIdByEmailAddress(hubspotClient, email);

    //associate Deals with Contats using label
    const contact = await associateContactByLabelHubspotcontactIdAndDealId(
      hubspotClient,
      dealId,
      contact_id,
      "account_manager"
    );
    return "succes";
  } catch (e) {
    return e;
  }
}

export { associateAccountManagerToDealByEmailAndDealId };
