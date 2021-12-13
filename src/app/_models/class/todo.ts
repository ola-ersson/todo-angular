export class Todo {
  label: string;
  status: boolean;
  position: number;
  isCompleted: boolean;
  id: number;
  constructor(label: string) {
    this.label = label;
    this.status = false;
    this.position = null;
    this.isCompleted = false;
  }
}
