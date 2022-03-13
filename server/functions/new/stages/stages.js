const hubspot = require("@hubspot/api-client");

//==========
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

  return result.results[0];
}

async function getDealIdByEmailAddress(hubspotClient, consumer_email) {
  const contactId = await getContactIdByEmailAddress(
    hubspotClient,
    consumer_email
  );
  const toObjectType = "Deals";
  const after = undefined;
  const limit = 500;
  try {
    const apiResponse = await hubspotClient.crm.contacts.associationsApi.getAll(
      contactId.id,
      toObjectType,
      after,
      limit
    );
    return apiResponse.results[0].id;
  } catch (e) {
    console.error(e);
    return e;
  }
}

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

async function updateDealState(
  hubspotClient,
  dealstage,
  consumer_email,
  pipeline
) {
  const properties = {
    dealstage: dealstage,
    pipeline: pipeline,
  };
  const SimplePublicObjectInput = { properties };
  const idProperty = undefined;

  const dealId = await getDealIdByEmailAddress(hubspotClient, consumer_email);

  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.update(
      dealId,
      SimplePublicObjectInput,
      idProperty
    );

    return apiResponse;
  } catch (error) {
    return error;
  }
}

//================================================================

//stage 1: 52692955 , Not ready for a proposal

async function setStageNotReadyForProposalByConsumerEmail(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52692955",
      consumer_email,
      "15399155"
    );

    console.log(setToStage);

    return "succes";
  } catch (error) {
    return error;
  }
}

//stage 2: 52692956 , Concept proposal - concept_proposal_url
async function setStageConceptProposal(
  hubspotClient,
  concept_proposal_url,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52692956",
      consumer_email,
      "15399155"
    );

    const changeProperty = await setPropertyByKeyOnDealByDealId(
      hubspotClient,
      consumer_email,
      concept_proposal_url,
      "concept_proposal_url"
    );

    console.log(setToStage);
    console.log(changeProperty);

    return "succes";
  } catch (error) {
    return error;
  }
}

//stage 3: 52692957 , Discuss intake with installer - add installer association concept_proposal_url

async function associateContactByLabelHubspotcontactIdAndDealId(
  hubspotClient,
  deal_id,
  contact_id,
  type
) {
  const dealId = deal_id;
  const toObjectId = contact_id;
  const toObjectType = "Contacts";
  const associationType = type;

  // console.log("dealID ", dealId, " toObjectId ", toObjectId);

  try {
    const apiResponse = await hubspotClient.crm.deals.associationsApi.create(
      dealId,
      toObjectType,
      toObjectId,
      associationType
    );
    // console.log("apiResponse");

    return "succes";
  } catch (error) {
    return error;
  }
}

async function associateInstallerToDealByConsumerEmail(
  hubspotClient,
  installer_email,
  consumer_email
) {
  try {
    const contact_id = await getContactIdByEmailAddress(
      hubspotClient,
      installer_email
    );

    const dealId = await getDealIdByEmailAddress(hubspotClient, consumer_email);

    const contact = await associateContactByLabelHubspotcontactIdAndDealId(
      hubspotClient,
      dealId,
      contact_id.id,
      "Installer"
    );

    return "succes";
  } catch (error) {
    return error;
  }
}

