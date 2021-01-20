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
    console.log(currentBokModuleId, childId);
    return (
      childId.includes(`${currentBokModuleId}-`) && !childId.includes("-0")
    );
  });
  const bokModules = bokList.filter(({ bokSectionId: childId = "" }) => {
    return childId.includes(`-0`);
  });
  return (
    <div>
      {bokModules.map((item) => (
        <div>
          <Link url={`/bok/${[item.slug]}`}>{item.title}</Link>
          {current === item.bokSectionId &&
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
