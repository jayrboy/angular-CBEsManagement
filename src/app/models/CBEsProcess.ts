import CBEs from './CBEs';
import CbesIndicator from './CBEsIndicator';
import CBEsProcessLog from './CBEsProcessLog';
import CBEsProcessPlanning from './CBEsProcessPlanning';
import CBEsProcessResult from './CBEsProcessResult';
import CBEsProcessTarget from './CBEsProcessTarget';
import CBEsMaturities from './MaturityWithSupervisor';

export default class CBEsProcess {
  id: number = 0;
  name?: string = '';
  weight?: number = 0;
  createDate?: Date = new Date();
  updateDate?: Date = new Date();
  isDeleted?: boolean = false;
  processHeaderId?: number | null = null;
  cbesId?: number = 0;
  cbesMaturities: CBEsMaturities[] = []; // Assuming this is an array of some type
  processHeader: CBEsProcess | null = null; // Reference to parent process
  inverseProcessHeader: CBEsProcess[] = []; // Array of child processes
  cbes: CBEs = new CBEs(); // Assuming CBEs is imported and defined correctly
  cbesIndicators: CbesIndicator[] = [];
  cbesProcessLog: CBEsProcessLog[] = [];
  cbesProcessPlanning: CBEsProcessPlanning[] = [];
  cbesProcessResults: CBEsProcessResult[] = [];
  cbesProcessTargets: CBEsProcessTarget[] = [];
}
