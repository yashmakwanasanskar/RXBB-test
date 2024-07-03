import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label, LabelSMResponsive } from "@/components/ui/label";
import {
  CMRServiceTypeAppointmentCMR,
  CalenderAppointmentCMR,
  ClockAppointmentCMR,
  DeliveryMethodAppointmentCMR,
  EditCardButton,
  ImmunizationServiceCloseAppointmentTypeMethod,
  LocationAppointmentCMR,
} from "@/constants/images";
import {
  colorCodeForStatus,
  convertDateFormat,
  convertTo24Hour,
} from "@/utilities/utils";
import { useForm } from "react-hook-form";

const PatientAppointmentCard = ({ data, ChangeDateandTimeAPI }: any) => {
  const { register, getValues } = useForm();
  return Object.keys(data).length !== 0 ? (
    <div>
      <div
        className={` rounded-xl bg-[#FFFFFF] drop-shadow-md pr-3 border border-[#D4D6DD] w-fit`}
      >
        <div></div>
        <div className="flex justify-between">
          <div
            className={`p-1 m-3 w-24  text-center rounded-full ${colorCodeForStatus(
              data.status
            )}`}
          >
            <p className={`font-bold text-sm  `}>{data.status}</p>
          </div>
          <div className="flex">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={EditCardButton.path}
                  alt={EditCardButton.alt}
                  width={15}
                  height={15}
                  className="sm:mr-2 hover:cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="min-w-max">
                <DialogHeader>
                  <DialogTitle>Edit Date and Time</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Appointment Date
                    </Label>
                    <div className="col-span-3">
                      <Input
                        type="date"
                        defaultValue={data.date}
                        {...register("date")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Appointment Time
                    </Label>
                    <div className="col-span-3">
                      <LabelSMResponsive className="text-[#616161]">
                        {/* <span className="text-[#ED9192]">*</span> */}
                      </LabelSMResponsive>
                      <Input
                        type="time"
                        defaultValue={data.time}
                        {...register("time")}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="bg-[#7ACFFF]"
                      onClick={() =>
                        ChangeDateandTimeAPI(
                          getValues("date"),
                          getValues("time") + ":00"
                        )
                      }
                    >
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="flex flex-wrap max-w-fit space-x-2 gap-3">
            {data.location && (
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={LocationAppointmentCMR.path}
                  alt={LocationAppointmentCMR.alt}
                  className="w-5 h-5"
                />
                <Label>{data.location}</Label>
              </div>
            )}
            {data.date && (
              <div className="flex flex-row gap-2 items-center">
                <img
                  className="w-5 h-5"
                  src={CalenderAppointmentCMR.path}
                  alt={CalenderAppointmentCMR.alt}
                />
                <Label>{data.date}</Label>
              </div>
            )}
            {data.method && (
              <div className="flex flex-row gap-2 items-center">
                <img
                  className="w-5 h-5"
                  src={DeliveryMethodAppointmentCMR.path}
                  alt={DeliveryMethodAppointmentCMR.alt}
                />
                <Label>{data.method}</Label>
              </div>
            )}
            {data.appointmentType && (
              <div className="flex flex-row gap-2 items-center">
                <img
                  className="w-5 h-5"
                  src={CMRServiceTypeAppointmentCMR.path}
                  alt={CMRServiceTypeAppointmentCMR.alt}
                />
                <Label>{data.appointmentType}</Label>
              </div>
            )}
            {data.time && (
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={ClockAppointmentCMR.path}
                  className="w-4 h-4"
                  alt={ClockAppointmentCMR.alt}
                />
                <Label>{data.time}</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No Appointment Found</div>
  );
};

export const PatientAppointmentCardImmunization = ({
  data,
  ChangeDateandTimeAPI,
}: any) => {
  const { register, getValues } = useForm();
  return Object.keys(data).length !== 0 ? (
    <div>
      <div
        className={` rounded-sm bg-[#FFFFFF] drop-shadow-md pr-3 border border-[#D4D6DD] w-fit`}
      >
        <div></div>
        <div className="flex justify-between">
          <div
            className={`p-1 m-3 w-24  text-center rounded-full ${colorCodeForStatus(
              data.status
            )}`}
          >
            <p className={`font-bold text-sm  `}>{data.status}</p>
          </div>
          <div className="flex">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={EditCardButton.path}
                  alt={EditCardButton.alt}
                  width={15}
                  height={15}
                  className="sm:mr-2 hover:cursor-pointer"
                />
              </DialogTrigger>
              <DialogContent className="min-w-max">
                <DialogHeader>
                  <DialogTitle>Edit Date and Time</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Appointment Date
                    </Label>
                    <div className="col-span-3">
                      <Input
                        type="date"
                        defaultValue={convertDateFormat(data.date)}
                        {...register("date")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Appointment Time
                    </Label>
                    <div className="col-span-3">
                      <LabelSMResponsive className="text-[#616161]">
                        {/* <span className="text-[#ED9192]">*</span> */}
                      </LabelSMResponsive>
                      <Input
                        type="time"
                        defaultValue={convertTo24Hour(data.time)}
                        {...register("time")}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="bg-[#7ACFFF]"
                      onClick={() =>
                        ChangeDateandTimeAPI(
                          data.name,
                          getValues("date"),
                          getValues("time") + ":00"
                        )
                      }
                    >
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mx-4 my-2">
          <div className="grid xl:grid-cols-4 lg:grid-cols-2   gap-3">
            {data.appointment_type && (
              <div className="grid gap-1 items-center min-w-[13rem] h-full">
                <Label className="text-[#999999] text-xs">
                  Appointment Type
                </Label>
                <Label className="text-[#303348] md:text-xl text-base font-medium text-wrap">
                  {data.appointment_type}
                </Label>
              </div>
            )}

            {data.date && (
              <div className="grid gap-1 items-center">
                <Label className="text-[#999999] text-xs">Date</Label>
                <Label className="text-[#303348] md:text-xl text-base font-medium">
                  {data.date}
                </Label>
              </div>
            )}

            {data.time && (
              <div className="grid gap-1 items-center">
                <Label className="text-[#999999] text-xs">Time</Label>

                <Label className="text-[#303348] md:text-xl text-base font-medium">
                  {data.time}
                </Label>
              </div>
            )}
            {data.method && (
              <div className="grid gap-1 items-center">
                <Label className="text-[#999999] text-xs">Method</Label>
                <div className="space-x-1 flex items-center">
                  <img
                    className="w-4 h-4 min-h-4 min-w-4 "
                    src={ImmunizationServiceCloseAppointmentTypeMethod.path}
                    alt={ImmunizationServiceCloseAppointmentTypeMethod.alt}

                  />
                  <Label className="text-[#303348] md:text-xl text-base font-medium">
                    {data.method}
                  </Label>
                </div>
              </div>
            )}

            {data.service_unit && (
              <div className="grid gap-1 items-center col-span-2">
                <Label className="text-[#999999] text-xs">Location</Label>
                <Label className="text-[#303348] md:text-xl text-base font-medium">{data.service_unit}</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>No Appointment Found</div>
  );
};

export default PatientAppointmentCard;
