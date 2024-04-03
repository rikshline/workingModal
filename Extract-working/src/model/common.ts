export type Metadata = {
    _id?: string;
    _projectUid?: string;
    fieldName: string;
    formName: string;
    conceptId?: string;
    fieldType: string;
    fieldLabel: string;
    choicesCalculationsOrSliderLabels?: string;
    textValidation?: string;
    validationMin?: string;
    validationMax?: string;
    identifier?: string;
    required?: string;
    totalOptions?: number;
    optionsDictionary?: {
      pvValue: string;
      pvCode: string;
    }[];
    sectionHeader?: string;
    fieldNote?: string;
    branchingLogic?: string;
    alignment?: string;
    questionNumber?: string;
    matrixRanking?: string;
    fieldAnnotation?: string;
    definition?: string;
  };
  export type ProjectDetails = {
    _id?: string;
    extractProjectId?: number;
    redcapToken?: string;
    redcapId?: number;
    projectTitle?: string;
    projectIrbNumber?: string;
    recordAutoNumbering: boolean;
    recordIdField: string;
    recordIdPrefix?: string;
    secondaryUniqueFields: string[];
    repeatingInstruments: string[];
    nextRecordName: number;
    hasRepeatingInstrumentsOrEvents?: number;
    customRecordLabel?: string;
    description?: string;
  };
  export type SourceDataHeader = {
    sheet: string;
    fields: string[];
  };

  export const colors = {
    primary: "#063769",
    info: "#4DA4FA",
    white: "#fff",
    success: "#009900",
    danger: "#A80900",
    lightDanger: "#FCF4F2",
    warning: "#FFB326",
    lightWarning: "#FEF6E4",
    disabled: "#F6F6F4",
    background: "#F6F6F4",
    selected: "#ddf0fc",
    neutral: "#737373",
    waiting: "#5ce8fa",
    info2: "#E8F6FE",
    mapped: "#bce600",
    hotPink: "#ff69b4",
  };
  export enum DataSourceSheetTypeEnum {
    Records = "records",
    Forms = "forms",
  }