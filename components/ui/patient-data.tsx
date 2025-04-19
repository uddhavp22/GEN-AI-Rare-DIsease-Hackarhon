import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock patient data
const patientData = {
  diagnoses: [
    { name: "Type 2 Diabetes Mellitus", icd10: "E11.9", date: "2020-03-15" },
    { name: "Essential Hypertension", icd10: "I10", date: "2019-11-22" },
    { name: "Hyperlipidemia", icd10: "E78.5", date: "2020-03-15" },
  ],
  currentMedications: [
    { name: "Metformin", dosage: "1000mg", frequency: "Twice daily", startDate: "2020-03-20" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", startDate: "2019-12-01" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily at bedtime", startDate: "2020-03-20" },
  ],
  pastMedications: [
    {
      name: "Glipizide",
      dosage: "5mg",
      frequency: "Once daily",
      startDate: "2020-03-20",
      endDate: "2021-05-15",
      reason: "Switched to Metformin due to better glycemic control",
    },
    {
      name: "Hydrochlorothiazide",
      dosage: "25mg",
      frequency: "Once daily",
      startDate: "2019-12-01",
      endDate: "2020-02-10",
      reason: "Caused electrolyte imbalance",
    },
  ],
  medicalHistory: [
    {
      condition: "Type 2 Diabetes Mellitus",
      notes: "Diagnosed after routine bloodwork showed elevated HbA1c of 7.8%",
      date: "2020-03-15",
    },
    {
      condition: "Essential Hypertension",
      notes: "Consistently elevated BP readings >140/90 mmHg over 3 months",
      date: "2019-11-22",
    },
    { condition: "Appendectomy", notes: "Laparoscopic procedure, no complications", date: "2010-07-08" },
  ],
  medicationEffectiveness: [
    {
      medication: "Metformin",
      effectiveness: "Good glycemic control. HbA1c reduced from 7.8% to 6.5% within 6 months.",
      sideEffects: "Initial GI discomfort that resolved after 2 weeks",
    },
    {
      medication: "Lisinopril",
      effectiveness: "BP well-controlled at 125/78 mmHg",
      sideEffects: "Occasional dry cough",
    },
    {
      medication: "Atorvastatin",
      effectiveness: "LDL reduced from 160 mg/dL to 95 mg/dL",
      sideEffects: "None reported",
    },
    {
      medication: "Glipizide",
      effectiveness: "Moderate glycemic control. HbA1c reduced to 7.0%",
      sideEffects: "Occasional hypoglycemic episodes",
    },
    {
      medication: "Hydrochlorothiazide",
      effectiveness: "Minimal BP reduction",
      sideEffects: "Hypokalemia requiring supplementation",
    },
  ],
}

export function PatientData() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Diagnoses</CardTitle>
          <CardDescription>Current medical diagnoses and their corresponding codes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Diagnosis</TableHead>
                <TableHead>ICD10 Code</TableHead>
                <TableHead>Date Diagnosed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientData.diagnoses.map((diagnosis, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{diagnosis.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50">
                      {diagnosis.icd10}
                    </Badge>
                  </TableCell>
                  <TableCell>{diagnosis.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Medications</CardTitle>
          <CardDescription>Active prescriptions and treatment regimens</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Start Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientData.currentMedications.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{medication.name}</TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{medication.frequency}</TableCell>
                  <TableCell>{medication.startDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Past Medications</CardTitle>
          <CardDescription>Previously prescribed medications that are no longer active</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Date Range</TableHead>
                <TableHead>Reason for Discontinuation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientData.pastMedications.map((medication, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{medication.name}</TableCell>
                  <TableCell>{medication.dosage}</TableCell>
                  <TableCell>{`${medication.startDate} to ${medication.endDate}`}</TableCell>
                  <TableCell>{medication.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical History & Medication Effectiveness</CardTitle>
          <CardDescription>Historical medical conditions and treatment outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="medical-history">
              <AccordionTrigger>Medical History</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Condition</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.medicalHistory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.condition}</TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.notes}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="medication-effectiveness">
              <AccordionTrigger>Medication Effectiveness</AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Effectiveness</TableHead>
                      <TableHead>Side Effects</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientData.medicationEffectiveness.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.medication}</TableCell>
                        <TableCell>{item.effectiveness}</TableCell>
                        <TableCell>{item.sideEffects}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
