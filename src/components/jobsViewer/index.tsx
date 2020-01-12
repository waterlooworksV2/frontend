import React, {useState, Dispatch, SetStateAction, useEffect} from "react";
import "./index.scss";
import PreviewJob from "../previewJob";
import ContextModal from "../contextModal";
import FullJob from "../fullJob";
import Pagination from "../pagination";
import {useHistory} from "react-router-dom";

interface PaginationProp {
  listOfJobIds: number[];
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}

const JobsViewer = ({listOfJobIds, currentPage, setCurrentPage, totalPages}: PaginationProp) => {
  const [activeJobId, setActiveJobId] = useState(-1);
  let myRef = React.createRef<HTMLDivElement>()

  const history = useHistory();

  const clickPreview = (jobID: number) => {
    setActiveJobId(jobID)
    if(window.innerWidth < 900){
      history.push("/job/"+String(jobID))
    }
  }

  useEffect(
    () => {
      setActiveJobId(listOfJobIds[0])
      console.log(myRef)
      myRef && myRef.current && myRef.current.scrollTo(0, 0);
    }, [listOfJobIds]);

  useEffect(
    () => {
      myRef && myRef.current && myRef.current.scrollTo(0, 0);
    }, [myRef]);



  myRef && myRef.current && myRef.current.scrollTo(0, 0);
  myRef && myRef.current && myRef.current.focus()
  // @ts-ignore
  return (
    <div className='jobsViewer' ref={myRef}>
      <div className='left'>
        <div className='previews'>
          {listOfJobIds.map((jobId, i) => {
            // @ts-ignore
            return (
              <PreviewJob
                key={i} jobId={jobId}
                // @ts-ignore
                onClick={() => clickPreview(jobId)}
              />
            )
          })}
          <ContextModal />
        </div>

        <Pagination
          // @ts-ignore
          currentPage={currentPage}
          totalPages={totalPages}
          // @ts-ignore
          onClickPage={(page) => setCurrentPage(page)}
        />

      </div>
      <div className='right'>
        <FullJob
          jobId={activeJobId}
        />
      </div>
    </div>
  )
}

export default JobsViewer;
