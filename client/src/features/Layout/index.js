import React from "react";
import PropTypes from "prop-types";
import { Grid } from "components/Grid";
import Break from "components/Break";
import Callout from "./templates/Callout";
import Cards from "./templates/Cards";
import GridModule from "./templates/Grid";
import Links from "./templates/Links";
import List from "./templates/List";
import Mdx from "features/Mdx";
import Title from "./templates/Title";

const components = {
  break: Break,
  callout: Callout,
  cards: Cards,
  grid: GridModule,
  links: Links,
  list: List,
  markdown: ({ body, className }) => (
    <div className={className}>
      <Mdx className={className}>{body}</Mdx>
    </div>
  ),
  title: Title,
};

const Layout = ({ items, data }) => {
  return items.map(({ type, fullwidth, ...props }, i) => {
    const Comp = components[type];
    if (!Comp) {
      console.warn(`Module type "${type}" not defined.`);
      return null;
    }
    return Comp ? (
      fullwidth ? (
        <Comp key={`txLayout-${++i}`} {...props} data={data} />
      ) : (
        <Grid key={`layout-${++i}`}>
          <Comp {...props} data={data} />
        </Grid>
      )
    ) : null;
  });
};

Layout.defaultProps = {
  items: [],
  data: {},
};

Layout.propTypes = {
  items: PropTypes.array,
};

export default Layout;
