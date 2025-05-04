// create records and the the record folder
import { IconCirclePlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import RecordCard from "./components/record-card";
import CreateRecordModel from "./components/create-record-model";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import { useStateContext } from "../../context";

const Index = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();
  const {
    records,
    fetchUserRecords,
    createRecord,
    fetchUserByEmail,
    currentUser,
  } = useStateContext();

  const [userRecords, setUserRecords] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleOpenModel = () => {
    setIsModelOpen(true);
  };
  const handleCloseModel = () => {
    setIsModelOpen(false);
  };

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);

  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem("userRecords", JSON.stringify(records));
  }, [records]);

  const createFolder = async (foldername) => {
    try {
      if (currentUser) {
        const newRecords = await createRecord({
          userId: currentUser.id,
          recordName: foldername,
          analysisResult: "",
          kanbanRecords: "",
          createdBy: user.email.address,
        });

        if (newRecords) {
          fetchUserRecords(user.email.address);
          handleCloseModel();
        }
      }
    } catch (error) {
      console.log(error);
      handleCloseModel();
    }
  };

  const handleNavigate = (name) => {
    const filteredRecords = userRecords.filter(
      (record) => record.recordName === name,
    );

    if (filteredRecords.length > 0) {
      navigate(`/medical-records/${name}`, {
        state: filteredRecords[0],
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border-neutral-700 bg-[#13131a] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
        onClick={handleOpenModel}
      >
        <IconCirclePlus />
        Create Record
      </button>
      {/* after we click the button, we will create a new record and add it to the record folder */}
      <CreateRecordModel
        isOpen={isModelOpen}
        onClose={handleCloseModel}
        onCreate={createFolder}
      />
      <div className="grid w-full sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Record card */}
        {userRecords.map((record) => {
          return (
            <RecordCard
              key={record.recordName}
              record={record}
              onNavigate={handleNavigate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Index;
