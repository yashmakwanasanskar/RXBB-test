const API = {
  VIEW_DOCTYPE: "/api/method/frappe.desk.form.load.getdoc",
  LIST_PATIENT: '/api/resource/Patient?fields=["*"]',
  LIST_APPOINTMENT: '/api/resource/Patient Appointment?fields=["*"]',
  LIST_EVENT: '/api/resource/Event?fields=["*"]',
  LIST_LOCATION: '/api/resource/Healthcare Service Unit?fields=["*"]',
  POST_COMMENT: "/api/method/frappe.desk.form.utils.add_comment",
  DELETE_COMMENT: "/api/method/frappe.client.delete",
  GET_RECORD_COUNT: "/api/method/frappe.desk.reportview.get_count",
  SAVE_DOCS: "/api/method/frappe.desk.form.save.savedocs",
  ATTACHMENT: "/api/method/upload_file",
  DELETE_ATTACHMENT: "/api/method/frappe.desk.form.utils.remove_attach",
  ADD_TAG: "/api/method/frappe.desk.doctype.tag.tag.add_tag",
  REMOVE_TAG: "/api/method/frappe.desk.doctype.tag.tag.remove_tag",
  PDF_PAGE: "/api/method/frappe.utils.print_format.download_pdf",
  SEARCH_DROPDOWN_LIST: "/api/method/frappe.desk.search.search_link",
  VALIDATAED_SEARCH_DROPDOWN_LIST: "/api/method/frappe.client.validate_link",
  CLIENT_GET_LIST: "/api/method/frappe.client.get_list",
  GET_CHILD_TABLE_VALUE:
    "/api/method/pharm_ehr_tenant.pharm_ehr_tenant.utils.get_child_table_values",
  CREATE_APPOINTMENT:
    "/api/method/pharm_ehr_tenant.pharm_ehr_tenant.utils.create_patient_appointment",
  VALIDATED_LINK: "/api/method/frappe.client.validate_link",
  GET_ELIGIBILITY_CRIETERIA_CMR:
    "/api/method/pharm_ehr_tenant.pharm_ehr_tenant.utils.get_all_eligibility_criteria",
  CMR_APPOINTMENT_DATA:
    "/api/method/pharm_ehr_tenant.service_type.doctype.cmr_service.cmr_service.get_patient_appointments",
  CMR_APPOINTMENT_SAVE_DATE_TIME:
    "/api/method/pharm_ehr_tenant.service_type.doctype.cmr_service.cmr_service.save_date_and_time",
  CMR_PATIENT_TAKE_AWAY:
    "/api/method/pharm_ehr_tenant.pharm_ehr_tenant.utils.attach_pdf",
  CLIENT_GET_VALUE: "/api/method/frappe.client.get_value",
  FOLLOWUP_APPOINTMENT_CREATE_APPOINTMENT:
    "/api/method/pharm_ehr_tenant.service_type.doctype.cmr_service.cmr_service.create_patient_appointment",
  APPLY_WORKFLOW: "/api/method/frappe.model.workflow.apply_workflow",
  RUN_DOC_METHOD: "/api/method/run_doc_method",
  GET_ADDRESS_DISPLAY:
    "/api/method/frappe.contacts.doctype.address.address.get_address_display",
  SAVE_USER_SETTINGS: "/api/method/frappe.model.utils.user_settings.save",
  LOAD_FORM_DOCTYPE: "/api/method/frappe.desk.form.load.getdoctype",
  GET_LIST_VIEW_SETTING: "/api/method/frappe.desk.listview.get_list_settings",
  SET_LIST_VIEW_SETTING: "/api/method/frappe.desk.doctype.list_view_settings.list_view_settings.save_listview_settings",
  CLIENT_GET:"/api/method/frappe.client.get",
  TABLE_VIEW_SETTING:"/api/method/frappe.model.utils.user_settings.save",
  GET_DOCDATA_FOR_SELECT:"/api/method/pharm_ehr_tenant.pharm_ehr_tenant.utils.get_docdata_for_select",
  SELECT_FISCAL_YEAR:"/api/method/erpnext.accounts.utils.get_fiscal_year_filter_field",
  GET_WORKFLOW:"/api/method/frappe.model.workflow.get_transitions",
  ADD_MINOR_TAG:"/api/method/pharm_ehr_tenant.service_type.doctype.immunization_service.immunization_service.add_minor_tag",
  GET_QUESTIONNAIR:"/api/method/pharm_ehr_tenant.service_type.doctype.immunization_service.immunization_service.get_all_vaccine_questionnaire",
  GET_BILLING_FROM_APPOINTMENT:"/api/method/pharm_ehr_tenant.service_type.doctype.immunization_service.immunization_service.get_billing_from_appointment",
  GET_APPOINTMENT_DATA_IMMUNIZATION:"/api/method/pharm_ehr_tenant.service_type.doctype.immunization_service.immunization_service.get_patient_appointments",
  GET_SERVICE_FOR_BOOKING:"/api/method/pharm_ehr_tenant.api.get_event_services",
  GET_ALL_AVAILBALE_SLOTS:"/api/method/pharm_ehr_tenant.api.get_all_available_slots",
  GET_ALL_AVAILBALE_DATES:"/api/method/pharm_ehr_tenant.api.get_all_available_dates",
  GET_ALL_COUNTRIES:"/api/resource/Country?limit='*'",
  GET_ALL_QUESTIONNAIRE:"/api/method/pharm_ehr_tenant.api.get_questionnaires",
  BOOK_PATIENT_APPOINTMENT: "/api/method/pharm_ehr_tenant.api.book_patient_appointment",
  VFC_ELIGIBILITY_TEMPLATE:"/api/method/pharm_ehr_tenant.service_type.doctype.immunization_service.immunization_service.load_vfc_eligibilty_template",
  VACCINE_DETAILS_GET_LOT:"/api/method/pharm_ehr_tenant.pharm_ehr_tenant.utils.get_lot",
  CREATE_QUESTIONNAIRE_RESPONSE:"/api/method/pharm_ehr_tenant.api.create_questionnaire_response",
  IMMUNIZATION_BILLING_SAVE:
    "/api/method/pharm_ehr_tenant.service_type.doctype.immunization_service.immunization_service.save_type_and_status",
  PUT_DOCTYPE:"/api/resource/",
  APPOINTMENT_GET_CALENDER:"/api/method/healthcare.healthcare.doctype.patient_appointment.patient_appointment.get_events",
  GET_APPOINTMENT_QUESTIONNAIRES:"/api/method/pharm_ehr_tenant.api.get_appointment_questionnaires",
  CLIENT_SAVE:"/api/method/frappe.client.save",
  PATIENT_APPOINTMENT_COUNT:"/api/method/pharm_ehr_tenant.api.get_patient_app_count",
  GET_PAYMENT_URL: "/api/method/pharm_ehr_tenant.api.get_payment_url"
};

export const BASE_URL = import.meta.env.VITE_FRAPPE_BASE_URL;
export default API;
