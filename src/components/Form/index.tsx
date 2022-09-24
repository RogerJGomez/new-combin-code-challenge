import React, { useCallback, useEffect, useState } from "react";
import { Member } from "../../types";
import * as yup from "yup";

interface Props {
  onSubmitAction(member: Member): void;
}

const Form: React.FC<Props> = ({
  onSubmitAction,
}: Props): React.ReactElement => {
  const [formState, setFormState] = useState<Member>(initialState);
  const [formError, setFormError] = useState<boolean>(true);

  const { firstName, lastName, address, ssn } = formState;

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value, name } = event.target;

      setFormState({ ...formState, [name]: value });
    },
    [formState]
  );

  useEffect(() => {
    try {
      schema.isValid(formState).then((valid) => {
        setFormError(valid);
      });
    } catch (error) {
      console.warn(error);
    }
  }, [formState]);

  const resetForm = useCallback(() => {
    setFormState(initialState);
  }, []);

  const onSubmit = useCallback(() => {
    onSubmitAction(formState);
  }, [formState, onSubmitAction]);

  return (
    <div className="border-gray-300 border p-2 rounded-md w-full">
      <div className={containerClassName}>
        <input
          id="first-name"
          name="firstName"
          value={firstName}
          className={inputClassName}
          placeholder="First Name"
          type="text"
          onChange={onChange}
        />
      </div>
      <div className={containerClassName}>
        <input
          id="last-name"
          name="lastName"
          value={lastName}
          className={inputClassName}
          placeholder="Last Name"
          type="text"
          onChange={onChange}
        />
      </div>
      <div className={containerClassName}>
        <input
          id="address"
          name="address"
          value={address}
          className={inputClassName}
          placeholder="Address"
          type="text"
          onChange={onChange}
        />
      </div>
      <div className={containerClassName}>
        <input
          id="ssn"
          name="ssn"
          value={ssn}
          className={inputClassName}
          placeholder="SSN"
          type="text"
          onChange={onChange}
        />
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button
          className={`${buttonBaseClassName} bg-gray-500 hover:bg-gray-700`}
          onClick={resetForm}
        >
          Reset
        </button>
        <button
          className={`${buttonBaseClassName} bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300`}
          disabled={!formError}
          onClick={onSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;

const initialState: Member = {
  firstName: "",
  lastName: "",
  address: "",
  ssn: "",
};

const schema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  address: yup.string().trim().required(),
  ssn: yup
    .string()
    .matches(/^\d{3}-?\d{2}-?\d{4}$/)
    .required(),
});

const inputClassName =
  "relative font-poppins text-sm w-full leading-tall outline-none bg-transparent px-3 py-4 focus:outline-none";
const containerClassName = "relative text-left border-b border-gray-medium";
const buttonBaseClassName =
  "flex justify-center items-center transition-colors focus:outline-none border cursor-pointer text-white rounded-md px-3 py-1 w-28";
