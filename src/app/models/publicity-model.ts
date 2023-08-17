export class PublicityModel {
  dateInit!: string;
  dateEnd!: string;
  hourInit!: string;
  hourEnd!: string;
  isActive!: boolean;

  constructor(dateInit: string, dateEnd: string, hourInit: string, hourEnd: string, isActive: boolean) {
    this.dateInit = dateInit;
    this.dateEnd = dateEnd;
    this.hourInit = hourInit;
    this.hourEnd = hourEnd;
    this.isActive = isActive;
  }


}
