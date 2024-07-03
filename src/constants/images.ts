import { PublicAssets } from "@/types";
import { BASE_URL } from "./api.constant";

// Define base paths for icons and images
const iconsBasePath = "/assets/icons/";
const imagesBasePath = "/assets/images/";

//website logo
export const RXBBShortLogoIcon: PublicAssets = {
  path: "/LOGO.svg",
  alt: "LOGO",
};
// Navbar icons
export const notificationIcon: PublicAssets = {
  path: "/assets/icons/navbar/notification.svg",
  alt: "Notification",
};
export const sideNavToggleOpenIcon: PublicAssets = {
  path: iconsBasePath + "navbar/open.svg",
  alt: "Open",
};
export const sideNavToggleCloseIcon: PublicAssets = {
  path: iconsBasePath + "navbar/close.svg",
  alt: "Close",
};

// Side navigation panel icons
export const dashboardIcon: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/dashboard.svg",
  alt: "Dashboard",
};
export const patientListIcon: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/patient-list.svg",
  alt: "Patient",
};
export const appointmentIcon: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/services.svg",
  alt: "Services",
};
export const scheduleIcon: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/schedule.svg",
  alt: "Schedule",
};
export const eventsIcon: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/events.svg",
  alt: "Events",
};

// Patient list page icons
export const patientListSearchIcon: PublicAssets = {
  path: iconsBasePath + "patient-list/search.svg",
  alt: "Search",
};
export const patientListViewIcon: PublicAssets = {
  path: iconsBasePath + "patient-list/view.svg",
  alt: "View",
};
export const patientListAddIcon: PublicAssets = {
  path: iconsBasePath + "patient-list/add-patient.svg",
  alt: "Add Patient",
};
export const patientListMenuIcon: PublicAssets = {
  path: iconsBasePath + "patient-list/menu.svg",
  alt: "Column Order",
};
export const userProfile: PublicAssets = {
  path: imagesBasePath + "patient-list/user-1.svg",
  alt: "User 1",
};

// Add patient & view patient sub menu icons
export const patientSubMenuOverview: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/overview.svg",
  alt: "Overview",
};
export const patientSubMenuAddressContact: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/address-contact.svg",
  alt: "AddressContact",
};
export const patientSubMenuMedicalHistory: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/medical-history.svg",
  alt: "MedicalHistory",
};
export const patientSubMenuInsuranceDetails: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/insurance-details.svg",
  alt: "InsuranceDetails",
};
export const patientSubMenuPrescriptionBenefitInformation: PublicAssets = {
  path:
    iconsBasePath +
    "patient-list/patient-sub-menu/prescription-benefit-information.svg",
  alt: "PrescriptionBenefitInformation",
};
export const patientSubMenuClinicalInformation: PublicAssets = {
  path:
    iconsBasePath + "patient-list/patient-sub-menu/clinical-information.svg",
  alt: "ClinicalInformation",
};
export const patientSubMenuAppointments: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/appointments.svg",
  alt: "Appointments",
};
export const patientSubMenuCommunications: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/communications.svg",
  alt: "Communications",
};
export const patientSubMenuActivity: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/activity.svg",
  alt: "Activity",
};
export const patientSubMenuComments: PublicAssets = {
  path: iconsBasePath + "patient-list/patient-sub-menu/comments.svg",
  alt: "Comments",
};
export const patientCommentsPersonPhotos: PublicAssets = {
  path: iconsBasePath + "patient-list/Ellipse 211.svg",
  alt: "person-comments",
};
export const addIcon: PublicAssets = {
  path: iconsBasePath + "add-1.svg",
  alt: "Add",
};
export const addBlueIcon: PublicAssets = {
  path: iconsBasePath + "Plus.svg",
  alt: "Add",
};

// services/add-cmr-service page
export const CMRFollowUpAppointment: PublicAssets = {
  path: iconsBasePath + "/new-cmr/Up 3.svg",
  alt: "UP",
};
export const CMRPatientTakeAway: PublicAssets = {
  path: iconsBasePath + "/new-cmr/Download.svg",
  alt: "Download",
};

export const CMRAppointmentFilter: PublicAssets = {
  path: iconsBasePath + "/services/Descending Sorting.svg",
  alt: "Add Service",
};

export const ActivityTabUnionImage: PublicAssets = {
  path: iconsBasePath + "Union.svg",
  alt: "Union",
};
export const AddService: PublicAssets = {
  path: iconsBasePath + "/services/add.svg",
  alt: "Add Service",
};

//Service Details | Billing
export const DetailsInformationService: PublicAssets = {
  path: iconsBasePath + "/services/Information.svg",
  alt: "Information",
};

export const BillService: PublicAssets = {
  path: iconsBasePath + "/services/Bill.svg",
  alt: "Bill",
};

export const TimerIconAppointmentView: PublicAssets = {
  path: iconsBasePath + "/appointment-view/Timer.svg",
  alt: "Timer",
};

