import { post } from "./generic";
import { Player } from "@/types/Player";
import { SetupDataRequest } from "@/app/api/setup/route";

const setupRequests = {
  submitSetup: async (setupData: SetupDataRequest) => {
    return post<Player, SetupDataRequest>("/api/setup", setupData);
  },
};

export default setupRequests;
