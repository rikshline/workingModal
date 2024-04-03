// import React, { FunctionComponent, useEffect, useState } from "react";
// import { Select, Space, Tag, Checkbox } from "antd";
// import type { SelectProps } from "antd";
// import Styles from "../mystyles.module.css";
// import { originalDataHeaders } from "../utils/data";
// interface Props {
//   originalDataHeaders: { sheet: string; fields: string[] }[];
//   onTagsChange: (tags: string[]) => void;
// }
// // options = [{ label: 'Gold', value: 'Gold' }, { label: 'Silver', value: 'Silver' }, { label: 'Platinum', value: 'Platinum' }, { label: 'Diamond', value: 'Diamond' }];

// export const ExtractSelectWithTagoLD: FunctionComponent<Props> = ({
//   originalDataHeaders,
//   onTagsChange,
// }) => {
//   const [tags, setTags] = useState<string[]>([]);
//   const [selectionCount, setSelectionCount] = useState<number>(0);
//   const [options, setOptions] = useState<SelectProps["options"]>([]);
//   useEffect(() => {
//     const flattenedFields: string[] = originalDataHeaders.reduce(
//       (
//         accumulators: string[],
//         currentValue: { fields: ConcatArray<string> }
//       ) => {
//         const combinedFields = accumulators.concat(currentValue.fields);
//         return Array.from(new Set(combinedFields));
//       },
//       []
//     );

//     console.log("flattenedFields", flattenedFields);

//     const updatedOptions = flattenedFields.map((item) => ({
//       label: item,
//       value: item,
//     }));

//     console.log("options", updatedOptions);

//     setOptions(updatedOptions);
//   }, []);

//   const forMap = (tag: string) => (
//     <>
//       <span key={tag} style={{ display: "inline-block" }}>
//         <Tag
//           closable
//           onClose={(e) => {
//             e.preventDefault();
//             handleClose(tag);
//           }}
//         >
//           {tag}
//         </Tag>
//       </span>
//     </>
//   );
//   const handleclearall = () => {
//     setTags([]);
//     setSelectionCount(0);
//   };
//   const tagChild = tags.map(forMap);

//   const handleChange = (value: string[]) => {
//     if (!tags.includes(`${value}`)) {
//       console.log(`selected ${value}`);
//       setTags((prevTags) => {
//         const newTags = [...prevTags, ...value];
//         setSelectionCount(newTags.length);
//         console.log(newTags, "tags");
//         onTagsChange(newTags);
//         return newTags;
//       });
//     }
//   };

//   const handleClose = (removedTag: string) => {
//     const newTags = tags.filter((tag) => tag !== removedTag);
//     setTags([...newTags]);
//     setSelectionCount(newTags.length);
//     onTagsChange(newTags);
//   };

//   return (
//     <div style={{ width: "40%" }}>
//       <Space style={{ width: "100%", margin: 10 }} direction="vertical">
//         <Select
//           mode="multiple"
//           allowClear
//           style={{ width: "100%" }}
//           placeholder={
//             selectionCount ? `${selectionCount} Selected` : "Please Select"
//           }
//           onChange={handleChange}
//           value={null}
//           options={options}
//           optionRender={(option) => (
//             <Space className={Styles.selectorOption}>
//               <span>
//                 {" "}
//                 <Checkbox checked={tags.includes(`${option.label}`)} />
//               </span>
//               <span>{option.label}</span>
//             </Space>
//           )}
//           size="large"
//           maxTagCount={2}
//           disabled={tags.length >= 2}
//         />
//         <div>
//           <span className={Styles.tag}> {tagChild} </span>{" "}
//           {tags.length > 0 && (
//             <span onClick={handleclearall} className={Styles.clearTag}>
//               {" "}
//               Clear all
//             </span>
//           )}
//         </div>
//       </Space>
//     </div>
//   );
// };
export {}