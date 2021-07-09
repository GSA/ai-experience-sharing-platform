/* istanbul ignore file */

export const getSiteData = async () => {
  const data = {
    title: "test title",
    author: "test author",
    description: "test description",
    footer: [
      {
        id: 0,
        items: [
          { title: 'one title', id: 0, link: 'onelink', text: 'one text'},
          { title: 'two title', id: 1, link: 'twolink', text: 'two text'},
        ],
      },
      {
        id: 1,
        items: [
          { title: 'four title', id: 4, link: 'fourlink', text: 'four text'},
          { title: 'five title', id: 5, link: 'fivelink', text: 'five text'},
        ],
      },
    ]
  };
  return data;
};

export const getMenus = async () => {
  const data = [
    {
      slug: "primary",
      items: [
        { text: "test", url: "/test" },
        { text: "four", url: "/four" },
        {
          title: 'DropdownOne',
          columns: "one",
          id: 8,
          items: [
            { text: 'six title', id: 6, link: 'sixlink' },
          ],
        },
    ]
    },
    { slug: "secondary", items: [{ text: "two test", url: "/twotest" }] },
    { slug: "footer", items: [{ text: "three test", url: "/threetest" }] },
  ];
  return data;
};

export const getUsecaseSettings = async () => {
  return {
    usecaseFilterCounts: {
      dataCollectionAndProcessing: 0,
      deployment: 0,
    },
    metadataAiMlTechniques: {
      goalDrivenSystems: 0,
      imageRecognition: 2,
    },
    metadata: [
      "publishedDate",
      "solutionBenefits",
      "metadataDevelopmentPhase",
      "metadataAiLifecycleStage",
      "metadataEnvironment",
      "metadataSpiiPiiUse",
      "metadataAgency",
      "metadataSubagency",
    ],
    sort: [
      'publishedDate',
      'metadataAgency',
    ],
    keymaps: {
      academica: "Academica",
      acquisitionAndProcurement: "Acquisition and Procurement",
      agriculture: "Agriculture",
      autonomousSystems: "Autonomous Systems",
      commercialOffTheShelf: "Commercial Off The Shelf",
      competition: "Competition",
      contains: "Contains",
      conversationalAiAndChatbots: "Conversational AI and Chatbots",
      corporateGovernance: "Corporate Governance",
      customBuiltByNonFederalGovernmentEntity: "Custom Built By Non Federal GovernmentEntity",
      dataCollectionAndProcessing: "Data Collection and Processing",
      dataProfessional: "Data Professional",
      decreaseCycleTime: "Decrease Cycle Time",
      deployment: "Deployment",
      developedInHouse: "Developed In House",
      development: "Development",
      digitalEconomy: "Digital Economy",
      economy: "Economy",
      education: "Education",
      employment: "Employment",
      environment: "Environment",
      metadataAiLifecycleStage: 'metadataAiLifecycleStageKeyMap',
      metadataBenefits: 'metadataBenefitsKeyMap',
      publishedDate: 'publishedDateKeyMap',
      metadataSpiiPiiUse: 'metadataSpiiPiiUseKeyMap',
      metadataAgency: 'Agency',
      metadataProcurement: 'Procurement',
    },
  };
};

export const getUsecaseFilters = async () => {
  return {
    metadataProcurement: {
      type: 'enumeration',
      'enum': [
        'developedInHouse',
        'commercialOffTheShelf',
        'jointDevelopmentWithExternalPartner',
        'customBuiltByNonFederalGovernmentEntity',
        'jointProjectWithAnotherFederalAgency',
        'other',
      ]
    },
    metadataBenefits: {
      type: 'enumeration',
      'enum': [
        'decreaseCycleTime',
        'increaseAccuracy',
        'increaseOutputs',
        'improveCustomerService',
        'newServiceOrCapability',
        'increaseCompliance',
        'other',
      ]
    },
    metadataSpiiPiiUse: {
      type: 'boolean',
    }
  };
};
