export function getTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = now.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "just now";
  }
}

export function removeHtmlTags(content: string) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = content;
  return tempElement.textContent || tempElement.innerText;
}

export const isValidDateFormat = (input: string) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateFormatRegex.test(input);
};

export const convertTo24Hour = (time12h: string) => {
  var timeParts = time12h.split(":");
  var hours = parseInt(timeParts[0]);
  var minutes = parseInt(timeParts[1]);
  var period = time12h.split(" ")[1].toUpperCase();

  if (period === "AM" && hours === 12) {
    hours = 0;
  } else if (period === "PM" && hours < 12) {
    hours += 12;
  }

  var time24h =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0");

  return time24h;
};

export const convertDateFormat = (inputDate: string) => {
  // Create a Date object from the input date string
  var date = new Date(inputDate);

  // Get the year, month, and day from the Date object
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
  var day = date.getDate();

  // Pad the month and day with leading zeros if necessary
  var monthString = month.toString().padStart(2, "0");
  var dayString = day.toString().padStart(2, "0");

  // Construct the new date string in the desired format
  var newDateFormat = `${year}-${monthString}-${dayString}`;

  return newDateFormat;
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const ConvertDateObjFromatToDateandTimeFormat = (date: Date) => {
  // Getting the date components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();

  // Adding leading zeros if necessary and converting to string
  const formattedMonth = month < 10 ? "0" + month : String(month);
  const formattedDay = day < 10 ? "0" + day : String(day);

  // Formatting the date as yyyy-mm-dd
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  // Getting the time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Adding leading zeros if necessary and converting to string
  const formattedHours = hours < 10 ? '0' + hours : String(hours);
  const formattedMinutes = minutes < 10 ? '0' + minutes : String(minutes);
  const formattedSeconds = seconds < 10 ? '0' + seconds : String(seconds);

  // Formatting the time as HH:MM:SS
  const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  // Return date and time as an array
  return [formattedDate, formattedTime];
};


export const formatTime = (time: string): string => {
  // Split the time string by ":"
  const timeParts = time.split(":");

  // Extract hours, minutes, and seconds
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);

  // Ensure two digits for hours and minutes
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Concatenate hours and minutes with ":"
  return `${formattedHours}:${formattedMinutes}`;
};

export const formatDateTime = (dateTime: string): string => {
  // Split the time string by ":"
  const [date, time] = dateTime.split(" ");
  const timeParts = time.split(":");

  // Extract hours, minutes, and seconds
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);

  // Ensure two digits for hours and minutes
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  // Concatenate hours and minutes with ":"
  return `${date} ${formattedHours}:${formattedMinutes}`;
};

export const removeTimeFromDate = (dateTime: string): string => {
  if (!dateTime) {
    return "";
  }
  return dateTime.split(" ")[0];
};

export function convertToAmPm(time: string): string {
  // Extract hours and minutes from the input string
  let hours = parseInt(time.substring(0, 2), 10);
  const minutes = time.substring(2);

  // Determine the period (AM/PM)
  const period = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  if (hours === 0) {
    hours = 12; // 12 AM or 12 PM
  }

  // Format hours and minutes as HHMM
  const formattedTime = `${hours.toString().padStart(2, "0")}${minutes}`;

  return `${formattedTime} ${period}`;
}

export function convertDateFormatToMMDDYYYY(dateStr: string): string {
  // Parse the date string
  if (!dateStr) {
    return "";
  }
  const dateObj = new Date(dateStr);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "Invalid date format. Please use yyyy-mm-dd.";
  }

  // Extract month, day, and year
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  // Format the date as mm-dd-yyyy
  return `${month}-${day}-${year}`;
}

export const calculateBMI = (weight: string = "0", height: string = "0'0") => {
  try {
    const [feet, inches] = height
      .split("'")
      .map((part) => parseFloat(part.trim()));
    const heightM = feet * 0.3048 + inches * 0.0254;
    const weightKg = parseFloat(weight);

    const bmi = weightKg / (heightM * heightM);

    return parseFloat(bmi.toFixed(1)) || 0;
  } catch (e) {
    return 0;
  }
};

