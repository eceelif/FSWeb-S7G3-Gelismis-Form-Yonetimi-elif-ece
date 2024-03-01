import { useState, useEffect } from "react";
import * as yup from "yup";
import DataObj from "../Data/FormData";

const ValidationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAndConditions: false,
    job: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("İsim gerekli")
      .min(3, "İsim en az 3 karakter olmalı"),
    email: yup
      .string()
      .email("Geçerli bir email adresi girin")
      .required("Email gerekli"),
    password: yup
      .string()
      .min(6, "Şifre en az 6 karakter olmalı")
      .required("Şifre gerekli"),
    termsAndConditions: yup
      .boolean()
      .oneOf([true], "Şartları kabul etmelisiniz"),
    job: yup.string().required("Meslek gerekli"),
  });

  const metaData = [
    {
      inputName: "name",
      inputType: "text",
    },
    {
      inputName: "email",
      inputType: "email",
    },
    {
      inputName: "password",
      inputType: "password",
    },
    {
      inputName: "termsAndConditions",
      inputType: "checkbox",
    },
    {
      inputName: "job",
      inputType: "text",
    },
  ];

  const fillFormWithData = (e) => {
    const valueCatcher =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const nameCatcher = e.target.name;

    const tempObj = {
      ...formData,
      [nameCatcher]: valueCatcher,
    };

    // Validation kontrolü ve hataları yakalama
    validationSchema
      .validateAt(nameCatcher, tempObj)
      .then(() => {
        setValidationErrors({ ...validationErrors, [nameCatcher]: null });
      })
      .catch((error) => {
        setValidationErrors({
          ...validationErrors,
          [nameCatcher]: error.message,
        });
      });

    setFormData(tempObj);
    console.log("Form Data (while filling):", tempObj);
  };

  const formSubmitOnceClicked = async (e) => {
    e.preventDefault();

    try {
      // Tüm formu doğrula
      await validationSchema.validate(formData, { abortEarly: false });

      // If validation passes, proceed with form submission
      const tempData = await DataObj.postData(
        formData.name,
        formData.email,
        formData.password,
        formData.termsAndConditions,
        formData.job
      );

      console.log("Form Data Submitted:", tempData);
    } catch (error) {
      // Handle validation errors or other errors if needed
      console.error("Form Submission Error:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the updateList state changes
    // if (updateList) {
    //   fetchData();
    //   setUpdateList(false); // Reset the state to avoid infinite fetching
    // }
  }, []);

  return (
    <form onSubmit={formSubmitOnceClicked}>
      {metaData.map((inputItem, index) => (
        <div key={index}>
          <p>
            <label htmlFor={inputItem.inputName}>
              {inputItem.inputName}:
              <input
                name={inputItem.inputName}
                type={inputItem.inputType}
                value={formData[inputItem.inputName]}
                onChange={fillFormWithData}
              />
              {/* Hata mesajını görüntüle (varsa) */}
              {validationErrors[inputItem.inputName] && (
                <span style={{ color: "red" }}>
                  {validationErrors[inputItem.inputName]}
                </span>
              )}
            </label>
          </p>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ValidationForm;
