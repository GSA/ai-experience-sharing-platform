import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, getList } from "app/ContentModule";
import Link from "features/Link";

const SidebarNav = ({ current = "" }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const { [contentName]: { list: { data: bokList = [] } = {} } = {} } = state;
  useEffect(() => {
    dispatch(getList({ type: "boks" }));
  }, [dispatch]);

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
            <li className="usa-sidenav__item">
              <Link
                url={`/bok/${[item.slug]}`}
                className={isCurrentModule ? "usa-current" : ""}
              >
                {item.title}
              </Link>
              {isCurrentModule && (
                <ul className="usa-sidenav__sublist">
                  {bokModuleItems.map((child) => (
                    <li className="usa-sidenav__item">
                      <Link url={`/bok/${child.slug}`}>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

SidebarNav.propTypes = {};

export default SidebarNav;
