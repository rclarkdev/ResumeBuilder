
export class ContentBlockModel {

    public ContentBlockName: any; 
    public ContentBlockGroups: any; 
    public ClassName: any;
    
    constructor (contentBlockName, contentBlockGroups, className) {
      this.ContentBlockName = contentBlockName;
      this.ContentBlockGroups = contentBlockGroups;
      this.ClassName = className;
    }
  }