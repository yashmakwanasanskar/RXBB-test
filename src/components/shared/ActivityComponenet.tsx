import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ActivityTabUnionImage } from "@/constants/images";
import { ActivityProps } from "@/types";
import { removeHtmlTags } from "@/utilities/utils";

const ActivityComponenet: React.FC<ActivityProps> = ({ data }) => {
  function formatTODate(input:string) {
    // Parse the input string into a Date object
    const dateObj = new Date(input);

    // Format the date part (output1)
    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(dateObj);

    // Format the time part (output2)

    return formattedDate
}
  function formatToTime(input:string){
    const dateObj = new Date(input);
    const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(dateObj);
    return formattedTime

  }
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div className="flex gap-3 h-full w-full" key={index}>
            <div className="flex flex-col gap-2 text-right min-w-[8rem]">
              <Label className="text-[#9F9F9F] text-nowrap  xl:text-sm text-xs">{"" || formatTODate(item.creation)}</Label>
              <Label className="text-[#9F9F9F] text-nowrap  xl:text-sm text-xs">{"" || formatToTime(item.creation)}</Label>
            </div>
            <div className="flex flex-col justify-center items-center mt-4">
              <div>
                {/* circle */}
                <div className="w-[1.1rem] h-[1.1rem] bg-[#E5EFFF] rounded-full  flex justify-center items-center">
                  {/* inner circle */}
                  <div className="w-2 h-2 bg-[#4E86E7] rounded-full " />
                </div>
              </div>
              <Separator
                orientation="vertical"
                className={`${data.length === index + 1 && "invisible"}`}
              />
            </div>
            <img
              src={ActivityTabUnionImage.path}
              alt={ActivityTabUnionImage.alt}
              width={20}
              height={20}
              className="mx-2 mb-4 lg:block hidden"
            />
            <div className="flex flex-col h-full w-[60vw]">
              {/* <Label className="text-[#474747] text-justify  xl:text-sm text-xs">
                {item.heading1}
              </Label>
              <Separator orientation="horizontal" className="my-3" /> */}
              <Label className="text-[#474747]  xl:text-sm text-xs">{removeHtmlTags(item.content)}</Label>
              <Label className="text-[#8F8F8F]  xl:text-xs text-[0.6rem]  mt-3 mb-5">
                {item.owner}
              </Label>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ActivityComponenet;
