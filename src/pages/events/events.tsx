import LoadingScreen from "@/components/shared/loading-screen";
import API, { BASE_URL } from "@/constants/api.constant";
import { EventFieldsData } from "@/constants/fields";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { PatientAppointmentList } from "@/types";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";

export default function Event() {
  const [data, setData] = useState<PatientAppointmentList[]>([]);
  const [getFilterationAPIString, setFilterationAPIString] =
    useState<string>("");
  const [getPagesize, setPageSize] = useState<number>(10);
  const [getAllDataCount, setAllDataCount] = useState<number>(0);
  const [getLimitStart, setLimitStart] = useState<number>(0);
  const [getListofFields, setListofFields] = useState<any>();
  const [cmrServiceChecBox, setCmrServiceChecBox] = useState<boolean>(false);
  const [immunizationServiceChecBox, setImmunizationServiceChecBox] =
    useState<boolean>(false);
  const [loadData, setLoadData] = useState<boolean>(false);
  const [customFilter, setCustomFilter] = useState<any>([]);
  useEffect(()=>{
    console.log("setListofFields",getListofFields)
  },[getListofFields])
  useEffect(() => {
    const fetchData = async () => {
      try {
        //for filtering data with a DOB field
        // const url = BASE_URL + API.LIST_PATIENT +  (getFilterationAPIString ? `&or_filters=[["patient_name","like","%${getFilterationAPIString}%"],["email","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["mobile","like","%${getFilterationAPIString}%"],["sex","like","%${getFilterationAPIString}%"]` + (isValidDateFormat(getFilterationAPIString) ? `["dob","=","${getFilterationAPIString}"]]` :"]") : '')

        const url =
          BASE_URL +
          API.LIST_EVENT +
          (getFilterationAPIString
            ? `&or_filters=[["name","like","%${getFilterationAPIString}%"],["subject","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["custom_patient_appointment_count","like","%${getFilterationAPIString}%"]]`
            : "") +
          `&limit_page_length=${getPagesize}` +
          `&limit_start=${getLimitStart}&order_by=creation desc`;
        const response = await axiosGETAPI(url);
        setData(response.data.data);

        const urlGetAllSize = BASE_URL + API.GET_RECORD_COUNT;

        const res = await axiosPOSTAPI(urlGetAllSize, {
          doctype: "Event",
          or_filters: getFilterationAPIString
            ? `[["subject","like","%${getFilterationAPIString}%"],["custom_patient_appointment_count","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["name","like","%${getFilterationAPIString}%"]]`
            : "[]",
          fields: [],
          distinct: false,
        });
        if (res.status == 200) {
          setAllDataCount(res.data.message);

          const urlFieldData = BASE_URL + API.GET_LIST_VIEW_SETTING;
          const responseFieldData = await axiosPOSTAPI(urlFieldData, {
            doctype: "Event",
          });
          if (responseFieldData.status === 200) {
            if (responseFieldData.data.message) {
              const fieldSetting = JSON.parse(
                responseFieldData.data.message.fields
              );
              setListofFields(
                fieldSetting
                  .map((item: any) => item.fieldname)
                  .filter((field: string) =>
                    EventFieldsData.includes(field)
                  )
              );
            } else {
              setListofFields(EventFieldsData);
            }
          }

          setLoadData(true);
        } else {
          console.log(
            "not a valid data while getting from GetAllDataCount API"
          );
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Handle error: Display error message or fallback data
      }
    };

    fetchData();
  }, [
    getFilterationAPIString,
    getPagesize,
    getLimitStart,
    customFilter
  ]);

  return (
    loadData ? (
      <div className="p-5 pb-14 ">
        <h2 className="app-tab-heading">Event</h2>
        <div>
          <DataTable
            data={data}
            setFilter={setFilterationAPIString}
            setPageSize={setPageSize}
            getPageSize={getPagesize}
            getAllDataCount={getAllDataCount}
            setLimitStart={setLimitStart}
            getLimitStart={getLimitStart}
            filterProps={{
              cmrServiceChecBox,
              setCmrServiceChecBox,
              immunizationServiceChecBox,
              setImmunizationServiceChecBox,
              getListofFields,
              setListofFields,
              customFilter,
              setCustomFilter,
            }}
          />
        </div>
      </div>
    ):<LoadingScreen/>
  );
}
