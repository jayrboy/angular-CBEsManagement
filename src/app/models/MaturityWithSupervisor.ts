import CBEsMaturity from './CBEsMaturity';
import CBEsPosition from './CBEsPosition';
import CBEsProcess from './CBEsProcess';
import CBEsUser from './CBEsUser';

export default class MaturityWithSupervisor {
  id: number;
  detail?: string | null;
  createDate: Date;
  updateDate: Date;
  isDeleted: boolean;
  createBy: number;
  updateBy: number;
  maturityId: number;
  positionId: number;
  createByNavigation: CBEsUser;
  updateByNavigation: CBEsUser;
  maturity: CBEsMaturity;
  position: CBEsPosition;

  constructor() {
    this.id = 0;
    this.detail = '';
    this.createDate = new Date();
    this.updateDate = new Date();
    this.isDeleted = false;
    this.createBy = 0;
    this.updateBy = 0;
    this.maturityId = 0;
    this.positionId = 0;
    this.createByNavigation = new CBEsUser();
    this.updateByNavigation = new CBEsUser();
    this.maturity = new CBEsMaturity();
    this.position = new CBEsPosition();
  }
}
