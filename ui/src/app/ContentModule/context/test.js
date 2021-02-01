/* istanbul ignore file */

const testData = [
  {
    featured: true,
    name: "test1",
    title: "Test1",
    excerpt: "test1",
    path: "test1",
    type: "usecase",
    content: [
      {
        __component: "content.markdown",
      },
    ],
    toc: [
      {
        text: "test1-1",
        url: "test1-1",
      },
      {
        text: "test1-2",
        url: "test1-2",
      },
    ],
  },
  {
    featured: true,
    name: "test2",
    title: "Test2",
    excerpt: "test2",
    path: "test2",
    type: "usecase",
    content: [
      {
        __component: "content.markdown",
      },
    ],
    toc: [
      {
        text: "test2-1",
        url: "test2-1",
      },
    ],
    fields: [
      {
        title: "test2-1",
        key: "test2-1",
        value: "test2-1",
      },
    ],
  },
];

export const getAllByContentType = async ({thunkAPI, props}) => {
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
  if (props.type === "usecase") {
    return testData[1];
  }

  return testData[0];
};
