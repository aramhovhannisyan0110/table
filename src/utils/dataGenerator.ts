import { v4 as uuidv4 } from "uuid";
import { IItems } from "@/store/mask";
export const dataGenerator = (
  data?: Array<IItems>,
  newData: Array<IItems> = [],
  parent = "",
  hide = false,
  depth = 0
): any => {
  data?.forEach((d) => {
    const id = uuidv4();
    newData.push({
      ...d,
      collapseId: id,
      collapseHide: hide,
      parentId: parent,
      classes: `ps-${Math.round(depth + 2)}`,
    });
    if (d?.children?.length) {
      dataGenerator(d.children, newData, id, true, depth + 1.5);
    }
  });
  return newData;
};
