import { Value } from "@radix-ui/react-select";

export const PatientAppointmentFieldsData = [
  "title",
  "appointment_type",
  "appointment_date",
  "patient_name",
  "appointment_time",
  "status",
  "name",
];
export const PatientAppointmentLabelData: { [key: string]: string } = {
  title: "Title",
  appointment_type: "Appointment Type",
  appointment_date: "Date",
  patient_name: "Patient Name",
  appointment_time: "Time",
  status: "Status",
  name: "ID",
};

export const EventFieldsData = [
  "subject",
  "status",
  "name",
  "custom_patient_appointment_count",
  "starts_on",
  "ends_on"

]
export const EventLabelData: { [key: string]: string } = {
  subject: "Event",
  ends_on: "Ends On",
  custom_patient_appointment_count: "Registered Appointment",
  starts_on: "Start On",
  status: "Status",
  name: "ID",
};


export const ServiceLocationData = [
  "healthcare_service_unit_name",
  "company",
  "name",
  "custom_opening_time",
  "custom_closing_time"
]

export const PatientFIeldData = [
  "patient_name",
  "email",
  "status",
  "dob",
  "mobile",
  "sex",
];

export const VaccineDetailsImmunizationField = [
  "vaccine",
  "arm",
  "vis_exp",
  "vaccine_given",
  "vis_given",
  "manufacturer",
  "exp",
  "dosage",
  "lot",
  "rph",
];

export const BillingInfoImmunizationField = [
  "appointment_type",
  "custom_payment_type",
  "custom_billing_status",
  "",
];

export const PatientLabelData: { [key: string]: string } = {
  patient_name: "Full Name",
  email: "Email",
  status: "Status",
  dob: "Date of birth",
  mobile: "Mobile",
  sex: "Gender",
};

//all payment type in frappe has
// if changes occur add payment type here also
export const paymentTypeMapping = {
  custom_medicare_billing: "Medicare Billing",
  custom_medical_billing: "Medi-Cal Billing",
  custom_private_insurance_billing: "Private Insurance Billing",
  custom_vfc_billing: "VFC Billing",
  custom_cash: "Cash",
  custom_credit_card: "Credit Card",
  custom_rx_billing: "RX Billing",
  custom_uninsured: "Uninsured",
  custom_do_not_collect_payment: "Do Not Collect Payment",
};

export const BillingCodeLabel = [
  "definition",
  "name",
  "item_code",
  "item_name",
  "code_system",
  "appointment_type",
];

export const MedicalCodeImmunizationField = [
  "code_system",
  "code_value",
  "definition",
  "code",
  "display",
  "custom_is_vfc_billing",
  "system"
]

export const MedicationDataLabel = [
  "medication_name",
  "directions",
  "prescriber",
  "related_conditions",
  "dosage",
  "potential_problem",
  "custom_added_by_patient",
];

export const DiagnosisDataLabel = [
  "health_condition",
  "condition_status",
  "custom_added_by_patient",
];

export const AllergiesDataLabel = [
  "allergies",
  "reaction",
  "custom_added_by_patient",
];

