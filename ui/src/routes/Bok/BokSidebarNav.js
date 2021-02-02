import React, { useEffect, useState } from "react";
import Link from "features/Link";

const BokSidebarNav = ({ current = "" }) => {
  const [bokList, setBokList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api-boks?_sort=bokSectionId:ASC`);
      const data = await response.json();
      setBokList(data);
    };
    fetchData();
  }, []);

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
            <li key={item.slug} className="usa-sidenav__item">
              <Link
                url={`/bok/${[item.slug]}`}
                className={isCurrentModule ? "usa-current" : ""}
              >
                {item.title}
              </Link>
              {isCurrentModule && (
                <ul className="usa-sidenav__sublist">
                  {bokModuleItems.map((child) => (
                    <li key={child.slug} className="usa-sidenav__item">
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

BokSidebarNav.propTypes = {};

export default BokSidebarNav;
