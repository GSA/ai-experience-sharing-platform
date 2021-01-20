import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Grid } from "components/Grid";
import Break from "components/Break";
import Callout from "./templates/Callout";
import Cards from "./templates/Cards";
import GridModule from "./templates/Grid";
import Links from "./templates/Links";
import List from "./templates/List";
import Mdx from "features/Mdx";
import Carousel from "features/Carousel";
import Title from "./templates/Title";
import UsecaseList from "./templates/ContentList";
import kebab from "utils/kebab";

const components = {
  break: Break,
  callout: Callout,
  cards: Cards,
  carousel: Carousel,
  grid: GridModule,
  links: Links,
  list: List,
  markdown: ({ body, className }) => (
    <div className={classnames({ USMarkdown: true, [className]: className })}>
      <Mdx>{body}</Mdx>
    </div>
  ),
  title: Title,
  "usecase-list": () => (
    <UsecaseList
      filters={false}
      layout={true}
      sidebar={false}
      defaultLayout={"vertical"}
      sort={false}
    />
  ),
};

const Layout = ({ items, data, renderTitles }) => {
  return items.map(({ __component, fullwidth, ...props }, i) => {
    const compType = __component.split(".");
    const Comp = components[compType[1]];

    if (!Comp) {
      console.warn(`Module type "${compType[1]}" not defined.`);
      return null;
    }
    return Comp ? (
      fullwidth ? (
        <>
          {renderTitles && props.title && (
            <h2 id={kebab(props.title)}>{props.title}</h2>
          )}
          <Comp key={`USLayout-${++i}`} {...props} data={data} />
        </>
      ) : (
        <Grid key={`layout-${++i}`}>
          {renderTitles && props.title && (
            <h2 id={kebab(props.title)}>{props.title}</h2>
          )}
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
