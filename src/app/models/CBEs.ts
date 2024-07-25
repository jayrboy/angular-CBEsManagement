import CBEsLog from './CBEsLog';
import CBEsPlanning from './CBEsPlanning';
import CBEsPlanningLog from './CBEsPlanningLog';
import CBEsProcess from './CBEsProcess';
import CBEsTargetResultLogHeader from './CbesTargetResultLogHeader';
import CBEsUser from './CBEsUser';
import CBEsWithSubSupervisor from './CBEsWithSubSupervisor';
import CBEswithSupervisor from './CBEsWithSupervisor';

export default class CBEs {
  id: number = 0;
  thaiName: string = '';
  engName: string = '';
  shortName: string = '';
  detail: string = '';
  isActive: boolean = true;
  createDate: Date = new Date();
  updateDate: Date = new Date();
  isDeleted: boolean = false;
  isLastDelete: boolean = false;
  createBy: number = 0;
  cbesPlanningLogs: CBEsPlanningLog[] = [];
  cbesPlanning: CBEsPlanning[] = [];
  cbesProcesses: CBEsProcess[] = [];
  cbesTargetResultLogHeaders: CBEsTargetResultLogHeader[] = [];
  cbesWithSubSupervisors: CBEsWithSubSupervisor[] = [];
  cbeswithSupervisors: CBEswithSupervisor[] = [];
  createByNavigation: CBEsUser[] | null = [];
}
