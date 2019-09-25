export class ContentBlockGroupModel
 {
    public contentBlockGroupName: any;
    public answers: any[]; 
    public dateRange: any; 
    public location: any;

    constructor(contentBlockGroupName, answers, dateRange, location) {
        this.contentBlockGroupName = contentBlockGroupName;
        this.answers = answers;
        this.dateRange = dateRange;
        this.location = location;
    }
}
