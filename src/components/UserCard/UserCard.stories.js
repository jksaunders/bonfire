import React from "react";
// import { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
import { text, withKnobs } from "@storybook/addon-knobs";

// import { ThemeConstants } from "../../theming";
import UserCard from "./UserCard";

storiesOf("User Card", module)
  .addDecorator(withKnobs)
  .add("with text", () => {
    const name = text("Name", "Jordyn Saunders");
    const bodyText = text("Body text", "Jordyn is the best in west and an all-around stand-up gal. Likes Big Brother.");
    const image = "https://media.licdn.com/dms/image/C5603AQGujtifPwLPLw/profile-displayphoto-shrink_200_200/0?e=1571270400&v=beta&t=tiRVd1TyyNSpsHnNgSeO1hR1zY7Y2EIo5YmLbmIRMi0";
    return (
      <UserCard
        bodyText={bodyText}
        image={image}
        maxWidth="170px"
        name={name}
      />
    );
  });