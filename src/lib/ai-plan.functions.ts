import { createServerFn } from "@tanstack/react-start";

export interface AiPlanResult {
  ok: boolean;
  error?: string;
}

export const generateAiPlan = createServerFn({ method: "POST" })
  .inputValidator(() => {})
  .handler(async (): Promise<AiPlanResult> => {
    return { ok: false, error: "AI features are disabled." };
  });