export const AppointmentSchedulingAppointmentView: PublicAssets = {
  path: iconsBasePath + "/appointment-view/Appointment Scheduling.svg",
  alt: "Appointment Scheduling",
};

export const PriceListAppointmentView: PublicAssets = {
  path: iconsBasePath + "/appointment-view/List.svg",
  alt: "List",
};

export const CashAppointmentView: PublicAssets = {
  path: iconsBasePath + "/appointment-view/Cash.svg",
  alt: "Cash",
};

// user/profile page
export const passwordReset: PublicAssets = {
  path: iconsBasePath + "user/password-reset.svg",
  alt: "Password Reset",
};
export const impersonate: PublicAssets = {
  path: iconsBasePath + "user/impersonate.svg",
  alt: "impersonate",
};
export const personName: PublicAssets = {
  path: iconsBasePath + "user/administrator.svg",
  alt: "Person Name",
};
export const dateOfBirthIcon: PublicAssets = {
  path: iconsBasePath + "user/dob.svg",
  alt: "Date Of Birth",
};
export const emailIcon: PublicAssets = {
  path: iconsBasePath + "user/email.svg",
  alt: "Email",
};
export const phoneIcon: PublicAssets = {
  path: iconsBasePath + "user/phone.svg",
  alt: "Phone",
};
export const addressIcon: PublicAssets = {
  path: iconsBasePath + "user/address.svg",
  alt: "Address",
};
export const stateIcon: PublicAssets = {
  path: iconsBasePath + "user/state.svg",
  alt: "State",
};
export const cityIcon: PublicAssets = {
  path: iconsBasePath + "user/city.svg",
  alt: "City",
};
export const zipCodeIcon: PublicAssets = {
  path: iconsBasePath + "user/zip-code.svg",
  alt: "Zip Code",
};
export const languageIcon: PublicAssets = {
  path: iconsBasePath + "user/language.svg",
  alt: "Language",
};
export const timeZoneIcon: PublicAssets = {
  path: iconsBasePath + "user/time-zone.svg",
  alt: "Time Zone",
};
export const selectAllIcon: PublicAssets = {
  path: iconsBasePath + "user/select-all.svg",
  alt: "Select All",
};
export const unSelectAllIcon: PublicAssets = {
  path: iconsBasePath + "user/unselect-all.svg",
  alt: "Unselect All",
};
export const changeIcon: PublicAssets = {
  path: iconsBasePath + "user/change.svg",
  alt: "Change",
};
export const removeIcon: PublicAssets = {
  path: iconsBasePath + "user/remove.svg",
  alt: "Remove",
};

//Card Component Images

export const EditCardButton: PublicAssets = {
  path: iconsBasePath + "card-component/Vector.svg",
  alt: "Edit",
};

export const DeleteCardButton: PublicAssets = {
  path: iconsBasePath + "card-component/Delete.svg",
  alt: "Delete",
};

// patient View Images

export const AttachementBrowseFile: PublicAssets = {
  path: iconsBasePath + "patient-view/attachment_file.svg",
  alt: "attachment File",
};

export const DeleteFileIcon: PublicAssets = {
  path: iconsBasePath + "patient-view/delete.svg",
  alt: "attachment File",
};

export const DocFileicon: PublicAssets = {
  path: iconsBasePath + "patient-view/description.svg",
  alt: "attachment File",
};

//cmr Appointments images

export const LocationAppointmentCMR: PublicAssets = {
  path: iconsBasePath + "/services/cmr-service/appointments/Location.svg",
  alt: "attachment File",
};

export const CMRServiceTypeAppointmentCMR: PublicAssets = {
  path: iconsBasePath + "/services/cmr-service/appointments/Info.svg",
  alt: "attachment File",
};

export const CalenderAppointmentCMR: PublicAssets = {
  path: iconsBasePath + "/services/cmr-service/appointments/Date.svg",
  alt: "attachment File",
};

export const ClockAppointmentCMR: PublicAssets = {
  path: iconsBasePath + "/services/cmr-service/appointments/Time.svg",
  alt: "attachment File",
};

export const DeliveryMethodAppointmentCMR: PublicAssets = {
  path: iconsBasePath + "/services/cmr-service/appointments/Transaction.svg",
  alt: "attachment File",
};

//reqired fields error

export const ReqiredFieldsMandatoryErrors: PublicAssets = {
  path: iconsBasePath + "/required-fields/infomation.svg",
  alt: "Required Field",
};

//tables images
export const SettingIconTable: PublicAssets = {
  path: iconsBasePath + "/tables/setting.svg",
  alt: "Setting",
};

export const DeleteIconTable: PublicAssets = {
  path: iconsBasePath + "/tables/delete.svg",
  alt: "Setting",
};

export const AddIconTable: PublicAssets = {
  path: iconsBasePath + "/tables/plus.svg",
  alt: "Setting",
};

export const EditIconTable: PublicAssets = {
  path: iconsBasePath + "/tables/Pencil.svg",
  alt: "Setting",
};

//custom filter icons here

