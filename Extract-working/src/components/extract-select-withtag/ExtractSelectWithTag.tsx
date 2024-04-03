import React, { FunctionComponent, useEffect, useState } from "react";
import { Checkbox, Select, Space, Tag } from "antd";
import type { SelectProps } from "antd";

const { Option } = Select;
interface Props {
  optionValues: string[];
  maxWidth?: number;
  onTagsChange: (tags: string[]) => void;
}

interface OptionType {
  label: string;
  value: string;
}
export const ExtractSelectWithTag: FunctionComponent<Props> = ({
  optionValues,
  maxWidth = 550,
  onTagsChange,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectionCount, setSelectionCount] = useState<number>(0);
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  useEffect(() => {
    console.log("flattenedFields", optionValues);

    const updatedOptions = optionValues.map((item) => ({
      label: item,
      value: item,
    }));

    console.log("options", updatedOptions);

    setOptions(updatedOptions);
  }, []);

  const forMap = (tag: string) => (
    <>
      <span key={tag} style={{ display: "inline-block" }}>
        <Tag
          closable
          onClose={(e) => {
            e.preventDefault();
            handleClose(tag);
          }}
        >
          {tag}
        </Tag>
      </span>
    </>
  );
  const handleclearall = () => {
    setTags([]);
    setSelectionCount(0);
  };
  const tagChild = tags.map(forMap);

  const handleChange = (value: string[]) => {
    if (!tags.includes(`${value}`)) {
      console.log(`selected ${value}`);
      setTags((prevTags) => {
        const newTags = [...prevTags, ...value];
        setSelectionCount(newTags.length);
        console.log(newTags, "tags");
        onTagsChange(newTags);
        return newTags;
      });
    }
  };

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags([...newTags]);
    setSelectionCount(newTags.length);
    onTagsChange(newTags);
  };

  return (
    <div style={{ width: "40%" }}>
      <Space style={{ width: "100%", margin: 10 }} direction="vertical">
        <Select
          className="extract-select"
          dropdownAlign={{ offset: [-40, 0] }}
          dropdownMatchSelectWidth={false}
          dropdownStyle={{ width: maxWidth }}
          mode="multiple"
          value={[]}
          allowClear
          style={{ width: "100%" }}
          placeholder={
            selectionCount ? `${selectionCount} Selected` : "Please Select"
          }
          onChange={handleChange}
          size="large"
          maxTagCount={2}
          disabled={tags.length >= 2}
        >
          {options?.map((option) => (
            <Select.Option
              key={option.value}
              value={option.value}
              label={option.label}
            >
              <Space>
                <span>
                  {" "}
                  <Checkbox checked={tags.includes(`${option.label}`)} />
                </span>
                <span>{option.label}</span>
              </Space>
            </Select.Option>
          ))}
        </Select>
        <div>
          <span className="tag"> {tagChild} </span>{" "}
          {tags.length > 0 && (
            <span onClick={handleclearall} className="clearTag">
              {" "}
              Clear all
            </span>
          )}
        </div>
      </Space>
    </div>
  );
};
