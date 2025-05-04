import {
  IconChevronRight,
  IconFileUpload,
  IconProgress,
} from "@tabler/icons-react";
import React, { useState } from "react";
import RecordDetailsHeader from "./components/record-details-header";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploadModel from "./components/file-upload-model";
import { useStateContext } from "../../context";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemeniApiKey = import.meta.env.VITE_GEMINI_API_KEY;
const SingleRecordDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [analysisResult, setAnalysisResult] = useState(
    state.analysisResult || "",
  );

  const [filename, setFilename] = useState("");
  const [filetype, setFiletype] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const { updateRecord } = useStateContext();

  const handleOpenModel = () => {
    setIsModelOpen(true);
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
  };
  console.log("Location", state);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFiletype(file.type);
    setFilename(file.name);
    setFile(file);
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.resolve.split(".")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async () => {
    setUploading(true);
    setUploadSuccess(false);

    const genAI = new GoogleGenerativeAI(gemeniApiKey);

    try {
      const base64Data = await readFileAsBase64(file);

      const imageParts = [
        {
          inlineData: {
            data: base64Data,
            mimeType: filetype,
          },
        },
      ];

      const model = genAI.getGenerativeModel({ model: "gemeni-1.5-pro" });
    } catch (error) {}
  };
  return (
    <div className="flex flex-wrap gap-[26px]">
      <button
        type="button"
        //   onClick={handleOpenModel}
        onClick={() => {}}
        className="mt-6 inline-flex items-center gap-x-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-neutral-200 shadow-sm hover:bg-neutral-900 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-[#13131a] dark:text-white dark:hover:bg-neutral-800"
      >
        <IconFileUpload />
        Upload Reports
      </button>
      {/* File upload model */}

      <FileUploadModel
      // isOpen={isModelOpen}
      />
      <RecordDetailsHeader recordName={state.recordName} />
      <div className="w-full">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-xl border border-neutral-700 bg-[#13131a] shadow-sm">
                <div className="border-b border-neutral-700 px-6 py-4">
                  <h2 className="text-xl font-semibold text-neutral-200">
                    Personalized AI-Driven Treatment Plan
                  </h2>
                  <p className="text-sm text-neutral-400">
                    A tailored medical strategy leveraging advanced AI insights
                  </p>
                </div>
                <div className="flex w-full flex-col px-6 py-4 text-white">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Analysis Result
                    </h2>
                    <div className="space-y-2">
                      {/* rendering the result */}
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                    >
                      View Treatment Plan
                      <IconChevronRight size={20} />
                      {/* spinner for api call loading */}
                      {true && (
                        <IconProgress
                          size={10}
                          className="mr-3 h-5 w-5 animate-spin"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRecordDetails;
