import { createContext } from "react";
import MasterStore from "../Stores/MasterStore";

const MasterStoreContext = createContext<MasterStore | undefined>(undefined);

export default MasterStoreContext;
