import React from "react";
import './index.scss'
import back from "../../assets/icons/back.svg";

interface BackProps {
  history: any;
}

const Back = ({history}: BackProps) => {
  return (
    <div className="back" onClick={() => history.goBack()}>
      <img src={back} alt={"back button"}/>
    </div>
  )
}

export default Back;