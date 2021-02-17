import React from "react";
import Link from "features/Link";
import classnames from "classnames";

const BokSidebarNav = ({ current = "", bokList = [] }) => {
  const currentBokModuleId = current.split("-")[0];

  const bokModuleItems = bokList.filter(({ bokSectionId: childId = "" }) => {
    return (
      childId.includes(`${currentBokModuleId}-`) && !childId.includes("-0")
    );
  });
  const bokModules = bokList.filter(({ bokSectionId: childId = "" }) => {
    return childId.includes(`-0`);
  });

  return (
    <nav aria-label="Body of Knowledge Navigation">
      <ul className="usa-sidenav">
        {bokModules.map((item) => {
          const isCurrentModule = item.bokSectionId.includes(
            `${currentBokModuleId}-`
          );
          return (
            <li key={item.slug} className={classnames({"usa-sidenav__item": true, current: item.bokSectionId === current})}>
              <Link
                url={`/bok/${[item.slug]}`}
                className={isCurrentModule ? "usa-current" : ""}
              >
                {item.title}
              </Link>
              {isCurrentModule && (
                <ul className="usa-sidenav__sublist">
                  {bokModuleItems.map((child) => {
                    const isCurrentModule = child.bokSectionId === current;
                    return <li key={child.slug} className={classnames({"usa-sidenav__item": true, current: isCurrentModule})}>
                             <Link url={`/bok/${child.slug}`}>{child.title}</Link>
                           </li>;
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

BokSidebarNav.propTypes = {};

export default BokSidebarNav;
