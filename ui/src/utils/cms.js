export const cms = {
  dates: {
    "created_at": true,
    "interviewDate": true,
    "publishedDate": true,
    "updated_at": true,
  },
  metaDataValueBlockList: [
    'none',
    'other',
    'notApplicable',
  ],
  usecaseDetailsOrder: [
    'publishedDate',
    'metadataBenefitsV2',
    'metadataDevelopmentPhase',
    'metadataAiMlTechniquesV2',
    'metadataAiLifecycleStage',
    'metadataMlLearningTypes',
    'metadataMlTechnique',
    'metadataMlGoals',
    'metadataEnvironment',
    'metadataSpiiPiiUse',
    'metadataAgency',
    'metadataSubAgency'
  ],
  authenticatedErrorDelay: 200,
  errorRetryDelay: 500,
};
