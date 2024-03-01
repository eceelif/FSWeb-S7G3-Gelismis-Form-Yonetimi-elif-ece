import React, { useState, useEffect } from "react";
import DataObj from "../Data/FormData";
import ValidationForm from "./ValidationForm";

const FormList = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Sayfa yüklendiğinde verileri getir
    fetchData();
  }, []);

  const fetchData = async () => {
    // Sayfa numarasını veya gerekirse diğer parametreleri belirleyebilirsiniz
    const page = 1;

    try {
      const result = await DataObj.getData(page);
      setUserData(result.data);
    } catch (error) {
      console.error("Veri getirme hatası:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Submit form data and update local state with the new data
      await DataObj.postData(
        formData.name,
        formData.email,
        formData.password,
        formData.termsAndConditions,
        formData.job
      );

      setUserData((prevUserData) => [...prevUserData, formData]);
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <div>
      <h2>Form Data List</h2>
      <ul>
        {userData.map((user) => (
          <li key={user.id}>
            <strong>Ad:</strong> {user.first_name} {user.last_name},{" "}
            <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>

      {/* Pass handleFormSubmit function to ValidationForm */}
      <ValidationForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default FormList;
