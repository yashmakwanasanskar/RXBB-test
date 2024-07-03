import API, { BASE_URL } from "@/constants/api.constant";
import { axiosPOSTAPI } from "../commonAPI";

export const changeColumnPosition = async (
  doctype: string,
  fieldsVisible: any,
  fieldremoved: any
) => {
  const url = BASE_URL + API.SET_LIST_VIEW_SETTING;

  const response = await axiosPOSTAPI(url, {
    doctype: doctype,
    listview_settings: JSON.stringify(fieldsVisible),
    removed_listview_fields: JSON.stringify(fieldremoved),
  });
  if (response.status === 200) {
    const fields = JSON.parse(response.data.message.listview_settings.fields);
    return fields.map((field: any) => field.fieldname);
  } else {
    return [];
  }
};

export const TableViewColumnVisibility = async (
  doctype: string,
  fields: any,
  label: string
) => {
  const url = BASE_URL + API.TABLE_VIEW_SETTING;
  const response = await axiosPOSTAPI(url, {
    doctype: doctype,
    user_settings: JSON.stringify(fields),
  });
  if (response.status === 200) {
    return response.data
  }
};
