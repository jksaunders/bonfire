import React from "react";

import { storiesOf } from "@storybook/react";

import * as Colors from "./colors";

storiesOf("Colors", module)
  .add("all colors", () => (
    <div>
      { Object.keys(Colors).map(key => <div key={key} style={{ backgroundColor: Colors[key] }}>{`${key}: ${Colors[key]}`}</div>) }
    </div>
  ));