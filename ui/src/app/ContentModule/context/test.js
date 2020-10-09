/* istanbul ignore file */

const testData = [
  {
    featured: true,
    name: "test",
    title: "Test",
    excerpt: "test",
    path: "test",
  },
  {},
];
const testTax = [{}];

export const getAllByContentType = async (props) => {
  if (props.type === "error") {
    throw new Error("Invalid Type.");
  }
  return testData;
};

export const getContentTypeByName = async (props) => {
  if (props.type === "error") {
    throw new Error("Invalid Type.");
  }
  if (!props.name) {
    throw new Error("Invalid Name.");
  }
  if (props.name === "error") {
    throw new Error("Invalid Name.");
  }

  return testData[0];
};

export const getTaxonomyByContentType = async (props) => {
  if (props.type === "error") {
    throw new Error("Invalid Type.");
  }
  return testTax;
};