export const EventServiceDataLabel = [
  "vaccine_type",
  "service_type",
  "cash_price"
]
export const customFIlterFieldAppointment = [
  {
    value: "title",
    label: "Title",
    type: "text",
    selected: "Not Equal",
    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "Like",
        value: "like",
      },
      {
        label: "Not Like",
        value: "not like",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
      {
        label: ">",
        value: ">",
      },
      {
        label: "<",
        value: "<",
      },
      {
        label: ">=",
        value: ">=",
      },
      {
        label: "<=",
        value: "<=",
      },
    ],
  },
  {
    value: "appointment_type",
    label: "Appointment Type",
    type: "text",
    selected: "Equals",

    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "Like",
        value: "like",
      },
      {
        label: "Not Like",
        value: "not like",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
    ],
  },
  {
    value: "appointment_date",
    label: "Date",
    type: "date",
    selected: "Equals",
    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
      {
        label: ">",
        value: ">",
      },
      {
        label: "<",
        value: "<",
      },
      {
        label: ">=",
        value: ">=",
      },
      {
        label: "<=",
        value: "<=",
      },
      {
        label: "Between",
        value: "Between",
      },
      {
        label: "Timespan",
        value: "Timespan",
      },
      {
        label: "Fiscal Year",
        value: "fiscal year",
      },
    ],
  },
  {
    value: "patient_name",
    label: "Patient Name",
    type: "text",
    selected: "Equals",

    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "Like",
        value: "like",
      },
      {
        label: "Not Like",
        value: "not like",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
      {
        label: ">",
        value: ">",
      },
      {
        label: "<",
        value: "<",
      },
      {
        label: ">=",
        value: ">=",
      },
      {
        label: "<=",
        value: "<=",
      },
    ],
  },
  {
    value: "status",
    label: "Status",
    type: "status",
    selected: "Equals",

    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "Like",
        value: "like",
      },
      {
        label: "Not Like",
        value: "not like",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
      {
        label: ">",
        value: ">",
      },
      {
        label: "<",
        value: "<",
      },
      {
        label: ">=",
        value: ">=",
      },
      {
        label: "<=",
        value: "<=",
      },
    ],
  },
  {
    value: "name",
    label: "ID",
    type: "combobox",
    doctype: "Patient Appointment",
    selected: "Equals",

    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "Like",
        value: "like",
      },
      {
        label: "Not Like",
        value: "not like",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
    ],
  },
  {
    value: "custom_event_id",
    label: "Event",
    type: "combobox",
    doctype: "Event",
    selected: "Equals",

    operations: [
      {
        label: "Equals",
        value: "=",
      },
      {
        label: "Not Equal",
        value: "!=",
      },
      {
        label: "Like",
        value: "like",
      },
      {
        label: "Not Like",
        value: "not like",
      },
      {
        label: "In",
        value: "In",
      },
      {
        label: "Not In",
        value: "not in",
      },
      {
        label: "Is",
        value: "is",
      },
    ],
  },
];

export const operatorField: any = {
  Equals: "=",
  "Not Equal": "=",
  Like: "=",
  "Not Like": "=",
  In: "=",
  "Not In": "=",
  Is: "=",
  ">": ">",
  "<": "<",
  ">=": ">=",
  "<=": "<=",
  Between: "Between",
  Timespan: "Timespan",
  "Fiscal Year": "fiscal year",
};

export const timeStampData = [
  {
    label: "Last Week",
    value: "last week",
  },
  {
    label: "Last Month",
    value: "last month",
  },

  {
    label: "Last Quarter",
    value: "last quarter",
  },
  {
    label: "Last 6 months",
    value: "last 6 months",
  },
  {
    label: "Last Year",
    value: "last year",
  },
  {
    label: "Yesterday",
    value: "yesterday",
  },
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Tomorrow",
    value: "tomorrow",
  },
  {
    label: "This Week",
    value: "this week",
  },
  {
    label: "This Month",
    value: "this month",
  },
  {
    label: "This Quarter",
    value: "this quarter",
  },
  {
    value: "this year",
    label: "This Year",
  },
  {
    value: "next week",
    label: "Next Week",
  },
  {
    value: "next month",
    label: "Next Month",
  },
  {
    value: "next quarter",
    label: "Next Quarter",
  },
  {
    value: "next 6 months",
    label: "Next 6 months",
  },
  {
    value: "next year",
    label: "Next Year",
  },
];

export const ISFieldStatusData = [
  {
    value: "set",
    label: "Set",
  },
  {
    value: "not set",
    label: "Not Set",
  },
];

export const AppointmentStatusFieldData = [
  {
    value: "Scheduled",
  },
  {
    value: "Open",
  },
  {
    value: "Checked In",
  },
  {
    value: "Checked Out",
  },
  {
    value: "Closed",
  },
  {
    value: "Cancelled",
  },
  {
    value: "No Show",
  },
  {
    value: "Completed",
  },
];

