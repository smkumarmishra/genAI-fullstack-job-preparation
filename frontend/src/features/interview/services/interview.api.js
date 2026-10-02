// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000/api/interview",
//   // headers: {
//   //     "Content-Type": "application/json",
//   //     "Authorization": `Bearer ${localStorage.getItem("token")}`
//   // }
//   withCredentials: true,
// });

// export const generateInterViewReport = async ({
//   resumeFile,
//   selfDescription,
//   jobDescription,
// }) => {
//   const formData = new FormData();
//   if (resumeFile) {
//     formData.append("resume", resumeFile);
//   }
//   formData.append("selfDescription", selfDescription);
//   formData.append("jobDescription", jobDescription);
//   const response = await api.post("/generate-report", formData);
//   return response.data;
// };

// export const getInterviewReportById = async (interviewId) => {
//   const response = await api.get(`/get-report/${interviewId}`);
//   return response.data;
// };

// export const getAllInterviewReports = async () => {
//   const response = await api.get("/get-all-reports");
//   return response.data;
// };

// export const generateResumePdf = async (interviewReportId) => {
//   const response = await api.post(
//     `/get-resume/${interviewReportId}`,
//     {},
//     {
//       responseType: "blob",
//     },
//   );
//   return response.data;
// };

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",

  withCredentials: true,
});

export const generateInterViewReport = async ({
  resumeFile,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  const response = await api.post("/interview/generate-report", formData);

  return response.data;
};

export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/interview/get-report/${interviewId}`);

  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/interview/get-all-reports");

  return response.data;
};

export const generateResumePdf = async (interviewReportId) => {
  const response = await api.post(
    `/interview/get-resume/${interviewReportId}`,
    {},
    {
      responseType: "blob",
    },
  );

  return response.data;
};
