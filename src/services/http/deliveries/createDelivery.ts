"use server";
import api from "@/services/api";

export interface createDeliveryProps {
  projectCode: string;
  specFuncPrevisionStart: string;
  specFuncPrevisionEnd: string;
  specFuncExecutionStart: string;
  specFuncExecutionEnd: string;
  approvalPrevisionStart: string;
  approvalPrevisionEnd: string;
  approvalExecutionStart: string;
  approvalExecutionEnd: string;
  developmentPrevisionStart: string;
  developmentPrevisionEnd: string;
  developmentExecutionStart: string;
  developmentExecutionEnd: string;
  testTIPrevisionStart: string;
  testTIPrevisionEnd: string;
  testTIExecutionStart: string;
  testTIExecutionEnd: string;
  homologationPrevisionStart: string;
  homologationPrevisionEnd: string;
  homologationExecutionStart: string;
  homologationExecutionEnd: string;
  goLivePrevisionStart: string;
  goLivePrevisionEnd: string;
  goLiveExecutionStart: string;
  goLiveExecutionEnd: string;
  assistedOperationPrevisionStart: string;
  assistedOperationPrevisionEnd: string;
  assistedOperationExecutionStart: string;
  assistedOperationExecutionEnd: string;
}

export async function createDelivery(data: createDeliveryProps): Promise<void> {
  console.log(data);
  const res = await api.post("/api/v1/deliveries", data);
  console.log(res.data);

  return res.data;
}
