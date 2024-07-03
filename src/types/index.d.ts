import React from "react";

// Interface for patient information
export interface PatientInfo {
  name: string;
  image: string;
  patient_name: string;
  email: string;
  status: "Transferred" | "Active" | "Inactive";
  dob: string;
  mobile: string;
  // address: string;
  sex: "Male" | "Female";
  // insurance: string;
  // totalAppointments: number;
}
//Interface for Appointment List
export interface PatientAppointment {
  title: string;
  status: "Scheduled" | "Completed" | "Draft";
  appointment_date: string;
  // patient_name: string;
  name: string;
}

export interface PatientAppointmentList {
  title: string;
  appointment_type: string;
  appointment_date: string;
  patient_name: string;
  appointment_time: string;
  status: string;
  name: string;
}

// Interface for service information
export interface ServiceInfo {
  dob: string;
  phoneNumber: string;
  appointmentType: string;
  appointmentStatus: string;
  appointmentDate: string;
  appointmentTime: string;
}

// Interface for navigation items
export interface NavItem {
  key: string;
  title: string;
  icon: string;
  selectedIcon: string;
  alt: string;
}

// Interface for public assets (e.g., images)
export interface PublicAssets {
  path: string;
  alt: string;
}

// Interface for steps in a process
export interface Step {
  key: string;
  label: string;
  icon?: string;
}

// Interface for props of a list step component
export interface ListStepProps {
  steps: Step[];
  selectedStepper: string;
  setSelectedStepper: React.Dispatch<React.SetStateAction<string>>;
  progressCheckBox: boolean;
  hideSideIcons: boolean;
}

// Interface for data props of a combobox
export interface ComboboxDataProps {
  label: string;
  value: string;
}

// Interface for props of a combobox component
export interface ComboboxProps {
  data: ComboboxDataProps[];
  buttonClassName?: string;
  popOverClassName?: string;
  icon?: string;
  placeholder?: string;
}

// Interface for data props of dynamic radio buttons
export interface DynamicRadioButtonDataProps {
  label: string;
  value: string;
}

// Interface for props of dynamic radio button component
export interface DynamicRadioButtonProps {
  setButtonSelection: any;
  getButtonSelection: string;
  data: DynamicRadioButtonDataProps[];
  defaultValue: string;
  disabled?: boolean;
}

export interface DynamicRadioButtonPropsWithUseFormHook {
  setButtonSelection: any;
  getButtonSelection: string;
  data: DynamicRadioButtonDataProps[];
  defaultValue: string;
  disabled?: boolean;
  register: any;
  label: string;
  required?: boolean;
  setValueForm: any;
  // errors:any,
  getValueForm: any;
}

// Interface for data props of activity
export interface ActivityDataProps {
  name: string;
  creation: string;
  content: string;
  owner: string;
  comment_type: string;
}

// Interface for props of an activity component
export interface ActivityProps {
  data: ActivityDataProps[];
}

export interface CommentBoxDataProps {
  name: string;
  creation: string;
  content: string;
  owner: string;
  comment_type: string;
}

