import React, { useState } from "react";
import Searchable from "./Searchable";
import Summary from "./Summary.js";
import { ReactComponent as Download } from "../assets/download.svg";
import { Button, Backdrop, Snackbar } from "@mui/material";
import useFetchTags from "../hooks/useFetchTags";
import "./ResultsCard.css";
import authLogic from "../utils/authLogic";
import config from "../config";
import axios from "axios";

export default function ResultCard({
  result,
  handleToggleDocumentView,
  setCurrentDocLink,
}) {
  const handleResultsCardClick = (e) => {
    if (
      ["fields", "tags", "element", "results-card"].includes(e.target.className)
    ) {
      handleToggleDocumentView();
      setCurrentDocLink(result.fields.pdf_url);
    }
  };

  const [showSummary, setShowSummary] = useState(false);

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleToggleSummary = () => {
    setShowSummary(!showSummary);
  };

  const cutText = (text) => {
    return text
      .substring(0, 150)
      .concat(result.fields.title.length > 150 ? "..." : "");
  };

  // Fetches tags from tag ids
  const tags = useFetchTags(result.tags);

  // Checks if we are authorised to view the document
  // TODO: complete
  const userAuthorised = () => {
    return result.fields.access === "public";
  };

  // TODO: complete
  /* Request access to the document */
  const requestAccess = async () => {
    const headers = authLogic.getHeaders();
    try {
      const response = await axios.post(
        `${config.BACKEND_URI}/document/requestaccess`,
        { document_id: result.id, reason: "Research cause no 631" },
        { headers }
      );

      if (response.status === 200) {
        alert("Access requested");
      }
    } catch (e) {
      console.log(e);
      alert("Unknown error");
    }
  };

  return (
    <div>
      <div className="results-card" onClick={handleResultsCardClick}>
        <div className="fields">
          <div className="docTitle">
            <div className="element">
              <p>{cutText(result.fields.title).toUpperCase()}</p>
            </div>
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="language"
              value={result.fields.language}
            />
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="type"
              value={result.fields.type}
            />
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="access"
              value={result.fields.access}
            />
          </div>
          <div className="element">
            <Searchable
              input
              type="field"
              id="date"
              value={result.fields.date}
            />
          </div>
          <div className="element">
            <div className="multi-param">
              {result.fields.governing_law.map((param, index) => (
                <Searchable
                  key={index}
                  input
                  type="field"
                  id="govlaw"
                  value={param}
                />
              ))}
            </div>
          </div>
          <div className="tags">
            {tags.map((tag, key) => (
              <Searchable
                input
                key={key}
                type="tag"
                id={tag.id}
                value={tag.value}
              />
            ))}
          </div>
        </div>
        {userAuthorised() ? (
          <div className="buttons">
            <Button
              variant="contained"
              onClick={handleToggleSummary}
              className="clickable buttons"
            >
              Summary
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleToggleDocumentView();
                setCurrentDocLink(result.fields.pdf_url);
              }}
              className="clickable buttons"
            >
              Preview
            </Button>
            <a href={result.fields.pdf_url} download="document">
              <Download />
            </a>
          </div>
        ) : (
          <div className="buttons">
            <Button
              variant="contained"
              onClick={requestAccess}
              className="clickable buttons"
            >
              Request Access
            </Button>
          </div>
        )}
        <Backdrop
          className="clickable"
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showSummary}
          onClick={handleCloseSummary}
        >
          <Summary
            summary={result.fields.summary}
            title={result.fields.title}
          />
        </Backdrop>
      </div>
    </div>
  );
}
