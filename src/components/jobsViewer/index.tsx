import React, {useState, Dispatch, SetStateAction, useEffect, MouseEvent} from "react";
import "./index.scss";
import PreviewJob from "../previewJob";
import ContextModal from "../contextModal";
import FullJob from "../fullJob";
import Pagination from "../pagination";
import {useHistory} from "react-router-dom";


interface JobsViewerProp {
  listOfJobIds: number[];
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  totalPages?: number;
  listId?: string;
  remove?: (jobId: number, e: MouseEvent) => void;
}

const JobsViewer = ({
  listOfJobIds,
  currentPage,
  setCurrentPage,
  totalPages,
  remove,
}: JobsViewerProp) => {
  const [activeJobId, setActiveJobId] = useState(0);
  
  let myRef = React.createRef<HTMLDivElement>()

  const history = useHistory();

  const search = new URLSearchParams(window.location.search);

  const clickPreview = (jobID: number) => {
    setActiveJobId(jobID);
    search.set("job", String(jobID))
    history.push(`?${search.toString()}`)
    if(window.innerWidth < 900){
      history.push(`/job/${jobID}`)
    }
  }

  useEffect(
    () => {
      if(listOfJobIds.indexOf(activeJobId) < 0 && listOfJobIds.length > 0){
        setActiveJobId(listOfJobIds[0])
      }
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
          {listOfJobIds.length === 0 ?
            <div>
              No jobs here!
            </div> :
             listOfJobIds.map((jobId, i) => {
              // @ts-ignore
              return (
                <PreviewJob
                  key={jobId + i}
                  jobId={jobId}
                  // @ts-ignore
                  onClick={() => clickPreview(jobId)}
                  remove={remove}
                />
              )
          })}
          <ContextModal />
        </div>
        {currentPage && totalPages && setCurrentPage && <Pagination
          // @ts-ignore
          currentPage={currentPage}
          totalPages={totalPages}
          // @ts-ignore
          onClickPage={(page) => {
            search.set("page", String(page));
            history.push(`?${search.toString()}`);
            setCurrentPage(page);
          }}
        />}

      </div>
      <div className='right'>
        { listOfJobIds.length === 0 ?
          <div>
            No jobs here!
          </div> :
          <FullJob
            jobId={activeJobId}
          />
        }

      </div>
    </div>
  )
}

export default JobsViewer;
