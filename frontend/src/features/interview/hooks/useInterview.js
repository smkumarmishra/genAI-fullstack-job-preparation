import {
  generateInterViewReport,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf,
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const { interviewId } = useParams();
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }
  const { setReport, setLoading, reports, setReports, report, loading } =
    context;

  const handleGenerateInterViewReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
  }) => {
    try {
      setLoading(true);
      const response = await generateInterViewReport({
        resumeFile,
        selfDescription,
        jobDescription,
      });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.error(
        "Generate interview report failed:",
        error.response?.data || error.message,
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleGetInterviewReportById = async (interviewId) => {
    try {
      setLoading(true);
      const response = await getInterviewReportById(interviewId);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllInterviewReports = async () => {
    try {
      setLoading(true);
      const response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports;
    } catch (error) {
      let responseData = error.response?.data;
      if (responseData instanceof Blob) {
        try {
          responseData = JSON.parse(await responseData.text());
        } catch {
          responseData = null;
        }
      }
      console.error(
        "Resume PDF download failed:",
        responseData?.error || error.message,
      );
      window.alert(
        responseData?.message ||
          "Unable to download the resume PDF. Please try again.",
      );
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResumePdf = async (interviewReportId) => {
    try {
      setLoading(true);
      const response = await generateResumePdf(interviewReportId);
      // setInterviewReport(response.interviewReport);
      // return response;
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId) {
      handleGetInterviewReportById(interviewId);
    } else {
      handleGetAllInterviewReports();
    }
  }, [interviewId]);

  return {
    handleGenerateInterViewReport,
    handleGetInterviewReportById,
    handleGetAllInterviewReports,
    handleGenerateResumePdf,
    report,
    reports,
    loading,
  };
};
