import React, { useState } from "react";
import DocumentView from "../components/DocumentView";
import ResultList from "../components/ResultList";
import SearchBox from "../components/SearchBox";
import SearchParams from "../components/SearchParams";
import { ReactComponent as BackArrow } from "../assets/backarrow.svg";
import "./Results.css";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function Results() {
  const [viewingDoc, setViewingDoc] = useState(false);

  const authenticate = useAuth();

  if (!authenticate.success) {
    return <Loading />;
  }

  const handleToggleDocumentView = () => {
    setViewingDoc(!viewingDoc);
  };

  return (
    <div className="results">
      {/* Popup for previewing the document */}
      <DocumentView
        isOpen={viewingDoc}
        toggleModal={handleToggleDocumentView}
      />
      <div className="info-bar">
        <div className="search-box">
          <SearchBox />
        </div>
        <div className="params">
          <SearchParams />
        </div>
        <BackArrow
          className="back-icon"
          onClick={() => this.props.app.handleGoToPage("home")}
        />
      </div>
      <ResultList handleToggleDocumentView={handleToggleDocumentView} />
    </div>
  );
}
