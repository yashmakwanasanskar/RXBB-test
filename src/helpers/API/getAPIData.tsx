import API, { BASE_URL } from "@/constants/api.constant";
import { axiosPOSTAPI } from "../commonAPI";

export const getList = async (
  doctype: string,
  filters: string,
  fields: string,
  parent: string,
  order_by: string = "idx"
) => {
  const URL = BASE_URL + API.CLIENT_GET_LIST;
  const respose = await axiosPOSTAPI(URL, {
    doctype: doctype,
    filters: filters,
    fields: fields,
    parent: parent,
    order_by: order_by,
  });
  if (respose.status === 200) {
    return respose.data.message;
  } else {
    return [];
  }
};

export const getChildTableValue = async (
  doctype: string,
  docname: string,
  table_name: string
) => {
  const URL = BASE_URL + API.GET_CHILD_TABLE_VALUE;
  const respose = await axiosPOSTAPI(URL, {
    doctype: doctype,
    docname: docname,
    table_name: table_name,
  });
  if (respose.status === 200) {
    return respose.data.message;
  } else {
    return [];
  }
};

export const validatedLink = async (
  doctype: string,
  docname: string,
  fields: string
) => {
  const URL = BASE_URL + API.VALIDATED_LINK;
  const respose = await axiosPOSTAPI(URL, {
    doctype: doctype,
    docname: docname,
    fields: fields,
  });
  if (respose.status === 200) {
    
    return respose.data.message;
  } else {
    return [];
  }
};

export const getDocMethod = async (doc: any, method: string) => {
  const URL = BASE_URL + API.RUN_DOC_METHOD;
  const response = await axiosPOSTAPI(URL, { docs: JSON.stringify(doc), method: method });
  return response
};
