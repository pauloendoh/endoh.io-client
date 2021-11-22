import React from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const ResourcesChartTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  return (
    <div>
      <p>ronaldo</p>
    </div>
  );
};

export default ResourcesChartTooltip;
