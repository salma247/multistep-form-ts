import { useState } from "react";
import { Stepper, Step, StepLabel, Grid, Paper } from "@mui/material";

import FormDataProvider from "./FormDataContext";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

function App() {
  const [step, setStep] = useState(0);

  return (
    <FormDataProvider>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <Paper
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "30%",
          }}
        >
          <Stepper activeStep={step}>
            <Step>
              <StepLabel>Step 1</StepLabel>
            </Step>
            <Step>
              <StepLabel>Step 2</StepLabel>
            </Step>
          </Stepper>
          {step === 0 && <Step1 onNext={() => setStep(1)} />}
          {step === 1 && <Step2 onBack={() => setStep(0)} />}
        </Paper>
      </Grid>
    </FormDataProvider>
  );
}

export default App;
