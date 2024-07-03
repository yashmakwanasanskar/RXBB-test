import { ReqiredFieldsMandatoryErrors } from "@/constants/images";

const ReqiredFieldErrorImage = ({error}: any) => {
  return error && (
    <img
      src={ReqiredFieldsMandatoryErrors.path}
      alt={ReqiredFieldsMandatoryErrors.alt}
      className="inline-block pl-1 h-5 w-5"
    />
  ) ;
};
export default ReqiredFieldErrorImage;
