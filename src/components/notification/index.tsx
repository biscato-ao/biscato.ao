import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import logo from "./../../asset/vector/logo.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
interface notification {
  title: string,
  textarea: string;
  link: any;
  data: any;
}

const notification = (props: any) => (
  <Tooltip id="notification-tooltip" {...props}>
    Ver trabalho
  </Tooltip>
);
export const Notification: React.FC<notification> = (props) => {
  return (
    <div className="card card-notification mb-3 border">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        {props.textarea}
        <div>
        <div className="alert-light alert border-0 mt-4">
          dwdwdw
        </div>
        <button type="button" className="btn btn-primary mt-1 me-2">aceitar</button>
        <button type="button" className="btn btn-dark mt-1">Recusar</button>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <div className="dataNotification">{props.data}</div>
        <div>
          <Link to={props.link}>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={notification}
            >
              <img src={logo} alt="" width={20} />
            </OverlayTrigger>
          </Link>
        </div>
      </div>
    </div>
  );
};
