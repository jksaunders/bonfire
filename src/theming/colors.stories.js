import React from "react";
import { storiesOf } from "@storybook/react";
import Typography from "../components/Typography";
import * as Colors from "./colors";

storiesOf("Colors", module)
  .add("all colors", () => (
    <div>
      { Object.keys(Colors).map(key => (
        <div key={key} style={{ backgroundColor: Colors[key] }}>
          <Typography>{`${key}: ${Colors[key]}`}</Typography>
        </div>
      ))
      }
    </div>
  ));