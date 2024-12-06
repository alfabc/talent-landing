import { useMutation } from "@tanstack/react-query";
import { registerRecruiter } from "../infraestructure/auth.api";

export function useRegisterRecruiter() {
  return useMutation({
    mutationKey: ["recruiter", "register"],
    mutationFn: registerRecruiter,
  });
}
