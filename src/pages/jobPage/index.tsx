import React from "react";
import {useParams, useHistory} from 'react-router-dom';
import "./index.scss";

import FullJob from "../../components/fullJob";
import ContextModal from "../../components/contextModal";
import Back from "../../components/BackButton";

const JobPage = () => {
  const {jobId} = useParams();
  const history = useHistory();
  return (
    <div className={"jobPage"}>
      <Back history={history}/>
      {jobId ?
        <FullJob jobId={parseInt(jobId)} onClick={() => console.log("YEET1")}/> :
        <FullJob jobId={0} onClick={() => console.log("YEET")}/>
      }
      <ContextModal />
    </div>
  )
}

export default JobPage;