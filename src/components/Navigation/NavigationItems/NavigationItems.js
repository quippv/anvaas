import React, { useState } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";

const NavigationItems = (props) => {
  const [categories] = useState([
    {
      name: "New In",
      icon: "https://img.icons8.com/fluent/48/000000/lightning-bolt.png",
      link: "/",
      exact: true,
    },
    {
      name: "Abstract",
      icon: "https://img.icons8.com/color/48/000000/opacity.png",
      link: "/abstract",
      exact: false,
    },
    {
      name: "Expressionist",
      icon: "https://img.icons8.com/fluent/50/000000/edvard-munch.png",
      link: "/expressionist",
      exact: false,
    },
    {
      name: "Contemporary",
      icon: "https://img.icons8.com/color/48/000000/modern-art.png",
      link: "/contemporary",
      exact: false,
    },
    {
      name: "Cubism",
      icon: "https://img.icons8.com/color/48/000000/picasso.png",
      link: "/cubism",
      exact: false,
    },
    {
      name: "Realist",
      icon: "https://img.icons8.com/doodle/48/000000/large-tree.png",
      link: "/realist",
      exact: false,
    },
    {
      name: "Surrealist",
      icon: "https://img.icons8.com/color/48/000000/dali.png",
      link: "/surrealist",
      exact: false,
    },
  ]);

  return (
    <ul className={classes.NavigationItems}>
      {categories.map((category) => (
        <NavigationItem
          key={category.name}
          name={category.name}
          icon={category.icon}
          link={category.link}
          exact={category.exact}
        />
      ))}
    </ul>
  );
};

export default NavigationItems;
