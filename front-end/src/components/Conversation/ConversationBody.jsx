
import React from "react";
const ConversationBody = ({containeur,messagesConversation,getTime}) => {
  return (
    <div className="chat-body hide-scrollbar flex-1 h-100" ref={containeur}>
    <div className="chat-body-inner" style={{ paddingBottom: "87px" }}>
      <div className="py-6 py-lg-10">
        {messagesConversation ? messagesConversation.map((message) =>
          message.message_user_connect ? (
            <div className="message message-out" key={message.id}>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#modal-profile"
                className="avatar avatar-responsive"
              >
                <img
                  className="avatar-img"
                  src="assets/img/avatars/1.jpg"
                  alt=""
                />
              </a>

              <div className="message-inner">
                <div className="message-body">
                  <div className="message-content">
                    <div className="message-text">
                      <p>{message.message}</p>
                    </div>
                    <div className="message-action">
                      <div className="dropdown">
                        <a
                          className="icon text-muted"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
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

                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              <span className="me-auto">Edit</span>
                              <div className="icon">
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
                                  className="feather feather-edit-3"
                                >
                                  <path d="M12 20h9"></path>
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              <span className="me-auto">Reply</span>
                              <div className="icon">
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
                                  className="feather feather-corner-up-left"
                                >
                                  <polyline points="9 14 4 9 9 4"></polyline>
                                  <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                                </svg>
                              </div>
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center text-danger"
                              href="#"
                            >
                              <span className="me-auto">Delete</span>
                              <div className="icon">
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
                                  className="feather feather-trash-2"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line
                                    x1="10"
                                    y1="11"
                                    x2="10"
                                    y2="17"
                                  ></line>
                                  <line
                                    x1="14"
                                    y1="11"
                                    x2="14"
                                    y2="17"
                                  ></line>
                                </svg>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="message-footer">
                  <span className="extra-small text-muted">
                    {getTime(message.created_at)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="message"  key={message.id}>
              <a
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#modal-user-profile"
                className="avatar avatar-responsive"
              >
                <img
                  className="avatar-img"
                  src="assets/img/avatars/2.jpg"
                  alt=""
                />
              </a>

              <div className="message-inner">
                <div className="message-body">
                  <div className="message-content">
                    <div className="message-text">
                      <p>{message.message}</p>
                    </div>

                    <div className="message-action">
                      <div className="dropdown">
                        <a
                          className="icon text-muted"
                          href="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
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

                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              <span className="me-auto">Edit</span>
                              <div className="icon">
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
                                  className="feather feather-edit-3"
                                >
                                  <path d="M12 20h9"></path>
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center"
                              href="#"
                            >
                              <span className="me-auto">Reply</span>
                              <div className="icon">
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
                                  className="feather feather-corner-up-left"
                                >
                                  <polyline points="9 14 4 9 9 4"></polyline>
                                  <path d="M20 20v-7a4 4 0 0 0-4-4H4"></path>
                                </svg>
                              </div>
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item d-flex align-items-center text-danger"
                              href="#"
                            >
                              <span className="me-auto">Delete</span>
                              <div className="icon">
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
                                  className="feather feather-trash-2"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line
                                    x1="10"
                                    y1="11"
                                    x2="10"
                                    y2="17"
                                  ></line>
                                  <line
                                    x1="14"
                                    y1="11"
                                    x2="14"
                                    y2="17"
                                  ></line>
                                </svg>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="message-footer">
                  <span className="extra-small text-muted">{getTime(message.created_at)}</span>
                </div>
              </div>
            </div>
          )
        ) : <div>is loading</div>}
      </div>
    </div>
  </div>
  );
};

export default ConversationBody;