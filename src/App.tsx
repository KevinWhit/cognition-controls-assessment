import { useState } from "react";
import FileUpload from "./FileUpload/FileUpload";
import { Box, Typography } from "@mui/material";
import { SensorData } from "./Types/types";
import Graph from "./Graph/Graph";

function App() {
  const [sensorData, setSensorData] = useState<SensorData[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleFileUpload = (data: SensorData[]) => {
    if (data) {
      setSensorData(data);
    }
    setIsLoading(false);
  };

  return (
    <Box>
      <FileUpload onFileUpload={handleFileUpload} setIsLoading={setIsLoading} />
      {isLoading ? (
        <Box display={"flex"} justifyContent={"center"} alignSelf={"center"}>
          <Typography>loading...</Typography>
        </Box>
      ) : (
        <Graph data={sensorData}  />
      )}
    </Box>
  );
}
export default App;
