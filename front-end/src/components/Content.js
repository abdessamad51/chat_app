import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import axios from "axios";
import profile from "../assets/images/7.png";

// import {SendMessages} from "../services/MessagesService";
const Content = ({ messages, conversation_id, conversation_name,user}) => {

  const getTime = (date) => {
    let dateTime = new Date(date);
    return dateTime.getHours() + ":" + dateTime.getMinutes();
  };
  const [messages1, setMessages1] = useState([]);
  // const [user, setUser] = useState('');
  const [replay, setReplay] = useState('');

  const [messagesConversation, setMessagesConversation] = useState(messages);

  const handleChange = (event) => {
    setReplay(event.target.value)
  }
  useEffect(() => {
    setMessagesConversation(messages)
    const containeur = document.querySelector(".chat-body");
    containeur.scrollTop = containeur.scrollHeight;
  },[messages])
  useEffect(() => {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "9f0e4582c5ef80603463",
      cluster: "ap1",
      encrypted: true,
      // authEndpoint: 'http://localhost:8000/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    });
    // Subscribe to the private channel
    window.Echo.private(`chat.${user.user_id}`).listen(".message", (event) => {
      event.message_user_connect = false;
      setMessagesConversation((messagesConversation) =>[...messagesConversation,event]);
      const containeur = document.querySelector(".chat-body");
      containeur.scrollTop = containeur.scrollHeight;
    });

    // Clean up on component unmount
    return () => {
      window.Echo.leave(`chat.${user.user_id}`);
    };
  }, []);

  const SendMessages = (e, conversation_id) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"));
    setReplay('')
    axios
      .post(
        "http://localhost:8000/api/messages",
        {
          message: `${e.target.elements.message.value}`,
          conversation_id: conversation_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`, // Include the token in the request headers
          },
        }
      )
      .then((res) => {
        const data = {
         'message' : res.data.message,
         'created_at' : res.data.created_at,
         'message_user_connect' : true,
        }
        setMessagesConversation((messagesConversation) =>[...messagesConversation,data]);

        const containeur = document.querySelector(".chat-body");
        containeur.scrollTop = containeur.scrollHeight;
        
        // alert("send");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div class="container h-100">
      <div className="d-flex flex-column h-100 position-relative">
        <div className="chat-header border-bottom py-4 py-lg-7">
          <div className="row align-items-center">
            <div className="col-2 d-xl-none">
              <a
                className="icon icon-lg text-muted"
                href="#"
                data-toggle-chat=""
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
                          src="assets/img/avatars/2.jpg"
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
                        data-bs-tFoggle="offcanvas"
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
                          <img
                            className="avatar-img"
                            src={profile}
                            alt="#"
                          />
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

        <div className="chat-body hide-scrollbar flex-1 h-100">
          <div className="chat-body-inner" style={{ paddingBottom: "87px" }}>
            <div className="py-6 py-lg-10">
              {messagesConversation.map((message) =>
                message.message_user_connect ? (
                  <div className="message message-out">
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
                  <div className="message">
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
              )}
            </div>
          </div>
        </div>

        <div className="chat-footer pb-3 pb-lg-7 position-absolute bottom-0 start-0">
          <div
            className="dz-preview bg-dark"
            id="dz-preview-row"
            data-horizontal-scroll=""
          ></div>

          <form
            className="chat-form rounded-pill bg-dark"
            data-emoji-form=""
            onSubmit={(e) => SendMessages(e, conversation_id)}
          >
            <div className="row align-items-center gx-0">
              <div className="col-auto">
                <a
                  href="#"
                  className="btn btn-icon btn-link text-body rounded-circle dz-clickable"
                  id="dz-btn"
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
                    className="feather feather-paperclip"
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                  </svg>
                </a>
              </div>

              <div className="col">
                <div className="input-group">
                  <textarea
                    name="message"
                    className="form-control px-0"
                    placeholder="Type your message..."
                    value={replay}
                    rows="1"
                    data-emoji-input=""
                    data-autosize="true"
                    style={{
                      overflow: "hidden",
                      overflowWrap: "break-word",
                      resize: "none",
                      height: "47px",
                    }}
                    onChange={(e) => handleChange(e)}
                  ></textarea>

                  <a
                    href="#"
                    className="input-group-text text-body pe-0"
                    data-emoji-btn=""
                  >
                    <span className="icon icon-lg">
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
                        className="feather feather-smile"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>

              <div className="col-auto">
                <button
                  className="btn btn-icon btn-primary rounded-circle ms-5"
                  type="submit"
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
                    class="feather feather-send"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Content;
