import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { BillingCode } from "./tables-types";
import { convertDateFormatToMMDDYYYY } from "@/utilities/utils";

export const BillingCodeColumns: ColumnDef<BillingCode>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "item_code",
    header: "Code Value",
    cell: ({ row }) => <div className="">{row.getValue("item_code")}</div>,
  },
  {
    accessorKey: "definition",
    header: "Definition",
    cell: ({ row }) => <div className="">{row.getValue("definition")}</div>,
  },
  {
    accessorKey: "code_system",
    header: "Code System",
    cell: ({ row }) => <div className="">{row.getValue("code_system")}</div>,
  },
  {
    accessorKey: "item_name",
    header: "Time Slot",
    cell: ({ row }) => <div className="">{row.getValue("item_name")}</div>,
  },
  {
    accessorKey: "appointment_type",
    header: "Appointment Type",
    cell: ({ row }) => (
      <div className="">{row.getValue("appointment_type")}</div>
    ),
  },
];

export const MedicationColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "medication_name",
    header: "Medication Name",
    cell: ({ row }) => (
      <div className="">{row.getValue("medication_name")}</div>
    ),
  },
  {
    accessorKey: "prescriber",
    header: "Prescriber",
    cell: ({ row }) => <div className="">{row.getValue("prescriber")}</div>,
  },
  // {
  //   accessorKey: "dosage",
  //   header: "Dosage",
  //   cell: ({ row }) => <div className="">{row.getValue("dosage")}</div>,
  // },
  {
    accessorKey: "directions",
    header: "Directions",
    cell: ({ row }) => <div className="">{row.getValue("directions")}</div>,
  },
  {
    accessorKey: "related_conditions",
    header: "Diagnosis",
    cell: ({ row }) => (
      <div className="">{row.getValue("related_conditions")}</div>
    ),
  },
  // {
  //   accessorKey: "related_conditions",
  //   header: "Related Conditions",
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("related_conditions")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "potential_problem",
  //   header: "Potential Problem",
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("potential_problem")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "custom_added_by_patient",
  //   header: "Added By Patient",
  //   cell: ({ row }) => (
  //     <div className="">
  //       <Checkbox
  //         checked={row.getValue("custom_added_by_patient") === 1 ? true : false}
  //       />
  //     </div>
  //   ),
  // },
];

export const HelthConditionsColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "health_condition",
    header: "Diagnosis",
    cell: ({ row }) => (
      <div className="">{row.getValue("health_condition")}</div>
    ),
  },
  {
    accessorKey: "condition_status",
    header: "Condition Status",
    cell: ({ row }) => <div className="">{row.getValue("condition_status")}</div>,
  },
];

export const AllergiesColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "allergies",
    header: "Allergies",
    cell: ({ row }) => (
      <div className="">{row.getValue("allergies")}</div>
    ),
  },
  {
    accessorKey: "reaction",
    header: "Reactions",
    cell: ({ row }) => <div className="">{row.getValue("reaction")}</div>,
  },
];

