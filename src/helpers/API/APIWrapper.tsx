import { getChildTableValue, getList } from "./getAPIData";

export const getListWrapper = async (
  id: any,
  childDocType: string,
  doctype: string,
  filter: string,
  fields: string,
  parentField: string,
  parentType: string
) => {
  return (await getList(childDocType, filter, fields, doctype)).map(
    (item: any) => {
      return {
        ...item,
        parent: id,
        doctype: childDocType,
        parentfield: parentField,
        parenttype: parentType,
      };
    }
  );
};

export const getChildValueWrapper = async (
  doctype: string,
  docName: string,
  tableName: string,
) => {
  return await getChildTableValue(doctype, docName, tableName);
};
