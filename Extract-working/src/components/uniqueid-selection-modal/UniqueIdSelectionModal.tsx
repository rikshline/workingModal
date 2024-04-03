import {
  MenuOutlined,
  RollbackOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import { Alert, Button, Col, Modal, Row, Select, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
//import { DataSourceSheetTypeEnum, ImportStepEnum } from "../../../api";
//import { useAppSelector } from "../../../store/Hooks";
// import {
//   Metadata,
//   ProjectDetails,
//   SourceDataHeader,
//   useUpdateSessionMutation,
// } from "../../../store/importSlices/ImportRTK/generated-hooks";
// import {
//   selectOriginalDataHeaders,
//   selectProjectUid,
//   selectSessionUid,
// } from "../../../store/importSlices/SharedSlice";
////import { colors } from "../../constants/LinterConstants";
// import { getScrollParent } from "../../utils";
import { ExtractBtn } from "../extract-btn/ExtractBtn";
//import { showNotification } from "../notification/Notification";
import { ExtractSelectWithTag } from "../extract-select-withtag/ExtractSelectWithTag";
import {
  Metadata,
  ProjectDetails,
  SourceDataHeader,
  colors,
  DataSourceSheetTypeEnum
} from "../../model/common";
import { originalDataHeaders } from "../../utils/data";

const { Option } = Select;



interface UniqueIdSelectionModalInterface {
  metadataFields: Metadata[];
  recordIdField: string;
  sheetJoinField: string;
  projectDetails: ProjectDetails;
  showModal: boolean;
  isMultisheet: boolean;
  sourceDataSheetType: DataSourceSheetTypeEnum | undefined;
  onSetProjectDetails: (projectDetails: ProjectDetails) => void;
  onSetSheetJoinField: (fieldName: string) => void;
  onSetSheetType: (type: DataSourceSheetTypeEnum) => void;
  onSetShowModal: (bool: boolean) => void;
}

export const UniqueIdSelectionModal: FunctionComponent<
  UniqueIdSelectionModalInterface
> = ({
  metadataFields,
  recordIdField,
  sheetJoinField,
  projectDetails,
  showModal,
  isMultisheet,
  sourceDataSheetType,
  onSetProjectDetails,
  onSetSheetJoinField,
  onSetSheetType,
  onSetShowModal,
}) => {
  // Local State
  const [showDescription, setShowDescription] = useState<
    DataSourceSheetTypeEnum | undefined
  >(undefined);

  // Redux State Selectors
  const projectUid: string | undefined = "1234"; //useAppSelector(selectProjectUid);
  const sessionUid: string | undefined = "142234"; //useAppSelector(selectSessionUid);
  //const originalDataHeaders: SourceDataHeader[] = []; //useAppSelector( selectOriginalDataHeaders);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // // Generated RTK Mutations
  // const [
  //   updateSession,
  //   {
  //     data: updateSessionRes,
  //     isLoading: updateSessionLoading,
  //     error: updateSessionError,
  //   },
  // ] = useUpdateSessionMutation();

  // useEffect(() => {
  //   if (updateSessionRes) {
  //     onSetShowModal(false);
  //   }
  // }, [updateSessionRes]);

  // useEffect(() => {
  //   if (sourceDataSheetType) {
  //     setShowDescription(sourceDataSheetType);
  //   } else {
  //     setShowDescription(undefined);
  //   }
  // }, [sourceDataSheetType]);

  // // Display error messages
  // useEffect(() => {
  //   if (updateSessionError) {
  //     showNotification({
  //       key: "update-session-error",
  //       type: "error",
  //       message: "Update Session Failed",
  //       duration: 0,
  //       description: (updateSessionError as any).data.message,
  //     });
  //   }
  // }, [updateSessionError]);

  // Handlers
  const onSaveSelection = () => {
    // updateSession({
    //   projectUid: projectUid,
    //   sessionUid: sessionUid,
    //   updateSessionPayload: {
    //     payload: {
    //       currentStep: ImportStepEnum.Setup,
    //       sheetJoinField: sheetJoinField, //This is where the selected tag string array goes.
    //       sheetType: sourceDataSheetType,
    //     },
    //   },
    // });
  };

  const onTagsChange = (tags: string[]) => {
    console.log(tags.length);
    setSelectedTags(tags);
  };
  const renderFieldSelector = () => {
    const flattenedFields: string[] = originalDataHeaders.reduce(
      (
        accumulators: string[],
        currentValue: { fields: ConcatArray<string> }
      ) => {
        const combinedFields = accumulators.concat(currentValue.fields);
        return Array.from(new Set(combinedFields));
      },
      []
    );

    //Integrate new drop down component here.
    return (
      <div style={{ flex: 1, justifyContent: "center" }}>
        <ExtractSelectWithTag
          optionValues={flattenedFields}
          onTagsChange={onTagsChange}
        ></ExtractSelectWithTag>
      </div>
    );
  };

  const renderSheetTypeBtn = (type: DataSourceSheetTypeEnum) => {
    let icon: any;
    let description: string;

    if (type === DataSourceSheetTypeEnum.Records) {
      description = `Each Sheet contains full records (rows contain complete records).`;
      icon = (
        <Row align="middle" justify="center" style={{ marginBottom: 10 }}>
          <Col span={24}>
            <MenuOutlined style={{ fontSize: 40, marginRight: 5 }} />
            <MenuOutlined style={{ fontSize: 40, marginLeft: 5 }} />
          </Col>
          <Col
            span={24}
            className="flex-centered"
            style={{ textAlign: "center" }}
          >
            <RollbackOutlined
              style={{ fontSize: 25, transform: "scale(-1, 1)" }}
              rotate={90}
            />
          </Col>
        </Row>
      );
    } else {
      description = `Each Sheet contains PARTIAL records (rows contain data for a single form).`;
      icon = (
        <Row
          align="middle"
          justify="center"
          style={{ marginBottom: 20, width: "100%" }}
        >
          <MenuOutlined style={{ fontSize: 40 }} />
          <VerticalAlignMiddleOutlined style={{ fontSize: 35 }} rotate={90} />
          <MenuOutlined style={{ fontSize: 40 }} />
          <VerticalAlignMiddleOutlined style={{ fontSize: 35 }} rotate={90} />
          <MenuOutlined style={{ fontSize: 40 }} />
        </Row>
      );
    }

    return (
      <div
        className="project-btn-container"
        style={{
          border:
            sourceDataSheetType === type ? `3px solid ${colors.primary}` : "",
          height: "max-content",
          minHeight: "20vh",
          minWidth: "25vh",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => {
          const updated: ProjectDetails = { ...projectDetails };
          updated.secondaryUniqueFields = [
            ...(projectDetails.secondaryUniqueFields || []),
          ].filter((field: string) => field !== sheetJoinField);

          onSetProjectDetails(updated);
          onSetSheetJoinField("");
          onSetSheetType(type);
        }}
        onMouseEnter={() =>
          setTimeout(
            () => !sourceDataSheetType && setShowDescription(type),
            300
          )
        }
        onMouseLeave={() =>
          setTimeout(
            () => !sourceDataSheetType && setShowDescription(undefined),
            300
          )
        }
      >
        <Button
          size="large"
          type="link"
          className="project-btn"
          style={{
            width: "100%",
            whiteSpace: "break-spaces",
            textAlign: "center",
            color: ![undefined, type].includes(sourceDataSheetType)
              ? "grey"
              : "",
          }}
        >
          <Row style={{ color: "black", width: "100%" }}>
            <Col span={24}>{icon}</Col>
            <Col span={24}>{description}</Col>
          </Row>
        </Button>
      </div>
    );
  };

  // // Constants
  // const sheetDescription = {
  //   forms: `The imported Source Data should have records organized into sheets containing REDCap form data.
  //   Each sheet must contain one "identifier field" that is common among all sheets (i.e. MRN). The identifier
  //   field will be used to join sheets into complete records. This should be the only field within a sheet
  //   that is not a field associated with the sheet's form. One sheet will be generated for REDCap Import.`,
  //   records: `The imported Source Data should have complete records organized into sheets. Each record in the sheet
  //   may contain fields pertaining to zero or more repeating instruments. The same amount of sheets found in the
  //   imported Source Data will be generated for export.`,
  // };

  const multisheetText = (
    <>
      Multiple sheets have been detected in the imported Source Data file. In
      order to properly process this data, please{" "}
      <b>select the relationship between sheets</b> in your import.
    </>
  );
  return (
    <Modal
      closable={false}
      maskClosable={false}
      open={showModal}
      title={
        <Typography.Text strong>
          {isMultisheet ? "Multi-Sheet Import" : "Unique ID Fields"}
        </Typography.Text>
      }
      footer={null}
      width="95%"
      bodyStyle={{ padding: 25 }}
    >
      {isMultisheet && (
        <>
          <Row
            justify="start"
            align="middle"
            style={{
              marginBottom: 25,
              fontSize: 16,
              textAlign: "left",
            }}
          >
            <Col
              style={{ fontSize: 16, textAlign: "left", fontWeight: "bold" }}
            >
              <Typography.Text>Multi-Sheet Import Detected</Typography.Text>
            </Col>
          </Row>
          <Row justify="center" align="middle">
            <Row justify="start" align="middle" style={{ marginBottom: 25 }}>
              <Col span={20} style={{ fontSize: 16, textAlign: "center" }}>
                <Typography.Text>{multisheetText}</Typography.Text>
              </Col>
            </Row>
            <Row
              justify="center"
              align="middle"
              style={{ marginBottom: 25 }}
              gutter={[15, 15]}
            >
              <Col
                xs={{ span: 14 }}
                sm={{ span: 14 }}
                md={{ span: 14 }}
                lg={{ span: 14 }}
                xl={{ span: 12 }}
                xxl={{ span: 10 }}
              >
                {renderSheetTypeBtn(DataSourceSheetTypeEnum.Records)}
              </Col>
              <Col
                xs={{ span: 14 }}
                sm={{ span: 14 }}
                md={{ span: 14 }}
                lg={{ span: 14 }}
                xl={{ span: 12 }}
                xxl={{ span: 10 }}
              >
                {renderSheetTypeBtn(DataSourceSheetTypeEnum.Forms)}
              </Col>
            </Row>
          </Row>

          <Row
            justify="start"
            align="middle"
            style={{
              marginBottom: 25,
              fontSize: 16,
              textAlign: "left",
            }}
          >
            <Col
              style={{ fontSize: 16, textAlign: "left", fontWeight: "bold" }}
            >
              <Typography.Text>Select Unique ID Fields</Typography.Text>
            </Col>
          </Row>
        </>
      )}
      <Row justify="center" align="middle">
        <Row
          justify="center"
          align="middle"
          style={{ marginBottom: 25 }}
          gutter={[0, 15]}
        >
          <Col
            span={20}
            style={{
              textAlign: "left",
            }}
          >
            A Unique ID Field is a field that is used to uniquely identify a
            record / row of data in your dataset. You must select at least one
            field to be a unique ID field for your data. Up to three fields may
            be selected; e.g MRN + First Name + Last Name.
          </Col>
        </Row>
      </Row>
      <Row
        justify="start"
        align="middle"
        style={{ marginBottom: 25 }}
        gutter={[0, 15]}
      >
        <Col
          span={20}
          style={{
            textAlign: "center",
          }}
        >
          Unique ID Fields
        </Col>
      </Row>
      <Row
        justify="start"
        align="middle"
        style={{ marginBottom: 25 }}
        gutter={[0, 15]}
      >
        <Col
          span={20}
          style={{
            textAlign: "start",
          }}
        >
          {renderFieldSelector()}
        </Col>
      </Row>

      <Row justify="center" align="middle" style={{ width: "100%" }}>
        <Col>
          <ExtractBtn
            size="large"
            type="primary"
            onClick={onSaveSelection}
            loading={false}
            disabled={
              selectedTags.length < 2

              // sourceDataSheetType === undefined ||
              // (sourceDataSheetType === DataSourceSheetTypeEnum.Forms &&
              //   sheetJoinField.length === 0) ||
              // updateSessionLoading
            }
          >
            Save & Continue
          </ExtractBtn>
        </Col>
      </Row>
    </Modal>
  );
};