// Interface for props of an CommentBox component
export interface CommentBoxProps {
  data: CommentBoxDataProps[];
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CustomInputProps {
  label?: string;
  icon: string;
  placeholder: string;
  type: string;
  defaultValue?: string;
}
export interface CustomInputPropsWithoutLabel {
  icon: string;
  placeholder: string;
  type: string;
}

// interface Address {
//   name: string;
//   owner: string;
//   creation: string;
//   modified: string;
//   modified_by: string;
//   docstatus: number;
//   idx: number;
//   address_title: string;
//   address_type: string;
//   address_line1: string;
//   address_line2: string;
//   city: string;
//   county: string | null;
//   state: string ;
//   country: string;
//   pincode: string ;
//   email_id: string | null;
//   phone: string ;
//   fax: string | null;
//   tax_category: string | null;
//   is_primary_address: number;
//   is_shipping_address: number;
//   disabled: number;
//   is_your_company_address: number;
//   display: string;
// }

interface Contact {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  full_name: string;
  email_id: string;
  user: any; // You may want to specify the type here if available
  address: any; // You may want to specify the type here if available
  sync_with_google_contacts: number;
  status: string;
  salutation: string | null;
  designation: string | null;
  gender: string;
  phone: string;
  mobile_no: string;
  company_name: string | null;
  image: string;
  google_contacts: any; // You may want to specify the type here if available
  google_contacts_id: any; // You may want to specify the type here if available
  pulled_from_google_contacts: number;
  is_primary_contact: number;
  is_billing_contact: number;
  department: string | null;
  unsubscribed: number;
  email_ids: string[];
  phone_nos: string[];
}

interface DashboardInfo {
  billing_this_year: number;
  currency: string;
  total_unpaid: number;
  company: string;
}

export interface PatientDocs {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  naming_series: string;
  first_name: string;
  sex: string;
  custom_patient_series: string;
  dob: string;
  phone: string;
  last_name: string;
  middle_name: string;
  patient_name: string;
  custom_patient_status: string;
  status: string;
  invite_user: number;
  inpatient_status: string;
  report_preference: string;
  blood_group: string;
  mobile: string;
  email: string;
  custom_unsubscribe_to_marketing: number;
  custom_pcp_name: string;
  custom_pcp_phone: string;
  custom_patient_notes: string;
  customer: string;
  customer_group: string;
  territory: string;
  default_currency: string;
  default_price_list: string;
  language: string;
  custom_is_the_patient_cognitively_impared: string;
  custom_brief_interview_for_material_statusbims_score13: number;
  custom_cognitive_impairment_noted_in_patients_chart: number;
  custom_confirmed_status_with_family_membercaregiver: number;
  custom_confirmed_status_with_healthcare_staff: number;
  custom_minimental_state_examinationmmse_score__27: number;
  occupation: string;
  marital_status: string;
  custom_do_you_currently_use_or_have_you_ever_tobacco_profucts: string;
  custom_current_cigarette_smoker: number;
  custom_when_did_you_first_start_smoking: string;
  custom_how_many_cigarettes_do_you_smoke_per_day: string;
  custom_are_you_interested_in_quiting_1: string;
  custom_former_cigarette_smoker: number;
  custom_on_average_how_many_cigarettes_did_you_smoke_per_day: number;
  custom_how_many_years_did_you_smoke_for: number;
  custom_other_tobacco_user: number;
  custom_other_description: string;
  custom_how_many_times_in_the_past_year: string;
  custom_are_you_interested_in_quiting_2: string;
  custom_past_year_have_you_had_4_or_more_alcoholic_drinks_iady: number;
  custom_use_opioids_and_have_access_to_nacran: string;
  custom_are_you_interesting_in_quiting: string;
  custom_purpose_of_body_shapping: string;
  custom_have_you_hospitalized_overnight: string;
  custom_payment_type: string;
  custom_policy_number: string;
  custom_is_the_patient_the_primary_policy_holder: string;
  custom_primary_carrier: string;
  custom_medical_record_number: string;
  custom_group_number: string;
  custom_primary_holder_first_name: string;
  custom_primary_holder_middle_name: string;
  custom_primary_holder_last_name: string;
  custom_primary_holder_dob1: string;
  custom_relationship_to_policy_holder: string;
  custom_rxbin: string;
  custom_rxid: string;
  custom_rxpcn: string;
  custom_rxgroup: string;
  doctype: string;
  patient_relation: any[]; // You may want to specify the type here if available
  custom_recreational_drug_usage: any[]; // You may want to specify the type here if available
  custom_relative_medical_conditions: any[]; // You may want to specify the type here if available
  custom_drug_allergies__side_effects: any[]; // You may want to specify the type here if available
  custom_surgical_histories: any[]; // You may want to specify the type here if available
  custom_health_conditions: any[]; // You may want to specify the type here if available
  custom_medications: any[]; // You may want to specify the type here if available
  custom_employment_housing_transportation: any[]; // You may want to specify the type here if available
  __onload: {
    addr_list: any[];
    contact_list: Contact[];
    dashboard_info: DashboardInfo[];
  };
}

export interface CommentData {
  name: string;
  creation: string;
  content: string;
  owner: string;
  comment_type: string;
}

interface MedicationTab {
  name: string | undefined;
  owner: string | undefined;
  creation: string | undefined;
  modified: string | undefined;
  modified_by: string | undefined;
  docstatus: number | undefined;
  idx: number | undefined;
  medication_name: string | undefined;
  prescriber: string | undefined;
  dosage: string | undefined;
  directions: string | undefined;
  parent: string | undefined;
  parentfield: string | undefined;
  parenttype: string | undefined;
  doctype: string | undefined;
}

interface AllAvailableDatesInfo {
  days: Array;
  periods: Slot;
}

interface ServiceInfoForBooking {
  charge: number;
  description: string;
  duration_in_min: number;
  service_name: string;
  service_type: string;
}

interface AllAvailableSlotInfo {
  [x: string]: any;
  [date: string]: Slot[];
}

interface Slot {
  start: string;
  end: string;
}

interface Country {
  name: string;
}

interface PaymentOptions {
  key: string;
  value: string;
}

interface AllAvailableQuestionnaireInfo {
  [category: string]: questionnaire[];
}

interface questionnaire {
  template: string;
  question_no: string;
  description: string;
}

interface PaymentType {
  [insurance: string]: string[];
  [no_insurance: string]: any;
  [out_of_pocket: string]: any;
}

interface patientResponse {
  patient: string;
  patient_appointments: string[];
}

interface MultipleColumnFilterColumnData {}
export interface MultipleColumnFilter {
  triggerButton: React.ReactNode;
  onOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  columnData: { [key: string]: any[] };
  keyMapping: any;
  setFilter: Dispatch<SetStateAction<any>>;
  getFilter: any;
}
