import React from "react";
import { storiesOf } from "@storybook/react";
import Typography, { MaterialVariants } from "../components/Typography";
import * as Colors from "./colors";

storiesOf("Colors", module)
  .add("all colors", () => (
    <div>
      { Object.keys(Colors).map(key => (
        <div key={key} style={{ backgroundColor: Colors[key] }}>
          <Typography variant={MaterialVariants.Body1} spaceAfter={false}>{`${key}: ${Colors[key]}`}</Typography>
        </div>
      )) }
    </div>
  ));