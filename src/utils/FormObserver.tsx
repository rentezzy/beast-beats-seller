import { useEffect } from "react";
import { useFormikContext } from "formik";

interface IProps {
  cb: (values: any) => void;
}

const FormObserver: React.FC<IProps> = ({ cb }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    cb(values);
  }, [values, cb]);

  return null;
};
export default FormObserver;
