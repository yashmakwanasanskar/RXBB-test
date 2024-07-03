import { useEffect, useState, memo, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useSearchParams } from 'react-router-dom';
import API, { BASE_URL } from "@/constants/api.constant";
import { axiosGETAPI, axiosPOSTAPI } from "@/helpers/commonAPI";
import LoadingScreen from "@/components/shared/loading-screen";
import { Checkbox } from "@/components/ui/checkbox";
import { InputModifyStyle } from "@/components/ui/input";
import { LabelModifyStyle, Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Carousel } from 'antd';
import moment from "moment";
import ReqiredFieldErrorImage from "@/components/shared/reqiredFieldError";
import { DynamicRadioButtonWithUseFormHookWithMpdifyStyle } from "@/components/shared/DynamicRadioButton";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "react-international-phone";
import { ComboboxDropDownWithModifyStyle } from "@/components/shared/comboBoxDropDown";
import { removeHtmlTags } from "@/utilities/utils";
import toast, { Toaster } from "react-hot-toast";
import {
  CarouselImage1,
  CarouselImage2,
  CarouselImage3,
  DeleteFileIcon,
  DocFileicon,
  ServiceTypeImage,
  InfoIcon,
  UploadIcon,
  RXBBShortLogoIcon
} from "@/constants/images";
import { AllAvailableDatesInfo, AllAvailableQuestionnaireInfo, AllAvailableSlotInfo, PaymentOptions, PaymentType, ServiceInfoForBooking, patientResponse, questionnaire } from "@/types";
import Dropzone from 'react-dropzone'