export const VaccineDetailsImmunization: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "vaccine",
    accessorKey: "vaccine",
    cell: ({ row }) => <div className="">{row.getValue("vaccine")}</div>,
  },
  {
    accessorKey: "arm",
    header: "Arm",
    cell: ({ row }) => <div className="">{row.getValue("arm")}</div>,
  },
  {
    accessorKey: "vis_exp",
    header: ({ table }) => (
      <div>
        VIS date <span className="text-[#ED9192]">*</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="">
        {convertDateFormatToMMDDYYYY(row.getValue("vis_exp"))}
      </div>
    ),
  },
  {
    accessorKey: "vaccine_given",
    header: ({ table }) => (
      <div>
        Vaccine Given <span className="text-[#ED9192]">*</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="">
        {convertDateFormatToMMDDYYYY(row.getValue("vaccine_given"))}
      </div>
    ),
  },
  {
    accessorKey: "vis_given",
    header: ({ table }) => (
      <div>
        Vaccine Given <span className="text-[#ED9192]">*</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="">
        {convertDateFormatToMMDDYYYY(row.getValue("vis_given"))}
      </div>
    ),
  },
  {
    accessorKey: "manufacturer",
    header: ({ table }) => <div>Manufacturer</div>,
    cell: ({ row }) => <div className="">{row.getValue("manufacturer")}</div>,
  },
  {
    accessorKey: "exp",
    header: ({ table }) => <div>Expiration Date</div>,
    cell: ({ row }) => (
      <div className="">{convertDateFormatToMMDDYYYY(row.getValue("exp"))}</div>
    ),
  },
  {
    accessorKey: "dosage",
    header: ({ table }) => <div>Dosage</div>,
    cell: ({ row }) => <div className="">{row.getValue("dosage")}</div>,
  },
  {
    accessorKey: "lot",
    header: ({ table }) => <div>Lot</div>,
    cell: ({ row }) => <div className="">{row.getValue("lot")}</div>,
  },
  {
    accessorKey: "rph",
    header: ({ table }) => <div>RPH</div>,
    cell: ({ row }) => <div className="">{row.getValue("rph")}</div>,
  },
];

export const BillingInfoImmunization: ColumnDef<any>[] = [
  {
    accessorKey: "appointment_type",
    header: ({ table }) => <div>Appointment Type</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("appointment_type")}</div>
    ),
  },
  {
    accessorKey: "custom_payment_type",
    header: ({ table }) => <div>Payment Type</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("custom_payment_type")}</div>
    ),
  },
  {
    accessorKey: "billing_details",
    header: ({ table }) => <div>Billing Details</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("billing_details") || "X"}</div>
    ),
  },
  {
    accessorKey: "custom_billing_status",
    header: ({ table }) => <div>Billing Status</div>,
    cell: ({ row }) => (
      <div>
        <div className="text-[#5BB760] bg-[#EAFFE0] font-semibold  w-fit px-2">
          {row.getValue("custom_billing_status")}
        </div>
      </div>
    ),
  },
];

export const MedicalCodeImmunization: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "code_system",
  //   header: "Code System",
  //   cell: ({ row }) => <div className="">{row.getValue("code_system")}</div>,
  // },
  {
    accessorKey: "code_value",
    header: "Code Value",
    cell: ({ row }) => <div className="xl:text-xs text-[0.70rem]">{row.getValue("code_value")}</div>,
  },
  // {
  //   accessorKey: "code",
  //   header: "Code",
  //   cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
  // },
  // {
  //   accessorKey: "display",
  //   header: "Display",
  //   cell: ({ row }) => <div className="">{row.getValue("display")}</div>,
  // },
  {
    accessorKey: "definition",
    header: "Definition",
    cell: ({ row }) => <div className="xl:text-xs text-[0.70rem]">{row.getValue("definition")}</div>,
  },
  // {
  //   accessorKey: "custom_is_vfc_billing",
  //   header: "Custom is VFC Billing",
  //   cell: ({ row }) => (
  //     <div className="">{row.getValue("custom_is_vfc_billing")}</div>
  //   ),
  // },
  // {
  //   accessorKey: "oid",
  //   header: "Oid",
  //   cell: ({ row }) => <div className="">{row.getValue("oid")}</div>,
  // },
  // {
  //   accessorKey: "system",
  //   header: "System",
  //   cell: ({ row }) => <div className="">{row.getValue("system")}</div>,
  // },
];


export const EventServiceColumnData: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="data-[state=checked]:bg-[#474747]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "vaccine_type",
    header: ({ table }) => <div>Appointment Type</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("vaccine_type")}</div>
    ),
  },
  {
    accessorKey: "service_type",
    header: ({ table }) => <div>Service Type</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("service_type")}</div>
    ),
  },

  {
    accessorKey: "cash_price",
    header: ({ table }) => <div>Cash Price</div>,
    cell: ({ row }) => (
      <div className="">{row.getValue("cash_price")}</div>
    ),
  },
]