import React from "react";

const AsideRecherche = ({recherche}) => {

    return (
      <div className="mb-6">
        <form action="#">
          <div className="input-group">
            <div className="input-group-text">
              <div className="icon icon-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            <input
              type="text"
              className="form-control form-control-lg ps-0"
              placeholder="Search messages or users"
              aria-label="Search for messages or users..."
              onChange={(e) => recherche(e)}
            />
          </div>
        </form>
      </div>
    );
}

export default AsideRecherche;