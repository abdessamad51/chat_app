
import React from "react";
import profile from "../../assets/images/7.png";
const ConversationHeader = ({conversation_name}) => {
  return (
    <div className="chat-header border-bottom py-4 py-lg-7">
      <div className="row align-items-center">
        <div className="col-2 d-xl-none">
          <a className="icon icon-lg text-muted" href="#" data-toggle-chat="">
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
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </a>
        </div>

        <div className="col-8 col-xl-12">
          <div className="row align-items-center text-center text-xl-start">
            <div className="col-12 col-xl-6">
              <div className="row align-items-center gx-5">
                <div className="col-auto">
                  <div className="avatar avatar-online d-none d-xl-inline-block">
                    <img
                      className="avatar-img"
                      // src="assets/img/avatars/2.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className="col overflow-hidden">
                  <h5 className="text-truncate">{conversation_name}</h5>
                  <p className="text-truncate">
                    is typing
                    <span className="typing-dots">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6 d-none d-xl-block">
              <div className="row align-items-center justify-content-end gx-6">
                <div className="col-auto">
                  <a
                    href="#"
                    className="icon icon-lg text-muted"
                    // data-bs-tFoggle="offcanvas"
                    // data-bs-target="#offcanvas-more"
                    // aria-controls="offcanvas-more"
                  >
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
                      className="feather feather-more-horizontal"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </a>
                </div>

                <div className="col-auto">
                  <div className="avatar-group">
                    <a
                      href="#"
                      className="avatar avatar-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-user-profile"
                    >
                      <img className="avatar-img" src={profile} alt="#" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 d-xl-none text-end">
          <a
            href="#"
            className="icon icon-lg text-muted"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas-more"
            aria-controls="offcanvas-more"
          >
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
              className="feather feather-more-vertical"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;