async function setStageDiscussIntakeWithInstaller(
  hubspotClient,
  systemless_proposal_url,
  installer_email,
  consumer_email
) {
  try {
    //associate installer with deal using consumer email
    const addAssociation = await associateInstallerToDealByConsumerEmail(
      hubspotClient,
      installer_email,
      consumer_email
    );

    //add deal property
    const changeProperty = await setPropertyByKeyOnDealByDealId(
      hubspotClient,
      consumer_email,
      systemless_proposal_url,
      "systemless_proposal_url"
    );

    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52692957",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 4: 52692958 , Too difficult

async function setStageTooDifficult(hubspotClient, consumer_email) {
  try {
    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52692958",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 5: 52692959 , Inspection without systems

async function setStageInspectionWithoutSystems(
  hubspotClient,
  inspection_date,
  consumer_email
) {
  try {
    //add deal property
    const changeProperty = await setPropertyByKeyOnDealByDealId(
      hubspotClient,
      consumer_email,
      inspection_date,
      "inspection_date"
    );

    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52692959",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 6: 52692960 , Concept proposal accepted

async function setStageConceptProposalAccepted(
  hubspotClient,
  job_url,
  consumer_email
) {
  try {
    //add deal property
    const changeProperty = await setPropertyByKeyOnDealByDealId(
      hubspotClient,
      consumer_email,
      job_url,
      "job_url"
    );

    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52692960",
      consumer_email,
      "15399155"
    );

    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 7: 52692961 , Concept proposal rejected

async function setStageConceptProposalRejected(hubspotClient, consumer_email) {
  try {
    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52692961",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 8: 52928698 , Concept proposal expired

async function setStageConceptProposalExpired(hubspotClient, consumer_email) {
  try {
    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52928698",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 9: 52928699 , Inspection planned

async function setStageInspectionPlanned(
  hubspotClient,
  inspection_date,
  consumer_email
) {
  try {
    //add deal property
    const changeProperty = await setPropertyByKeyOnDealByDealId(
      hubspotClient,
      consumer_email,
      inspection_date,
      "inspection_date"
    );

    //change deal stage
    const setToStage = await updateDealState(
      hubspotClient,
      "52928699",
      consumer_email,
      "15399155"
    );

    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 10: [ 52928700 , Renovation not possible ]

async function setStageRenovationNotPossible(hubspotClient, consumer_email) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928700",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 11:[ 52928701 , Definitive proposal needs to be approved by installer ]

async function setStageDefinitiveProposalNeedsToBeApprovedByInstaller(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928701",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 12:[ 52928702 , Definitive proposal rejected by installer ]

async function setStageDefinitiveProposalRejectedByInstaller(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928702",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 13:[ 52928703 , Definitive proposal for consumer ]

async function setStageDefinitiveProposalForConsumer(
  hubspotClient,
  proposal_url,
  consumer_email
) {
  try {
    //add deal property
    const changeProperty = await setPropertyByKeyOnDealByDealId(
      hubspotClient,
      consumer_email,
      proposal_url,
      "proposal_url"
    );

    const setToStage = await updateDealState(
      hubspotClient,
      "52928703",
      consumer_email,
      "15399155"
    );

    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 14:[ 52928704 , Definitive proposal expired ]

async function setStageDefinitiveProposalExpired(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928704",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 15:[ 52928705 , Definitive proposal consumer rejection ]

async function setStageDefinitiveProposalConsumerRejection(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928705",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 16:[ 52928706 , Definitive proposal rejected by ]

async function setStageDefinitiveProposalRejectedBy(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928706",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 17:[ 52928707 , Definitive proposal accepted by ]

async function setStageDefinitiveProposalAcceptedBy(
  hubspotClient,
  consumer_email
) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928707",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 18:[ 52928708 , Installation planned ]

async function setStageInstallationPlanned(hubspotClient, consumer_email) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928708",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

// stage 19:[ 52928709 , Installation finished ]

async function setStageInstallationFinished(hubspotClient, consumer_email) {
  try {
    const setToStage = await updateDealState(
      hubspotClient,
      "52928709",
      consumer_email,
      "15399155"
    );
    return "succes";
  } catch (error) {
    return error;
  }
}

const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

// console.log(
//   setStageNotReadyForProposalByConsumerEmail(
//     hubspotClient,
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageConceptProposal(
//     hubspotClient,
//     "www.blackmamba.com",
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageDiscussIntakeWithInstaller(
//     hubspotClient,
//     "www.somerandomurl.com",
//     "germanfarsitranslation@gmail.com",
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(setStageTooDifficult(hubspotClient, "persianthehunter@gmail.com"));

// console.log(
//   setStageInspectionWithoutSystems(
//     hubspotClient,
//     new Date().toString(),
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageConceptProposalAccepted(
//     hubspotClient,
//     "www.blackmajoburlmba.com",
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageConceptProposalRejected(hubspotClient, "persianthehunter@gmail.com")
// );

// console.log(
//   setStageConceptProposalExpired(hubspotClient, "persianthehunter@gmail.com")
// );

// var today = new Date();
// console.log(
//   setStageInspectionPlanned(
//     hubspotClient,
//     new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate() + 7
//     ).toString(),
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageRenovationNotPossible(hubspotClient, "persianthehunter@gmail.com")
// );

// console.log(
//   setStageDefinitiveProposalNeedsToBeApprovedByInstaller(
//     hubspotClient,
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageDefinitiveProposalRejectedByInstaller(
//     hubspotClient,
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageDefinitiveProposalForConsumer(
//     hubspotClient,
//     "www.proposalurl-thenew.com",
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageDefinitiveProposalExpired(hubspotClient, "persianthehunter@gmail.com")
// );

// console.log(
//   setStageDefinitiveProposalConsumerRejection(
//     hubspotClient,
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageDefinitiveProposalRejectedBy(
//     hubspotClient,
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageDefinitiveProposalAcceptedBy(
//     hubspotClient,
//     "persianthehunter@gmail.com"
//   )
// );

// console.log(
//   setStageInstallationPlanned(hubspotClient, "persianthehunter@gmail.com")
// );

console.log(
  setStageInstallationFinished(hubspotClient, "persianthehunter@gmail.com")
);
