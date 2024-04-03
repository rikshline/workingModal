import React, { useState } from "react";
import logo from "./logo.svg";
// import "./App.css";
import "./App.less";
//import { ExtractSelectWithTag } from "./components/ExtractSelectWithTagoLD";
import { UniqueIdSelectionModal } from "./components/uniqueid-selection-modal/UniqueIdSelectionModal";
import { originalDataHeaders } from "./utils/data";
import {
  Metadata,
  ProjectDetails,
  SourceDataHeader,
  colors,
  DataSourceSheetTypeEnum,
} from "../../Extract/src/model/common";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagsChange = (tags: string[]) => {
    console.log(tags, "app tags");
    setSelectedTags(tags);
  };

  const isMultiSheet: boolean = true;
  const metadata: Metadata[] = [];
  const recordIdField: string = "";
  const sheetJoinField: string = "";
  const projectDetails: ProjectDetails | undefined = {
    _id: "",
    extractProjectId: 1,
    redcapToken: "3",
    redcapId: 2,
    projectTitle: "e",
    projectIrbNumber: "e",
    recordAutoNumbering: true,
    recordIdField: "rr",
    recordIdPrefix: "ee",
    secondaryUniqueFields: ["t"],
    repeatingInstruments: ["wer"],
    nextRecordName: 3,
    hasRepeatingInstrumentsOrEvents: 3,
    customRecordLabel: "e",
    description: "e",
  };
  const showSheetModal: boolean = true;
  const sheetType: DataSourceSheetTypeEnum | undefined =
    DataSourceSheetTypeEnum.Forms;

  return (
    <div>
      {/* <ExtractSelectWithTag
        originalDataHeaders={originalDataHeaders}
        onTagsChange={handleTagsChange}
      />
      <div>{selectedTags}</div> */}

      <UniqueIdSelectionModal
        isMultisheet={isMultiSheet}
        metadataFields={metadata}
        recordIdField={recordIdField}
        sheetJoinField={sheetJoinField}
        projectDetails={projectDetails}
        showModal={showSheetModal}
        sourceDataSheetType={sheetType}
        onSetSheetType={(type: DataSourceSheetTypeEnum) => console.log("s")}
        onSetShowModal={(bool: boolean) => console.log("s")}
        onSetProjectDetails={(projectDetails: ProjectDetails) => {}}
        onSetSheetJoinField={(fieldName: string) => {}}
      ></UniqueIdSelectionModal>
    </div>
  );
}

export default App;
