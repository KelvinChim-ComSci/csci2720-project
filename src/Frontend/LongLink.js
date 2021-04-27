import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function LongLink({label, to, activeOnlyWhenExact}) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  });
  return (
    <li className={match ? "active" : ""}>
      {match && "> "}
      <Link to={to}>{label}</Link>
    </li>
  );
}

export default LongLink;