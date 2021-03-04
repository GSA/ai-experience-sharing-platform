export const cms = {
  dates: {
    "created_at": true,
    "interviewDate": true,
    "publishedDate": true,
    "updated_at": true,
  },
  usecaseDetailsOrder: [
    'publishedDate',
    'metadataBenefits',
    'metadataDevelopmentPhase',
    'metadataAiMlTechniques',
    'metadataAiLifecycleStage',
    'metadataEnvironment',
    'metadataSpiiPiiUse',
    'metadataAgency',
    'metadataSubAgency'
  ],
  authenticatedErrorDelay: 200,
  errorRetryDelay: 500,
};
