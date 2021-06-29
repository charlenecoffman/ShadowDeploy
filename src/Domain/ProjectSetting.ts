import { Browser } from "./Browser";
import CustomDataTemplate from "./CustomDataTemplate";
import Stage from "./Stage";

export default class ProjectSetting {
  Stages: Stage[] = [];
  CustomDataTemplates: CustomDataTemplate[] = [];
  BrowsersToTest: Browser[] = [];
}
