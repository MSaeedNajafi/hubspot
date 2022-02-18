import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
const hubspot = require("@hubspot/api-client");
const hubspotClient = new hubspot.Client({
  apiKey: "eu1-eb51-6b8c-4807-ab36-ceba8394ae97",
});

function App() {
  const contactId = "contactId";
  const toObjectType = "toObjectType";
  const after = undefined;
  const limit = 500;
  useEffect(async () => {
    console.log("hi");

    try {
      const apiResponse =
        await hubspotClient.crm.contacts.associationsApi.getAll(
          contactId,
          toObjectType,
          after,
          limit
        );
      console.log(JSON.stringify(apiResponse.body, null, 2));
    } catch (e) {
      e.message === "HTTP request failed"
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e);
    }

    // const allContacts = await hubspotClient.crm.contacts.getAll();
    // var config = {
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   //   // Origin: "api.hubapi.com",
    //   //   "Access-Control-Allow-Credentials": "*",
    //   // },
    //   // mode: "cors",
    //   mode: "no-cors",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // };
    // await axios
    //   .get(
    //     "https://api.hubapi.com/integrations/v1/668447/timeline/event-types?hapikey=eu1-88ff-d69c-4bb9-93b4-55496a7c4dec&userId=28511559",
    //     config
    //   )
    //   .then(
    //     (response) => {
    //       console.log(response.data);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

    // const testURL =
    //   "https://api.hubapi.com/crm/v3/objects/contacts/search?hapikey=eu1-88ff-d69c-4bb9-93b4-55496a7c4dec&userId=28511559";
    // const myInit = {
    //   method: "HEAD",
    //   mode: "no-cors",
    // };

    // const myRequest = new Request(testURL, myInit);

    // await fetch(myRequest)
    //   .then(function (response) {
    //     return response;
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (e) {
    //     console.log(e);
    //   });
  }, []);

  return (
    <div className="App">
      <p>
        <code>hubspot</code>.
      </p>
    </div>
  );
}

export default App;
