import React, {MouseEvent, useContext, useEffect, useState, FormEvent} from "react";
import {useParams, useHistory} from 'react-router-dom';
import "./index.scss";

import { JobService } from '../../services/API';
import Back from "../../components/backButton";
import ListPreview, {ListType} from "../../components/listPreview"
import {ListService} from "../../services/API";
import {TokenStore} from "../../apps/authenticated-app";
import Loading from "../../components/loading";
import JobsViewer from "../../components/jobsViewer";

const SearchPage = () => {
  const history = useHistory();
  const token = useContext(TokenStore);

  const [listOfJobIds, setListOfJobIds] = useState([0,0,0,0,0,0,0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [loading, setLoading] = useState(false);

    return <div>
    <JobsViewer
      listOfJobIds={listOfJobIds}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPages={totalPages}
    />
    </div>

}

export default SearchPage;