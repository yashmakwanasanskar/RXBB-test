import API, { BASE_URL } from "@/constants/api.constant";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { PatientAppointmentList } from "@/types";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { PatientAppointmentFieldsData } from "@/constants/fields";
import { getPatientAppointmentData } from "@/constants";
import LoadingScreen from "@/components/shared/loading-screen";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Appointment() {
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
  const [appointmentTypeFilter, setAppointmentTypeFilter] = useState<any[]>([]);
  const [loadData, setLoadData] = useState<boolean>(false);
  const [customFilter, setCustomFilter] = useState<any>([]);
  const [customFilterFieldState, setCustomFilterFieldState] = useState<any>([]);
  const location = useLocation();
  const [reloadData, setReloadData] = useState<any>(false);
  const { event } = location.state || {};
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //for filtering data with a DOB field
        // const url = BASE_URL + API.LIST_PATIENT +  (getFilterationAPIString ? `&or_filters=[["patient_name","like","%${getFilterationAPIString}%"],["email","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["mobile","like","%${getFilterationAPIString}%"],["sex","like","%${getFilterationAPIString}%"]` + (isValidDateFormat(getFilterationAPIString) ? `["dob","=","${getFilterationAPIString}"]]` :"]") : '')

        const url =
          BASE_URL +
          API.LIST_APPOINTMENT +
          (getFilterationAPIString
            ? `&or_filters=[["title","like","%${getFilterationAPIString}%"],["appointment_type","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["patient_name","like","%${getFilterationAPIString}%"],["name","like","%${getFilterationAPIString}%"]]`
            : "") +
          `&filters=${JSON.stringify(
            customFilter.concat(appointmentTypeFilter)
          )}` +
          `&limit_page_length=${getPagesize}` +
          `&limit_start=${getLimitStart}&order_by=creation desc`;
        const response = await axiosGETAPI(url);
        setData(response.data.data);

        const urlGetAllSize = BASE_URL + API.GET_RECORD_COUNT;

        const res = await axiosPOSTAPI(urlGetAllSize, {
          doctype: "Patient Appointment",
          or_filters: getFilterationAPIString
            ? `[["title","like","%${getFilterationAPIString}%"],["appointment_type","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["patient_name","like","%${getFilterationAPIString}%"],["name","like","%${getFilterationAPIString}%"]]`
            : "[]",
          fields: [],
          distinct: false,
          filters: JSON.stringify(customFilter.concat(appointmentTypeFilter)),
        });
        if (res.status == 200) {
          setAllDataCount(res.data.message);

          const urlFieldData = BASE_URL + API.GET_LIST_VIEW_SETTING;
          const responseFieldData = await axiosPOSTAPI(urlFieldData, {
            doctype: "Patient Appointment",
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
                    PatientAppointmentFieldsData.includes(field)
                  )
              );
            } else {
              console.log(PatientAppointmentFieldsData);
              setListofFields(PatientAppointmentFieldsData);
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
    appointmentTypeFilter,
    customFilter,
    reloadData
  ]);
  useEffect(() => {
    if (event) {
      setCustomFilter([["custom_event_id", "=", event]]);
      setCustomFilterFieldState(["Equals"]);
    }
  }, []);

  return loadData ? (
    <div className="p-5 pb-14">
      <h2 className="app-tab-heading">Patient Appointment</h2>
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
            setAppointmentTypeFilter,
            getListofFields,
            setListofFields,
            customFilter,
            setCustomFilter,
            customFilterFieldState,
            setCustomFilterFieldState,
            appointmentTypeFilter,
            reloadData,
            setReloadData
          }}
        />
      </div>
    </div>
  ) : (
    <LoadingScreen />
  );
}
