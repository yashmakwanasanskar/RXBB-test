import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { PatientInfo } from "@/types";
import API, { BASE_URL } from "@/constants/api.constant";
import Cookies from "js-cookie";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import { PatientFIeldData } from "@/constants/fields";
import LoadingScreen from "@/components/shared/loading-screen"
// PatientList component
const PatientList = () => {
  // State to store patient data
  const [data, setData] = useState<PatientInfo[]>([]);
  const [getFilterationAPIString, setFilterationAPIString] =
    useState<string>("");
  const [getPagesize, setPageSize] = useState<number>(10);
  const [getListofFields, setListofFields] = useState<any>(undefined);
  const [loadData, setLoadData] = useState<boolean>(false);

  const [getAllDataCount, setAllDataCount] = useState<number>(0);
  const [getLimitStart, setLimitStart] = useState<number>(0);
  // const [getPage, setPageSize] = useState<string>("")
  /*
  Fetches patient data from a remote API endpoint,
  then processes the received JSON data to extract relevant
  fields and updates the state with the filtered data.
  */
  // useEffect(() => {
  //   async function fetchPatientListData() {
  //     const res = await fetch(
  //       'https://qa-tenant.rxbb.io/api/resource/Patient?fields=["*"]',
  //       { headers: { Authorization: "token 8439f44d8979c57:0211dc092e01771" } }
  //     );

  //     const dataJson = await res.json();

  //     const finalData = dataJson.data.map((item: any) => ({
  //       mobile: item.mobile,
  //       sex: item.sex,
  //       dob: item.dob,
  //       customPatientStatus: item.custom_patient_status,
  //       patientName: item.patient_name,
  //       email: item.email,
  //     }));

  //     setData(finalData);
  //   }
  //   fetchPatientListData();
  // }, []);

  // Fetch patient data from a local JSON object'

  useEffect(() => {
    const fetchData = async () => {
      try {
        //for filtering data with a DOB field
        // const url = BASE_URL + API.LIST_PATIENT +  (getFilterationAPIString ? `&or_filters=[["patient_name","like","%${getFilterationAPIString}%"],["email","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["mobile","like","%${getFilterationAPIString}%"],["sex","like","%${getFilterationAPIString}%"]` + (isValidDateFormat(getFilterationAPIString) ? `["dob","=","${getFilterationAPIString}"]]` :"]") : '')
        const url =
          BASE_URL +
          API.LIST_PATIENT +
          (getFilterationAPIString
            ? `&or_filters=[["patient_name","like","%${getFilterationAPIString}%"],["email","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["mobile","like","%${getFilterationAPIString}%"],["sex","like","%${getFilterationAPIString}%"]]`
            : "") +
          `&limit_page_length=${getPagesize}` +
          `&limit_start=${getLimitStart}&order_by=creation desc`;
        const response = await axiosGETAPI(url, {
          headers: {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data",
          },
        });
        setData(response.data.data);

        const urlGetAllSize = BASE_URL + API.GET_RECORD_COUNT;

        const res = await axiosPOSTAPI(
          urlGetAllSize,
          {
            doctype: "Patient",
            or_filters: getFilterationAPIString
              ? `[["patient_name","like","%${getFilterationAPIString}%"],["email","like","%${getFilterationAPIString}%"],["status","like","%${getFilterationAPIString}%"],["mobile","like","%${getFilterationAPIString}%"],["sex","like","%${getFilterationAPIString}%"]]`
              : "[]",
            fields: [],
            distinct: false,
          },
          {
            headers: { Authorization: Cookies.get("Authorization") },
          }
        );
        if (res.status == 200) {
          setAllDataCount(res.data.message);
          const urlFieldData = BASE_URL + API.GET_LIST_VIEW_SETTING;
          const responseFieldData = await axiosPOSTAPI(urlFieldData, {
            doctype: "Patient",
          });
          if (response.status === 200) {
            if (responseFieldData.data.message) {
              const fieldSetting = JSON.parse(
                responseFieldData.data.message.fields
              );

              console.log(PatientFIeldData, data);
              setListofFields(
                fieldSetting
                  .map((item: any) => item.fieldname)
                  .filter((field: string) => PatientFIeldData.includes(field))
              );
            } else {
              setListofFields(PatientFIeldData);
            }
          }
        } else {
          console.log(
            "not a valid data while getting from GetAllDataCount API"
          );
        }
        setLoadData(true);
      } catch (error) {
        console.error("Error fetching patient data:", error);
        // Handle error: Display error message or fallback data
      }
    };

    fetchData();
  }, [getFilterationAPIString, getPagesize, getLimitStart]);

  return (
    loadData ? (
      <div className="p-5 pb-14">
        <h2 className="app-tab-heading">Patients</h2>
        <div>
          {/* Render DataTable component with fetched patient data */}
          <DataTable
            data={data}
            setFilter={setFilterationAPIString}
            setPageSize={setPageSize}
            getPageSize={getPagesize}
            getAllDataCount={getAllDataCount}
            setLimitStart={setLimitStart}
            getLimitStart={getLimitStart}
            dataTableProps={{ getListofFields, setListofFields }}
          />
        </div>
      </div>
    ):<LoadingScreen />
  );
};
export default PatientList;
