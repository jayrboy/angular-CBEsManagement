import CBEs from './CBEs';
import CBEsLogType from './CBEsLogType';
import CbesMaturityLog from './CBEsMaturityLog';
import CBEsUsers from './CBEsUser';

export default class CBEsLogHeader {
  id: number = 0;
  round: number = 0;
  remark: string = '';
  createDate: Date = new Date();
  updateDate: Date = new Date();
  isDeleted: boolean = false;
  cbesLogTypeId: number = 0;
  cbesId: number = 0;
  updateBy: number = 0;
  updateByNavigation: CBEsUsers = new CBEsUsers();
  cbes: CBEs = new CBEs();
  cbesLogType: CBEsLogType = new CBEsLogType();
  cbesMaturityLogs: CbesMaturityLog[] = [];
}
