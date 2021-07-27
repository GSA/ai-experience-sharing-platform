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
    'metadataBenefitsV2',
    'metadataDevelopmentPhase',
    'metadataAiMlTechniques',
    'metadataAiMlTechniquesV2',
    'metadataAiLifecycleStage',
    'metadataMlGoals',
    'metadataEnvironment',
    'metadataSpiiPiiUse',
    'metadataAgency',
    'metadataSubAgency'
  ],
  authenticatedErrorDelay: 200,
  errorRetryDelay: 500,
};