const Booking = () => {
  const [data, setData] = useState<ServiceInfoForBooking[]>([]);
  const [slots, setSlots] = useState<AllAvailableSlotInfo[]>([]);
  const [questionnaire, setQuestionnaire] = useState<AllAvailableQuestionnaireInfo[]>([]);
  const [paymentType, setPaymentType] = useState<PaymentType>();
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions[]>([]);
  const [date, setDate] = useState<AllAvailableDatesInfo | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | any>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [disclaimer, setDisclaimer] = useState<string>('');
  const [loadData, setLoadData] = useState<boolean>(false);
  const [collectPayment, setCollectPayment] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const [dateAndTime, setdateAndTime] = useState<boolean>(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<ServiceInfoForBooking[]>([]);
  const [getAPIDataDocs, setAPIDataDocs] = useState<any>({});
  const [gender, setGender] = useState("Male");
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<number | null>(null);
  const [immunizationId, setimmunizationId] = useState("");
  const [selectPolicyHolder, setSelectPolicyHolder] = useState("Yes");
  const [selectEmailPreference, setEmailPreference] = useState("");
  const [selectPaymentType, setselectPaymentType] = useState("insurance");
  const [isOver18, setIsOver18] = useState(true);
  const [selectedQuestionnaireAnswers, setSelectedQuestionnaireAnswers] = useState<any[]>([]);
  const [patientResponse, setPatientResponse] = useState<patientResponse>();
  const [uploadedFilesForFront, setUploadedFilesForFront] = useState([]);
  const [uploadedFilesForBack, setUploadedFilesForBack] = useState([]);
  const [groupedByServiceType, setGroupedByServiceType] = useState<Record<string, ServiceInfoForBooking[]>>({});
  const [isChecked, setIsChecked] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const event = searchParams.get('event');
  const targetRef = useRef<any>(null);
  const slotRef = useRef<any>(null);
  const questionnaireRef = useRef<any>(null);
  const [termAndCondition, setTermAndCondition] = useState(false);
  const [userEmail, setUserEmail] = useState(false);

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    setValue,
    control,
    reset
  } = useForm();

  // AllServices API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = BASE_URL + API.GET_SERVICE_FOR_BOOKING + `?event=${event}`;
        const response = await axiosGETAPI(url);
        setData(response.data.message.data);

        setCollectPayment(response.data.message.collect_payment)
        setDisclaimer(response.data.message.disclaimer)
        setLoadData(true);
        setPaymentType(response.data.message.payment_type_options)
        setCompanyName(response.data.message.company)
        setLocation(response.data.message.location)

      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    const groupData = data.reduce<any>(
      (acc, { service_type: serviceType, ...item }) => {
        acc[serviceType] = acc[serviceType] ? acc[serviceType] : [];
        acc[serviceType].push(item);
        return acc;
      }, {}
    );
    setGroupedByServiceType(groupData);
  }, [data]);

  // Reset the state when service is not selected
  useEffect(() => {
    if (selectedDate) {
      getAllSlots();
    }
    if (selectedServices.length === 0) {
      setSlots([]);
      setDate(null)
      setSelectedDate('')
      setSelectedSlot('')
    }
  }, [selectedDate, selectedServices]);

  useEffect(() => {
    if (paymentType) {
      const PaymentTypeDropDownOption = paymentType?.[selectPaymentType]?.map((paymentType: string) => ({
        key: paymentType,
        value: paymentType,
      }));
      setPaymentOptions(PaymentTypeDropDownOption);
    }
  }, [selectPaymentType, paymentType]);

  useEffect(() => {
    if (!timeLeft) return;

    if (timeLeft === 0) {
      setTimeLeft(null)
    }

    const intervalId = setInterval(() => {

      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);

  }, [timeLeft]);

  // Store the selected services
  const toggleSelectedService = (service: ServiceInfoForBooking) => {
    if (isChecked.includes(service)) {
      const serviceIndex = isChecked.indexOf(service);
      isChecked.splice(serviceIndex, 1);
    } else {
      setIsChecked([...isChecked, service]);
    }
    const newSelectedServices = [...selectedServices];
    const existingIndex = newSelectedServices.findIndex(item => item.service_name === service.service_name);

    if (existingIndex === -1) {
      newSelectedServices.push(service);
    } else {
      newSelectedServices.splice(existingIndex, 1);
    }
    setSelectedServices(newSelectedServices);
    getAllDates()
    setSelectedSlot('')
    setdateAndTime(false)
    setSlots([]);
    setDate(null)
    setSelectedDate('')
    setAPIDataDocs({})
    setShowQuestionnaire(false)
    reset()

    const chargesArray = newSelectedServices.map((element) => {
      const totalCharge = element.charge;
      return totalCharge;
    });

    const totalSum = chargesArray.reduce((accumulator, current) => accumulator + current, 0);
    setTotalValue(totalSum)
  }

  const submitServices = () => {
    setdateAndTime(true)

    setTimeout(() => {
      if (targetRef.current && selectedServices) {
        targetRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    }, 300);
  }

  // Available dates for calender API call
  const getAllDates = async () => {
    const url = BASE_URL + API.GET_ALL_AVAILBALE_DATES;

    const httpOptions = {
      "Content-Type": "application/json",
    };

    const reqBody = JSON.stringify({
      event: event,
    });

    try {
      const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
      setDate(response.data.message);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  }

  // select date from calendar
  const onDateChange = async (value: any) => {
    setSelectedDate(moment(value).format('YYYY-M-DD'))
  };

  // Available slots based on date API call
  const getAllSlots = async () => {
    const services = selectedServices.map((ele) => { return ele.service_name })
    const url = BASE_URL + API.GET_ALL_AVAILBALE_SLOTS;

    const httpOptions = {
      "Content-Type": "application/json",
    };

    const reqBody = JSON.stringify({
      event: event,
      services: services,
      date: selectedDate
    });

    try {
      const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
      setSlots(response.data.message);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  }

  // Disabled date based on value
  const isDisabled = (current: any) => {
    const startDate = moment();
    const endDate = date && date.periods?.end;
    const disabledDays = date && date.days || [];

    if (!startDate || !endDate) {
      console.warn('Start date or end date is missing. Disabling all dates.');
      return true;
    }

    const startDateMoment = moment(startDate);
    const endDateMoment = moment(endDate);

    const isOutsideRange = moment(current.date).isBefore(startDateMoment.startOf('day')) || moment(current.date).isAfter(endDateMoment);
    if (isOutsideRange) {
      return true;
    }

    const day = moment(current.date).format('ddd');
    if (disabledDays.length > 0 && !disabledDays.includes(day)) {
      return true;
    }
    return false;
  };

  // Select the slot
  const selecteSlot = (slot: string) => {
    setSelectedSlot(slot)

    setTimeout(() => {
      if (slotRef.current) {
        slotRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }

  // Calculate age
  const calculateAge = (event: any) => {
    const newDate = event?.target?.value;

    if (newDate) {
      const today = moment();
      const birthDate = moment(newDate);
      const years = today.diff(birthDate, 'years');

      const monthDiff = today.month() - birthDate.month();
      if (monthDiff < 0 || (monthDiff === 0 && today.date() < birthDate.date())) {
        setIsOver18(years - 1 >= 18);
      } else {
        setIsOver18(years >= 18);
      }
    } else {
      setIsOver18(false);
    }
  }

  // Questionnaire list API call
  const getQuestionnaire = async () => {
    const services = selectedServices.map((ele) => { return ele.service_name })
    const url = BASE_URL + API.GET_ALL_QUESTIONNAIRE;

    const httpOptions = {
      "Content-Type": "application/json",
    };

    const reqBody = JSON.stringify({
      event: event,
      services: services
    });

    try {
      const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
      setQuestionnaire(response.data.message);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  }

  // Patient appointment booking API call
  const saveProfileDetails = async () => {
    const isValid = await trigger();
    if (!isValid) {
      toast("Please fill all mandetory feild");
    }
    else if (isValid && !getAPIDataDocs.payment_type) {
      toast.dismiss();
        toast("Please select payment type");
    }
    if (isValid && getAPIDataDocs.payment_type ) {
      const formData = getValues();
      setUserEmail(formData.email)

      const services = selectedServices.map((ele) => { return ele.service_name })
      const url = BASE_URL + API.BOOK_PATIENT_APPOINTMENT;

      const httpOptions = {
        "Content-Type": "application/json",
      };

      const reqBody = JSON.stringify({
        event: event,
        services: services,
        patient_details: { ...getAPIDataDocs, ...formData },
        date: selectedDate,
        time: selectedSlot[0]
      });

      try {
        const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
        if (response.data.message) {
          setPatientResponse(response.data.message)
          getQuestionnaire()
          setShowQuestionnaire(true)
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }

    setTimeout(() => {
      if (questionnaireRef.current) {
        questionnaireRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }

  const handlerEmailPreference = (e: any) => {
    setEmailPreference(e.target.value);
  };

  const handlerNotificationPreference = (event: any) => {
    if (event.target.value === "Text SMS") {
      setAPIDataDocs({ ...getAPIDataDocs, "report_preference": "Text SMS" })
    }
    else if (event.target.value === "Email") {
      setAPIDataDocs({ ...getAPIDataDocs, "report_preference": "Email" })
    }
  };

  const handleInputChangeComboBox = (value: string, label: string) => {
    setAPIDataDocs({ ...getAPIDataDocs, [label]: value }
    );
  };

  const changesetselectPaymentType = (e: any) => {
    setselectPaymentType(e.target.value);
    setAPIDataDocs({ ...getAPIDataDocs, "payment_type": "" }
    );
  };

  const handleCheckboxChange = (value: string, vaccineName: string, question: any) => {
    setSelectedQuestionnaireAnswers((prevAnswers: any) => {
      const index = prevAnswers.findIndex((entry: any) => entry[vaccineName]);

      const newEntry = { question_no: question.question_no, answer: value === 'Yes' ? 'YES' : value === 'No' ? 'NO' : 'na' };

      if (index !== -1) {
        const updatedQuestions = prevAnswers[index][vaccineName].filter((q: any) => q.question_no !== question.question_no);
        updatedQuestions.push(newEntry);
        prevAnswers[index][vaccineName] = updatedQuestions;
      } else {
        prevAnswers.push({ [vaccineName]: [newEntry] });
      }

      return [...prevAnswers];
    });
  };

  const uploadInsuranceCardFront = (acceptedFiles: any) => {
    setUploadedFilesForFront(acceptedFiles)
    const file = acceptedFiles.find((f: any) => f)
    let reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      const data = reader.result as any
      const base64Data = data?.split(',')[1];

      setAPIDataDocs({ ...getAPIDataDocs, "insurance_card_front": base64Data });
    }
  }

  const uploadInsuranceCardBack = (acceptedFiles: any) => {
    setUploadedFilesForBack(acceptedFiles)
    const file = acceptedFiles.find((f: any) => f)
    let reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const data = reader.result as any
      const base64Data = data?.split(',')[1];
      setAPIDataDocs({ ...getAPIDataDocs, "insurance_card_back": base64Data });
    }
  }

  const saveQuestionnaire = async () => {
    if (!termAndCondition) {
      toast("Please select term and condition");
    } else {

      const services = selectedServices.map((ele) => { return ele.service_name })
      const url = BASE_URL + API.CREATE_QUESTIONNAIRE_RESPONSE;

      const httpOptions = {
        "Content-Type": "application/json",
      };

      const reqBody = JSON.stringify({
        event: event,
        services: services,
        patient: patientResponse?.patient,
        patient_appointments: patientResponse?.patient_appointments,
        questionnaire_response: selectedQuestionnaireAnswers
      });

      try {
        const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
        if (response.data) {
          setimmunizationId(response.data.message.immunization_id)

          if (getAPIDataDocs.payment_type == 'Credit Card') {
            paymentEntry();
          }
          else {
            setConfirmation(true)
          }
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }
  }

  const paymentEntry = async () => {
    const services = selectedServices.map((ele) => { return ele.service_name })
    const url = BASE_URL + API.GET_PAYMENT_URL;

    const httpOptions = {
      "Content-Type": "application/json",
    };

    const reqBody = JSON.stringify({
      event: event,
      services: services,
      patient: patientResponse?.patient,
      immn_name: "IMMN-24-51",
      is_webform: 1,
      date: selectedDate
    });

    try {
      const response = await axiosPOSTAPI(url, reqBody, { headers: httpOptions });
      if (response.data) {
        setConfirmation(true)
        setTimeLeft(6)
        setTimeout(() => {
          window.location.href = response.data.message.payment_url
        }, 5000);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const termAndConditionFunc = () => {
    setTermAndCondition(true)
  }

  return (
    loadData ? (
      <div className="h-screen overflow-auto pb-28">
        <div className="container">
          {
            !confirmation ?
              <>
                <div className="grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-10 mt-6 lg:mt-16">
                  <div className="hidden lg:block">
                    <Carousel autoplay>
                      <img
                        src={CarouselImage1.path}
                        alt={CarouselImage1.alt}
                        className="h-full w-full rounded-[35px] object-cover"
                      />
                      <img
                        src={CarouselImage2.path}
                        alt={CarouselImage2.alt}
                        className="h-full w-full rounded-[35px] object-cover"
                      />
                      <img
                        src={CarouselImage3.path}
                        alt={CarouselImage3.alt}
                        className="h-full w-full rounded-[35px] object-cover"
                      />
                    </Carousel>
                  </div>
                  <div>
                    <div className="mb-[15px]">
                      <img
                        src={RXBBShortLogoIcon.path}
                        alt="herosection"
                        className="w-[51px] h-[51px] lg:w-[81px] lg:h-[81px]"
                      />
                    </div>
                    <div className="text-[#4C4C4C] text-[22px]">Welcome to</div>
                    <h1 className="text-[#4C4C4C] text-[40px] font-medium uppercase">{companyName}</h1>
                    <p className="text-[#413636] text-[18px]">Find and book an appointment near you.</p>
                    <div>
                      <div className="mt-10">
                        {Object.entries(groupedByServiceType).map(([serviceType, services]) => (
                          <div key={serviceType} className="border border-solid px-[10px] pt-[31px] pb-[10px] border-[#878787] rounded-[12px] relative mb-10">
                            <div className="flex items-center w-fit absolute px-3 bg-white top-[-22px] left-[12px]">
                              <div className="bg-[#61CE70] rounded-full mr-[12px]">
                                <img
                                  src={ServiceTypeImage.path}
                                  alt={ServiceTypeImage.alt}
                                  className="w-[23px] h-[23px] m-[9px]"
                                />
                              </div>
                              <div>{serviceType}</div>
                            </div>
                            {services.map((service) => (
                              <div key={service.service_name} className={`bg-[#F9F9F9] py-[11px] px-[10px] rounded-[8px] flex items-center mb-1 border border-[2px] border-solid ${isChecked?.includes(service) ? 'border-[#61CE70]' : 'border-transparent'}`}>
                                <div className="flex flex-col sm:flex-row justify-between w-full">
                                  <div className="flex mb-2 sm:mb-0">
                                    <div className="mr-[12px] flex items-center">
                                      <Checkbox
                                        id="eligibilitycriteriachecbox1"
                                        className="data-[state=checked]:bg-[#61CE70] data-[state=checked]:border-[#61CE70] my-auto"
                                        onCheckedChange={() => toggleSelectedService(service)}
                                      />
                                    </div>
                                    <div className="text-[#595959] font-medium">{service.service_name}</div>
                                  </div>
                                  <div className="text-[#595959] text-sm ml-[26px] sm:ml-0">${service.charge} - {service.duration_in_min} minutes</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}

                        <Button
                          type="submit"
                          className="rounded-full lg:text-[20px] text-sm bg-[#61CE70] py-[15px] lg:py-[20px] w-full h-full mt-[-10px]"
                          onClick={() => submitServices()}
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedServices.length > 0 && dateAndTime &&
                  <div ref={targetRef} id="target-component" className="mt-10 md:mt-20 border border-solid border-[#2F2FBC24] rounded-[20px] p-[20px] md:p-[30px] shadow-lg md:shadow-2xl shadow-[#2C2CB838]">
                    <div className="grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6">
                      <div className="lg:pr-5">
                        <div className="heading-text-xl mb-5 font-semibold text-center">Schedule Appointment Details</div>
                        <Calendar onClickDay={(e) => onDateChange(e)} value={selectedDate} tileDisabled={isDisabled} />
                        <div className="flex mt-[24px] justify-center flex-col md:flex-row">
                          <div className="bg-[#F9F9F9] px-[32px] md:px-[22px] py-[10px] md:py-[16px] md:mr-[13px] rounded-[600px] flex items-center justify-center mb-3 md:mb-0 w-fit mx-auto">
                            <div className="font-medium mr-3 text-sm md:text-base">Available Days</div>
                            <div className="border border-solid bg-white w-[30px] h-[30px] border-[#61CE70] rounded-[600px] flex justify-center items-center">xx</div>
                          </div>
                          <div className="bg-[#F9F9F9] px-[22px] py-[10px] md:py-[16px] rounded-[600px] flex items-center justify-center w-fit mx-auto">
                            <div className="font-medium mr-3 text-sm md:text-base">Unavailable Days</div>
                            <div className="border border-solid bg-[#F9F9F9] text-[#ababab] w-[30px] h-[30px] rounded-[600px] flex justify-center items-center">xx</div>

                          </div>
                        </div>
                      </div>

                      {slots && selectedDate &&
                        <div>
                          <div className="heading-text-xl mb-5 font-semibold text-center md:text-start">Appointments for {moment(selectedDate).format('MMMM D, YYYY')}</div>
                          {
                            slots[selectedDate]?.length !== 0 ?
                              <div className="overflow-auto max-h-[300px] md:max-h-[468px]">
                                <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4">
                                  {slots[selectedDate]?.map((slot: any) => (
                                    <div key={slot} className={`py-3 md:py-4 px-4 md:px-7 h-fit rounded-[11px] hover:shadow-lg cursor-pointer flex justify-around ${slot === selectedSlot ? 'bg-[#61CE70] text-white font-semibold' : 'border border-solid'
                                      }`} onClick={() => selecteSlot(slot)}>
                                      {slot[0].slice(0, 5)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              : <div className="flex justify-center font-medium text-sm md:text-xl items-center h-full pb-5">No slots available</div>
                          }
                        </div>
                      }
                    </div>
                  </div>
                }

                {selectedSlot &&
                  <>
                    <div className="mb-10 md:mb-20 mt-10 md:mt-20" ref={slotRef} id="slot">
                      <>
                        <div className="heading-text-xl font-semibold text-[20px] md:text-[25px]">Patient Info.</div>
                        <div className="mt-5 p-4 border border-solid border-[#2F2FBC24] rounded-[20px] p-[20px] md:p-[30px] shadow-lg md:shadow-2xl shadow-[#2C2CB838]">
                          <div className="grid 2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-x-6 gap-y-6 md:gap-y-8 mt-2">
                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={getAPIDataDocs?.first_name}
                                {...register("first_name", { required: true })}
                                className={`${errors.first_name && "placeholder-shown:border-[#FF441B]"}`}
                              />
                              <LabelModifyStyle>
                                First Name
                              </LabelModifyStyle>
                            </div>
                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={getAPIDataDocs?.middle_name}
                                {...register("middle_name")}
                              />
                              <LabelModifyStyle>
                                Middle Name
                              </LabelModifyStyle>
                            </div>
                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={getAPIDataDocs?.last_name}
                                {...register("last_name", { required: true })}
                                className={`${errors.last_name && "placeholder-shown:border-[#FF441B]"}`}
                              />
                              <LabelModifyStyle>
                                Last Name <span className="text-[#FF0E0E]">*</span>
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="date"
                                defaultValue={getAPIDataDocs?.dob}
                                placeholder="mm-dd-yyyy"
                                {...register("dob", { required: true })}
                                onChange={calculateAge}
                                className={`${errors.dob && "border-[#FF441B] border-t-transparent"}`}
                              />
                              <LabelModifyStyle className={`${errors.dob && "before:border-t before:border-t-[#FF441B] after:border-t after:border-t-[#FF441B]"}`}>
                                Date of birth <span className="text-[#FF0E0E]">*</span>
                              </LabelModifyStyle>
                            </div>

                            {
                              !isOver18 &&
                              <>
                                <div className="grid w-full items-center gap-1.5 relative">
                                  <InputModifyStyle
                                    type="text"
                                    defaultValue={getAPIDataDocs?.guardian_first_name}
                                    {...register("guardian_first_name", { required: true })}
                                    className={`${errors.guardian_first_name && "placeholder-shown:border-[#FF441B]"}`}
                                  />
                                  <LabelModifyStyle className="text-[#616161]">
                                    Guardian/Parent First Name <span className="text-[#FF0E0E]">*</span>
                                  </LabelModifyStyle>
                                </div>
                                <div className="grid w-full items-center gap-1.5 relative">
                                  <InputModifyStyle
                                    type="text"
                                    defaultValue={getAPIDataDocs?.guardian_last_name}
                                    {...register("guardian_last_name", { required: true })}
                                    className={`${errors.guardian_last_name && "placeholder-shown:border-[#FF441B]"}`}
                                  />
                                  <LabelModifyStyle>
                                    Guardian/Parent Last Name
                                    <span className="text-[#FF0E0E]">*</span>
                                  </LabelModifyStyle>
                                </div>
                              </>
                            }

                            <div className="grid w-full items-center gap-1.5 xl2:col-span-2 sm:col-span-0 relative">
                              <ComboboxDropDownWithModifyStyle
                                placeholder="select ethnicity"
                                label="custom_ethnicity"
                                staticValue={[
                                  {
                                    value: "Hispanic / Latino",
                                  },
                                  {
                                    value: "Not Hispanic / Latino",
                                  },
                                  {
                                    value: "I’d prefer not to say",
                                  },
                                ]}
                                handleInputChange={handleInputChangeComboBox}
                              />
                              <LabelModifyStyle>
                                Ethnicity
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 xl2:col-span-2 sm:col-span-0 relative">
                              <ComboboxDropDownWithModifyStyle
                                placeholder="select race"
                                label="custom_race"
                                staticValue={[
                                  {
                                    value: "Asian",
                                  },
                                  {
                                    value: "American Indian or Alaskan Native",
                                  },
                                  {
                                    value: "Black or African American",
                                  },
                                  {
                                    value: "Native Hawaiian or Other Pacific Islander",
                                  },
                                  {
                                    value: "White",
                                  },
                                  {
                                    value: "Other Race",
                                  },
                                  {
                                    value: "I’d prefer not to say",
                                  },
                                ]}
                                handleInputChange={handleInputChangeComboBox}
                              />
                              <LabelModifyStyle>
                                Race
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative phone-input">
                              <Controller
                                name="mobile"
                                control={control}
                                defaultValue={getAPIDataDocs?.mobile}
                                render={({
                                  field: { onChange, value },
                                  fieldState: { error },
                                }) => (
                                  <>
                                    <PhoneInput
                                      value={value}
                                      onChange={onChange}
                                      placeholder=""
                                      prefix=""
                                      className="w-full !h-full"
                                      inputClassName={`${error && "border-[#FF441B]"
                                        } w-full !h-[46px] !border-t-0 !rounded-r-[7px] !text-[#00003C]`}
                                    />
                                    <LabelModifyStyle className="text-[#616161]">
                                      Primary Phone
                                      <ReqiredFieldErrorImage error={error} />
                                    </LabelModifyStyle>
                                  </>
                                )}
                              />{" "}
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={getAPIDataDocs?.email}
                                {...register("email", { required: true })}
                                className={`${errors.email && "placeholder-shown:border-[#FF441B]"}`}
                              />
                              <LabelModifyStyle className="text-[#616161]">
                                Email
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative">
                              <DynamicRadioButtonWithUseFormHookWithMpdifyStyle
                                setButtonSelection={setGender}
                                getButtonSelection={gender}
                                data={[
                                  {
                                    label: "Male",
                                    value: "Male",
                                  },
                                  {
                                    label: "Female",
                                    value: "Female",
                                  }
                                ]}
                                defaultValue={"Male"}
                                register={register}
                                label={"gender"}
                                setValueForm={setValue}
                                getValueForm={getValues}
                              />
                            </div>

                            <div className="grid w-full lg:col-span-3 items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={
                                  getAPIDataDocs?.address1
                                }
                                {...register("address1")}
                              />
                              <LabelModifyStyle>
                                Address Line 1
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full lg:col-span-3 items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={
                                  getAPIDataDocs?.address2
                                }
                                {...register("address2")}
                              />
                              <LabelModifyStyle>
                                Address Line 2
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={
                                  getAPIDataDocs?.zipcode
                                }
                                {...register("zipcode")}
                              />
                              <LabelModifyStyle>
                                Zip Code
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={
                                  getAPIDataDocs?.city
                                }
                                {...register("city")}
                              />
                              <LabelModifyStyle>
                                City
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={
                                  getAPIDataDocs?.state
                                }
                                {...register("state")}
                              />
                              <LabelModifyStyle>
                                State
                              </LabelModifyStyle>
                            </div>
                          </div>
                          <div className="heading-text-xl font-semibold mt-10">Notification Preferences</div>
                          <div className="mt-5">
                            <div className="flex mb-5">
                              <div className="mr-[12px] flex items-center">
                                <Checkbox
                                  id="eligibilitycriteriachecbox1"
                                  className="data-[state=checked]:bg-[#61CE70] data-[state=checked]:border-[#61CE70] my-auto mr-2"
                                  onClick={handlerNotificationPreference}
                                  value="Text SMS"
                                />
                                <div className="text-[#00003C] text-sm md:text-base">Text SMS</div>
                              </div>

                              <div className="mr-[12px] flex items-center">
                                <Checkbox
                                  id="eligibilitycriteriachecbox1"
                                  className="data-[state=checked]:bg-[#61CE70] data-[state=checked]:border-[#61CE70] my-auto mr-2"
                                  onClick={handlerNotificationPreference}
                                  value="Email"
                                />
                                <div className="text-[#00003C] text-sm md:text-base">Email</div>
                              </div>
                            </div>

                            <div className="flex border border-solid bg-[#61CE701A] border-[#61CE70] py-[15px] md:py-[23px] px-[10px] md:px-[18px] rounded-[10px]">
                              <div className="contents">
                                <img
                                  src={InfoIcon.path}
                                  alt={InfoIcon.alt}
                                  className="!h-[25px] !w-[25px] rounded-[35px] block"
                                />
                              </div>
                              <div>

                                <p className="text-[#61CE70] ml-2 text-xs md:text-base">By checking the boxes ,I agree to recive appointment reminders and test results to my email and mobile number provided above.</p>
                                <p className="text-[#61CE70] ml-2 mt-2 text-xs md:text-base"><span className="font-semibold">Blackberry Pharmacy Ehr</span> adheres to HIPPA standards and would like to communicate with you via email and text sms regarding oppointment confirmation, reminders test results. Please note email and text messaging may not be completely secure and by checking the boxes, you are consenting to receive messages in this manner.</p>
                              </div>
                            </div>

                          </div>
                        </div>

                        <div className="heading-text-xl font-semibold mt-10 text-[20px] md:text-[25px] leading-[30px]">Patient Care Physician Information</div>
                        <p className="text-[#413636] mt-2 text-sm md:text-base">Please provide your primary care physician’s detail to help us coordinate appropriately with your PCP.</p>
                        <div className="mt-5 p-4 border border-solid border-[#2F2FBC24] rounded-[20px] p-[20px] md:p-[30px] shadow-lg md:shadow-2xl shadow-[#2C2CB838]">
                          <div className="grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-6 gap-y-8 mt-2">
                            <div className="grid w-full items-center gap-1.5 relative">
                              <InputModifyStyle
                                type="text"
                                defaultValue={getAPIDataDocs?.custom_new_pcp_name}
                                {...register("custom_new_pcp_name")}
                              />
                              <LabelModifyStyle>
                                Name
                              </LabelModifyStyle>
                            </div>

                            <div className="grid w-full items-center gap-1.5 relative phone-input">
                              <Controller
                                name="custom_new_pcp_phone_number"
                                control={control}
                                defaultValue={getAPIDataDocs?.custom_new_pcp_phone_number}
                                render={({
                                  field: { onChange, value },
                                }) => (
                                  <>
                                    <PhoneInput
                                      value={value}
                                      onChange={onChange}
                                      placeholder=""
                                      prefix=""
                                      className="w-full h-full"
                                      inputClassName={`w-full !h-[46px] !border-t-0 !rounded-r-[7px] !text-[#00003C]`}
                                    />
                                    <LabelModifyStyle>
                                      Primary Phone
                                    </LabelModifyStyle>
                                  </>
                                )}
                              />{" "}
                            </div>
                          </div>

                        </div>
                        <div className="heading-text-xl font-semibold mt-10 text-[20px] md:text-[25px]">Payment Type</div>
                        <div className="mt-5 p-4 border border-solid border-[#2F2FBC24] rounded-[20px] p-[20px] md:p-[30px] shadow-lg md:shadow-2xl shadow-[#2C2CB838]">
                          {collectPayment &&
                            <>
                              <RadioGroup
                                className="flex xl:text-lg text-xs flex-col md:flex-row"
                              >
                                <div className="flex items-center mr-[80px] mb-2 md:mb-0">
                                  <RadioGroupItem
                                    value="insurance"
                                    id="insurance"
                                    className="data-[state=checked]:text-[#61CE70] data-[state=checked]:border-[#61CE70] h-6 w-6 mr-[12px]"
                                    onClick={changesetselectPaymentType}
                                    checked={selectPaymentType === "insurance"}
                                  />
                                  <Label
                                    htmlFor="insurance"
                                    className={`text-[#413636] font-semibold text-sm sm:text-base`}
                                  >
                                    Insurance
                                  </Label>
                                </div>
                                <div className="flex items-center mr-[80px] mb-2 md:mb-0">
                                  <RadioGroupItem
                                    value="no_insurance"
                                    id="no_insurance"
                                    className="data-[state=checked]:text-[#61CE70] data-[state=checked]:border-[#61CE70] h-6 w-6 mr-[12px]"
                                    onClick={changesetselectPaymentType}
                                    checked={selectPaymentType === "no_insurance"}
                                  />
                                  <Label
                                    htmlFor="no_insurance"
                                    className={`text-[#413636] font-semibold text-sm sm:text-base`}
                                  >
                                    No Insurance
                                  </Label>
                                </div>
                                <div className="flex items-center">
                                  <RadioGroupItem
                                    value="out_of_pocket"
                                    id="out_of_pocket"
                                    className="data-[state=checked]:text-[#61CE70] data-[state=checked]:border-[#61CE70] h-6 w-6 mr-[12px]"
                                    onClick={changesetselectPaymentType}
                                    checked={selectPaymentType === "out_of_pocket"}
                                  />
                                  <Label
                                    htmlFor="out_of_pocket"
                                    className={`text-[#413636] font-semibold text-sm sm:text-base`}
                                  >
                                    Out of Pocket
                                  </Label>
                                </div>
                              </RadioGroup>
                              <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-0 md:mt-4">
                                {
                                  selectPaymentType !== "no_insurance" &&
                                  <div className="grid w-full items-center gap-1.5 col-span-2 relative mt-10">
                                    <ComboboxDropDownWithModifyStyle
                                      label="payment_type"
                                      staticValue={paymentOptions}
                                      placeholder=""
                                      handleInputChange={handleInputChangeComboBox}
                                    />
                                    <LabelModifyStyle>
                                      Payment method
                                    </LabelModifyStyle>
                                  </div>
                                }

                                {
                                  selectPaymentType === "insurance" &&
                                  <>
                                    {getAPIDataDocs.payment_type === "Medicare Billing" &&
                                      <div className="grid w-full items-center gap-1.5 col-span-2 relative">
                                        <InputModifyStyle
                                          type="text"
                                          defaultValue={getAPIDataDocs?.medicare_number}
                                          {...register("medicare_number")}
                                        />
                                        <LabelModifyStyle>
                                          Medicare ID Number
                                        </LabelModifyStyle>
                                      </div>
                                    }
                                    {getAPIDataDocs.payment_type === "Medi-Cal Billing" &&
                                      <div className="grid w-full items-center gap-1.5 col-span-2 relative">
                                        <InputModifyStyle
                                          type="text"
                                          defaultValue={getAPIDataDocs?.medical_number}
                                          {...register("medical_number")}
                                        />
                                        <LabelModifyStyle>
                                          Medi-Cal ID Number
                                        </LabelModifyStyle>
                                      </div>
                                    }
                                    {getAPIDataDocs.payment_type === "Private Insurance Billing" &&
                                      <>
                                        <div className="heading-text-xl font-semibold mt-5 col-span-2">Insurance Information</div>
                                        <div className="text-[#413636] font-medium col-span-2">
                                          Please enter your carrier name and policy number below.
                                        </div>
                                        <div className="grid w-full items-center gap-1.5 col-span-2 relative">
                                          <InputModifyStyle
                                            type="text"
                                            defaultValue={getAPIDataDocs?.primary_carrier}
                                            {...register("primary_carrier")}
                                          />
                                          <LabelModifyStyle>
                                            Primary Carrier
                                          </LabelModifyStyle>
                                          <p className="text-[#616161] text-xs">(eg: UnitedHealth, Wellcare, etc.)</p>
                                        </div>

                                        <div className="flex w-full md:items-center col-span-2 flex-col md:flex-row">
                                          <Label className="mt-2 text-[#413636] text-base">Is the patient the primary policy holder: </Label>
                                          <DynamicRadioButtonWithUseFormHookWithMpdifyStyle
                                            setButtonSelection={setSelectPolicyHolder}
                                            getButtonSelection={selectPolicyHolder}
                                            data={[
                                              {
                                                label: "Yes",
                                                value: "Yes",
                                              },
                                              {
                                                label: "No",
                                                value: "No",
                                              },
                                            ]}
                                            defaultValue={"Yes"}
                                            register={register}
                                            label={"patient_primary_policy"}
                                            setValueForm={setValue}
                                            getValueForm={getValues}
                                          />
                                        </div>

                                        {selectPolicyHolder === "Yes" ?
                                          <>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="text"
                                                defaultValue={getAPIDataDocs?.medical_record_number}
                                                {...register("medical_record_number")}
                                              />
                                              <LabelModifyStyle>
                                                Medical Record Number
                                              </LabelModifyStyle>
                                            </div>
                                          </> : <>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="text"
                                                defaultValue={getAPIDataDocs?.policy_holder_firstName}
                                                {...register("policy_holder_firstName")}
                                              />
                                              <LabelModifyStyle>
                                                Primary holder first name
                                              </LabelModifyStyle>
                                            </div>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="text"
                                                defaultValue={getAPIDataDocs?.policy_holder_middleName}
                                                {...register("policy_holder_middleName")}
                                              />
                                              <LabelModifyStyle>
                                                Primary holder middle name
                                              </LabelModifyStyle>
                                            </div>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="text"
                                                defaultValue={getAPIDataDocs?.policy_holder_lastName}
                                                {...register("policy_holder_lastName")}
                                              />
                                              <LabelModifyStyle>
                                                Primary holder last name
                                              </LabelModifyStyle>
                                            </div>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="date"
                                                defaultValue={getAPIDataDocs?.policy_holder_dob}
                                                {...register("policy_holder_dob")}
                                              />
                                              <LabelModifyStyle>
                                                Primary holder date of birth
                                              </LabelModifyStyle>
                                            </div>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="text"
                                                defaultValue={getAPIDataDocs?.policy_holder_relationship}
                                                {...register("policy_holder_relationship")}
                                              />
                                              <LabelModifyStyle>
                                                Relationship to policy holder
                                              </LabelModifyStyle>
                                            </div>
                                            <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                              <InputModifyStyle
                                                type="text"
                                                defaultValue={getAPIDataDocs?.medical_record_number}
                                                {...register("medical_record_number")}
                                              />
                                              <LabelModifyStyle>
                                                Medical Record Number
                                              </LabelModifyStyle>
                                            </div>
                                          </>
                                        }
                                        <div className="grid w-full items-center gap-1.5 relative col-span-2 md:col-span-1">
                                          <InputModifyStyle
                                            type="text"
                                            defaultValue={getAPIDataDocs?.group_number}
                                            {...register("group_number")}
                                          />
                                          <LabelModifyStyle>
                                            Group Number
                                          </LabelModifyStyle>
                                        </div>
                                      </>
                                    }
                                    {
                                      (getAPIDataDocs.payment_type === "Medi-Cal Billing" || getAPIDataDocs.payment_type === "Private Insurance Billing" || getAPIDataDocs.payment_type === "Medicare Billing") &&
                                      <div className="col-span-2">
                                        <div className="heading-text-xl font-semibold mt-2 md:mt-5">Upload Insurance Card</div>
                                        <p className="text-[#413636] mt-2 text-sm md:text-base">Uploading image of your card is not required but will help speed up the check-in -process during your visit.</p>
                                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-3">
                                          <div className="grid">
                                            <div className="font-medium">Card Front</div>

                                            <Dropzone onDrop={acceptedFiles => uploadInsuranceCardFront(acceptedFiles)}>
                                              {({ getRootProps, getInputProps }) => (
                                                <div className="border border-dotted rounded-[15px] mt-[10px] bg-[#F9F9F98F] p-[18px] flex flex-col items-center" {...getRootProps()}>
                                                  <input {...getInputProps()} />
                                                  <div>
                                                    <img
                                                      src={UploadIcon.path}
                                                      alt={UploadIcon.alt}
                                                      className="h-full w-full rounded-[35px] object-cover"
                                                    />
                                                  </div>
                                                  <p className="mt-[20px] text-sm md:text-base">Drag & Drop Files Here
                                                    or</p>
                                                  <Button
                                                    className="rounded-[60px] bg-white py-[9px] px-[28px] h-full mt-[10px] text-black text-base border border-solid font-normal"
                                                  >
                                                    Browse Files
                                                  </Button>
                                                  <p className="text-[#969494] mt-[15px] text-sm md:text-base">Supported file : PNG , JPG, PDF</p>

                                                  {uploadedFilesForFront.map((file: any, index: any) => (
                                                    <div
                                                      className="flex space-x-3  justify-between bg-white mt-2"
                                                      key={file.name}
                                                    >
                                                      <div className="flex space-x-2">
                                                        <img
                                                          src={DocFileicon.path}
                                                          alt={DocFileicon.alt}
                                                          width={15}
                                                          height={15}
                                                          className="flex-none"
                                                        />
                                                        <div className="">
                                                          <Label className="text-[#616161]">
                                                            {file.name}
                                                          </Label>
                                                        </div>
                                                      </div>
                                                      <img
                                                        src={DeleteFileIcon.path}
                                                        alt={DeleteFileIcon.alt}
                                                        width={15}
                                                        height={15}
                                                        className="hover:cursor-pointer flex-none"
                                                        onClick={() =>
                                                          setUploadedFilesForFront((prev: any) =>
                                                            prev.filter(
                                                              (_item: any, id: any) => index != id
                                                            )
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </Dropzone>

                                          </div>
                                          <div className="grid">
                                            <div className="font-medium">Card Back</div>

                                            <Dropzone onDrop={acceptedFiles => uploadInsuranceCardBack(acceptedFiles)}>
                                              {({ getRootProps, getInputProps }) => (
                                                <div className="border border-dotted rounded-[15px] mt-[10px] bg-[#F9F9F98F] p-[18px] flex flex-col items-center" {...getRootProps()}>
                                                  <input {...getInputProps()} />
                                                  <div>
                                                    <img
                                                      src={UploadIcon.path}
                                                      alt={UploadIcon.alt}
                                                      className="h-full w-full rounded-[35px] object-cover"
                                                    />
                                                  </div>
                                                  <p className="mt-[20px] text-sm md:text-base">Drag & Drop Files Here
                                                    or</p>
                                                  <Button
                                                    className="rounded-[60px] bg-white py-[9px] px-[28px] h-full mt-[10px] text-black text-base border border-solid font-normal"
                                                  >
                                                    Browse Files
                                                  </Button>
                                                  <p className="text-[#969494] mt-[15px] text-sm md:text-base">Supported file : PNG , JPG, PDF</p>
                                                  {uploadedFilesForBack.map((file: any, index: any) => (
                                                    <div
                                                      className="flex space-x-3  justify-between  bg-white "
                                                      key={file.name}
                                                    >
                                                      <div className="flex space-x-2">
                                                        <img
                                                          src={DocFileicon.path}
                                                          alt={DocFileicon.alt}
                                                          width={15}
                                                          height={15}
                                                          className="flex-none"
                                                        />
                                                        <div className="">
                                                          <Label className="text-[#616161]">
                                                            {file.name}
                                                          </Label>
                                                        </div>
                                                      </div>
                                                      <img
                                                        src={DeleteFileIcon.path}
                                                        alt={DeleteFileIcon.alt}
                                                        width={15}
                                                        height={15}
                                                        className="hover:cursor-pointer flex-none"
                                                        onClick={() =>
                                                          setUploadedFilesForBack((prev: any) =>
                                                            prev.filter(
                                                              (_item: any, id: any) => index != id
                                                            )
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </Dropzone>

                                          </div>
                                        </div>
                                      </div>
                                    }
                                  </>
                                }
                              </div>
                            </>
                          }
                        </div>
                        <div className="flex justify-center mt-10">
                          <Button
                            className="rounded-[60px] text-base md:text-[18px] bg-[#61CE70] py-[10px] md:py-[15px] px-[50px] h-full"
                            onClick={() => saveProfileDetails()}
                          >
                            Continue & Submit
                          </Button>
                        </div>


                      </>
                    </div>
                  </>
                }

                {questionnaire.length > 0 && selectedSlot && showQuestionnaire &&
                  <div ref={questionnaireRef} id="questionnaire">
                    <h1 className="heading-text-xl mt-10 font-semibold text-[20px] md:text-[25px]">Service specific questionnaire form</h1>
                    <p className="text-[#413636] mt-2 mb-[30px]">Before starting to book your appointment, we need to verify few things.</p>

                    {questionnaire && questionnaire.map((vaccineSection) => {
                      const vaccineName = Object.keys(vaccineSection)[0];
                      return (
                        <div key={vaccineName} className="mt-5 p-4 border border-solid border-[#2F2FBC24] rounded-[20px] p-[20px] md:p-[30px] shadow-lg md:shadow-2xl shadow-[#2C2CB838] mb-10">
                          <h3 className="mb-1 heading-text-xl font-semibold mb-5">{vaccineName}</h3>
                          <ul>
                            {vaccineSection[vaccineName].map((question: questionnaire, index: number) => (
                              <li key={question.question_no} className={`mb-5 md:mb-10 ${index === vaccineSection[vaccineName].length - 1 ? '' : 'border-b border-solid border-[#EDE9F3CC]'}`}>
                                <div className="mb-5">
                                  <div className="flex">
                                    <div className="label-text-lg font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5">{index + 1}.</div>
                                    <div className="label-text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 leading-5 ml-2">{removeHtmlTags(question.description)}</div>
                                  </div>
                                  <div className="mt-[20px] md:mt-[25px] ml-3">
                                    <RadioGroup
                                      className="flex xl:text-lg text-xs mb-5 md:mb-10"
                                    >
                                      <div className="flex items-center mr-[20px] md:mr-[80px]">
                                        <RadioGroupItem
                                          value="Yes"
                                          id="Yes"
                                          className="data-[state=checked]:text-[#61CE70] data-[state=checked]:border-[#61CE70] h-6 w-6 mr-[12px]"
                                          onClick={() => handleCheckboxChange('Yes', vaccineName, question)}
                                        />
                                        <Label
                                          htmlFor="Yes"
                                          className={`text-[#413636] font-semibold text-xs sm:text-base`}
                                        >
                                          Yes
                                        </Label>
                                      </div>
                                      <div className="flex items-center mr-[20px] md:mr-[80px]">
                                        <RadioGroupItem
                                          value="No"
                                          id="No"
                                          className="data-[state=checked]:text-[#61CE70] data-[state=checked]:border-[#61CE70] h-6 w-6 mr-[12px]"
                                          onClick={() => handleCheckboxChange('No', vaccineName, question)}
                                        />
                                        <Label
                                          htmlFor="No"
                                          className={`text-[#413636] font-semibold text-xs sm:text-base`}
                                        >
                                          No
                                        </Label>
                                      </div>
                                      <div className="flex items-center">
                                        <RadioGroupItem
                                          value="NA"
                                          id="NA"
                                          className="data-[state=checked]:text-[#61CE70] data-[state=checked]:border-[#61CE70] h-6 w-6 mr-[12px]"
                                          onClick={() => handleCheckboxChange('NA', vaccineName, question)}
                                        // checked
                                        />
                                        <Label
                                          htmlFor="NA"
                                          className={`text-[#413636] font-semibold text-xs sm:text-base`}
                                        >
                                          NA
                                        </Label>
                                      </div>
                                    </RadioGroup>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}

                    <div className="heading-text-xl font-semibold mt-10 text-[20px] md:text-[25px]">Terms and Conditions</div>
                    <div className="mt-5 p-4 border border-solid border-[#2F2FBC24] rounded-[20px] p-[30px] shadow-lg md:shadow-2xl shadow-[#2C2CB838]">
                      <div className="text-[#413636] mb-5 text-sm md:text-base">
                        {disclaimer}
                      </div>

                      <div className="flex w-full gap-1.5 col-span-2 mb-5 md:mb-10">
                        <Checkbox
                          id="disclaimercheckbox"
                          className="data-[state=checked]:bg-[#61CE70] data-[state=checked]:border-[#61CE70] mt-1"
                          value="Email"
                          onClick={termAndConditionFunc}
                          checked={termAndCondition === true}
                        />
                        <Label
                          htmlFor="disclaimercheckbox"
                          className="ml-1 leading-6"
                        >
                          I have read and agree to the terms and conditions. I would like to authorize.
                        </Label>
                      </div>
                      <div className="grid w-full items-center gap-1.5 relative">
                        <InputModifyStyle
                          type="text"
                          defaultValue={getAPIDataDocs?.first_name}
                          {...register("name")}
                          className={`${errors.first_name && "border-[#FF441B]"}`}
                        />
                        <LabelModifyStyle>
                          Consented By <span className="text-[#FF0E0E]">*</span>
                          <ReqiredFieldErrorImage error={errors.first_name} />
                        </LabelModifyStyle>
                      </div>
                    </div>
                    <div className="heading-text-xl font-semibold mt-10 text-[20px] md:text-[25px]">Total Charges :- ${totalValue}</div>

                    <div className="flex justify-center mt-10">
                      <Button
                        className="rounded-[60px] text-base md:text-[18px] bg-[#61CE70] py-[10px] md:py-[15px] px-[50px] h-full"
                        onClick={() => saveQuestionnaire()}
                      >
                        Continue to Confirmation page
                      </Button>
                    </div>

                  </div>
                }
              </>
              :
              <div className="mt-14">
                <div className="flex justify-center flex-col items-center">
                  <div className="text-center mb-10">
                    {
                      getAPIDataDocs.payment_type == 'Credit Card' &&
                      <div className="text-[#FF0E0E] mb-10 text-xl">You will be redirect to the payment page in {timeLeft} second</div>
                    }
                    <p>Your appointment for <span className="font-medium">{selectedServices.map((ele) => { return (ele.service_name + ", ") })}</span> has been confirmed for</p>
                    <p className="font-semibold mt-3">{moment(selectedDate).format('ddd, MMM DD')} at {selectedSlot[0]} </p>
                    <p className="mt-3">at <span className="text-[#61CE70]">{location}</span></p>
                  </div>
                  <div className="flex border border-solid bg-[#61CE701A] border-[#61CE70] py-[15px] md:py-[23px] px-[10px] md:px-[18px] rounded-[10px]">
                    <div className="contents">
                      <img
                        src={InfoIcon.path}
                        alt={InfoIcon.alt}
                        className="h-[25px] w-[25px] rounded-[35px] object-cover"
                      />
                    </div>
                    <p className="text-[#61CE70] ml-2 text-sm md:text-base">The appointment can last anywhere from 15 minutes to 75 minutes, so please ensure you have at least 75 minutes available.</p>
                  </div>
                </div>
                <div className="border-t border-solid border-[#EDE9F3CC] mt-10 md:mt-20 mb-10"></div>
                <div className="flex flex-col items-center">
                  <div className="bg-[#F8F8F8] p-[25px] md:p-[34px] border border solid border-[#C1C9C3] w-full max-w-[600px] rounded-[10px]">
                    <h3 className="text-[#413636] font-semibold mb-3 text-base md:text-[18px]">What to Bring to Your Appointment:</h3>
                    <ul className="list-disc list-inside">
                      <li className="text-sm mb-[10px]">A photo ID , (if you have it )</li>
                      <li className="text-sm mb-[10px]">A mask or face covering</li>
                      <li className="text-sm">
                        Wear short sleeves or sleeves that roll up
                      </li>
                    </ul>
                  </div>
                  <div className="max-w-[650px] text-center mt-5 text-[#413636]">
                    Please also check <span className="text-[#49A954] font-semibold">{userEmail}</span> for the confirmation email and more information.
                  </div>
                </div>
              </div>
          }
        </div>

      </div>

    ) : <LoadingScreen />);
};

export default memo(Booking);