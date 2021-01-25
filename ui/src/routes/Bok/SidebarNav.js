import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
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

  // const bokModuleSlugs = bokList.reduce((acc, cur) => {
  //   if (cur.bokSectionId.includes("-1")) {
  //     return { ...acc, [cur.bokSectionId.split("-")[0]]: cur.slug };
  //   }
  //   return acc;
  // }, {});

  const bokModuleItems = bokList.filter(({ bokSectionId: childId = "" }) => {
    return childId.includes(`${currentBokModuleId}-`);
  }).sort((a, b) =>{
    const aModuleId = a.bokSectionId.toLowerCase();
    const bModuleId = b.bokSectionId.toLowerCase();

    if (aModuleId < bModuleId)
      return -1;
    if (aModuleId > bModuleId)
      return 1;
    return 0;
  });
  return (
    <div>
      {bokModules.map((item, i) => (
        <div className={classnames({"bok-module": true, active: item.bokSectionId === current})} key={i}>
          {console.log(item)}
          <Link url={`/bok/module${item.key}-0`}>{item.title}</Link>
          {currentBokModuleId === item.key &&
             bokModuleItems.map((child, ci) => (
               <div className={classnames({"bok-section": true, "padding-left-2": true, active: child.bokSectionId === current})} key={ci}>
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
