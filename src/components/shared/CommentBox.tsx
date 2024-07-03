import { Label, LabelSMResponsive } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CommentBoxProps } from "@/types";
import Cookies from "js-cookie";

import API, { BASE_URL } from "@/constants/api.constant";
import { axiosPOSTAPI } from "@/helpers/commonAPI";
import { getTimeAgo, removeHtmlTags } from "@/utilities/utils";

const CommentBox: React.FC<CommentBoxProps> = ({ data,setReload }) => {
  const DeleteComment = async (commentID: string) => {
    const DeleteCommentAPI = async () => {
        const URL = BASE_URL + API.DELETE_COMMENT;

        const reqBody = {
            doctype: "Comment",
            name: commentID
        };

        const httpOptions = {
            Authorization: Cookies.get("Authorization"),
            "Content-Type": "multipart/form-data"
        };

        try {
          await axiosPOSTAPI(URL, reqBody, { headers: httpOptions });
            // If you need to do something with the response, you can add code here
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    await DeleteCommentAPI(); // Wait for DeleteCommentAPI to complete before reloading the page
    setReload((prev:boolean)=>!prev)
    // window.location.reload();
};

  return (
    <div>
      {data.map((item, index) => {
        return (
          <div className="flex gap-8 h-full w-full" key={index}>
            <div className=" sm:flex-col justify-center items-center align-middle hidden sm:flex">
              <div className="mt-20">
                {/* circle */}
                <div className="w-[1.1rem] h-[1.1rem] bg-[#E5EFFF] rounded-full flex justify-center items-center">
                  {/* inner circle */}
                  <div className="w-2 h-2 bg-[#4E86E7] rounded-full " />
                </div>
              </div>
              <Separator
                orientation="vertical"
                className={`${data.length === index + 1 && "invisible"}`}
              />
            </div>
            <div className="bg-white p-3 my-4 w-full space-y-3 border border-[#DDDDDD] min-h-[8.5rem] ">
              <div className="flex  min-h-[5rem]">
                {/* <img
                  src={item.profilePhoto}
                  alt={"DP"}
                  width={37}
                  height={100}
                  className="sm:mr-2"
                /> */}
                <div className="flex flex-col w-full gap-2 mx-2">
                  <div className="flex justify-between">
                    <LabelSMResponsive className="text-[#4984F4] leading-3 font-semibold">
                      {item.owner}
                    </LabelSMResponsive>
                    <Label className="text-[#909DA0] sm:text-xs text-[0.5rem] text-nowrap">
                      {getTimeAgo(item.creation)}
                    </Label>
                  </div>
                  <LabelSMResponsive className="text-[#585858] xl:leading-5  leading-4 text-justify font-semibold">
                    {removeHtmlTags(item.content)}
                  </LabelSMResponsive>
                </div>
              </div>
              <div className="mx-2">
                  <Label className="text-[#909DA0] sm:text-xs text-[0.5rem] align-middle hover:cursor-pointer" onClick={()=> DeleteComment(item.name)}>
                    Remove
                  </Label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CommentBox;
