import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, getList } from "app/ContentModule";
import { name as siteName } from "app/SiteModule";
import Link from "features/Link";

const SidebarNav = ({ current = "" }) => {
  const dispatch = useDispatch();
  console.log(current);

  const state = useSelector((state) => state);
  const {
    [contentName]: { list: { data: bokList = [] } = {} } = {},
    [siteName]: { bokModules } = {},
  } = state;
  useEffect(() => {
    dispatch(getList({ type: "boks" }));
  }, [dispatch]);

  const currentBokModuleId = current.split("-")[0];

  const bokModuleSlugs = bokList.reduce((acc, cur) => {
    if (cur.bokSectionId.includes("-1")) {
      return { ...acc, [cur.bokSectionId.split("-")[0]]: cur.slug };
    }
    return acc;
  }, {});

  const bokModuleItems = bokList.filter(({ bokSectionId: childId = "" }) => {
    return childId.includes(`${currentBokModuleId}-`);
  });
  return (
    <div>
      {bokModules.map((item) => (
        <div>
          <Link url={`/bok/${bokModuleSlugs[item.key]}`}>{item.title}</Link>
          {currentBokModuleId === item.key &&
            bokModuleItems.map((child) => (
              <div className="padding-left-2">
                <Link url={`/bok/${child.slug}`}>{child.title}</Link>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

SidebarNav.propTypes = {};

export default SidebarNav;