export const ClearCustomFilterIcons: PublicAssets = {
  path: iconsBasePath + "/custom-filter/clearall.svg",
  alt: "Clear",
};

export const ClearRowCustomFilterIcons: PublicAssets = {
  path: iconsBasePath + "/custom-filter/Pen.svg",
  alt: "Clear a Row",
};

//images for male and female

export const MaleImage: PublicAssets = {
  path: BASE_URL + "/files/male-01b9b9f4.svg",
  alt: "Male Image",
};

export const FemaleImage: PublicAssets = {
  path: BASE_URL + "/files/female-01060b87.svg",
  alt: "Female Image",
};

//activity button image
export const ActivityButtonIcon: PublicAssets = {
  path: iconsBasePath + "/page-header/Activity.svg",
  alt: "Activity",
};


// Booking Module 
export const CarouselImage1:PublicAssets = {
  path: imagesBasePath + "hero-section-booking/image-1.png",
  alt:"CarouselImage1"
}

export const CarouselImage2:PublicAssets = {
  path: imagesBasePath + "hero-section-booking/image-2.png",
  alt:"CarouselImage2"
}

export const CarouselImage3:PublicAssets = {
  path: imagesBasePath + "hero-section-booking/image-3.png",
  alt:"CarouselImage3"
}

export const ServiceTypeImage:PublicAssets = {
  path: imagesBasePath + "hero-section-booking/icon-1.png",
  alt:"ServiceTypeImage"
}

export const InfoIcon:PublicAssets = {
  path: imagesBasePath + "hero-section-booking/infoIcon.png",
  alt:"infoIcon"
}

export const UploadIcon:PublicAssets = {
  path: imagesBasePath + "hero-section-booking/upload.png",
  alt:"uploadIcon"
}

//immunization service Icons 
export const ImmunizationServiceAddPatientIcon:PublicAssets = {
  path: iconsBasePath + "/immunization/patient-add.svg",
  alt: "Add Patient",
};

export const ImmunizationServiceCloseAppointmentTypeIcon: PublicAssets = {
  path: iconsBasePath + "/immunization/Close.svg",
  alt: "Add Patient",
};

export const ImmunizationServiceCloseAppointmentTypeMethod: PublicAssets = {
  path: iconsBasePath + "/immunization/facetoface.svg",
  alt: "Method",
};

export const PaymentTypeUploadImageIcon: PublicAssets = {
  path: iconsBasePath + "/payment-type/upload-box.svg",
  alt: "Upload Image",
};

//calender view icons

export const timeIconCalenderView: PublicAssets = {
  path: iconsBasePath + "calender/pace.svg",
  alt: "Time",
};

export const FilterRequestCalenderView: PublicAssets = {
  path: iconsBasePath + "calender/Filter.svg",
  alt: "Filter",
};

export const CalenderIcon: PublicAssets = {
  path: iconsBasePath + "calender/calendar_month.svg",
  alt: "Filter",
};
export const ListViewIcon: PublicAssets = {
  path: iconsBasePath + "calender/format_list_bulleted.svg",
  alt: "Filter",
};
//appointment link image

export const LinkImage: PublicAssets = {
  path: iconsBasePath + "appointment-view/Link.svg",
  alt: "Link",
};

//event QR Code

export const EventQRCodeImage: PublicAssets = {
  path: iconsBasePath + "events/qr code scan.svg",
  alt: "QR Code",
};

export const EventLocationImage: PublicAssets = {
  path: iconsBasePath + "events/Location.svg",
  alt: "Location",
};

export const AddEventImage: PublicAssets = {
  path: iconsBasePath + "events/event.svg",
  alt: "Location",
};

//side navigation new icons

export const PatientImage: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/personal_injury.svg",
  alt: "Person",
};

export const PatientWithBorderImage: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/personal_injury_border.svg",
  alt: "Person",
};

export const ServiceWithBorderImage: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/medical_information_border.svg",
  alt: "Service",
};

export const ServiceImage: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/medical_information.svg",
  alt: "Service",
};

export const EventBorderImage: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/free_cancellation_border.svg",
  alt: "Service",
};
export const EventImage: PublicAssets = {
  path: iconsBasePath + "side-navigation-panel/free_cancellation.svg",
  alt: "Service",
};

//appointment icons
export const AppointmentServiceImmunizationImage: PublicAssets = {
  path: iconsBasePath + "appointment-view/mixture_med.svg",
  alt: "Service",
};

export const AppointmentDetailsImage: PublicAssets = {
  path: iconsBasePath + "appointment-view/edit_calendar.svg",
  alt: "Service",
};

export const AppointmentServiceCMRImage: PublicAssets = {
  path: iconsBasePath + "appointment-view/cmr_notes.svg",
  alt: "Service",
};

//calender filter image
export const CalenderFilterImage: PublicAssets = {
  path: iconsBasePath + "calender/filter_alt.svg",
  alt: "Service",
};


//404 page not found

export const NotFoundPageIcon: PublicAssets = {
  path: iconsBasePath + "calender/404-page.svg",
  alt: "404",
};