export const EthnicityDropDownOption = [
  {
    value: "Hispanic / Latino",
  },
  {
    value: "Not Hispanic / Latino",
  },
  {
    value: "I'd prefer not to say",
  },
];

export const GenderDropDownOption = [
  {
    value: "Male",
  },
  {
    value: "Female",
  },
  {
    value: "Others",
  },
];

export const RaceDropDownOption = [
  { key: "Asian", value: "Asian" },
  {
    key: "American Indian or Alaskan Native",
    value: "American Indian or Alaskan Native",
  },
  { key: "Black or African American", value: "Black or African American" },
  {
    key: "Native Hawaiian or Other Pacific Islander",
    value: "Native Hawaiian or Other Pacific Islander",
  },
  { key: "White", value: "White" },
  { key: "Other Race", value: "Other Race" },
  { key: "I’d prefer not to say", value: "I’d prefer not to say" },
];

//workflow state for Immunizations
export const nextActionWorkFlowStateImmunization = (
  currentWorkFlow: string
) => {
  switch (currentWorkFlow) {
    case "Ineligible":
      return "Ineligible";
    case "Not Sent":
      return "Questionnaire";
    case "Questionnaire":
      return "Scheduled";
    case "Scheduled":
      return "In Progress";
    case "In Progress":
      return "Billing";
    case "Billing":
      return "Complete";
    case "Complete":
      return "Complete";
    default:
      "Ineligible";
  }
};

export const getStepsForWorkflowStateImmunization = (
  workflowState: string
): { key: string; label: string }[] => {
  switch (workflowState) {
    case "Ineligible":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "questionnairs", label: "Questionnairs" },
      ];
    case "Not Sent":
      return [{ key: "patientInfo", label: "Patient Info" }];
    case "Questionnaire":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "questionnairs", label: "Questionnairs" },
      ];
    case "Scheduled":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "questionnairs", label: "Questionnairs" },
        { key: "scheduling", label: "Scheduling" },
      ];
    case "In Progress":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "questionnairs", label: "Questionnairs" },
        { key: "scheduling", label: "Scheduling" },
        { key: "vaccineDetails", label: "Vaccine Details" },
      ];
    case "Billing":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "questionnairs", label: "Questionnairs" },
        { key: "scheduling", label: "Scheduling" },
        { key: "vaccineDetails", label: "Vaccine Details" },
        { key: "billing", label: "Billing" },
      ];
    case "Service Completed":
      return [
        { key: "patientInfo", label: "Patient Info" },
        { key: "questionnairs", label: "Questionnairs" },
        { key: "scheduling", label: "Scheduling" },
        { key: "vaccineDetails", label: "Vaccine Details" },
        { key: "billing", label: "Billing" },
      ];
    default:
      return [];
  }
};

export const ImmunizationWorkFlowState = [
  "Ineligible",
  "Not Sent",
  "Questionnaire",
  "Scheduled",
  "In Progress",
  "Billing",
  "Service Completed",
];

export const ImmunizationARMField = [
  {
    value: "LA",
  },
  {
    value: "RA",
  },
];

export const ImmunizationSiteField = [
  {
    value: "IM",
  },
  {
    value: "SQ",
  },
];

export const BillingStatusCashField = [
  {
    value: "Paid",
  },
  {
    value: "Not Paid",
  },
];

export const BillingStatusInsuredField = [
  {
    value: "Not Ready to Claim",
  },
  {
    value: "Ready to Claim",
  },
  {
    value: "Submitted",
  },
  {
    value: "Remitted",
  },
  {
    value: "Rejected",
  },
  {
    value: "Resubmitted",
  },
  {
    value: "Uninsured",
  },
];

export const EventStatusData = [
  {
    value:"Open"
  },
  {
    value:"Completed"
  },
  {
    value:"Closed"
  },
  {
    value:"Cancelled"
  }
]