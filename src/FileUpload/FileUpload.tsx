import React, { Dispatch, SetStateAction } from "react";
import { SensorData } from "../Types/types";
import { Box, Button } from "@mui/material";

interface FileUploadProps {
  onFileUpload: (sensorData: SensorData[]) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  setIsLoading,
}) => {

  //filters out unneeded messages and builds array of sensorDta
  const buildSensorArray = (array: string[]) => {
    const sensorDataArray: SensorData[] = [];

    array.forEach((line) => {
      sensorDataArray.push(JSON.parse(line));
    });

    const filteredSensorData: SensorData[] = sensorDataArray.filter(
      (data) => data.kind === "control"
    );


    onFileUpload(filteredSensorData);
  };

  const readLogFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const lines = content.split("\n");
      buildSensorArray(lines);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setIsLoading(true);
      readLogFile(file);
    }
  };

  return (
    <Box py={5} display={"flex"} justifyContent={"center"} alignSelf={"center"}>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden accept=".log" onChange={handleFileChange} />
      </Button>
    </Box>
  );
};

export default FileUpload;
