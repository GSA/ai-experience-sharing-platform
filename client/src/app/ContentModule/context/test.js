/* istanbul ignore file */

const testData = [
  {
    slug: "test-1",
    title: "test 1",
    body: "# test one",
    hero: "## Test Hero",
  },
  {
    slug: "test-2",
    title: "test 2",
    body: "# test two",
    hero: "## Test Hero",
  },
];

const testTax = [
  { key: "testTax", title: "test tax", items: ["testtax1", "testtax2"] },
];

const projectData = [
  {
    card: {
      headline: "",
      title: "",
      excerpt:
        "Most government agencies rely on data from other agencies, state and local governments, and other data providers to make informed decisions on policy, operations, and budgets, but it’s currently very time consuming and complex to aggregate this data in a meaningful way. The team developed best practices and repeatable processes and tools that make it easier to collect, combine, standardize, govern, maintain, and exchange data across federal agencies.",
      projectLink: "/projects/u-s-data-federation",
    },
    meta: {
      topics: "Data scientists, Program administrators",
      phaseData: {
        status: "3",
        phase: "4",
        message:
          "Graduated after Phase 4 and in use at OMB, USDA, OGIS, and for other initiatives like data.gov",
      },
      projectType: "Innovation",
      links: [
        {
          link: "https://resources.data.gov/",
          text: "Resources.data.gov",
        },
        {
          text: "GitHub README",
          link:
            "https://github.com/18F/data-federation-project/blob/master/README.md",
        },
        {
          text:
            "The U.S. Data Federation wants to make it easier to collect, combine, and exchange data across government",
          link: "https://18f.gsa.gov/2019/03/05/the-us-data-federation/",
        },
      ],
      template: "6",
      team: {
        submitter:
          "Philip Ashlock, Data and Analytics Portfolio Lead, TTS Office of Solution",
        members:
          "Chris Goranson, Catherine Devlin, Tony Garvan, Mike Gintz, Mark Headd, Ethan Heppner, Joe Krzystan, Julia Lindpaintner, Amy Mok, Princess Ojiaku, James Tranovich\n",
      },
      summary: [
        {
          text: "Getting good, reliable data is hard",
        },
        {
          text: "Data from different sources makes this even harder",
        },
        {
          text:
            "We aren’t effectively capitalizing on lessons learned from other data coordination efforts to improve data sharing for everyone",
        },
      ],
    },
    slug: "us-data-federation",
    path: "/projects/test",
    intro:
      "Data informs all kinds of decision making in the federal government, but the wide array of sources and structures and units make sharing data — an activity that could result in better, more complete analysis — come down somewhere between horribly difficult and impossible. By creating tools and processes to make it easier, the Team was able to help make decision-making founded on data better. And they did this through extensive research with users and stakeholders to define what was needed and how it needs to be available. ",
    subtitle:
      "What if we could create an easy federated data aggregation for better analysis & insights?",
    title: "U.S. Data Federation",
    content: [
      {
        body:
          "High-quality, shareable data is a critical component of how the government makes decisions that affect us all. It’s also a strategic asset for economic growth, transparency, and accountability. The problem is that there are billions of government data points that vary widely in structure, source, and quality, making effective sharing and usage a seemingly insurmountable challenge. There are many efforts happening across government to address this issue, but many are siloed and improvised with little coordination between them. 10x’s U.S. Data Federation aims to help coordinate these efforts—however we can—to create new, open-source tools and resources to put our country’s data to work.",
        title: "Why this matters",
      },
      {
        body:
          "We discovered common pain points and challenges with data sharing efforts so we could create best practices, reusable tools, and resources around things like data governance, automated aggregation, data validation, and specifications. This would help agencies avoid having to solve the same problems over and over again, often in different ways, by providing consolidated guidance for handling federated data. \n\n#### How we did it\n\nWe interviewed leaders across several federated data management projects as well as experts from academia and the private sector to create an understanding of common themes and patterns. We synthesized this information to create a Data Federation Framework, including a maturity model and playbook. The key takeaway was that creating reusable tools and processes would benefit these efforts in the future. We then prototyped and built a reusable data validation tool, ReVal, that allows users to easily submit data that’s then validated against a set of customizable rules in real time. This significantly streamlined and simplified data collection and validation processes for our initial users: The USDA Food & Nutrition Service (FNS), the Census Bureau, and the Department of Transportation. As we continued to align our efforts with other data projects and stakeholders at OMB, OGIS, and data.gov, we identified an opportunity to enhance resources.data.gov (an online collection of policies, tools, case studies, and more that supports data governance, management, and use throughout the federal government). We interviewed over 30 people across 14 different agencies to define a long-term vision and strategy for resources.data.gov, implementing new organization and functionality to make the information it contained more findable and useful across all agencies. \n\n#### Where we are today\n\nThis project has graduated from 10x, and resources.data.gov is currently available and maintained by GSA, and the ReVAL tool continues to serve user needs and promote effective data leveraging.",
        title: "What we did",
        phase: true,
      },
      {
        title: "Next Steps",
        body:
          "Here are our recommendations for ways to further the mission of the U.S. Data Federation:\n\n- Work with agencies to surface their unique data resources to extrapolate and catalogue them for reuse by as many other agencies as possible \n- Support the work of communities of practice, the Federal Data Strategy, the CDO Council, and individual managers and practitioners across the government \n- Provide the infrastructure for sharing resources across the government with clear contribution and publication guidelines and support",
      },
    ],
  },
];

export const getAllByContentType = async (props) => {
  if (props.type === "error") {
    throw new Error("Invalid Type.");
  }
  if (props.type === "project") {
    return projectData;
  }
  return testData;
};

export const getContentTypeByName = async (props) => {
  if (props.type === "error") {
    throw new Error("Invalid Type.");
  }

  if (props.name === "error") {
    throw new Error("Invalid Name.");
  }
  if (!props.name) {
    throw new Error("Invalid Name.");
  }

  if (props.type === "project") {
    if (props.name === "error") {
      throw new Error("Invalid Name.");
    }
    return projectData[0];
  }

  return testData[0];
};

export const getTaxonomyByContentType = async (props) => {
  if (props.type === "error") {
    throw new Error("Invalid Type.");
  }
  return testTax;
};
