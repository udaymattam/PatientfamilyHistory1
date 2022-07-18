import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="container">
        <div className="row">
          <div className="col margintopbottom">
            <h2>Home</h2>
            <h6 className="margintopbottom20">
            The FamilyMemberHistory resource represents family history for a given patient. 
            It may provide a list of conditions associated to a patient’s family member or the absence of a condition on a given individual. 
            In other cases, the resource may indicate that there is no relevant family history, no significant history for a given relative, 
            or that the patient’s family history is unknown or unable to obtain.
            </h6>
          </div>
        </div>
      </div>
  )
}

export default Home;