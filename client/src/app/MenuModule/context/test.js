/* istanbul ignore file */

const testData = [
  {
    key: "primary",
    items: [
      { link: "/about", text: "About 10x" },
      { link: "/ideas", text: "Send us an idea" },
      { link: "/process", text: "The 10x process" },
      { link: "/projects", text: "The projects" },
    ],
  },
];

export const getAllMenus = async (props) => {
  if (props.error) {
    throw new Error("Invalid Props.");
  }

  return testData;
};
