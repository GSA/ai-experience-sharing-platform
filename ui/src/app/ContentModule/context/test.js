/* istanbul ignore file */

const testData = [
  {
    featured: true,
    name: "test1",
    title: "Test1",
    excerpt: "test1",
    path: "test1",
    type: "usecase",
    version: "1.0",
    interviewDate: "01/01/2021",
    publishedDate: "01/01/2021",
    metadataAiLifecycleStage: "verificationAndValidation",
    metadataBenefits: "decreaseCycleTime",
    metadataSpiiPiiUse: true,
    content: [
      {
        __component: "content.markdown",
        body: "### Using deep learning to predict future events.\n",
        title: 'Summary',
      },
      {
        __component: "content.markdown",
        body: "This is a process that can take as long as 100 minutes.",
        title: "Business Problem",
      },
      {
        __component: "content.hero",
        title: 'Hero',
      },
    ],
    related: [
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
    slug: "usecase1",
    metadataSpiiPiiUse: true,
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
   {
    featured: true,
    name: "test3",
    title: "Test3",
    excerpt: "test3",
    path: "test3",
    type: "page",
    slug: "page3",
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
  const state = thunkAPI.getState();
  const type = state?.content?.list?.type;

  if ((props && props.type === "error") || type === "error" ) {
    throw new Error("Invalid Type.");
  } else if ((props && props.type === 'bok') || type === 'bok') {
    return [];
  }
  return testData;
};

export const getContentTypeByName = async (props) => {
  if (props.type === "error" || props.slug === 'error') {
    throw new Error("Invalid Type.");
  }
  if (!props.name && !props.slug) {
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