export const colorCodeForStatus = (status: string) => {
  switch (status) {
    case "Draft":
      return "text-[#EF5D5D] bg-[#FFE3E3]";
    case "Open":
      return "text-[#EF5D5D] bg-[#FFE3E3]";
    case "Scheduled":
      return "text-[#FF6B00] bg-[#FFF0E4]";
    case "Completed":
      return "text-[#66BB6A] bg-[#66BB6A]";
    case "Active":
      return "text-[#008993] bg-[#D9EDE6]";
    case "Transferred":
      return "text-[#BCA900] bg-[#F8F5C4]";
    case "Inactive":
      return "text-[#EF5D5D] bg-[#FFE3E3]";
    default:
      return "";
  }
};

//used for CMR Service Edit profile
export const getStatusTagColor = (status: string) => {
  switch (status) {
    case "Not Started":
      return "bg-[#FFFEDF] text-[#B5A300]";
    case "Qualified":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "In Progress":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "Scheduled":
      return "bg-[#E5EFFF] text-[#407DE3]";
    case "Ready For Service":
      return "text-center bg-[#E5EFFF] text-[#407DE3]";
    case "Service Completed":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "Ineligible":
      return "bg-[#ffe0c9] text-[#e86c13]";
    default:
      return "bg-[#FFFEDF] text-[#B5A300]";
  }
};

//used for Immunization Service Edit profile
export const getStatusTagColorImmuzation = (status: string) => {
  switch (status) {
    case "Not Sent":
      return "bg-[#FFFEDF] text-[#B5A300]";
    case "Questionnaire":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "In Progress":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "Scheduled":
      return "bg-[#E5EFFF] text-[#407DE3]";
    case "Billing":
      return "text-center bg-[#E5EFFF] text-[#407DE3]";
    case "Service Completed":
      return "bg-[#EAFFE0] text-[#66BB6A]";
    case "Ineligible":
      return "bg-[#ffe0c9] text-[#e86c13]";
    default:
      return "bg-[#FFFEDF] text-[#B5A300]";
  }
};
export const PatientStatusCode = (status: string) => {
  switch (status) {
    case "Active":
      return "text-[#4BC05B] bg-[#F0FEEA]";
    case "Inactive":
      return "text-[#FF5252] bg-[#FFDCDC]";
    case "Transferred":
      return "text-[#E2BE00] bg-[#FFFADD]";
    default:
      return "bg-[#FFFEDF] text-[#B5A300]";
  }
};

export const PatientStatusCodeImage = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-[#4BC05B] ";
    case "Inactive":
      return "bg-[#FF5252] ";
    case "Transferred":
      return "bg-[#E2BE00] ";
    default:
      return "bg-[#B5A300]";
  }
};

export const visibilityInitializer = (
  tableViewFieldState: any,
  label: string,
  allFields: string[]
) => {
  if (
    tableViewFieldState &&
    tableViewFieldState.GridView &&
    tableViewFieldState.GridView[label]
  ) {
    const listofFields = tableViewFieldState.GridView[label].map(
      (field: any) => field.fieldname
    );
    const notAvailableFieldList = allFields.filter(
      (field: any) => !listofFields.includes(field)
    );
    return notAvailableFieldList.reduce(
      (acc: { [key: string]: boolean }, field: string) => {
        acc[field] = false;
        return acc;
      },
      {}
    );
  } else {
    return {};
  }
};

//setting up checkbox to usestate
export const checkboxSetValueNumber = (check: any, setValue: any) => {
  setValue(check ? 1 : 0);
};

export const checkboxGetValueNumber = (getValue: any) => {
  return getValue === 1 ? true : false;
};

export const formatToTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amOrPm = hours < 12 ? "AM" : "PM";
  return `${(hours % 12 || 12).toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${amOrPm}`;
};

export const getPreviousDate = (date: Date, view: string) => {
  if (view === "month") {
    date.setMonth(date.getMonth() - 1);
  } else if (view === "week") {
    date.setDate(date.getDate() - 7);
  } else {
    date.setDate(date.getDate() - 1);
  }
  return date;
};

export const getNextDate = (date: Date, view: string) => {
  if (view === "month") {
    date.setMonth(date.getMonth() + 1);
  } else if (view === "week") {
    date.setDate(date.getDate() + 7);
  } else {
    date.setDate(date.getDate() + 1);
  }
  return date;
};
