//================contact by Id==================================
async function getContactByContactId(hubspotClient, contact_Id) {
  const apiResponse = await hubspotClient.crm.contacts.basicApi.getById(
    contact_Id
  );
  //   console.log(apiResponse.properties.email);
  return apiResponse.properties.email;
}
