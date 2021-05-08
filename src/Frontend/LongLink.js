/*
1155125630 Tse Shun Chi
1155126571 Chim Ka Chun
1155127047 Au Tsz Nga
1155127334 Wong Yi Oi
1155127464 Liu Hoi Pan
*/

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
      <Link className="link" to={to}>{label}</Link>
    </li>
  );
}

export default LongLink;