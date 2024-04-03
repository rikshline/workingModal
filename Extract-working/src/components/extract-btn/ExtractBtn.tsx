import { Button, Tooltip } from "antd";
import { ButtonProps } from "antd/lib/button/button";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ExtractBtnInterface extends ButtonProps {
  id?: string;
  tooltipText?: string;
  link?: string;
  strong?: boolean;
  tableFilter?: boolean;
}

export const ExtractBtn: FunctionComponent<ExtractBtnInterface> = ({
  id,
  tooltipText,
  link,
  strong = false,
  tableFilter = false,
  ...restProps
}) => {
  let btnClass = "";

  if (restProps.type && !["link"].includes(restProps.type)) {
    if (strong) {
      btnClass = "extract-action-btn";
    } else if (tableFilter) {
      btnClass = "extract-btn extract-btn-filter";
    } else {
      btnClass = "extract-btn";
    }
  }

  let btn = (
    <Button
      className={btnClass}
      style={{ height: "fit-content" }}
      id={id}
      {...restProps}
    />
  );

  btn = !!link ? <Link to={link}>{btn}</Link> : btn;

  return !!tooltipText ? <Tooltip title={tooltipText}>{btn}</Tooltip> : btn;
};
